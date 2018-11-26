import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../quiz.png';

export default function Home(props) {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Link to='/quizzes' style={ {color: '#fff'} }>
                Student Quiz
            </Link>
        </header>
    );
}