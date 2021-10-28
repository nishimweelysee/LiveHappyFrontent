import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Banner extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="banner-area banner-area-1 banner-area-bg" style={{background: 'url('+publicUrl+'assets/img/banner/1.png)'}}>
			  <div className="container">
			    <div className="banner-area-inner">
			      <div className="row justify-content-center">
			        <div className="col-lg-8">
			          <div className="banner-inner text-center">
			            <p>we wish you to live a happy life with live happy where every one his beuty home with best Good Behaiour landlords</p>
			            <div className="line" />
			            <h2>The Best Way To Find Your Perfect Home</h2>
			          </div>
			        </div>
			        <div className="col-lg-8 mt-4">
			          <form className="main-search-inner">
			            <div className="row custom-gutters-10">
			              <div className="col-md-3">
			                <div className="single-select-inner">
			                  <select>
			                    <option>Location</option>
			                    <option value={1}>Nyarugenge</option>
			                    <option value={2}>Kicukro</option>
			                    <option value={3}>Gasabo</option>
			                  </select>
			                </div>
			              </div>
			              <div className="col-md-3">
			                <div className="single-select-inner">
			                  <select>
			                    <option>House</option>
			                    <option value={1}>Etaje</option>
			                    <option value={2}>Cadasteri</option>
			                    <option value={3}>Apartiment</option>
			                  </select>
			                </div>
			              </div>
			              <div className="col-md-3">
			                <div className="single-select-inner">
			                  <select>
			                    <option>Price</option>
			                    <option value={1}>less - 500000 Rwf</option>
			                    <option value={2}>500000 Rwf - 1200000 Rwf</option>
			                    <option value={3}>1200000 Rwf - above</option>
			                  </select>
			                </div>
			              </div>
			              <div className="col-md-3">
			                <Link className="btn btn-base w-100" to="/property-grid"><i className="fa fa-search mr-1" /> Search</Link>
			              </div>
			            </div>
			          </form>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>

        }
}

export default Banner
