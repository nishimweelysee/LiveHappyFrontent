import { combineReducers } from 'redux';


import userReducer from './user/user.reducer';
import counterReducer from './counter/counter.reducer';


const rootReducer = combineReducers({
    user: userReducer,
    counter: counterReducer,
});

export default rootReducer;
