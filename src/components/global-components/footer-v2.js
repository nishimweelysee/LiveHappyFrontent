import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer_v2 extends Component {

    componentDidMount() {
        let publicUrl = process.env.PUBLIC_URL+'/'
        const minScript = document.createElement("script");
        minScript.async = true;
        minScript.src = publicUrl + "assets/js/main.js";

        document.body.appendChild(minScript);
    }

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

        return (
		<footer className="footer-area style-two go-top" style={{background: 'url('+publicUrl+'assets/img/other/1.png)'}}>
		  <div className="footer-top">
		    <div className="container">
		      <div className="row">
		        <div className="col-lg-6 col-md-4">
		          <a href="/"><img className="h-20" src={publicUrl+"assets/img/logo.png"} alt="img" /></a>
		        </div>
		        <div className="col-lg-6 col-md-8 text-md-right mt-3 mt-md-0">
		          <ul className="social-area">
		            <li><a href="https://www.facebook.com"><i className="fab fa-facebook-f" aria-hidden="true" /> </a></li>
		            <li><a href="https://www.twitter.com"><i className="fab fa-twitter" aria-hidden="true" /> </a></li>
		            <li><a href="https://www.instagram.com"><i className="fab fa-instagram" aria-hidden="true" /> </a></li>
		            <li><a href="https://www.skype.com"><i className="fab fa-skype" aria-hidden="true" /> </a></li>
		            <li><a href="https://www.pinterest.com"><i className="fab fa-pinterest-p" aria-hidden="true" /> </a></li>
		          </ul>
		        </div>
		      </div>
		    </div>
		  </div>
		  <div className="footer-middle">
		    <div className="container">
		      <div className="row">
		        <div className="col-lg-4 col-md-6">
		          <div className="widget widget_about">
		            <h4 className="widget-title">Contact Us</h4>
		            <div className="details">
		              <p><i className="fas fa-map-marker-alt" /> Kigali, Rwanda</p>
		              <p><i className="fas fa-phone-volume" /> +(250) 780781546</p>
		              <p><i className="fas fa-envelope" /> info.contact@gmail.com</p>
		            </div>
		          </div>
		        </div>
		        <div className="col-lg-4 col-md-6">
		          <div className="widget widget_nav_menu">
		            <h4 className="widget-title">Quick link</h4>
		            <ul>
		              <li><Link to="/about">About Us</Link></li>
		              <li><Link to="/property">Property</Link></li>
		              <li><Link to="/add-property">Add Property</Link></li>
		              <li><Link to="/contact">Contact Us</Link></li>
		            </ul>
		          </div>
		        </div>
		        <div className="col-lg-4 col-md-6">
		          <div className="widget widget_subscribe">
		            <h4 className="widget-title">Newsletter</h4>
		            <div className="details">
		              <p>Subscribe to our newsLatter,</p>
		              <div className="footer-subscribe-inner">
		                <input type="text" placeholder="Your Mail" />
		                <button className="btn btn-base">Subscribe</button>
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		  <div className="footer-bottom">
		    <div className="container">
		      <div className="row">
		        <div className="col-lg-6 align-self-center">
		          <p>??2021, Copy Right By LiveHappy. All Rights Reserved</p>
		        </div>
		        <div className="col-lg-6 text-lg-right">
		          <ul>
		            <li>
		              <Link to="/">Home</Link>
		            </li>
		            <li>
		              <Link to="/about">About</Link>
		            </li>
		            <li>
		              <Link to="/contact">Contact</Link>
		            </li>
		          </ul>
		        </div>
		      </div>
		    </div>
		  </div>
		</footer>


        )
    }
}


export default Footer_v2
