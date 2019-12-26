import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
import monthReducer from './monthReducer';

const rootReducer = combineReducers({
  years: monthReducer,
  auth: authReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
