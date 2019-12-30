import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import monthReducer from './monthReducer';
import userReducer from './userReducer';
import testReducer from './testReducer';
import hoursReducer from './hoursReducer';

const rootReducer = combineReducers({
  years: monthReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  user: userReducer,
  hours: hoursReducer,
  //tests: testReducer,
});

export default rootReducer;
