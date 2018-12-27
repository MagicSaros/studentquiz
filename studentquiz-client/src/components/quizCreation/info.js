import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            categoryId: '',
            categories: [],
            threshold: 0,
            isNameValid: true,
            isCategoryValid: true,
            isThresholdValid: true
        };
        this.timers = [];
        this.updateField = this.updateField.bind(this);
        this.validate = this.validate.bind(this);
        this.updateQuizInfo = this.updateQuizInfo.bind(this);
    }

    render() {
        return (
            <div>
                <Typography variant="subtitle1">
                    Quiz info
                </Typography>
                <Grid container justify="center" direction="row" spacing={40}>
                    <Grid item xs={4}>
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="name"
                                name="name"
                                label="Quiz name"
                                variant="standard"
                                value={this.state.name}
                                onChange={this.updateField}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={!this.state.isNameValid}
                            />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="categoryId" shrink={true}>Category</InputLabel>
                            <Select
                                value={this.state.categoryId}
                                onChange={this.updateField}
                                inputProps={{
                                    name: 'categoryId',
                                    id: 'categoryId',
                                }}
                                error={!this.state.isCategoryValid}
                            >
                                {
                                    this.state.categories.map((category, i) =>
                                        <MenuItem key={i} value={category.id}>{category.name}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="threshold"
                                name="threshold"
                                label="Threshold"
                                type="number"
                                variant="standard"
                                value={this.state.threshold}
                                onChange={this.updateField}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">%</InputAdornment>
                                }}
                                error={!this.state.isThresholdValid}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        );
    }

    componentDidMount() {
        this.setState({ categories: this.props.categories });
        let timer = setTimeout(this.validate, 3000);
        this.timers.push(timer);
    }

    componentWillUnmount() {
        this.timers.map(timer => clearTimeout(timer));
    }

    componentWillReceiveProps(props) {
        this.setState({
            categories: props.categories,
        });
    }

    updateField(event) {
        this.setState(
            { [event.target.name] : event.target.value },
            this.validate
        );
    }

    validate() {
        let isNameValid = this.state.name.trim() ? true : false;
        let isCategoryValid = this.state.categoryId ? true : false;
        let isThresholdValid = this.state.threshold !== '' && this.state.threshold >= 0 && this.state.threshold <= 100;

        this.setState({
            isNameValid: isNameValid,
            isCategoryValid: isCategoryValid,
            isThresholdValid: isThresholdValid
        }, this.updateQuizInfo);
    }

    updateQuizInfo() {
        this.props.onChange({
            name: this.state.name,
            categoryId: this.state.categoryId,
            threshold: this.state.threshold,
            isValid: this.state.isNameValid && this.state.isCategoryValid && this.state.isThresholdValid
        });
    }
}

export default Info;