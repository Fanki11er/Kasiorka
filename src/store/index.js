import { createStore } from 'redux';
import monthReducer from '../reducers/index';

const store = createStore(
  monthReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
