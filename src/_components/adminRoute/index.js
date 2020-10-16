import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const adminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render= { props => (
        (localStorage.getItem('user') && localStorage.getItem('role') === "admin") 
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)