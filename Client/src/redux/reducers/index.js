import { combineReducers } from 'redux';
import songReducer from './songReducer';

const rootReducer = combineReducers({
    songs: songReducer,
});

export default rootReducer;