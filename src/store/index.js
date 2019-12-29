import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import rootReducer from './reducers/rootReducer';
import firebase, { dataBase } from '../firebase/firebaseConfig';

const store = createStore(
  rootReducer,
  compose(
    reduxFirestore(firebase),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, dataBase })),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
