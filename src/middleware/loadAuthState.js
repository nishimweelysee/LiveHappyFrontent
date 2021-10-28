import {LOGIN_SUCCESS} from '../redux/user/user.types'
import { authenticatedUser } from '../redux/user/loadState'

const LoadFromLocalStorage = () => new Promise((resolve, reject) => {
    const userInfo = localStorage.getItem('user');
    if(userInfo)
        if (userInfo!=='undefined') {
            authenticatedUser(JSON.parse(userInfo),LOGIN_SUCCESS);
            return resolve();
        }
    return resolve();
});
export default LoadFromLocalStorage;
