import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import history from 'modules/history';
import theme, { appColor, titleColor } from 'modules/theme';

import config from 'config';

import Home from 'routes/Home';
import NotFound from 'routes/NotFound';

import GlobalStyles from 'components/GlobalStyles';
import RouteProduct from 'components/RouteProduct';

const AppWrapper = styled.div`
  display: flex;
  background-color: ${appColor};
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
  h3,
  h5 {
    color: ${titleColor};
  }
`;

const Main = styled.main`
  min-height: 100vh;
`;

export class App extends React.Component {
  static propTypes = {};

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
                <RouteProduct path="/" component={Home} />
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
