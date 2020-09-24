import React from 'react';
import Login from './Login';
import Register from './Register';
import Site from './Site';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from '../helpers/history';
import { PrivateRoute } from './../_components/privateRoute';

import './../assets/css/App.css';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <PrivateRoute path="/" component={Site}/>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
