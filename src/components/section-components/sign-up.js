import React, {useEffect, useState} from 'react';
import {httpRequest} from "../../config/httpRequest";
import cogoToast from "cogo-toast";

const SignUp = ()=> {
	const [user,setUser]=useState({fullName:"",username:"",email:"",phoneNumber:"",userType:"",password:"",confirmPassword:""});
	const handleInput = (e)=>{
		let name = e.target.name;
		let value = e.target.value;
		setUser({...user,[name]:value});
	}
	const handleSubmit = async ()=>{
		delete user.confirmPassword;
		const {response,error} =	await httpRequest('POST','/api/auth/register',user);
		if(!error){
			cogoToast.success(response.data.message);
			console.log(response.data);
			setUser({...user,fullName:"",username:"",email:"",phoneNumber:"",userType:"",password:"",confirmPassword:""});
		}
	}

	useEffect(()=>{
		const $ = window.$;
		$('body').addClass( 'bg-gray' );
		$('[name=userType]').change(function() {
			console.log($(this).val())
			setUser({...user,userType:$(this).val() })
		});
	})

    return <div className="signup-page-area pd-top-100">
			  <div className="container">
			    <div className="row justify-content-center">
			      <div className="col-xl-6 col-lg-7">
			        <form className="signin-inner">
			          <div className="row">
			            <div className="col-12">
			              <label className="single-input-inner style-bg-border">
			                <input type="text" value={user.fullName} onChange={handleInput} name={"fullName"} placeholder="Name" />
			              </label>
			            </div>
			            <div className="col-12">
			              <label className="single-input-inner style-bg-border">
			                <input type="text" value={user.username} onChange={handleInput} name={"username"} placeholder="username" />
			              </label>
			            </div>
			            <div className="col-12">
			              <label className="single-input-inner style-bg-border">
			                <input type="text" value={user.email} onChange={handleInput} name={"email"} placeholder="Email" />
			              </label>
			            </div>
						  <div className="col-12">
							  <label className="single-input-inner style-bg-border">
								  <input type="text" value={user.phoneNumber} onChange={handleInput} name={"phoneNumber"} placeholder="PhoneNumber" />
							  </label>
						  </div>
						  <div className="col-12">
								  <select name={"userType"} value={user.userType} onChange={handleInput}  className="single-input-inner style-bg-border">
									  <option value={"Tenant"}>Tenant</option>
									  <option value={"LandLord"}>LandLord</option>
									  <option value={"Commissioner"}>Commissioner</option>
								  </select>
						  </div>
			            <div className="col-12">
			              <label className="single-input-inner style-bg-border">
			                <input type="text" value={user.password}  onChange={handleInput} name={"password"} placeholder="Password" />
			              </label>
			            </div>
			            <div className="col-12">
			              <label className="single-input-inner style-bg-border">
			                <input type="text" value={user.confirmPassword} onChange={handleInput} name={"confirmPassword"} placeholder="Confirm Password" />
			              </label>
			            </div>
			            <div className="col-12 mb-4">
			              <button type={"button"} onClick={handleSubmit} className="btn btn-base w-100">Create Account</button>
			            </div>
			            <div className="col-12">
			              <span>By creating an account </span>
			              <a className={"mx-2"} href="/sign-in"><strong>Signin</strong></a>
			            </div>
			          </div>
			        </form>
			      </div>
			    </div>
			  </div>
			</div>
}

export default SignUp
