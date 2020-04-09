const staticCache = "site-static-v1";
const dynamicCache = "dynamic-cache-v1";
const dynamicCacheSize = 5;
const assets = ["/", "index.html"];

// Limits the cashe size
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// Install event
// Install's the service worker and caches the app shell
self.addEventListener("install", (evt) => {
  // Install the event only after the app shell is placed into chache
  evt.waitUntil(
    // open chache
    // chaches.open returns a promis allowing the use of "then" and "catch"
    caches.open(staticCache).then((cache) => {
      // Within the callback function there is access to the cache
      // add assets (array of items to cache for the app shell) the cache
      cache.addAll(assets);
    })
  );
});

// Activate event
// activate the service worker
self.addEventListener("activate", (evt) => {
  // activate once all caches that dont have the name stored in staticCache are deleted
  evt.waitUntil(
    caches.keys().then((keys) => {
      // delete all caches with the anme that dont match the name stored in staticCache or dynamicCache
      // "keys" are the names of the caches stored in the array of cache names and if does
      // not have the same name as the name stored in static cache, then delete it
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
// information about the fetch, including the request and how to treat the repsonse
self.addEventListener("fetch", (evt) => {
  // pause the fetch fetch event and respond with our own custom event (from cache)
  evt.respondWith(
    // check in the cache if something matches the request that was intercepted
    caches
      .match(evt.request)
      .then((cacheRes) => {
        // If cacheRes (caches response) matches the evt.request
        // Return cacheRes if it has a respons and is stored in a cach otherwise return the original request made
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            // open dynamic cache
            // Functionality: place the pages the user visited online in to dynamic cache so when the user visited
            // them again when offline they still have access to the version stored in the dynamic cache
            return caches.open(dynamicCache).then((cache) => {
              // place the returned response into the dynamic cache
              // fetchRes is cloned because it can only be used once (clone is placed into the cache for later)
              cache.put(evt.request.url, fetchRes.clone());
              limitCacheSize(dynamicCache, dynamicCacheSize);
              return fetchRes; // return the request
            });
          })
        );
      })
      .catch(() => caches.match("/pages/fallback.html")) // if fail to return fetch request from cache and online, place custom offline page
  );
});


/*
// Network first staratagy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
*/
