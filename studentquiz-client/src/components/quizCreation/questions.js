import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Question from './question';

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            isValid: true
        };
        this.addQuestion = this.addQuestion.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.updateQuestions = this.updateQuestions.bind(this);
    }

    render() {
        return (
            <div>
                <Typography variant="subtitle1">
                    Questions
                </Typography>
                <List>
                    {
                        this.state.questions.map((question, i) => (
                            <ListItem key={i} divider component="div">
                                <Question
                                    index={i}
                                    question={question}
                                    onChange={this.getQuestion}
                                    onDelete={this.removeQuestion}
                                />
                            </ListItem>
                        ))
                    }
                </List>
                <Button
                    variant="fab"
                    onClick={this.addQuestion}
                    title="Add question"
                >
                    <Add />
                </Button>
            </div>
        );
    }

    addQuestion() {
        let questions = this.state.questions;
        questions.push({
            text: 'New question',
            options: [
                {
                    text: 'Yes',
                    isRight: true,
                    isValid: true
                },
                {
                    text: 'No',
                    isRight: false,
                    isValid: true
                }
            ]
        });
        this.setState({ questions: questions }, this.updateQuestions);
    }

    removeQuestion(index) {
        let questions = this.state.questions;
        questions.splice(index, 1);
        this.setState({ questions: questions }, this.updateQuestions);
    }

    getQuestion(question) {
        let questions = this.state.questions;

        questions[question.index] = {
            text: question.text,
            options: question.options,
            isValid: question.isValid,
            edit: question.edit
        };

        this.setState({
            questions: questions,
        }, this.updateQuestions);
    }

    updateQuestions() {
        let isValid = this.state.questions.length ? this.state.questions.every(question => question.isValid) && !this.state.questions.some(question => question.edit) : false;
        
        this.props.onChange({
            questions: this.state.questions,
            isValid: isValid
        });
    }
}

export default Questions;