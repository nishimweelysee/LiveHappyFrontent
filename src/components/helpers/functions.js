import {logoutAction} from "../../redux/user/user.actions";
import {LOGOUT_SUCCESS} from "../../redux/user/user.types";
import {decodeToken} from "../../config/decodeToken";

export const handleLogout = ()=>{
    logoutAction(LOGOUT_SUCCESS)
    window.location.href="/"
}

export  const redirectUser = ()=>{
    let role = decodeToken();
    switch (role) {
        case "ROLE_ADMIN":
            window.location.href="/admin";
            break;
        case "ROLE_LANDLORD":
            window.location.href="/landlord";
            break;
        case "ROLE_TENANT":
             window.location.href="/tenant";
            break;
        case "ROLE_COMMISSIONER":
            window.location.href="/commissioner";
            break;
        default:
            window.location.href="/";
    }
}
