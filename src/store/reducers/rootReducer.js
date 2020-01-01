import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import userReducer from './userReducer';
//import testReducer from './testReducer';
import hoursReducer from './hoursReducer';
import errorsReducer from './errorsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  user: userReducer,
  hours: hoursReducer,
  errors: errorsReducer,
  //tests: testReducer,
});

export default rootReducer;
