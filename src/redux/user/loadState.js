import store from '../store';

export const authenticatedUser =  (data,type) => {
    store.dispatch({type,data});
};

export const saveRate=(type,rate)=>{
    store.dispatch({type,rate})
}
