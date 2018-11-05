import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import AuthService from './../../services/authService';
import UserService from './../../services/userService';
import { capitalize } from './../util';
import logo from './../../quiz.png';

const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: '#fff',
      width: theme.spacing.unit * 25,
      height: theme.spacing.unit * 25
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    register: {
        marginTop: theme.spacing.unit * 2
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            isLoginValid: true,
            isPasswordValid: true,
            loginHelperText: '',
            passwordHelperText: ''
        };
        this.authService = new AuthService();
        this.userService = new UserService();
        this.login = this.login.bind(this);
        this.updateField = this.updateField.bind(this);
        this.showRegister = this.showRegister.bind(this);
    }

    render() {
        const { classes } = this.props;

        let submitDisabled = this.state.isLoginValid && this.state.isPasswordValid ? false : true;

        return (
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <img src={logo} alt="logo" />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        Student Quiz
                    </Typography>
                    <Typography component="h1" variant="h6">
                        Login
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="login">Login</InputLabel>
                            <Input
                                id="login"
                                name="login"
                                value={this.state.login}
                                onChange={this.updateField}
                                error={!this.state.isLoginValid}
                                autoFocus
                            />
                            <FormHelperText id="login-helper-text" hidden={this.state.isLoginValid}>{this.state.loginHelperText}</FormHelperText>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.updateField}
                                error={!this.state.isPasswordValid}
                                autoComplete="current-password"
                            />
                            <FormHelperText id="password-helper-text" hidden={this.state.isPasswordValid}>{this.state.passwordHelperText}</FormHelperText>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.login}
                            disabled={submitDisabled}
                        >
                            Submit
                        </Button>
                        <Typography component="h1" variant="h6">
                            or
                        </Typography>
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={this.showRegister}
                        >
                            Register
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }

    updateField(event) {
        this.setState(
            { [event.target.name] : event.target.value },
            () => this.validateFields());
    }

    validateFields() {
        let login = this.state.login.trim();
        let password = this.state.password.trim();
        let isLoginValid = true;
        let isPasswordValid = true;
        if (!login || login.length < 3 || login.length > 25) {
            isLoginValid = false;
        }
        if (!password || password.length < 6 || password.length > 30) {
            isPasswordValid = false;
        }

        this.setState({
            isLoginValid: isLoginValid,
            isPasswordValid: isPasswordValid,
            loginHelperText: 'Incorrect size: 3 - 25 characters required',
            passwordHelperText: 'Incorrect size: 6 - 30 characters required'
        });

        return isLoginValid && isPasswordValid;
    }

    showRegister() {
        this.props.history.push('/register');
    }

    async login(event) {
        event.preventDefault();

        if (!this.validateFields()) {
            return;
        }

        let payload = {
            'grant_type': 'password',
            'username': this.state.login,
            'password': this.state.password
        }

        let authData = await this.authService
            .performLogin(payload)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
                return null;
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        isLoginValid: false,
                        isPasswordValid: false,
                        loginHelperText: 'Invalid login or password',
                        passwordHelperText: 'Invalid login or password'
                    })
                } else {
                    console.log('Error', error.message);
                }
                return null;
            });
            
        if (!authData) {
            return;
        }

        let accessToken = authData.access_token;
        let refreshToken = authData.refresh_token;
        let type = authData.token_type;

        localStorage.setItem("access_token", capitalize(type) + ' ' + accessToken);
        localStorage.setItem("refresh_token", capitalize(type) + ' ' + refreshToken);

        let user = await this.userService.getCurrentUser();
        let userAsJson = user ? JSON.stringify(user) : '';
        localStorage.setItem('current_user', userAsJson);

        this.props.history.push('/quizzes');
    }оке
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);