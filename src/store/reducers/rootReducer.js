import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import userReducer from './userReducer';
import hoursReducer from './hoursReducer';
import errorsReducer from './errorsReducer';
import moneyReducer from './moneyReducer';
import prevYearReducer from './prevYearReducer';
import testReducer from './testReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  user: userReducer,
  hours: hoursReducer,
  errors: errorsReducer,
  money: moneyReducer,
  prevYearData: prevYearReducer,
  tests: testReducer,
});

export default rootReducer;
