import React from 'react';
import LandLordDashNav from "../Layout/LandLordDashNav";
import WelcomeDash from "../landlord/welcomeDash";

function LandLordDashboard(props) {
    return (
        <LandLordDashNav>
            <WelcomeDash/>
        </LandLordDashNav>
    );
}

export default LandLordDashboard;
