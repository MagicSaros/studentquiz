import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Navbar from './../navigation/navbar';

let PrivateRoute = ({component: Component, ...rest }) => {
    let user = localStorage.getItem('current_user');
    return (
        <Route {...rest} render={
            props => (
                user ?
                    <Navbar>
                        <Component {...props} />
                    </Navbar>
                    :
                    <Redirect to='login'/>
            )
        } />
    )
};

export default PrivateRoute;