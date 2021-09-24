import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Team from './section-components/team';
import MoreInfo from './section-components/more-info';
import Footer from './global-components/footer-v2';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Team"  />
        <Team />
        <MoreInfo />
        <Footer />
    </div>
}

export default AboutPage

