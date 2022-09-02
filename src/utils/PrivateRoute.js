import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js';

import LayoutBase from '../components/layoutBaseComponents/LayoutBase';
import Preloader from '../components/loader/Preloader';

function PrivateRoute(props) {
  const { component, ...rest } = props;
  const { loadingAuth, isAuthenticated } = useContext(AuthContext);

  if (loadingAuth) return <Preloader />;

  if (!isAuthenticated) {
    if (rest.location.pathname && rest.location.pathname !== '/') {
      return (
        <Redirect
          to={`/login?redirect=${
            rest.location.pathname + rest.location.search
          }`}
        />
      );
    } else return <Redirect to={`/login`} />;
  } else {
    return <Route {...rest} render={() => <LayoutBase Page={component} />} />;
  }
}

export default PrivateRoute;
