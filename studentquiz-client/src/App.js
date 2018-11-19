import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import PrivateRoute from './components/auth/privateRoute';
import Home from './components/home';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Register from './components/auth/register';
import QuizzesList from './components/quizzes/list';
import Quiz from './components/quiz/quiz';
import UserProfile from './components/profile/userProfile';
import ResultsList from './components/results/list';
import Settings from './components/profile/settings';
import ErrorPage from './components/notFound';
import './App.css';

const theme = createMuiTheme({
	typography: {
	  	useNextVariants: true,
	},
});

class App extends Component {
	render() {
		return (
			<Router>
				<MuiThemeProvider theme={theme}>
					<div className="App">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/login" component={Login} />
							<Route path="/logout" component={Logout} />
							<Route path="/register" component={Register} />
							<PrivateRoute exact path="/quizzes" component={QuizzesList} />
							<PrivateRoute exact path="/quizzes/:quizId" component={Quiz} />
							<PrivateRoute exact path="/users/:userId" component={UserProfile} />
							<PrivateRoute exact path="/users/:userId/results" component={ResultsList} />
							<PrivateRoute exact path="/users/:userId/settings" component={Settings} />
							<Route component={ErrorPage} />
						</Switch>
					</div>
				</MuiThemeProvider>
			</Router>
		);
	}
}

export default App;
