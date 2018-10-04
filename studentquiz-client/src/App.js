import React, { Component } from 'react';
import logo from './quiz.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;
