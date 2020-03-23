import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Leaderboard() {
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
                    Leaderboard
                </Typography>
            </Grid>
        </Grid>
    )
}