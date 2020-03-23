import React from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function Profile(props) {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item>
                <Typography variant="h4" component="h2">
                    Profile
                </Typography>
            </Grid>
            <Grid item>
                <TextField id="standard-basic" label="Email" />
            </Grid>
            <Grid item>
                <TextField id="standard-basic" label="Username" />
            </Grid>
            <Grid item>
                <TextField id="standard-basic" label="Password " />
            </Grid>

        </Grid>
    )
}