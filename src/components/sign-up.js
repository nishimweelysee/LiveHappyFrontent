import React from 'react';
import Navbar from './global-components/navbar-v2';
import PageHeader from './global-components/page-header';
import SignUp from './section-components/sign-up';
import Footer from './global-components/footer-v2';

const SignUpPage = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Sign Up"  />
        <SignUp />
        <Footer />
    </div>
}

export default SignUpPage

