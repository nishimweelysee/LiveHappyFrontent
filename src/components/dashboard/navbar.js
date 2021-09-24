import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import isStickt from '../hooks/useSticky';



const Navbars=(props)=> {
    const [openNavbar, setOpenNavbar] = React.useState(false);
    const {isSticky, element} =isStickt;

    let publicUrl = process.env.PUBLIC_URL + '/'
    return (

        <div>
            <Navbar navbar className={isSticky ? "navbar navbar-sticky bg-maincolor flex flex-col mtop p-20" : "navbar bg-maincolor flex flex-col mtop p-20 bg-blue-100"}>
            <NavbarContainer >
                <NavbarWrapper>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                        <Link to="/" className="flex justify-center p-2 text-center ">
                           LiveHappy
                        </Link>

                    </div>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        color="white"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="z-50 flex flex-col gap-4 lg:flex-row lg:items-center">
                            <Link
                                to="/"
                            >
                                <p className="text-sm  navhover">Home</p>
                            </Link>
                            <Link
                                to="/events"
                            ><p className="text-sm  navhover">Events</p></Link>
                            <Link
                                to="#"
                            >
                                <p className="text-sm  navhover">Nishimwe Elysee</p>
                            </Link>
                           
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
            <div ref={element}>
               
            </div>
        </Navbar>
        </div>
 );
}

export default Navbars;