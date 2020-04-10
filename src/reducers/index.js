import {combineReducers} from 'redux';
import authReducer from './auth';
import streakReducer from './streak';
import paletteReducer from "./palette";

export default combineReducers({
    auth: authReducer,
    streak: streakReducer,
    palette: paletteReducer
});
