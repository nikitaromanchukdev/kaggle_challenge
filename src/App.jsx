import React from 'react';
import { Provider } from 'react-redux';

import Header from 'components/Header/Header';
import AppRouter from 'app/AppRouter/AppRouter';
import store from 'app/store/store';

const App = () => (
  <Provider store={store}>
    <AppRouter>
      <Header />
    </AppRouter>
  </Provider>

);

export default App;
