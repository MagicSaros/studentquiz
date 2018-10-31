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
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

import AuthService from './../../services/authService';
import UserService from './../../services/userService';
import logo from './../../quiz.png';

const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 800,
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalPaper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 8}px ${theme.spacing.unit * 6}px`,
    },
    button: {
        margin: theme.spacing.unit
    }
});

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            passwordRepeated: '',
            firstName: '',
            lastName: '',
            email: '',
            isLoginValid: true,
            isPasswordValid: true,
            isPasswordRepeatedValid: true,
            isFirstNameValid: true,
            isLastNameValid: true,
            isEmailValid: true,
            isErrorModalOpen: false,
            isSuccessModalOpen: false
        };
        this.authService = new AuthService();
        this.userService = new UserService();
        this.register = this.register.bind(this);
        this.updateField = this.updateField.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
    }

    render() {
        const { classes } = this.props;

        let submitDisabled = this.state.isLoginValid && this.state.isPasswordValid && this.state.isPasswordRepeatedValid && this.state.isEmailValid ? false : true;

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
                        Register
                    </Typography>
                    <form className={classes.form}>
                        <Grid container spacing={40}>
                            <Grid item xs={6}>
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
                                    <FormHelperText id="login-helper-text">Create login, size: 3 - 25</FormHelperText>
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
                                    <FormHelperText id="password-helper-text">Create a strong password, size: 6 - 30</FormHelperText>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="passwordRepeated">Repeat password</InputLabel>
                                    <Input
                                        id="passwordRepeated"
                                        name="passwordRepeated"
                                        type="password"
                                        value={this.state.passwordRepeated}
                                        onChange={this.updateField}
                                        error={!this.state.isPasswordRepeatedValid}
                                        autoComplete="current-password"
                                    />
                                    <FormHelperText id="passwordRepeated-helper-text">Repeat your password</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.updateField}
                                        error={!this.state.isEmailValid}
                                    />
                                    <FormHelperText id="email-helper-text">Enter your email</FormHelperText>
                                </FormControl>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="firstName">First name</InputLabel>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={this.state.firstName}
                                        onChange={this.updateField}
                                        error={!this.state.isFirstNameValid}
                                    />
                                    <FormHelperText id="firstName-helper-text">Enter your first name</FormHelperText>
                                </FormControl>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="lastName">Last name</InputLabel>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={this.state.lastName}
                                        onChange={this.updateField}
                                        error={!this.state.isLastNameValid}
                                    />
                                    <FormHelperText id="lastName-helper-text">Enter your last name</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.register}
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
                            onClick={this.showLogin}
                        >
                            Login
                        </Button>
                        <Modal open={this.state.isErrorModalOpen} onClose={this.closeErrorModal} className={classes.modal}>
                            <Paper className={classes.modalPaper}>
                                <Typography variant='h5' gutterBottom>
                                    User is already exist
                                </Typography>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.closeErrorModal}
                                >
                                    Try again
                                </Button>
                                or
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={this.showLogin}
                                >
                                    Login
                                </Button>
                            </Paper>
                        </Modal>
                        <Modal open={this.state.isSuccessModalOpen} className={classes.modal}>
                            <Paper className={classes.modalPaper}>
                                <Typography variant='h5' gutterBottom>
                                    Registered successfully
                                </Typography>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={this.showLogin}
                                >
                                    Login
                                </Button>
                            </Paper>
                        </Modal>
                    </form>
                </Paper>
            </main>
        );
    }

    updateField(event) {
        this.setState(
            { [event.target.name] : event.target.value },
            () => this.validateField());
    }

    validateField() {
        let login = this.state.login.trim();
        let password = this.state.password.trim();
        let email = this.state.email.trim();
        let isLoginValid = true;
        let isPasswordValid = true;
        let isEmailValid = true;
        let isPasswordRepeatedValid = true;
        if (!login || login.length < 3 || login.length > 25) {
            isLoginValid = false;
        }
        if (!password || password.length < 6 || password.length > 30) {
            isPasswordValid = false;
        }
        if (password !== this.state.passwordRepeated) {
            isPasswordRepeatedValid = false;
        }
        if (!email.match(/^([\w\W]+)@([\w\W]+\.)+([\w]{2,})$/i)) {
            isEmailValid = false;
        }

        this.setState({
            isLoginValid: isLoginValid,
            isPasswordValid: isPasswordValid,
            isEmailValid: isEmailValid,
            isPasswordRepeatedValid: isPasswordRepeatedValid
        });
    }

    async register(event) {
        event.preventDefault();

        let payload = {
            'login': this.state.login,
            'password': this.state.password,
            'email': this.state.email,
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'role': 'STUDENT'
        }

        let user = await this.authService
            .performRegister(payload)
            .then(response => {
                if (response.status === 201) {
                    return response.data;
                }
                return null;
            })
            .catch(error => {
                if (error.response) {
                    this.setState({ isErrorModalOpen: true });
                } else {
                    console.log('Error', error.message);
                }
                return null;
            })

        if (!user) {
            return;
        }

        let userAsJson = user ? JSON.stringify(user) : '';
        localStorage.setItem('current_user', userAsJson);

        this.setState({ isSuccessModalOpen: true });
    }

    showLogin() {
        this.props.history.push('/login');
    }

    closeErrorModal() {
        this.setState({ isErrorModalOpen: false });
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);