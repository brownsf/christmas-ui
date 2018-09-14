import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import Main from './containers/';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Main />
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
