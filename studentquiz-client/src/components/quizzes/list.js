import React, { Component } from 'react';
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
                Quizzes List
                <ul>
                    {
                        this.state.quizzes.map((quiz, i) => {
                            return (
                                <li key={i}>
                                    <QuizzesItem quiz={quiz} />
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
        let quizzes = await service.getAllQuizzes();
        this.setState({
            quizzes: quizzes
        });
    }
}

export default QuizzesList;