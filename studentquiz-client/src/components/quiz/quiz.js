import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import QuizService from './../../services/quizService';
import ResultService from './../../services/resultService';
import Question from './question';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizId: this.props.match.params.quizId,
            quiz: null,
            answers: {}
        };
        this.getAnswer = this.getAnswer.bind(this);
        this.resultService = new ResultService();
        this.quizService = new QuizService();
    }

    render() {
        if (!this.state.quiz) {
            return (<div>No content</div>);
        }

        return (
            <div>
                <Grid container spacing={24} justify='center' direction='column' alignItems='center'>
                    <Grid item xs={6}>
                        <h2>{this.state.quiz.name}</h2>
                        {
                            this.state.quiz.questions.map((question, i) => {
                                return (
                                    <div key={i}>
                                        <Grid container spacing={24} direction='column'>
                                            <Grid item>
                                                <Question question={question} onChange={this.getAnswer}/>
                                            </Grid>
                                        </Grid>
                                    </div>
                                );
                            })
                        }
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="default" onClick={event => this.sendResult(event)}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    async componentDidMount() {
        let quiz = await this.quizService.getQuiz(this.state.quizId);
        this.setState({
            quiz: quiz
        });
    }

    async sendResult(event) {
        event.preventDefault();
        
        let answer = {
            quiz: { 
                quizId: this.state.quizId,
            },
            user: {
                userId: '5bc44144d550111590c3ba42',
            },
            answers: this.state.answers
        }
        
        let result = await this.resultService.sendResult(answer);
        this.showResult(result);
        console.log(result);
    }

    getAnswer(answer) {
        let questionText = answer.question.text;
        let selectedOption = answer.selectedOption;
        let answers = this.state.answers;
        answers[questionText] = selectedOption;
        this.setState({ answers: answers });
    }

    showResult(result) {
        this.props.history.push(`/quizzes/${this.state.quizId}/result`, { result: result })
    }
}

export default Quiz;