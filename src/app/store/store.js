import {
  applyMiddleware,
  createStore,
  combineReducers,
  compose,
} from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

const rootReducer = combineReducers({
  ...reducers,
});

/* eslint-disable no-underscore-dangle */
const enhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

export default createStore(
  rootReducer,
  enhancer
);
