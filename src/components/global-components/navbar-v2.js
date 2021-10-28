import React from 'react';
import { Link } from 'react-router-dom';
import {handleLogout, redirectUser} from "../helpers/functions";
import {connect} from "react-redux";

const  NavbarV2 = (props) =>{

        let publicUrl = process.env.PUBLIC_URL+'/'
        return (
        	<div className="navbar-area navbar-area-3">
				  <nav className="navbar navbar-expand-lg">
				    <div className="container nav-container">
				      <div className="responsive-mobile-menu">
				        <button className="menu toggle-btn d-block d-lg-none" data-target="#dkt_main_menu" aria-expanded="false" aria-label="Toggle navigation">
				          <span className="icon-left" />
				          <span className="icon-right" />
				        </button>
				      </div>
				      <div className="logo">
				        <Link to="/"><img className="h-20" src={publicUrl+"assets/img/logo.png"} alt="img" /></Link>
				      </div>
				      <div className="nav-right-part nav-right-part-mobile">
				        <Link className="btn btn-base" to="/add-property">Upload House</Link>
				      </div>
				      <div className="collapse navbar-collapse" id="dkt_main_menu">
				        <ul className="navbar-nav menu-open text-center">
				          <li className="current-menu-item">
				            <Link to="/">Home</Link>
				          </li>
				          <li className="current-menu-item">
							  <Link to="/property-grid">House</Link>
				          </li>
				          <li className="menu-item-has-children current-menu-item">
				            <span>Quick Links</span>
				            <ul className="sub-menu">
				              <li><Link to="/about">About</Link></li>
				              <li><Link to="/sign-in">Sign In</Link></li>
				              <li><Link to="/sign-up">Sign Up</Link></li>
				              <li><Link to="/add-property">Upload House</Link></li>
				            </ul>
				          </li>
				          <li><Link to="/contact">Contact</Link></li>
							{props.user.isLoggedIn && <li><Link onClick={e=>handleLogout()} to={""}>Logout</Link></li>}
							{props.user.isLoggedIn && <li><Link onClick={redirectUser} to={""}>Dashboard</Link></li>}
				        </ul>
				      </div>
				      <div className="nav-right-part nav-right-part-desktop">
				        <ul>
				          <li><span className="search"><i className="fa fa-search" /></span></li>
				          <li><Link className="btn btn-base" to="/add-property">Upload House <i className="fa fa-plus" /></Link></li>
				        </ul>
				      </div>
				    </div>
				  </nav>
				</div>

        )
}

const mapStateToProps = state => {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps)(NavbarV2)
