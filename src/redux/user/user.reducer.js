import {LOGIN_SUCCESS, LOGOUT_SUCCESS, RATE} from './user.types';


const INITIAL_STATE = {
    isLoggedIn:false,
    token:"",
    data:{},
    rate:""
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn:true,
                token:action.data.token,
                data:action.data.info
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn:false
            }
        case RATE:
            return {
                ...state,
                rate:action.rate
            }
        default: return state;
    }
};

export default reducer;
