import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

import UserService from './../../services/userService';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.userId = this.props.match.params.userId;
        this.state = {
            results: []
        };
        this.userService = new UserService();
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container direction='row' justify='center' spacing={24}>
                    <Grid item xs={12}>
                        <h1>Results</h1>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Quiz name</TableCell>
                                    <TableCell numeric>Date</TableCell>
                                    <TableCell numeric>Percentage</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.results.map((result, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell component="th" scope="row">{result.quiz.name}</TableCell>
                                                <TableCell numeric>5//11/2018</TableCell>
                                                <TableCell numeric>{result.percentage}%</TableCell>
                                                <TableCell>{result.success ? 'Success' : 'Failure'}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

    async componentDidMount() {
        let userId = this.userId ? this.userId: '';
        let results = await this.userService
            .getUserResults(userId)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data._embedded.resultDtoList);
                    return response.data._embedded.resultDtoList;
                }
                return [];
            })
            .catch(error => {
                return [];
            })
        this.setState({ results: results });
    }
}

export default withStyles(styles)(ResultsList);