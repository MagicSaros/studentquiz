import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/auth/privateRoute';
import Home from './components/home';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Register from './components/auth/register';
import QuizzesList from './components/quizzes/list';
import Quiz from './components/quiz/quiz';
import TopAppBar from './components/appBar';
import ErrorPage from './components/notFound';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route path="/quizzes" component={TopAppBar}></Route>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/logout" component={Logout} />
						<Route path="/register" component={Register} />
						<PrivateRoute exact path="/quizzes" component={QuizzesList} />
						<PrivateRoute exact path="/quizzes/:quizId" component={Quiz} />
							<Route component={ErrorPage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
