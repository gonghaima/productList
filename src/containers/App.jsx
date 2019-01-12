import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import history from 'modules/history';
import theme from 'modules/theme';

import config from 'config';

import Home from 'routes/Home';
import NotFound from 'routes/NotFound';

// import SystemAlerts from 'containers/SystemAlerts';

import GlobalStyles from 'components/GlobalStyles';
import RoutePrivate from 'components/RoutePrivate';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const Main = styled.main`
  min-height: 100vh;
`;

export class App extends React.Component {
  static propTypes = {};

  // componentWillReceiveProps(nextProps) {
  //   /* istanbul ignore else */
  //   // if (changedTo('user.isAuthenticated', true)) {
  //   //   // dispatch(showAlert('Hello! And welcome!', { variant: 'success', icon: 'bell' }));
  //   // }
  // }

  render() {
    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <Helmet
              defer={false}
              htmlAttributes={{ lang: 'pt-br' }}
              encodeSpecialCharacters={true}
              defaultTitle={config.title}
              titleTemplate={`%s | ${config.name}`}
              titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
            />
            <Main>
              <Switch>
                <RoutePrivate path="/" component={Home} />
                <Route component={NotFound} />
              </Switch>
            </Main>
            <GlobalStyles />
          </AppWrapper>
        </ThemeProvider>
      </Router>
    );
  }
}

export default connect()(App);
