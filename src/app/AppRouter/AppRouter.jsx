import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import routes from './routes';

const AppRouter = ({ children }) => (
  <Router>
    {children}

    <Switch>
      {routes.map((routeConfig) => {
        const { path, key, ...nativeProps } = routeConfig;

        return (
          <Route key={key} path={path} {...nativeProps} />
        );
      })}
    </Switch>
  </Router>
);

AppRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppRouter;
