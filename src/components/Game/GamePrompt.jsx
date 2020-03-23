import React from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(0)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function GamePrompt(props) {
  const classes = useStyles();
  const { username } = props;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Chip
          variant="outlined"
          color="primary"
          label={username}
          icon={<FaceIcon />}
        />
      </Grid>
      <Grid item>
        <Fab variant="extended" onClick={props.handleStart}>
          <PlayArrowIcon className={classes.extendedIcon} />
          Start
        </Fab>
      </Grid>
    </Grid>
  );
}
