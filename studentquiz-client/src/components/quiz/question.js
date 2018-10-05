import React from 'react';

import Option from './option';

export default function Question({question}) {
    return (
        <ul>
            <b>{question.text}</b>
            <br/>
            {
                Object.keys(question.options).map((option, i) => {
                    return (
                        <li key={i}>
                            <Option option={option}/>
                        </li>
                    );
                })
            }
            <hr/>
        </ul>
    );
};