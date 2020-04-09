import {combineReducers} from 'redux';
import authReducer from './auth';
import streakReducer from './streak';

export default combineReducers({
    auth: authReducer,
    streak: streakReducer
});
