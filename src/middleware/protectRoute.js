import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {decodeToken} from "../config/decodeToken";

export default function ProtectedRoute({ component: Component, allowedRoles, ...rest }) {
    const { isLoggedIn } = useSelector((store) => store.user);
    const isAuthenticated = () => {
        if (isLoggedIn === true) {
            const role = decodeToken();
            return allowedRoles.indexOf(role) >= 0;

        }
        return false;
    };
    return (
        <Route
            {...rest}
            render={(props) => (
                isAuthenticated() === true
                    ? <Component {...props} />
                    : <Redirect to="/sign-in" />
            )}
        />
    );
}
