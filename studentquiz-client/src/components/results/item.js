import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function ResultsItem({result}) {
    return (
        <div>
            <Grid container item xs justify='center'>
                <Grid item xs={12}>Quiz: {result.quiz.name}</Grid>
                <Grid item xs={6}>Percentage: {result.percentage}%</Grid>
                <Grid item xs={6}>Status: {result.success ? 'Success' : 'Failure'}</Grid>
            </Grid>
        </div>
    );
}