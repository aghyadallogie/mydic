import { combineReducers } from 'redux';
import authReducer from './authReducer';
import translateReducer from './translateReducer';

export default combineReducers({
    auth: authReducer,
    translate: translateReducer
});