import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

const  PropertyGrid = () => {
	const [,setCategory] = useState({})
	const [house,setHouses] = useState([])
	const [oghouse,setOgHouses] = useState([])
	let location = useLocation();

	useEffect(()=>{
		setCategory(location.state.category)
		const {houses} = location.state.category;
		setHouses(houses)
		setOgHouses(houses)
		const $ = window.$;
		$( 'body' ).addClass( 'body-bg' );
	},[location.state.category])

	const findByKey = (e)=>{
		let value = e.target.value.toLowerCase();
		let houses  = oghouse.filter(h=>h.name.toLowerCase().includes(value)||h.district.toLowerCase().includes(value)||h.sector.toLowerCase().includes(value))
		setHouses(houses)
	}

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="blog-page-area pt-5 go-top">
			  <div className="container">
			    <div className="row justify-content-center">
			      <div className="col-12">
			        <div className="product-search-inner bg-main">
			          <div className="row custom-gutters-20">
			            <div className="col-md-3 align-self-center">
			              <h5>{house.length} Properties</h5>
			            </div>
			            <div className="col-md-6 mt-2 mt-md-0">
			              <div className="widget-search">
			                <div className="single-search-inner">
			                  <input onKeyUp={findByKey} type="text" placeholder="Search your keyword" />
			                  <button><i className="la la-search" /></button>
			                </div>
			              </div>
			            </div>
			            <div className="col-md-3 mt-2 mt-md-0 align-self-center">
			              <div className="single-select-inner">
			                <select>
			                  <option value={1}>Sort Name</option>
			                  <option value={2}>Sort District</option>
			                </select>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
					{
						house.map((h,index)=>{
							return <div key={index} className="col-lg-4 col-md-6">
								<div className="single-product-wrap style-2">
									<div className="thumb">
										<img src={h.images[0]} alt="img" />
										<div className="product-wrap-details">
											<div className="media">
												<div className="author">
													<img src={h.landLord.image ||publicUrl+"assets/img/author/1.png"} alt="img" />
												</div>
												<div className="media-body">
													<h6><Link to={{ pathname: "/property", state: { landlord:h.landLord } }}>{h.landLord.fullName}</Link></h6>
													<p><img src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />{h.district},{ h.sector}, {h.street} </p>
												</div>
											</div>
										</div>
									</div>
									<div className="product-details-inner">
										<h4><Link to={`/property-details?id=${h.id}`}>{h.name}</Link></h4>
										<ul className="meta-inner">
											<li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" />{h.district}</li>
											<li><Link to={`/property-details?id=${h.id}`}>For rent</Link></li>
										</ul>
										<p>{h.description} </p>
										<span className="price">RWF {h.price}/ Month</span>
									</div>
									<div className="product-meta-bottom style-2">
										<span>{h.bedrooms} <span>Bedroom</span></span>
										<span className="border-none">{h.bathrooms} <span>Bathroom</span></span>
										<span>{h.sqft} <span>sqft</span></span>
									</div>
								</div>
							</div>
						})
					}

			      <div className="pagination-area text-center mt-4">
			        <ul className="pagination">
			          <li className="page-item"><span className="page-link" ><i className="la la-angle-double-left" /></span></li>
			          <li className="page-item active"><span className="page-link">1</span></li>
			          <li className="page-item"><span className="page-link" >2</span></li>
			          <li className="page-item"><span className="page-link">3</span></li>
			          <li className="page-item"><span className="page-link">...</span></li>
			          <li className="page-item"><span className="page-link"><i className="la la-angle-double-right" /></span></li>
			        </ul>
			      </div>
			    </div>
			  </div>
			</div>
}

export default PropertyGrid
