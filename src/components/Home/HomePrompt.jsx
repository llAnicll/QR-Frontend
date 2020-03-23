import React from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function HomePromp(props) {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
        >            
        <Grid item>
            <Typography variant="h2" component="h2">
                NMC
            </Typography>
        </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={props.handleBtnLogin}>
                    Sign In
                </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={props.handleBtnSignUp}>
                    Sign Up
                </Button>
            </Grid>
        </Grid>  
    )
}