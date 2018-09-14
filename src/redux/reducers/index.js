import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './usersReducer';

export default combineReducers({
  routing: routerReducer,
  userReducer,
});
