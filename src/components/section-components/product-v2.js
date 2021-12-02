import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {httpRequest} from "../../config/httpRequest";
import {UserContext} from "../../context/UserContext";

const ProductV2=() => {
	const {categories,fetchData} = useContext(UserContext);
	useEffect(()=>{
		fetchData();
	},[])
	return  <div className="product-area pd-top-118 pd-bottom-90 go-top">
			  <div className="container">
			    <div className="section-title text-center">
			      <h6>Choose best house categories </h6>
			      <h2>Popular Categories</h2>
			    </div>
			    <div className="row">
					{
						categories.map((d,index)=>{
							let {houses} = d;
							return <div key={index} className="col-lg-4 col-md-6">
								<div className="mx-auto single-category-product-wrap shadow-lg">
									<div className="thumb">
										<img src={d.image} alt="img" />
									</div>
									<div className="single-category-product-details">
										<h4><Link className={"text-black"} to={{ pathname: "/property-grid", state: { category: d }, }} >{d.name}</Link></h4>
										<Link className="btn btn-base" to={{ pathname: "/property-grid", state: { category: d }, }} >{houses.length} houses</Link>
									</div>
								</div>
							</div>
						})
					}
			    </div>
			  </div>
			</div>
}

export default ProductV2
