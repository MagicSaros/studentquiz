import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            text: '',
            isRight: false,
            isValid: true,
            edit: false
        };
        this.updateField = this.updateField.bind(this);
        this.validate = this.validate.bind(this);
        this.changeOptionStatus = this.changeOptionStatus.bind(this);
        this.removeOption = this.removeOption.bind(this);
        this.updateOption = this.updateOption.bind(this);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify="space-between" alignItems="center">
                    <Grid item xs={8}>
                        <FormControl margin={this.state.edit ? "normal" : "none"} fullWidth>
                            <TextField
                                id="text"
                                name="text"
                                variant={this.state.edit ? "standard" : "outlined"}
                                value={this.state.text}
                                onChange={this.updateField}
                                InputProps={{
                                    readOnly: !this.state.edit
                                }}
                                error={!this.state.isValid}
                            />
                        </FormControl>
                    </Grid>
                    {this.state.edit ?
                        <Grid item xs={3}>
                            <FormControl>
                                <Button
                                    variant="fab"
                                    color={this.state.isRight ? 'primary' : 'default'}
                                    mini={true}
                                    onClick={this.changeOptionStatus}
                                    disabled={!this.state.edit}
                                    title={this.state.isRight ? 'Mark as wrong' : 'Mark as right'}
                                >
                                    <CheckIcon />
                                </Button>
                            </FormControl>
                        </Grid>
                        :
                        this.state.isRight ?
                            <Grid item xs={4}>
                                <CheckIcon />
                            </Grid>
                            :
                            ''
                    }
                    {this.state.edit ?
                        <Grid item xs={1}>
                            <Button
                                variant="fab"
                                color="secondary"
                                mini={true}
                                onClick={this.removeOption}
                                title='Remove option'
                            >
                                <ClearIcon />
                            </Button>
                        </Grid>
                        :
                        ''
                    }
                </Grid>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            index: this.props.index,
            text: this.props.option.text,
            isRight: this.props.option.isRight,
            edit: this.props.edit
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            index: props.index,
            text: props.option.text,
            isRight: props.option.isRight,
            edit: props.edit
        });
    }

    updateField(event) {
        this.setState({ [event.target.name] : event.target.value }, this.validate);
    }

    validate() {
        if (!this.state.text.trim()) {
            this.setState({ isValid: false }, this.updateOption);
        } else {
            this.setState({ isValid: true }, this.updateOption);
        }
    }

    changeOptionStatus() {
        this.setState({ isRight: !this.state.isRight }, this.updateOption);
    }

    removeOption() {
        if (!this.state.isRight) {
            this.props.onDelete(this.state.index);
        }
    }

    updateOption() {
        let option = {
            index: this.state.index,
            text: this.state.text,
            isRight: this.state.isRight,
            isValid: this.state.isValid
        };
        this.props.onChange(option);
    }
}

export default withStyles(styles)(Option);