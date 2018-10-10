import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import QuizzesList from './components/quizzes/list';
import Quiz from './components/quiz/quiz';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/quizzes" component={QuizzesList} />
						<Route path="/quizzes/:quizId" component={Quiz} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
