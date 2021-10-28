import React from 'react';
import Navbar from './global-components/navbar-v2';
import PageHeader from './global-components/page-header';
import PropertyGrid from './section-components/property-grid';
import Footer from './global-components/footer-v2';

const PropertGridPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Category"  />
        <PropertyGrid />
        <Footer />
    </div>
}

export default PropertGridPage

