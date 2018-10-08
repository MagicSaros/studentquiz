import React, { Component } from 'react';

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
                                <input type='radio' id={i} name={this.state.question.text} value={option} onClick={event => this.onChange(event)} />
                                <label htmlFor={i}>
                                    <Option option={option}/>
                                </label>
                            </div>
                        );
                    })
                }
                <hr/>
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