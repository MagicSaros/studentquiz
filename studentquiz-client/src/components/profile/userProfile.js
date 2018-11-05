import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import UserService from './../../services/userService';
import { withStyles, Typography } from '@material-ui/core';

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
        width: '40%'
    }
});

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            user: null
        }
        this.userService = new UserService();
    }

    render() {
        const { classes } = this.props;

        if (!this.state.user) {
            return (<div>User not found</div>);
        }
        return (
            <div>
                <Typography variant='h3' >
                    Profile
                </Typography>
                <Paper className={classes.root}>
                    <Typography variant='h4' align='left'>
                        {this.state.user.login}
                    </Typography>
                    <Typography variant='body1' align='left'>
                        {this.state.user.firstName} {this.state.user.lastName}
                    </Typography>
                    <Typography variant='body1' align='left'>
                        {this.state.user.email}
                    </Typography>
                </Paper>
            </div>
        );
    }

    async componentDidMount() {
        let userId = this.state.userId ? this.state.userId: '';
        let user = await this.userService
            .getUser(userId)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
                return null;
            });
        this.setState({ user: user });
    }
}

export default withStyles(styles)(UserProfile);