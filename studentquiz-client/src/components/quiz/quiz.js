import React, {Component} from 'react';

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
                <h2>{this.state.quiz.name}</h2>
                <br/>
                <ul>
                    {
                        this.state.quiz.questions.map((question, i) => {
                            return (
                                <li key={i}>
                                    <Question question={question} onChange={this.getAnswer}/>
                                </li>
                            );
                        })
                    }
                </ul>
                <button onClick={event => this.sendResult(event)}>
                    Submit
                </button>
            </div>
        );
    }

    async componentDidMount() {
        let quiz = await this.quizService.getQuiz(this.state.quizId);
        this.setState({
            quiz: quiz
        });
    }

    sendResult(event) {
        event.preventDefault();
        
        let percantage = this.createResult();
        let result = {
            quizId: this.state.quizId,
            userId: null,
            percantage: percantage
        }
        
        this.resultService.sendResult(result);
    }

    createResult() {
        let questions = this.state.quiz.questions;
        let answers = this.state.answers;
        return this.resultService.calculateResult(questions, answers);
    }

    getAnswer(answer) {
        let questionText = answer.question.text;
        let selectedOption = answer.selectedOption;
        let answers = this.state.answers;
        answers[questionText] = selectedOption;
        this.setState({ answers: answers });
    }
}

export default Quiz;