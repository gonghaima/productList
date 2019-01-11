import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import treeChanges from 'tree-changes';

import history from 'modules/history';
import theme from 'modules/theme';

import config from 'config';

import Private from 'routes/Private';
import NotFound from 'routes/NotFound';

import SystemAlerts from 'containers/SystemAlerts';

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
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { changedTo } = treeChanges(this.props, nextProps);

    /* istanbul ignore else */
    if (changedTo('user.isAuthenticated', true)) {
      // dispatch(showAlert('Hello! And welcome!', { variant: 'success', icon: 'bell' }));
    }
  }

  render() {
    const { user } = this.props;

    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppWrapper logged={user.isAuthenticated}>
            <Helmet
              defer={false}
              htmlAttributes={{ lang: 'pt-br' }}
              encodeSpecialCharacters={true}
              defaultTitle={config.title}
              titleTemplate={`%s | ${config.name}`}
              titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
            />
            <Main isAuthenticated={user.isAuthenticated}>
              <Switch>
                <RoutePrivate isAuthenticated={true} path="/" component={Private} />
                <Route component={NotFound} />
              </Switch>
            </Main>
            <SystemAlerts />
            <GlobalStyles />
          </AppWrapper>
        </ThemeProvider>
      </Router>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
