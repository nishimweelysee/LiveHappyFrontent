import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import About from './section-components/about';
import Counter from './section-components/counter';
import MoreInfo from './section-components/more-info';
import Footer from './global-components/footer-v2';

const AboutPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="About Us"  />
        <About />
        <Counter />
        <MoreInfo />
        <Footer />
    </div>
}

export default AboutPage

