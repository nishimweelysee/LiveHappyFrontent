import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {httpRequest} from "../../config/httpRequest";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Sidebar from "../global-components/sidebar";
import _ from "lodash";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {connect} from "react-redux";
import {ThumbUpAltOutlined, WarningOutlined} from "@material-ui/icons";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import cogoToast from "cogo-toast";





function ConfirmationDialogRaw(props) {
	const { onCloseYes, token,  openYes,houseId,landlordId, ...other } = props;
	const body = {
		"landlordId":landlordId,
		"houseId":houseId
	}
	console.log(body)

	const handleCancel = () => {
		onCloseYes();
	};

	const handleOk = async () => {
		const {error,response} = await  httpRequest('POST','/api/request',body,{"Authorization":`Bearer ${token}`})
		if(!error){
			cogoToast.success(response.data.message)
		}
	};

	return (
		<Dialog
			maxWidth="xs"
			aria-labelledby="confirmation-dialog-title"
			open={openYes}
			{...other}
		>
			<DialogTitle id="confirmation-dialog-title">Confirm Message</DialogTitle>
			<DialogContent dividers>
				Are you sure you want to Request this House ?
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleCancel} color="primary">
					No
				</Button>
				<Button onClick={handleOk} color="primary">
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}


ConfirmationDialogRaw.propTypes = {
	onCloseYes: PropTypes.func.isRequired,
	openYes: PropTypes.bool.isRequired,
	token: PropTypes.string.isRequired,
	landlordId:PropTypes.string,
	houseId:PropTypes.string
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	paper: {
		width: '80%',
		maxHeight: 435,
	},
}));

