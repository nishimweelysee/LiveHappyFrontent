import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserDropdown from "../dashboard/userDropdown";

class NavbarV2 extends Component {

    render() {
        let publicUrl = process.env.PUBLIC_URL+'/'
        return (
        	<div className="navbar-area navbar-area-3 h-16">
				  <nav className="navbar navbar-expand-lg">
				    <div className="container nav-container">
				      <div className="logo">
				        <Link to="/"><img className="h-20" src={publicUrl+"assets/img/logo.png"} alt="img" /></Link>
				      </div>
				      <div className="">
						  <UserDropdown />
				      </div>
				    </div>
				  </nav>
				</div>

        )
    }
}


export default NavbarV2
