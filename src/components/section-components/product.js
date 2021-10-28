import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {httpRequest} from "../../config/httpRequest";
import {Rating} from "@material-ui/lab";

const Product=(props) => {
	const [house,setHouse] = useState([]);
	const [value] = React.useState(2);
	const getHouses =async ()=>{
		const {response,error}=await httpRequest("GET",'/api/house');
		if(!error){
			setHouse(response.data.data);
		}
	}
	useEffect(()=>{
		getHouses();
	},[])
	let publicUrl = process.env.PUBLIC_URL+'/'
    return  <div className="product-area pd-top-118 pd-bottom-90 go-top">
			  <div className="container">
			    <div className="section-title text-center">
			      <h6>We are offring the best real house to live</h6>
			      <h2>Best House For You</h2>
			    </div>
			    <div className="row justify-content-center">
					{
						Object.values(house).map((h,index)=>{
							const landlord =h.landLord;
							return  <div className="col-lg-4 col-md-6" key={index}>
					 		 <div className="single-product-wrap" >
								<div className="thumb">
									<img src={h.images[0]||publicUrl+"assets/img/pexels/pexels-binyamin-mellish-106399.jpg"} alt="img" />
									<Link className="cat" to={`/property-details?id=${h.id}`}>For Rent</Link>
								</div>
								<div className="product-wrap-details">
									<div className="media">
										<div className="author">
											<img className={"rounded-circle h-8 w-8"}  src={landlord.image||publicUrl+"assets/img/pexels/pexels-pixabay-220453.jpg"} alt="img" />
										</div>
										<div className="media-body">
											<h6><Link to={{ pathname: "/property", state: { landlord } }} >{landlord.fullName}</Link></h6>
											<p><img className="object-cover" src={publicUrl+"assets/img/icon/location-alt.png"} alt="img" />{h.name} </p>
										</div>
										<div className={" fav-btn float-right"}>
											<Rating
												name="simple-controlled"
												value={value}
												readOnly
												size={"small"}
											/>
										</div>
									</div>
									<div className="product-meta">
										<span className="price">{h.price} Rwf/monthly</span>
										<div className="float-right d-inline-block">
											<ul>
												<li><img src={publicUrl+"assets/img/icon/triangle.png"} alt="img" />{h.bathrooms}</li>
												<li><img src={publicUrl+"assets/img/icon/bed.png"} alt="img" />{h.bedrooms}</li>
												<li><img src={publicUrl+"assets/img/icon/wall.png"} alt="img" />{h.sqft} sqft</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
			     		 </div>
						})
					}
			    </div>
			  </div>
			</div>

}

export default Product
