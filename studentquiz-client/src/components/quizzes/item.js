import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function QuizzesItem({quiz}) {
    return (
        <div>
            <Grid container justify='center'>
                <Grid item xs={12}>
                    <h3>{quiz.name}</h3>
                </Grid>
                <Grid container item xs>
                    <Grid item xs={3}>Category: {quiz.category.name}</Grid>
                    <Grid item xs={3}>Questions: {quiz.questions.length}</Grid>
                    <Grid item xs={3}>Threshold: {quiz.threshold}%</Grid>
                    <Grid item xs={3}>Author: {quiz.authorLogin}</Grid>
                </Grid>
            </Grid>
        </div>
    );
}
