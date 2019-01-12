// Polyfills
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from 'store/index';

import App from 'containers/App';
import Loader from 'components/Loader';

export const app = {
  cssRetries: 0,
  fetchRetries: 0,

  run() {
    this.render(App);
  },
  render(Component) {
    const root = document.getElementById('react');

    /* istanbul ignore next */
    if (root) {
      ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <PersistGate loading={<Loader size={100} block />} persistor={persistor}>
              <Component />
            </PersistGate>
          </Provider>
        </AppContainer>,
        root,
      );
    }
  },
};

app.run();

/* istanbul ignore next  */
if (module.hot) {
  module.hot.accept('containers/App', () => app.render(App));
}
