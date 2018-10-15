import React, { Component } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Divider from '@material-ui/core/Divider';

import Option from './option';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            selectedOption: ''
        };
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div>
                <b>{this.state.question.text}</b>
                <br/>
                {
                    Object.keys(this.state.question.options).map((option, i) => {
                        return (
                            <div key={i}>
                                <RadioGroup name={this.state.question.text} value={this.state.selectedOption} onChange={this.onChange}>
                                    <FormControlLabel
                                        label={<Option option={option} />}
                                        value={option}
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </div>
                        );
                    })
                }
                <Divider />
            </div>
        );
    }

    onChange(event) {
        this.setState(
            { selectedOption: event.target.value },
            () => this.props.onChange(this.state)
        );
    }
};