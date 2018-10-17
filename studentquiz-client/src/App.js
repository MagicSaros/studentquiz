import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import QuizzesList from './components/quizzes/list';
import Quiz from './components/quiz/quiz';
import Result from './components/quiz/result';
import TopAppBar from './components/appBar';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route path="/" component={TopAppBar}></Route>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/quizzes" component={QuizzesList} />
						<Route exact path="/quizzes/:quizId" component={Quiz} />
						<Route path="/quizzes/:quizId/result" component={Result} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
