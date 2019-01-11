import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const RoutePrivate = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

RoutePrivate.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default RoutePrivate;
