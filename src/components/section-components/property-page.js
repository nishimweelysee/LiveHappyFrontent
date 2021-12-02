import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {httpRequest} from "../../config/httpRequest";
import _ from 'lodash'
import Sidebar from "../global-components/sidebar";



const PropertyPage= ()=>{
	const location = useLocation();
	const [landLord,setLandLord] = useState({});
	const [houses,setHouses] = useState([]);
	const [house,setHouse] = useState({});
	const [rates,setRates] = useState([]);
	const [categories,setCategories] = useState([])

	useEffect(()=>{
		const $ = window.$;
		$( 'body' ).addClass( 'body-bg' );
		const getHouses = async ()=>{
			let {landlord} = location.state;
			setLandLord({...landlord})
			const {response,error} = await  httpRequest('GET',`/api/landlord/house/all/${landlord.id}`)
			if(!error){
				setHouses(response.data.data);
			}
			const resp = await httpRequest('GET',`/api/rate/${landlord.id}`);
			if(!resp.error){
				let rates = resp.response.data.data;
				console.log(rates);
				setRates(rates)
			}
			const grep = await httpRequest("GET","/api/category");
			if(!grep.error){
				let data = grep.response.data;
				setCategories(data.data);
			}
			const hresp=await httpRequest("GET",'/api/house');
			if(!error){
				let data =hresp.response.data.data
				console.log(data)
				let filteredData = _.groupBy(data,'district')
				console.log(filteredData)
				setHouse({...filteredData});
			}
		}
		getHouses();
	},[location.state])
	let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="blog-page-area pd-top-120 go-top">
			  <div className="container">
			    <div className="row">
			      <div className="col-lg-8">
			        <div className="product-search-inner bg-main">
			          <div className="row custom-gutters-20">
			            <div className="col-md-3 align-self-center">
			              <h5>{houses.length} Properties</h5>
			            </div>
			            <div className="col-md-6 mt-2 mt-md-0">
			              <div className="widget-search">
			                <div className="single-search-inner">
			                  <input type="text" placeholder="Search your keyword" />
			                  <button><i className="la la-search" /></button>
			                </div>
			              </div>
			            </div>
			            <div className="col-md-3 mt-2 mt-md-0 align-self-center">
			              <div className="single-select-inner">
			                <select>
			                  <option value={1}>Sorty by</option>
			                  <option value={2}>Title</option>
			                  <option value={3}>Best</option>
			                </select>
			              </div>
			            </div>
			          </div>
			        </div>
			        <div className="row">
						{
							houses.map((h,index)=>{
								return <div key={index} className="col-md-6">
									<div className="single-product-wrap style-2">
										<div className="thumb">
											<img src={h.images[0]} alt="img" />
											<div className="product-wrap-details">
												<div className="media">
													<div className="author">
														<img className={"h-12 w-12"} src={landLord.image||publicUrl+"assets/img/author/1.png"} alt="img" />
													</div>
													<div className="media-body">
														<h6><Link to="/property-details">{landLord.fullName}</Link></h6>
														<p><img src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />{h.district}, {h.sector}, {h.street} </p>
													</div>
												</div>
											</div>
										</div>
										<div className="product-details-inner">
											<h4><Link to={`/property-details?id=${h.id}`}>{h.name}</Link></h4>
											<ul className="meta-inner">
												<li><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" />{h.district}</li>
												<li><Link to={`/property-details?id=${h.id}`}>For Rent</Link></li>
											</ul>
											<p className={"break-words"}>{h.description} </p>
											<span className="price">RWF {h.price} / Month</span>
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
			        </div>
			        <div className="pagination-area text-center mt-4">
			          <ul className="pagination">
			            <li className="page-item"><span className="page-link" ><i className="la la-angle-double-left" /></span></li>
			            <li className="page-item active"><span className="page-link" >1</span></li>
			            <li className="page-item"><span className="page-link" >2</span></li>
			            <li className="page-item"><span className="page-link" >3</span></li>
			            <li className="page-item"><span className="page-link" >...</span></li>
			            <li className="page-item"><span className="page-link" ><i className="la la-angle-double-right" /></span></li>
			          </ul>
			        </div>
			      </div>
			      <div className="col-lg-4">
			        <Sidebar categories={categories} house={house} rates={rates} landLord={landLord}/>
			      </div>
			    </div>
			  </div>
			</div>

}

export default PropertyPage
