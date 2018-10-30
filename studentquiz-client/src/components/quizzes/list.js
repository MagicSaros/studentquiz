import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import QuizService from '../../services/quizService';
import QuizzesItem from './item';

class QuizzesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        }
    }

    render() {
        return(
            <div>
                <Grid container direction='row' justify='center' spacing={24}>
                    <Grid item xs={12}>
                        <h1>Quizzes List</h1>
                    </Grid>
                    <Grid item xs={10}>
                        <List>
                            {
                                this.state.quizzes.map((quiz, i) => {
                                    return (
                                        <div key={i}>
                                            <ListItem button onClick={() => this.showQuiz(quiz.quizId)}>
                                                <QuizzesItem quiz={quiz} />
                                            </ListItem>
                                        </div>
                                    );
                                })
                            }
                        </List>
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

export default QuizzesList;