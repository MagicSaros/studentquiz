import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
const styles = theme => ({
    root: {
    },
});

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div>
                No content
            </div>
        );
    }
}

export default withStyles(styles)(Settings);