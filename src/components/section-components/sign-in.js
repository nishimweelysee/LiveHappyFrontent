import React, {useEffect, useState} from 'react';
import {httpRequest} from "../../config/httpRequest";
import cogoToast from "cogo-toast";
import {loginAction} from "../../redux/user/user.actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {LOGIN_SUCCESS} from "../../redux/user/user.types";
import {Link} from "react-router-dom";
const SignIn =(props) => {
	const [user,setUser]=useState({username:"",password:""});

	const handleInput =(e)=>{
		let name = e.target.name;
		let value = e.target.value;
		setUser({...user,[name]:value})
	}
	const handleSubmit = async ()=>{
		const {response,error} =await httpRequest('POST','/api/auth/login',user);
		if(!error){

			const {authenticationToken,authorities,email,userId,userType,username} = response.data;
			props.loginAction(LOGIN_SUCCESS, {
						token:authenticationToken,
						info:{
							authorities, email, userId, userType, username
						}
					}
				)
			cogoToast.success(response.data.message);
			setUser({...user,username: "",password: ""})
		}
	}

	useEffect(()=>{
		const $ = window.$;
		$( 'body' ).addClass( 'bg-gray' );
	})

    return <div className="signin-page-area pd-top-100 ">
	  <div className="container">
		<div className="row justify-content-center">
		  <div className="col-xl-6 col-lg-7">
			<form className="signin-inner">
			  <div className="row">
				<div className="col-12">
				  <label className="single-input-inner style-bg-border">
					<input type="text" value={user.username} onChange={handleInput} name={"username"} placeholder="Email/Username" />
				  </label>
				</div>
				<div className="col-12">
				  <label className="single-input-inner style-bg-border">
					<input type="password" value={user.password} onChange={handleInput} name={"password"} placeholder="Password" />
				  </label>
				</div>
				<div className="col-12 mb-4">
				  <button type={"button"} onClick={handleSubmit} className="btn btn-base w-100">Sign In</button>
				</div>
				<div className="col-12">
				  <span>Have an account ? </span>
				  <Link className={"mx-2"} to="/sign-up"><strong>Signup</strong></Link>
				</div>
			  </div>
			</form>
		  </div>
		</div>
	  </div>
	</div>

}
SignIn.protoTypes = {
	loginAction: PropTypes.func.isRequired,
	login: PropTypes.object.isRequired
}
const mapStateToProps = state => {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps, {loginAction})(SignIn)
