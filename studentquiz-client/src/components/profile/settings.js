import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles, Typography } from '@material-ui/core';

import UserService from './../../services/userService';
import AuthService from './../../services/authService';
import ConfigService from './../../services/configService';
import PasswordChanger from './passwordChanger';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: theme.spacing.unit * 3,
        width: '80%'
    },
});

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.userId = this.props.match.params.userId;
        this.timers = [];
        this.userService = new UserService();
    }

    render() {
        const { classes } = this.props;

        if (!this.state.user) {
            return (<div>User not found</div>);
        }

        return(
            <div>
                <Typography variant='h3' >
                    Profile
                </Typography>
                <Paper className={classes.root}>
                    <Typography variant='subtitle1' align='center' className={classes.subtitle}>
                        Change password
                    </Typography>
                    <PasswordChanger userId={this.userId} />
                </Paper>
            </div>
        );
    }

    componentDidMount() {
        this.loadUser();
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
                user: user
            });
        }
    }
}

export default withStyles(styles)(Settings);