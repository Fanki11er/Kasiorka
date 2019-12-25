import { combineReducers } from 'redux';
import authReducer from './authReducer';
import monthReducer from './monthReducer';

const rootReducer = combineReducers({
  months: monthReducer,
  auth: authReducer,
});

export default rootReducer;
