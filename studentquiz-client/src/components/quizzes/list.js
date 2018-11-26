import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import QuizService from '../../services/quizService';
import { toFullDateTimeFormat } from './../util';

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

class QuizzesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        }
    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <Grid container direction='row' justify='center' spacing={24}>
                    <Grid item xs={12}>
                        <h1>Quizzes List</h1>
                    </Grid>
                    <Grid item xs={10}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quiz name</TableCell>
                                        <TableCell>Created</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell numeric>Questions</TableCell>
                                        <TableCell numeric>Threshold</TableCell>
                                        <TableCell>Author</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.quizzes.map((quiz, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <Button onClick={() => this.showQuiz(quiz.quizId)} fullWidth>
                                                        {quiz.name}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>{toFullDateTimeFormat(quiz.created)}</TableCell>
                                                <TableCell>{quiz.category.name}</TableCell>
                                                <TableCell numeric>{quiz.questions.length}</TableCell>
                                                <TableCell numeric>{quiz.threshold}%</TableCell>
                                                <TableCell>{quiz.authorLogin}</TableCell>
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
        let service = new QuizService();
        let quizzes = await service.getAllQuizzes();
        this.setState({
            quizzes: quizzes ? quizzes : []
        });
    }

    showQuiz(quizId) {
        this.props.history.push(`/quizzes/${quizId}`);
    }
}

export default withStyles(styles)(QuizzesList);