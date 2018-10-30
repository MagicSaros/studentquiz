import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import QuizService from './../../services/quizService';
import ResultService from './../../services/resultService';
import Question from './question';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizId: this.props.match.params.quizId,
            quiz: null,
            answers: {},
            result: {
                percentage: '',
                succes: ''
            },
            isResultModalOpen: false
        };
        this.getAnswer = this.getAnswer.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showQuizzesList = this.showQuizzesList.bind(this);
        this.resultService = new ResultService();
        this.quizService = new QuizService();
    }

    render() {
        if (!this.state.quiz) {
            return (<div>No content</div>);
        }

        let result = this.state.result;
        let percentage = result.percentage;
        let color = '#f00';
        let buttonText = 'Try again';
        let buttonColor = 'secondary';
        let handleClick = this.handleClose;
        let status = 'failure';

        if (result.success) {
            color = '#0f0';
            buttonText = 'OK';
            buttonColor = 'primary';
            handleClick = this.showQuizzesList;
            status = 'succes';
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
                <Modal open={this.state.isResultModalOpen} onClose={this.handleClose} style={modalStyles}>
                    <Paper style={{ padding: '10%' }}>
                        <Typography variant='h4' gutterBottom>
                            Results
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            Your result is {percentage}%
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            Status: <span style={{ color: color }}>{status}</span>
                        </Typography>
                        <Button variant='outlined' color={buttonColor} onClick={handleClick}>
                            {buttonText}
                        </Button>
                    </Paper>
                </Modal>
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

        let confirmation = window.confirm('Are you sure?');
        if (!confirmation) {
            return;
        }

        let userAsJson = localStorage.getItem('current_user');
        let userId = userAsJson ? JSON.parse(userAsJson).userId : '';
        
        let answer = {
            quiz: { 
                quizId: this.state.quizId,
            },
            user: {
                userId: userId,
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
        this.setState({
            isResultModalOpen: true,
            result: result
        });
    }

    handleClose() {
        this.setState({ isResultModalOpen: false });
    }

    showQuizzesList() {
        this.props.history.push('/quizzes');
    }
}

const modalStyles = {
    position: 'absolute',
    width: '20%',
    top: '20%',
    left: '40%',
    textAlign: 'center'
}

export default Quiz;