import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class ProductV2 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="product-area pd-top-118 pd-bottom-90 go-top">
			  <div className="container">
			    <div className="section-title text-center">
			      <h6>Choose best house categories </h6>
			      <h2>Populer Categores</h2>
			    </div>
			    <div className="row">
			      <div className="col-lg-4 col-md-6">
			        <div className="single-category-product-wrap">
			          <div className="thumb">
			            <img src={publicUrl+"assets/img/product/pexels-binyamin-mellish-1396122.jpg"} alt="img" />
			          </div>
			          <div className="single-category-product-details">
			            <h4><Link to="/property-details">Cadastrait</Link></h4>
			            <Link className="btn btn-base" to="/property">3 houses</Link>
			          </div>
			        </div>
			      </div>  
			      <div className="col-lg-4 col-md-6">
			        <div className="single-category-product-wrap">
			          <div className="thumb">
			            <img src={publicUrl+"assets/img/product/pexels-pixabay-53610.jpg"} alt="img" />
			          </div>
			          <div className="single-category-product-details">
			            <h4><Link to="/property-details">Etage</Link></h4>
			            <Link className="btn btn-base" to="/property">6 Houses</Link>
			          </div>
			        </div>
			      </div> 
			      <div className="col-lg-4 col-md-6">
			        <div className="single-category-product-wrap">
			          <div className="thumb">
			            <img src={publicUrl+"assets/img/product/pexels-george-becker-129494.jpg"} alt="img" />
			          </div>
			          <div className="single-category-product-details">
			            <h4><Link to="/property-details">Apartiment</Link></h4>
			            <Link className="btn btn-base" to="/property">2 Houses</Link>
			          </div>
			        </div>
			      </div>   
			      <div className="col-lg-4 col-md-6 order-lg-12">
			        <div className="single-category-product-wrap">
			          <div className="thumb">
			            <img src={publicUrl+"assets/img/product/3.png"} alt="img" />
			          </div>
			          <div className="single-category-product-details">
			            <h4><Link to="/property-details">Family House</Link></h4>
			            <Link className="btn btn-base" to="/property">6 Houses</Link>
			          </div>
			        </div>
			      </div> 
			      <div className="col-lg-8 order-lg-1">
			        <div className="single-category-product-wrap">
			          <div className="thumb">
			            <img src={publicUrl+"assets/img/product/ca643da3.f10.jpg"} alt="img" />
			          </div>
			          <div className="single-category-product-details">
			            <h4><Link to="/property-details">Beach House</Link></h4>
			            <Link className="btn btn-base" to="/property">1 Houses</Link>
			          </div>
			        </div>
			      </div>   
			    </div>
			  </div>
			</div>

        }
}

export default ProductV2