import React, {Component, useContext, useEffect, useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from "../../context/UserContext";

const Banner = (props)=> {
	const {categories,fetchData} = useContext(UserContext);
	let publicUrl = process.env.PUBLIC_URL+'/';
	const locaRef = useRef();
	const catRef = useRef();
	const history = useHistory();

	function handleSubmit() {
		history.push({pathname:"/find",state: {location: locaRef.current.value,category: catRef.current.value}})
	}
	useEffect(()=>{
		fetchData()
	},[])

	return  <div className="banner-area banner-area-1 banner-area-bg" style={{background: 'url('+publicUrl+'assets/img/banner/1.png)'}}>
			  <div className="container">
			    <div className="banner-area-inner">
			      <div className="row justify-content-center">
			        <div className="col-lg-8">
			          <div className="banner-inner text-center">
			            <p>we wish you to live a happy life with live happy where every one his beauty home with best Good Behaviour landlords</p>
			            <div className="line" />
			            <h2>The Best Way To Find Your Perfect Home</h2>
			          </div>
			        </div>
			        <div className="col-lg-8 mt-4">
			          <form className="main-search-inner">
			            <div className="row custom-gutters-10">
			              <div className="col-md-4">
			                <div className="single-select-inner">
			                  <select className={"h-32"} size={5} name={"location"} ref={locaRef}>
								  <optgroup label="Kigali City">
									  <option value={"Nyarugenge"}>Nyarugenge</option>
									  <option value={"Kicukiro"}>Kicukiro</option>
									  <option value={"Gasabo"}>Gasabo</option>
								  </optgroup>
								  <optgroup label={"The Northern Province"}>
									  <option>Burera</option>
									  <option>Gakenke</option>
									  <option>Gicumbi</option>
									  <option>Musanze</option>
									  <option>Rulindo</option>
								  </optgroup>
								  <optgroup label={"The Southern Province"}>
									  <option>Gisagara</option>
									  <option>Huye</option>
									  <option>Kamonyi</option>
									  <option>Muhanga</option>
									  <option>Nyamagabe</option>
									  <option>Nyanza</option>
									  <option>Nyaruguru</option>
									  <option>Ruhango</option>
								  </optgroup>
								  <optgroup label={"The Eastern Province"}>
									  <option>Bugesera</option>
									  <option>Gatsibo</option>
									  <option>Kayonza</option>
									  <option>Kirehe</option>
									  <option>Ngoma</option>
									  <option>Nyagatare</option>
									  <option>Rwamagana</option>
								  </optgroup>
								  <optgroup label={"The Western Province"}>
									  <option>Karongi</option>
									  <option>Ngororero</option>
									  <option>Nyabihu</option>
									  <option>Nyamasheke</option>
									  <option>Rubavu</option>
									  <option>Rusizi</option>
									  <option>Rutsiro</option>
								  </optgroup>
			                  </select>
			                </div>
			              </div>
			              <div className="col-md-4">
			                <div className="single-select-inner">
			                  <select name={"category"} ref={catRef}>
			                    <option value={-1}>House</option>
								  {
									  categories.map(c=>(
								  		<option key={c.id} value={c.id}>{c.name}</option>
									))
								  }
			                  </select>
			                </div>
			              </div>
			              <div className="col-md-3">
			                <button className="btn btn-base w-100" onClick={handleSubmit}><i className="fa fa-search mr-1" /> Search</button>
			              </div>
			            </div>
			          </form>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
}

export default Banner
