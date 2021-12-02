import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {handleLogout} from "../helpers/functions";
import {decodeToken} from "../../config/decodeToken";

const Navbar =(props)=> {
        let publicUrl = process.env.PUBLIC_URL+'/';
        const [link,setLink] = useState("");

        useEffect(()=> {
			let role = decodeToken();
			switch (role) {
				case "ROLE_ADMIN":
					setLink("/admin");
					break;
				case "ROLE_LANDLORD":
					setLink("/landlord")
					break;
				case "ROLE_TENANT":
					setLink("/tenant");
					break;
				case "ROLE_COMMISSIONER":
					setLink("/commissioner");
					break;
				default:
					setLink("/");
			}
		},[])
        return (
        	<div className="navbar-area navbar-area-1">
			  {/* navbar top start */}
			  <div className="navbar-top">
			    <div className="container">
			      <div className="row">
			        <div className="col-lg-8 text-lg-left text-center">
			          <ul>
			            <li><p><img src={publicUrl+"assets/img/icon/phone.png"} alt="img" /> +(250) 780781546</p></li>
			            <li><p><img src={publicUrl+"assets/img/icon/envelope.png"} alt="img" /> nishimwelys@gmail.com</p></li>
			          </ul>
			        </div>
			        <div className="col-lg-4">
			          <ul className="topbar-right text-lg-right text-center">
			            <li>
							{!props.user.isLoggedIn && <Link className="ml-0" to="/sign-up">Register</Link>}
							{!props.user.isLoggedIn &&<Link to="/sign-in">Login</Link>}
							{props.user.isLoggedIn &&<Link onClick={e=>handleLogout()} to="">Logout</Link>}
			            </li>
			            <li className="social-area">
			              <a href="https://www.facebook.com"><i className="fab fa-facebook-f" aria-hidden="true" /> </a>
			              <a href="https://www.twitter.com"><i className="fab fa-twitter" aria-hidden="true" /> </a>
			              <a href="https://www.instagram-plus.com"><i className="fab fa-instagram" aria-hidden="true" /> </a>
			              <a href="https://www.skype.com"><i className="fab fa-skype" aria-hidden="true" /> </a>
			              <a href="https://www.pinterest.com"><i className="fab fa-pinterest-p" aria-hidden="true" /> </a>
			            </li>
			          </ul>
			        </div>
			      </div>
			    </div>
			  </div>
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
			        <ul>
			          <li><Link className="btn btn-base" to="/add-property"><span className="btn-icon"><i className="fa fa-plus" /></span> <span className="btn-text">SUBMIT PROPERTY</span></Link></li>
			        </ul>
			      </div>
			      <div className="collapse navbar-collapse" id="dkt_main_menu">
			        <ul className="navbar-nav menu-open text-center">
			          <li className="current-menu-item">
			            <Link to="/">Home</Link>
			          </li>
			          <li className="current-menu-item">
						  <Link to="/find">House</Link>
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
						{props.user.isLoggedIn && <li><Link to={link}>Dashboard</Link></li>}
			        </ul>
			      </div>
			      <div className="nav-right-part nav-right-part-desktop">
			        <ul>
			          <li><Link to={"/find"}><i className="fa fa-search" /></Link></li>
			          <li><Link className="btn btn-base" to="/add-property"><span className="btn-icon"><i className="fa fa-plus" /></span> <span className="btn-text">Upload House</span></Link></li>
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

export default connect(mapStateToProps)(withRouter(Navbar))
