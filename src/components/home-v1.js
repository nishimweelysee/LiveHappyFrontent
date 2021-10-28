import React from 'react';
import Navbar from './global-components/navbar';
import Banner from './section-components/banner';
import Service from './section-components/service';
import Product from './section-components/product';
import ProductV2 from './section-components/product-v2';
import Testimonial from './section-components/testimonial';
import Footer from './global-components/footer-v2';

const Home_V1 = () => {
    return <div>
        <Navbar />
        <Banner />
        <Service />
        <Product />
        <ProductV2 />
        <Testimonial />
        <Footer />
    </div>
}

export default Home_V1

