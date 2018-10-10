import React from 'react';
import logo from './../quiz.png';

export default function Home(props) {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <a
                className="App-link"
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
            >
                Student Quiz
            </a>
        </header>
    );
}