import React from 'react';
import PageHeader from '../global-components/page-header';
import AddProperty from '../section-components/add-property';
import LandLordDashNav from "../Layout/LandLordDashNav";

const AddPropertyPage = () => {
    return  <LandLordDashNav>
        <PageHeader parenttitle={"Dashboard"} parentlink={"/landlord"} headertitle="Add Property"  />
        <AddProperty />
    </LandLordDashNav>
}

export default AddPropertyPage

