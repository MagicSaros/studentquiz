import React from 'react';
import { Route, Redirect } from 'react-router-dom';

let PrivateRoute = ({component: Component, ...rest }) => {
    let user = localStorage.getItem('current_user');
    return (
        <Route {...rest} render={
            props => (
                user ?
                    <Component {...props} />
                    :
                    <Redirect to='login'/>
            )
        } />
    )
};

export default PrivateRoute;