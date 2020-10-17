import React from 'react';
import Login from './Login';
import Register from './Register';
import Site from './Site';
import { Router, Switch, Redirect } from 'react-router-dom';
import { history } from '../helpers/history';
import { PrivateRoute, LoggedRoute } from './../_components';

import './../assets/css/App.css';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <LoggedRoute path="/login" component={Login}/>
        <LoggedRoute path="/register" component={Register}/>
        <PrivateRoute path="/" component={Site}/>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
