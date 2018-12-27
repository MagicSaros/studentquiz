import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core';

import Option from './option';

const styles = theme => ({
    options: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%'
    },
    subtitle: {
        margin: theme.spacing.unit * 2
    },
    addButton: {
        marginBottom: theme.spacing.unit * 2
    },
});

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            isValid: true,
            edit: false,
            addButtonDisabled: false
        };
        this.addOption = this.addOption.bind(this);
        this.getOption = this.getOption.bind(this);
        this.removeOption = this.removeOption.bind(this);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="subtitle2" align="center" className={classes.subtitle}>
                    Options
                </Typography>
                <List component="div" disablePadding className={classes.options}>
                    {
                        this.state.options
                            .map((option, i) => (
                                <ListItem key={i} className={classes.nested}>
                                    <Option
                                        index={i}
                                        option={option}
                                        edit={this.state.edit}
                                        onChange={this.getOption}
                                        onDelete={this.removeOption}
                                    />
                                </ListItem>
                            ))
                    }
                </List>
                <Grid container justify="center">
                    <Grid item>
                        <Button
                            className={classes.addButton}
                            variant="fab"
                            onClick={this.addOption}
                            mini={true}
                            disabled={!this.state.edit || this.state.addButtonDisabled}
                            title="Add option"
                        >
                            <AddIcon />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            edit: this.props.edit,
            options: this.props.options
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            edit: props.edit,
            options: props.options
        });
    }

    addOption() {
        let options = this.state.options;
        let addButtonDisabled = this.state.addButtonDisabled

        if (options.length < 10) {
            options.push({
                text: 'Option',
                isRight: false
            });
        }

        if (options.length >= 10) {
            addButtonDisabled = true;
        } else {
            addButtonDisabled = false;
        }

        this.setState(
            {
                options: options,
                addButtonDisabled: addButtonDisabled
            },
            this.updateOptions
        );
    }

    removeOption(index) {
        let options = this.state.options;

        if (options.length > 2) {
            options.splice(index, 1);
        }

        this.setState(
            {
                options: options,
                addButtonDisabled: false
            },
            this.updateOptions
        );
    }

    getOption(option) {
        let options = this.state.options;

        if (option.isRight) {
            options.forEach(option => option.isRight = false);
        }
        if (options[option.index].isRight && !option.isRight) {
            option.isRight = true;
        }

        options[option.index] = {
            text: option.text,
            isRight: option.isRight,
            isValid: option.isValid
        };

        this.setState(
            { options: options },
            this.updateOptions
        );
    }

    updateOptions() {
        this.props.onChange(this.state.options);
    }
}

export default withStyles(styles)(Options);