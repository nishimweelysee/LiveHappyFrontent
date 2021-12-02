import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Rating} from "@material-ui/lab";
import {UserContext} from "../../context/UserContext";
import HouseBox from "../global-components/HouseBox";

const Product=(props) => {
	const {house,getHouses} = useContext(UserContext);
	const [value] = React.useState(2);
	useEffect(()=>{
		getHouses();
	},[])
    return  <div className="product-area pd-top-118 pd-bottom-90 go-top">
			  <div className="container">
			    <div className="section-title text-center">
			      <h6>We are offering the best real house to live</h6>
			      <h2>Best House For You</h2>
			    </div>
			    <div className="row justify-content-center">
					{
						Object.values(house).map((h,index)=>{
							const landlord =h.landLord;
							return  <HouseBox key={index} value={value} index={index} h={h} landlord={landlord}/>
						})
					}
			    </div>
			  </div>
			</div>

}

export default Product
