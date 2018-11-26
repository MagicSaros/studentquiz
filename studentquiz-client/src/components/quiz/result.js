import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ResultView({ location }) {
    if (!location.state) {
        return (<div>No content</div>);
    }

    let result = location.state.result;
    let percentage = result.percentage;
    let color = '';
    let status = result.success ? (color = '#0f0', 'succes') : (color = '#f00', 'failure');

    return (
        <div>
            <Typography>
                Your result is {percentage}%
            </Typography>
            <Typography>
                Status: <span style={{ color: color }}>{status}</span>
            </Typography>
        </div>
    );
} 