import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import CrossIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import Options from './options';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            text: '',
            options: [],
            edit: false,
            expand: false,
            editButtonDisabled: false,
            isValid: true,
            areOptionsValid: true
        };
        this.updateField = this.updateField.bind(this);
        this.validate = this.validate.bind(this);
        this.turnEditing = this.turnEditing.bind(this);
        this.turnCollapsing = this.turnCollapsing.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify="center" direction="row" alignItems="center" className={classes.question}>
                    <Grid item md={1} xs={1}>
                        <Typography variant="h5" align="right">
                            {this.state.index + 1}
                        </Typography>
                    </Grid>
                    <Grid item md={7} xs={11}>
                        <FormControl fullWidth>
                            <TextField
                                id="text"
                                name="text"
                                variant={!this.state.edit ? 'outlined' : 'standard'}
                                value={this.state.text}
                                onChange={this.updateField}
                                InputProps={{
                                    readOnly: !this.state.edit
                                }}
                                error={!this.state.isValid}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={1} xs={2}>
                        <Button variant="fab" onClick={this.turnCollapsing} title={this.state.expand ? 'Hide options' : 'Show options'}>
                            {this.state.expand ? <ExpandLess /> : <ExpandMore />}
                        </Button>
                    </Grid>
                    <Grid item container md={3} xs={10} justify='space-between' spacing={8}>
                        <Grid item>
                            <Button
                                variant="fab"
                                onClick={this.turnEditing}
                                title={this.state.edit ? 'Save changes' : 'Edit question'}
                                disabled={!this.state.isValid || !this.state.areOptionsValid}
                            >
                                {this.state.edit ? <SaveIcon /> : <EditIcon />}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="fab" color="secondary" onClick={this.removeQuestion} title="Remove question">
                                <CrossIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
                    <Options
                        edit={this.state.edit}
                        options={this.state.options}
                        onChange={this.getOptions}
                    />
                </Collapse>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            index: this.props.index,
            text: this.props.question.text,
            options: this.props.question.options
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            index: props.index,
            text: props.question.text,
            options: props.question.options
        });
    }

    updateField(event) {
        this.setState({ [event.target.name] : event.target.value }, this.validate);
    }

    validate() {
        if (!this.state.text.trim()) {
            this.setState({ isValid: false });
        } else {
            this.setState({ isValid: true });
        }
    }

    getOptions(options) {
        let editButtonDisabled = this.state.editButtonDisabled;
        
        if (options.length < 2 || options.length > 10) {
            editButtonDisabled = true;
        }

        let areOptionsValid = !options.some(option => !option.isValid)

        this.setState({
            options: options,
            areOptionsValid: areOptionsValid,
            editButtonDisabled: editButtonDisabled
        });
    }

    turnCollapsing() {
        this.setState({ expand: !this.state.expand });
    }

    turnEditing() {
        this.setState({ edit: !this.state.edit }, this.updateQuestion);
    }

    removeQuestion() {
        this.props.onDelete(this.state.index);
        this.setState({ edit: false, isValid: true });
    }

    updateQuestion() {
        this.props.onChange({
            index: this.state.index,
            text: this.state.text,
            options: this.state.options,
            isValid: this.state.isValid && this.state.areOptionsValid,
            edit: this.state.edit
        });
    }
}

export default withStyles(styles)(Question);