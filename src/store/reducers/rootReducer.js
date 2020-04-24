import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import userReducer from './userReducer';
import hoursReducer from './hoursReducer';
import errorsReducer from './errorsReducer';
import moneyReducer from './moneyReducer';
import prevYearReducer from './prevYearReducer';

const appReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  user: userReducer,
  hours: hoursReducer,
  errors: errorsReducer,
  money: moneyReducer,
  prevYearData: prevYearReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT SUCCESS') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
