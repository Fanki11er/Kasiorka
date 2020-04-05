import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import rootReducer from './reducers/rootReducer';
import firebase, { dataBase } from '../firebase/firebaseConfig';
import endPoints from '../firebase/dataBaseEndPoints';

const store = createStore(
  rootReducer,
  compose(
    reduxFirestore(firebase),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, dataBase, endPoints })),
    /*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),*/
  ),
);

export default store;
