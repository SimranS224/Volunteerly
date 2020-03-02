import { combineReducers } from 'redux';
import userReducer from './userReducer';

const mainReducer = combineReducers(Object.assign({ 
  userReducer
}));

export default mainReducer;