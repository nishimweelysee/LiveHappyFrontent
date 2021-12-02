import {logoutAction} from "../../redux/user/user.actions";
import {LOGOUT_SUCCESS} from "../../redux/user/user.types";
import React from "react";

export const handleLogout = ()=>{
    logoutAction(LOGOUT_SUCCESS)
    window.location.href="/"
}
