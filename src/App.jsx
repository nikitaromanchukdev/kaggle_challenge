import React, { Fragment } from 'react';

import Header from 'components/Header/Header';
import AppRouter from 'app/AppRouter/AppRouter';

const App = () => (
  <Fragment>
    <AppRouter>
      <Header />
    </AppRouter>
  </Fragment>
);

export default App;