const PropertyDetails =(props)=> {
	let location = useLocation();
	const [landLord,setLandLord] = useState({});
	const [houses,setHouses] = useState({});
	const [rates,setRates] = useState([]);
	const [categories,setCategories] = useState([])
	const [house,setHouse] = useState({
		id:"",
		name:"",
		price:"",
		category:"",
		bedrooms:0,
		kitchens:0,
		livingRoom:0,
		bathrooms:0,
		area:"",
		yearBuilt:"",
		sqft:"",
		images:[],
		amenities:[],
		googleMapLocation:"",
		description:"",
		district:"",
		sector:"",
		cell:"",
		street:"",
		landLord:{}
	});

	useEffect(()=>{
		const getHouse = async ()=>{
			let id = new URLSearchParams(location.search).get("id");
			const {response,error} = await  httpRequest("GET",`api/house/find?id=${id}`);
			if(!error){
				setHouse({...house,...response.data.data});
				const {landLord} = response.data.data;
				setLandLord(landLord)
				const resp = await httpRequest('GET',`/api/rate/${landLord.id}`);
				if(!resp.error){
					let rates = resp.response.data.data;
					setRates(rates)
				}
			}


			const grep = await httpRequest("GET","/api/category");
			if(!grep.error){
				let data = grep.response.data;
				setCategories(data.data);
			}
			const hresp=await httpRequest("GET",'/api/house');
			if(!hresp.error){
				let data =hresp.response.data.data
				let filteredData = _.groupBy(data,'district')
				setHouses({...filteredData});
			}
		}

		 const $ = window.$;
		 $( 'body' ).addClass( 'body-bg' );
		getHouse();
		},[location.search]
	)

	const [openYes, setOpenYes] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleCloseYes = () => {
		setOpenYes(false);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleRequest = ()=>{
		setOpen(false)
		setOpenYes(true)
	}
	let publicUrl = process.env.PUBLIC_URL+'/'

	const GoodLandLord  = ()=>{
		return <div className={"flex gap-2"}>
			<div>
				<ThumbUpAltOutlined color={'primary'} style={{fontSize: '60px'}} />
			</div>
			<div className={"flex flex-col gap-4"}>
				<h1>Hello Dear, </h1>
				<p>This Landlord looks Good, Because different clients have rated him/her as a Good Person , means there is big chance that you will have peace with him/her.</p>
			</div>
		</div>
	}
	const BadLandLord = ()=> {
		return <div className={"flex gap-2"}>
			<div>
				<WarningOutlined color={'error'} style={{fontSize: '60px'}}/>
			</div>
			<div className={"flex flex-col gap-4"}>
				<h1>Hello Dear, </h1>
				<p>This Landlord looks Bad, because most of the clients rated him/her as Bad so, Please you can find
					another house from other landlord or if you think you will be able to manage him/her you can
					continue sending your request to him/her. </p>
			</div>
		</div>
	}

    return <div className="property-page-area pd-top-120 pd-bottom-90 ">
			  <div className="container">
			    <div className="property-details-top pd-bottom-70">
			      <div className="property-details-top-inner">
			        <div className="row">
			          <div className="col-lg-7">
			            <h3>{house.name}</h3>
			            <p><img src={publicUrl+"assets/img/icon/location2.png"} alt="img" />{house.district}, {house.sector}, {house.cell} , {house.street} </p>
			            <ul>
			              <li>{house.bedrooms} Bedroom</li>
			              <li>{house.bathrooms} Bathroom</li>
			              <li>{house.sqft} sqft</li>
			            </ul>
			          </div>
			          <div className="col-lg-5 text-lg-right">
			            <h4>{house.price} Rwf / Month</h4>
			            <div className="btn-wrap">
							<span className="btn btn-blue btn-sm" >RENT</span>
							<button onClick={handleOpen} className={"btn btn-base btn-lg"}>Request</button>
			            </div>
			            <ul>
			              <li><img src={publicUrl+"assets/img/icon/1.png"} alt="img" />Marce 9 , 2020</li>
			              <li><img src={publicUrl+"assets/img/icon/2.png"} alt="img" />4263</li>
			              <li><img src={publicUrl+"assets/img/icon/3.png"} alt="img" />68</li>
			            </ul>
			          </div>
			        </div>
			      </div>
			      <div>
					  <Carousel autoPlay interval="5000" transitionTime="1000">
						  {
						  	house.images.map((im,index)=>{
						  		return <div key={index}>
									<img src={im}  alt={"house image"+index}/>
								</div>
							})
						  }
					  </Carousel>
				  </div>
			    </div>
			    <div className="row go-top">
			      <div className="col-lg-8">
			        <div className="single-property-details-inner">
			          <h4>{house.category}</h4>
			          <p>
						  {house.description}
					  </p>
			          <div className="single-property-grid">
			            <h4>Poperty Details</h4>
			            <div className="row">
			              <div className="col-md-4">
			                <ul>
								<li>All Rooms: {house.numberOfRooms}</li>
								<li>Bedrooms: {house.bedrooms}</li>
								<li>Kitchen: {house.kitchens}</li>
								<li>Bathrooms: {house.bathrooms}</li>
			                </ul>
			              </div>
			              <div className="col-md-4">
			                <ul>
			                  <li>Livingroom: {house.livingRoom}</li>
			                  <li>Year Built: {house.yearBuilt}</li>
			                  <li>Area: {house.area}</li>
								<li>Type: {house.category}</li>
			                </ul>
			              </div>
			              <div className="col-md-4">
			                <ul>
			                  <li>Bedrooms: 3</li>
			                  <li>All Rooms: 12</li>
			                  <li>Kitchen: 2</li>
			                  <li>Type: Privet House</li>
			                </ul>
			              </div>
			            </div>
			          </div>
			          <div className="single-property-grid">
			            <h4>Amenities</h4>
			            <div className="row">
							{
								house.amenities.map((a,i)=>{
									return  i%3===0 && <div className="col-md-4" key={i}>
										<ul>
											{house.amenities[i] && <li><i className="fa fa-check" />{house.amenities[i]}</li>}
											{house.amenities[i+1] && <li><i className="fa fa-check" />{house.amenities[i+1]}</li>}
											{house.amenities[i+2] && <li><i className="fa fa-check" />{house.amenities[i+2]}</li>}
										</ul>
									</div>
								})
							}
			            </div>
			          </div>

			          <div className="single-property-grid">
			            <h4>House Location</h4>
			            <div className="property-map">
			              <iframe title={"googleMap1"} src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d198059.49240377638!2d-84.68048827338674!3d39.13652252762691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1615660592820!5m2!1sen!2sbd" />
			            </div>
			          </div>
			          <form className="single-property-comment-form">
			            <div className="single-property-grid bg-black">
			              <div className="single-property-form-title">
			                <div className="row">
			                  <div className="col-md-8">
			                    <h4>Post Your Comment</h4>
			                  </div>
			                  <div className="col-md-4 text-md-right">

			                  </div>
			                </div>
			              </div>
			              <div className="row">
			                <div className="col-lg-6">
			                  <label className="single-input-inner style-bg">
			                    <span className="label">Enter Your Name</span>
			                    <input type="text" placeholder="Your name here...." />
			                  </label>
			                </div>
			                <div className="col-lg-6">
			                  <label className="single-input-inner style-bg">
			                    <span className="label">Enter Your MAil</span>
			                    <input type="text" placeholder="Your email here...." />
			                  </label>
			                </div>
			                <div className="col-12">
			                  <label className="single-input-inner style-bg">
			                    <span className="label">Enter Your Messege</span>
			                    <textarea placeholder="Enter your messege here...." defaultValue={""} />
			                  </label>
			                </div>
			                <div className="col-12 mb-4">
			                  <button className="btn btn-base radius-btn">Submit Now</button>
			                </div>
			              </div>
			            </div>
			          </form>
			        </div>
			      </div>
			      <div className="col-lg-4">
					  <Sidebar categories={categories} house={houses} rates={rates} landLord={landLord}/>
			      </div>
			    </div>
			  </div>
				<div>
					<Dialog
						fullScreen={fullScreen}
						open={open}
						onClose={handleClose}
						aria-labelledby="responsive-dialog-title"
						className={`border-2  ${props.user.rate>2.5?"bg-green-600  border-green-800":"bg-red-600  border-red-900"} bg-opacity-25`}
					>
						<DialogTitle id="responsive-dialog-title" className={"text-center"}>{"Request Message"}</DialogTitle>
						<DialogContent>
							<div>
								{
									props.user.rate>2.5?<GoodLandLord />:<BadLandLord/>
								}

							</div>
						</DialogContent>
						<DialogActions className={"mr-4"}>
							<Button autoFocus onClick={handleClose} color="secondary">
								Cancel
							</Button>
							<Button onClick={handleRequest} color="primary" autoFocus>
								Request
							</Button>
						</DialogActions>
					</Dialog>
					<ConfirmationDialogRaw
						id="ringtone-menu"
						keepMounted
						openYes={openYes}
						onCloseYes={handleCloseYes} token={props.user.token} houseId={house.id} landlordId={landLord.id}/>
				</div>
			</div>
}
const mapStateToProps = state => {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps)(PropertyDetails)
