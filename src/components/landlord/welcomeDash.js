import React from 'react';
import LandLordDashNav from "../Layout/LandLordDashNav";
import {decodeToken} from "../../config/decodeToken";

function WelcomeDash(props) {
    decodeToken();
    return (
        <LandLordDashNav>
            Welcome Nishimwe ELysee
        </LandLordDashNav>
    );
}

export default WelcomeDash;
