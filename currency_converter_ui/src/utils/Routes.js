import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import NotFound404 from '../pages/NotFound404';
import Dashboard from '../pages/Dashboard';
import Purchases from '../pages/Purchases';
import PrivateRoute from './PrivateRoute';

import Login from '../pages/Login';

function Routes() {
  const regex = new RegExp("(?=.*[%#-'^{}.$;*`´@!()])");
  if (regex.test(window.location.href)) history.push('/');

  return (
    <Switch>
      <Route path="/NotFound404" component={NotFound404} />
      <Route path="/login" component={Login} />
      <Redirect from="/" exact to="/dashboard" />
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/purchases" exact component={Purchases} />
      <Route path="*" exact component={NotFound404} />
    </Switch>
  );
}

export default Routes;
