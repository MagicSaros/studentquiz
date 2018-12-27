import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BackIcon from '@material-ui/icons/ArrowBack'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import QuizzesIcon from '@material-ui/icons/AssignmentTurnedIn';
import ListIcon from '@material-ui/icons/List'
import AddIcon from '@material-ui/icons/Create';
import ResultsIcon from '@material-ui/icons/Assessment';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import SettingsIcon from '@material-ui/icons/Settings';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 5,
    }
});

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isMenuOpen: false,
            isUserLogged: false,
            isAccountSubMenuOpen: false,
            isQuizzesSubMenuOpen: false
        };
        this.showHome = this.showHome.bind(this);
        this.showQuizzesList = this.showQuizzesList.bind(this);
        this.showQuizzCreation = this.showQuizzCreation.bind(this);
        this.showUserProfile = this.showUserProfile.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.showUserResults = this.showUserResults.bind(this);
        this.showUserSettings = this.showUserSettings.bind(this);
        this.goBack = this.goBack.bind(this);
        this.expandAccountSubMenu = this.expandAccountSubMenu.bind(this);
        this.expandQuizzesSubMenu = this.expandQuizzesSubMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleDrawerOpen() {
        this.setState({ isMenuOpen: true });
    };

    handleDrawerClose() {
        this.setState({
            isMenuOpen: false,
            isAccountSubMenuOpen: false,
            isQuizzesSubMenuOpen: false
        });
    };
    

    render() {
        const { classes } = this.props;

        return (
            <div>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.isMenuOpen && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={!this.state.isMenuOpen} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.isMenuOpen && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon />
                            </IconButton>
                            <IconButton color="inherit" onClick={this.goBack} title="Back">
                                <BackIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                            >
                                Student quiz
                            </Typography>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.isMenuOpen && classes.drawerPaperClose),
                        }}
                        open={this.state.isMenuOpen}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button onClick={this.expandAccountSubMenu}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Account"/>
                                {this.state.isAccountSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.isAccountSubMenuOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button onClick={this.showUserProfile} className={classes.nested}>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Profile"/>
                                    </ListItem>
                                    <ListItem button onClick={this.showUserResults} className={classes.nested}>
                                        <ListItemIcon>
                                            <ResultsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Results"/>
                                    </ListItem>
                                    <ListItem button onClick={this.showUserSettings} className={classes.nested} disabled>
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Settings" />
                                    </ListItem>
                                    <ListItem button onClick={this.logout} className={classes.nested}>
                                        <ListItemIcon>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                </List>
                            </Collapse>

                            <ListItem button onClick={this.expandQuizzesSubMenu}>
                                <ListItemIcon>
                                    <QuizzesIcon />
                                </ListItemIcon>
                                <ListItemText primary="Quizzes" />
                                {this.state.isQuizzesSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.isQuizzesSubMenuOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button onClick={this.showQuizzesList} className={classes.nested}>
                                        <ListItemIcon>
                                            <ListIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="All quizzes"/>
                                    </ListItem>
                                    <ListItem button onClick={this.showQuizzCreation} className={classes.nested}>
                                        <ListItemIcon>
                                            <AddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Create"/>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let userAsJson = localStorage.getItem('current_user');
        let user = userAsJson ? JSON.parse(userAsJson) : null;

        if (user) {
            this.setState({
                user: user,
                isUserLogged: true
            });
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

    showQuizzCreation() {
        this.setState(
            { anchorEl: null },
            () => this.props.history.push('/quizzes/creation')
        );
    }

    showUserProfile() {
        let userAsJson = localStorage.getItem('current_user');
        let user = JSON.parse(userAsJson);
        this.setState(
            { anchorEl: null },
            () => this.props.history.push(`/users/${user.userId}`)
        );
    }

    showUserResults() {
        this.props.history.push(`/users/${this.state.user.userId}/results`)
    }

    showUserSettings() {
        this.props.history.push(`/users/${this.state.user.userId}/settings`)
    }

    goBack() {
        this.props.history.goBack();
    }

    expandAccountSubMenu() {
        this.setState({
            isAccountSubMenuOpen: !this.state.isAccountSubMenuOpen,
            isMenuOpen: true
        });
    }

    expandQuizzesSubMenu() {
        this.setState({
            isQuizzesSubMenuOpen: !this.state.isQuizzesSubMenuOpen,
            isMenuOpen: true
        });
    }

    logout() {
        this.props.history.push('/logout');
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Navbar));