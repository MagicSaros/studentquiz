import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles'

import AuthService from './../../services/authService';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    },
    wrapper: {
        position: 'relative'
    }
});

class PasswordChanger extends Component {
    constructor(props) {
        super(props);
        this.state ={
            oldPassword: '',
            newPassword: '',
            repeatedPassword: '',
            isOldPasswordValid: true,
            isNewPasswordValid: true,
            isPasswordRepeated: true,
            isSubmitDisabled: true,
            savingStatus: 'Saved',
            errorMessages: {
                oldPassword: ' ',
                newPassword: ' ',
                repeatedPassword: ' '
            },
            snackbarOpen: false,
            saving: false
        }
        this.userId = this.props.userId;
        this.timers = [];
        this.authService = new AuthService();
        this.changePassword = this.changePassword.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form>
                    <Grid container justify='center'>
                        <Grid item xs={4}>
                            <FormControl margin="normal" fullWidth>
                                <TextField
                                    id="oldPassword"
                                    name="oldPassword"
                                    label="Old password"
                                    type="password"
                                    value={this.state.oldPassword}
                                    onChange={this.updateField}
                                    error={!this.state.isOldPasswordValid}
                                    helperText={this.state.errorMessages.oldPassword}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <TextField
                                    id="newPassword"
                                    name="newPassword"
                                    label="New password"
                                    type="password"
                                    value={this.state.newPassword}
                                    onChange={this.updateField}
                                    error={!this.state.isNewPasswordValid}
                                    helperText={this.state.errorMessages.newPassword}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <TextField
                                    id="repeatedPassword"
                                    name="repeatedPassword"
                                    label="Repeat password"
                                    type="password"
                                    value={this.state.repeatedPassword}
                                    onChange={this.updateField}
                                    error={!this.state.isPasswordRepeated}
                                    helperText={this.state.errorMessages.repeatedPassword}
                                />
                            </FormControl>
                            <div className={classes.wrapper}>
                                <Button
                                    type='button'
                                    variant='contained'
                                    color='primary'
                                    className={classes.button}
                                    onClick={this.changePassword}
                                    disabled={this.state.isSubmitDisabled}
                                >
                                    Save
                                </Button>
                                {this.state.saving && <CircularProgress size={24} className={classes.progress} />}
                            </div>
                        </Grid>
                    </Grid>
                </form>

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
        )
    }
    componentWillUnmount() {
        this.timers.map(timer => clearTimeout(timer));
    }

    updateField(event) {
        this.setState(
            { [event.target.name]: event.target.value },
            () => this.validatePasswords()
        );
    }

    validatePasswords() {
        let oldPassword = this.state.oldPassword.trim();
        let newPassword = this.state.newPassword.trim();
        let repeatedPassword = this.state.repeatedPassword.trim();
        let isOldPasswordValid = true;
        let isNewPasswordValid = true;
        let isPasswordRepeated = true;
        let oldPasswordMessage = ' ';
        let newPasswordMessage = ' ';
        let repeatedPasswordMessage = ' ';

        if (oldPassword && (oldPassword.length < 6 || oldPassword.length > 30)) {
            isOldPasswordValid = false;
            oldPasswordMessage = 'Invalid password: 6-30 characters required';
        }

        if (newPassword && (newPassword.length < 6 || newPassword.length > 30)) {
            isNewPasswordValid = false;
            newPasswordMessage = 'Invalid password: 6-30 characters required';
        }

        if (newPassword !== repeatedPassword) {
            isPasswordRepeated = false;
            repeatedPasswordMessage = 'Password doesn\'t match';
        }

        let isSubmitDisabled = !isOldPasswordValid || !isNewPasswordValid || !isPasswordRepeated;

        if (!oldPassword || !newPassword || !repeatedPassword) {
            isSubmitDisabled = true;
        }

        this.setState({
            isOldPasswordValid: isOldPasswordValid,
            isNewPasswordValid: isNewPasswordValid,
            isPasswordRepeated: isPasswordRepeated,
            isSubmitDisabled: isSubmitDisabled,
            errorMessages: {
                oldPassword: oldPasswordMessage,
                newPassword: newPasswordMessage,
                repeatedPassword: repeatedPasswordMessage
            }
        })
    }

    async changePassword(event) {
        event.preventDefault();

        this.setState({
            isSubmitDisabled: true,
            snackbarOpen: false,
            saving: true
        });

        let payload = {
            "userId": this.userId,
            "oldPassword": this.state.oldPassword,
            "newPassword": this.state.newPassword
        }
        console.log(payload);

        let savingStatus = 'Saved';

        let isSuccessful = await this.authService
            .changePassword(payload)
            .then(response => {
                if (response.status === 200) {
                    return true;
                }
                return false;
            })
            .catch(error => {
                if (error.response) {
                    savingStatus = error.response.data.message;
                } else {
                    savingStatus = 'Unexpected error';
                }
                return false;
            });

        if (!isSuccessful) {
            let timer = setTimeout(() => this.setState({
                isSubmitDisabled: false,
                snackbarOpen: true,
                saving: false,
                savingStatus: savingStatus  
            }), 1000);
            this.timers.push(timer);
            return;
        }

        let timer = setTimeout(() => {
            this.setState({
                oldPassword: '',
                newPassword: '',
                repeatedPassword: '',
                isSubmitDisabled: false,
                snackbarOpen: true,
                saving: false,
                savingStatus: savingStatus
            });
            let timer = setTimeout(() => this.setState({ snackbarOpen: false }), 3000);
            this.timers.push(timer);
        }, 1000);
        this.timers.push(timer);
    }
}

export default withStyles(styles)(PasswordChanger);