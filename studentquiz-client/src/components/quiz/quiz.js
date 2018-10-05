import React, {Component} from 'react';

import QuizService from './../../services/quizService';
import Question from './question';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizId: this.props.match.params.quizId,
            quiz: null
        }
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
                                    <Question question={question}/>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }

    async componentDidMount() {
        let service = new QuizService();
        let quiz = await service.getQuiz(this.state.quizId);
        this.setState({
            quiz: quiz
        });
    }
}

export default Quiz;