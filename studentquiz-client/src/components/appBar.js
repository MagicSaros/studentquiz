import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
  };

class TopAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            isUserLogged: false
        };
        this.showHome = this.showHome.bind(this);
        this.showQuizzesList = this.showQuizzesList.bind(this);
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        let buttonName = this.state.isUserLogged ? 'Logout' : 'Login';
        let buttonHref = this.state.isUserLogged ? '/logout' : '/login';

        return (
            <AppBar position='static' style={styles.root}>
                <Toolbar>
                    <IconButton
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        color='inherit'
                        style={styles.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.showHome}>Home</MenuItem>
                        <MenuItem onClick={this.showQuizzesList}>Quizzes</MenuItem>
                    </Menu>
                    <Typography variant='h6' color='inherit' style={styles.grow}>
                        Student Quiz
                    </Typography>
                    <Button color="inherit" href={buttonHref}>{buttonName}</Button>
                </Toolbar>
            </AppBar>
        );
    }

    componentDidMount() {
        let userAsJson = localStorage.getItem('current_user');
        let user = userAsJson ? JSON.parse(userAsJson) : null;

        if (user) {
            this.setState({ isUserLogged: true });
        }
    }

    showHome() {
        this.setState(
            { anchorEl: null },
            () => this.props.history.push('/')
        );
    }

    showQuizzesList() {
        this.setState(
            { anchorEl: null },
            () => this.props.history.push('/quizzes')
        );
    }
}

export default TopAppBar;