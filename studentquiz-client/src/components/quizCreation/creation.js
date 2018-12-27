import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

import Info from './info';
import Questions from './questions';
import QuizService from './../../services/quizService';
import ConfigService from '../../services/configService';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: theme.spacing.unit * 3,
        width: '80%'
    },
    questions: {
        marginTop: theme.spacing.unit * 4,
    },
    create: {
        marginTop: theme.spacing.unit * 2,
    },
    modal: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        width: '20%',
        height: '20%',
        textAlign: 'center'
    },
    modalPaper: {
        padding: theme.spacing.unit * 4,
    },
    modalButton: {
        margin: theme.spacing.unit * 2,
        width: '30%'
    }
});

class QuizCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            quizInfo: {},
            questions: [],
            snackbarOpen: false,
            isInfoValid: false,
            areQuestionsValid: false,
            savingStatus: '',
            modalOpen: false,
            sendProcessing: false
        };
        this.timers = [];
        this.quizService = new QuizService();
        this.configService = new ConfigService();
        this.getQuizInfo = this.getQuizInfo.bind(this);
        this.getQuestionsData = this.getQuestionsData.bind(this);
        this.sendQuiz = this.sendQuiz.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant='h3'>
                    Quiz creation
                </Typography>
                <Paper className={classes.root}>
                    <Info onChange={this.getQuizInfo} categories={this.state.categories} />
                    <div className={classes.questions}>
                        <Questions onChange={this.getQuestionsData} />
                    </div>
                    <Button
                        variant="contained"
                        className={classes.create}
                        color="primary"
                        onClick={() => this.setState({ modalOpen: true })}
                        disabled={!this.state.isInfoValid || !this.state.areQuestionsValid}
                    >
                        Create
                    </Button>
                </Paper>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.snackbarOpen}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<div id="message-id">{this.state.savingStatus}</div>}
                />

                <div>
                    <Modal open={this.state.modalOpen} onClose={this.handleClose} className={classes.modal}>
                        <Paper className={classes.modalPaper}>
                            <Typography variant='h4' gutterBottom>
                                Are you sure?
                            </Typography>
                            {this.state.sendProcessing ?
                                <CircularProgress size={32} />
                                :
                                <div>
                                    <Button className={classes.modalButton} variant='contained' color="primary" onClick={this.sendQuiz}>
                                        Yes
                                    </Button>
                                    <Button className={classes.modalButton}variant='contained' color="secondary" onClick={this.closeModal}>
                                        No
                                    </Button>
                                </div>
                            }
                        </Paper>
                    </Modal>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.loadCategories();
    }

    componentWillUnmount() {
        this.timers.forEach(timer => clearTimeout(timer));
    }

    async loadCategories() {
        let categories = await this.configService
            .getCategories()
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
                return null;
            })
            .catch(error => {
                return null;
            });

        if (!categories) {
            return;
        }

        this.setState({ categories: categories });
    }

    getQuizInfo(quizInfo) {
        this.setState({
            quizInfo: quizInfo,
            isInfoValid: quizInfo.isValid
        });
    }

    getQuestionsData(questionsData) {
        this.setState({
            questions: questionsData.questions,
            areQuestionsValid: questionsData.isValid
        });
    }

    async sendQuiz() {
        if (!this.state.isInfoValid || !this.state.areQuestionsValid) {
            let timer = setTimeout(() => {
                this.setState({
                        snackbarOpen: true,
                        savingStatus: 'Cannot create. Error!'
                    });
                    let timer = setTimeout(() => this.setState({ snackbarOpen: false }), 3000);
                    this.timers.push(timer);
            }, 1000);
            this.timers.push(timer);
            return;
        } else {
            let timer = setTimeout(() => {
                this.setState({ sendProcessing: true }, () => {
                    let timer = setTimeout(() => this.setState({ sendProcessing: false }), 1000);
                    this.timers.push(timer);
                });
                this.timers.push(timer);
            })
        }

        let questions = this.state.questions
            .map(question => {
                let options = {};
                question.options.forEach(option => options[option.text] = option.isRight);
                return {
                    'text': question.text,
                    'type': 'ONE_OPTION',
                    'options': options
                };
            });

        let user = localStorage.getItem('current_user');
        let userLogin = user ? JSON.parse(user).login : '';

        let quiz = {
            'name': this.state.quizInfo.name,
            'category': {
                'id': this.state.quizInfo.categoryId
            },
            'threshold': this.state.quizInfo.threshold,
            'questions': questions,
            'authorLogin': userLogin
        };

        let message = 'Unexpected error. Try else';

        await this.quizService
            .sendQuiz(quiz)
            .then(response => {
                if (response.status === 201) {
                    message = 'Quiz created successfully';
                }
            })
            .catch(error => {
                if (error.response) {
                    message = error.response.data.message;
                }
            });

        let timer = setTimeout(() => {
            this.setState({
                snackbarOpen: true,
                savingStatus: message,
                modalOpen: false
            });
            let timer = setTimeout(() => this.setState({ snackbarOpen: false }), 3000);
            this.timers.push(timer);            
        }, 1000);
        this.timers.push(timer);
    }

    closeModal() {
        this.setState({ modalOpen: false });
    }
}

export default withStyles(styles)(QuizCreation);