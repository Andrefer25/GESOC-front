import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const loggedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render= { props => (
        (localStorage.getItem('user') && localStorage.getItem('role')) 
            ? <Redirect to={{ pathname: '/', state: { from: props.location } }} /> : 
            <Component {...props} />
    )} />
)