import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import { withStyles, Typography, IconButton } from '@material-ui/core';

import UserService from './../../services/userService';
import AuthService from './../../services/authService';
import ConfigService from './../../services/configService';
import PasswordChanger from './passwordChanger';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    root: {
        marginTop: theme.spacing.unit * 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: theme.spacing.unit * 3,
        width: '80%'
    },
    wrapper: {
        position: 'relative',
        margin: theme.spacing.unit * 2
    },
    submit: {
        margin: theme.spacing.unit * 2
    },
    subtitle: {
        marginTop: theme.spacing.unit * 2
    }
});

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            firstName: '',
            lastName: '',
            login: '',
            email: '',
            countries: {},
            country: '',
            city: '',
            fieldsReadOnly: true,
            saving: false,
            savingStatus: '',
            snackbarOpen: false,
            isLoginValid: true,
            isEmailValid: true
        }
        this.userId = this.props.match.params.userId;
        this.timers = [];
        this.userService = new UserService();
        this.authService = new AuthService();
        this.configService = new ConfigService();
        this.updateUser = this.updateUser.bind(this);
        this.changeFields = this.changeFields.bind(this);
        this.updateField = this.updateField.bind(this);
        this.closeChanging = this.closeChanging.bind(this);
    }

    render() {
        const { classes } = this.props;
        let variant = this.state.fieldsReadOnly ? 'filled' : 'standard';

        if (!this.state.user) {
            return (<div>User not found</div>);
        }

        return (
            <div>
                <Typography variant='h3' >
                    Profile
                </Typography>
                <Paper className={classes.root}>
                    <Typography variant='h4' align='center'>
                        {this.state.user.login}
                    </Typography>
                    <Typography variant='subtitle1' align='center' className={classes.subtitle}>
                        Personal info
                    </Typography>

                    <form className={classes.form}>
                        <Grid container spacing={40} direction='row' justify='space-around'>
                            <Grid item xs={4}>
                                <FormControl margin="normal" fullWidth>
                                    <TextField
                                        id="firstName"
                                        name="firstName"
                                        label="First name"
                                        type="text"
                                        variant={variant}
                                        value={this.state.firstName}
                                        onChange={this.updateField}
                                        InputProps={{
                                            readOnly: this.state.fieldsReadOnly,
                                        }}
                                    />
                                </FormControl>
                                <FormControl margin="normal" fullWidth>
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        type="text"
                                        variant={variant}
                                        value={this.state.lastName}
                                        onChange={this.updateField}
                                        InputProps={{
                                            readOnly: this.state.fieldsReadOnly,
                                        }}
                                    />
                                </FormControl>
                                <FormControl margin="normal" fullWidth>
                                    <TextField
                                        id="birthday"
                                        name="birthday"
                                        label="Birthday"
                                        type="date"
                                        variant={variant}
                                        value={this.state.birthday}
                                        onChange={this.updateField}
                                        InputProps={{
                                            readOnly: this.state.fieldsReadOnly,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl margin="normal" fullWidth>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        variant={variant}
                                        value={this.state.email}
                                        onChange={this.updateField}
                                        InputProps={{
                                            readOnly: this.state.fieldsReadOnly,
                                        }}
                                        error={!this.state.isEmailValid}
                                    />
                                </FormControl>
                                {this.state.fieldsReadOnly ?
                                    <FormControl margin="normal" fullWidth>
                                        <TextField
                                            id="country"
                                            name="country"
                                            label="Country"
                                            type="text"
                                            variant={variant}
                                            value={this.state.countries[this.state.country]}
                                            onChange={this.updateField}
                                            InputProps={{
                                                readOnly: this.state.fieldsReadOnly,
                                            }}
                                            error={!this.state.isEmailValid}
                                        />
                                    </FormControl>
                                    :
                                    <FormControl margin="normal" fullWidth>
                                        <InputLabel htmlFor="country">Country</InputLabel>
                                        <Select
                                            value={this.state.country}
                                            onChange={this.updateField}
                                            inputProps={{
                                                readOnly: this.state.fieldsReadOnly,
                                                name: 'country',
                                                id: 'country',
                                            }}
                                        >
                                            <MenuItem value=""></MenuItem>
                                            {Object.keys(this.state.countries).map(code => <MenuItem key={code} value={code}>{this.state.countries[code]}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                }
                                <FormControl margin="normal" fullWidth>
                                    <TextField
                                        id="city"
                                        name="city"
                                        label="City"
                                        type="text"
                                        variant={variant}
                                        value={this.state.city}
                                        onChange={this.updateField}
                                        InputProps={{
                                            readOnly: this.state.fieldsReadOnly,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        {this.state.fieldsReadOnly ?
                            <div className={classes.wrapper}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={this.changeFields}
                                >
                                    Change
                                </Button>
                            </div>
                            :
                            <div className={classes.wrapper}>
                                <IconButton
                                    type="button"
                                    color="primary"
                                    onClick={this.updateUser}
                                    disabled={this.state.saving || !this.state.isLoginValid || !this.state.isEmailValid}
                                >
                                    {this.state.saving ? <CircularProgress size={32} /> : <CheckIcon />}
                                </IconButton>
                                <IconButton
                                    type="button"
                                    color="secondary"
                                    onClick={this.closeChanging}
                                    disabled={this.state.saving}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        }
                    </form>
                    <Divider />
                    <Typography variant='subtitle1' align='center' className={classes.subtitle}>
                        Change password
                    </Typography>
                    <PasswordChanger userId={this.userId} />
                </Paper>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.snackbarOpen}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<div id="message-id">{this.state.savingStatus}</div>}
                />
            </div>
        );
    }

    async componentDidMount() {    
        await this.loadAllowedCountries();
        await this.loadUser();
    }

    componentWillUnmount() {
        this.timers.map(timer => clearTimeout(timer));
    }

    async loadUser() {
        let userId = this.userId ? this.userId: '';
        let user = await this.userService
            .getUser(userId)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
                return null;
            });
        if (user) {
            this.setState({
                user: user,
                login: user.login,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                birthday: user.birthday,
                country: user.country,
                city: user.city
            });
        }
    }

    async loadAllowedCountries() {
        let countries = await this.configService
            .getAllowedCountries()
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
                return [];
            })
            .catch(error => {
                console.log("Loading is not completed");
                return [];
            });

        this.setState({ countries: countries });
    }

    updateField(event) {
        this.setState(
            { [event.target.name] : event.target.value },
            () => this.validateFields());
    }

    validateFields() {
        let login = this.state.login.trim();
        let email = this.state.email.trim();
        let isLoginValid = true;
        let isEmailValid = true;
        if (!login || login.length < 3 || login.length > 25) {
            isLoginValid = false;
        }
        if (!email.match(/^([\w\W]+)@([\w\W]+\.)+([\w]{2,})$/i)) {
            isEmailValid = false;
        }

        this.setState({
            isLoginValid: isLoginValid,
            isEmailValid: isEmailValid,
        });
    }
    
    changeFields(event) {
        event.preventDefault();

        this.setState({
            fieldsReadOnly: false,
        });
    }

    closeChanging() {
        this.setState({
            fieldsReadOnly: true,
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            email: this.state.user.email,
            birthday: this.state.user.birthday,
            country: this.state.user.country,
            city: this.state.user.city,
        },
        () => {
            let timer = setTimeout(() => this.setState({ snackbarOpen: false}), 3000);
            this.timers.push(timer);
        });
    }

    async updateUser(event) {
        event.preventDefault();
        this.setState({
            saving: true,
            snackbarOpen: false
        });
        
        let payload = {
            'userId': this.userId,
            'login': this.state.login,
            'email': this.state.email,
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'birthday': this.state.birthday,
            'country': this.state.country,
            'city': this.state.city
        }

        let errorMessage = 'Erorr';
        let user = await this.userService
            .updateUser(payload)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
                return null;
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    errorMessage = error.response.data.message;
                }
                console.log(error);
                return null;
            })

        if (!user) {
            let timer = setTimeout(() => this.setState({
                saving: false,
                savingStatus: errorMessage,
                snackbarOpen: true
            }), 1000);
            this.timers.push(timer);
            return;
        }

        this.authService.updateCurrentUser();
        
        let timer = setTimeout(() => {
            this.setState({
                user: user,
                fieldsReadOnly: true,
                saving: false,
                savingStatus: 'Saved',
                snackbarOpen: true
            });
            let timer = setTimeout(() => this.setState({ snackbarOpen: false }), 3000);
            this.timers.push(timer);
        }, 1000);
        this.timers.push(timer);
    }
}

export default withStyles(styles)(UserProfile);