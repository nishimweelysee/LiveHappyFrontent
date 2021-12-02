import React, {useContext, useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {httpRequest} from "../config/httpRequest";
import PageHeader from "./global-components/page-header";
import cogoToast from "cogo-toast";
import Navbar from "./global-components/navbar-v2";
import Footer_v2 from "./global-components/footer-v2";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {updateStateData} from "../redux/user/user.actions";
import {FIND_USER_DATA} from "../redux/user/user.types";
import {UserContext} from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
}));
function Profile(props) {
    const classes = useStyles();
    const {user,setUser,getUser} = useContext(UserContext);
    const [loading,setLoading] = useState(false);
    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUser({...user,[name]:value});
    }
    const handleSubmit = async ()=>{
        console.log(user);
        const {response,error} =	await httpRequest('PUT','/api/auth/user/update',user,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            cogoToast.success(response.data.message);
            getUser();
            console.log(user)
        }
    }
    const imageRef=useRef();
    let publicUrl = process.env.PUBLIC_URL+'/'

    const handleUpload = async (e)=>{
        setLoading(true)
        let fileInput = e.target;
        const formdata = new FormData();
        Object.values(fileInput.files).map(fi)
        function fi(f) {
            formdata.append("files", f, f.name);
        }
        const {response,error} = await httpRequest("POST",'/api/image', formdata, {"Authorization":`Bearer ${props.user.token}`})
        if(!error){
            const images = response.data.data;
            setUser({...user,image:images[0]})
        }
        setLoading(false);
    }
    useEffect(()=>{
        getUser();
        console.log(user)
    },[])
    return (
        <div>
            <Navbar/>
            <PageHeader headertitle="Profile"  />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="">
                        <form className="signin-inner">
                            <div className="row">
                                <div className="col-12">
                                    <div className="avatar-upload-input text-center">

                                        <div className={classes.root+" flex justify-center"}>
                                            <Avatar alt={user.fullName} src={user.image} className={classes.large} />
                                        </div>
                                        <img src={publicUrl+"assets/img/icon/upload.png"} alt="img" />
                                        <h2>Upload your photo</h2>
                                        <p>Its must be a clean photo</p>
                                        <div className="avatar-edit-input">
                                            <input className="btn btn-base"  name={"images"} ref={imageRef} onChange={handleUpload} type="file" multiple id="imageUpload" size={"1048576"} accept=".png, .jpg, .jpeg" />
                                            <label className={"btn btn-base"} htmlFor="imageUpload">{loading?
                                                <button type="button"  disabled>
                                                    <svg className="animate-spin border-2 border-green-500 rounded-full h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                    </svg>
                                                    Uploading
                                                </button>:"Click here to Upload"}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">FullName</span>
                                        <input type="text" value={user.fullName||""} onChange={handleInput} name={"fullName"} placeholder="Name" />
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">UserName</span>
                                        <input type="text" value={user.username||""} onChange={handleInput} name={"username"} placeholder="username" />
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">Email</span>
                                        <input type="text" value={user.email||""} onChange={handleInput} name={"email"} placeholder="Email" />
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">Phone Number</span>
                                        <input type="text" value={user.phoneNumber||""} onChange={handleInput} name={"phoneNumber"} placeholder="PhoneNumber" />
                                    </label>
                                </div>
                                {
                                    user.userType==="Tenant" && <>
                                        <div className="col-md-6">
                                            <label className="single-input-inner style-bg-border">
                                                <span className="label">Gender</span>
                                                <div className={"row"}>
                                                    <div className={"flex col-md-6"}>
                                                        <input type="radio" id="male" checked={user.gender === "MALE"} onChange={handleInput} name="gender" value="MALE"/>
                                                        <label htmlFor="male">Male</label>
                                                    </div>
                                                    <div className={"flex col-md-6"}>
                                                        <input type="radio" id="female" checked={user.gender === "FEMALE"} onChange={handleInput} name="gender" value="FEMALE"/>
                                                        <label htmlFor="female">Female</label>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="single-input-inner style-bg-border">
                                                <span className="label">Marital Status</span>
                                                <div className={"row"}>
                                                    <div className={"flex col-md-6"}>
                                                        <input type="radio" id="single" checked={user.martalStatus === "SINGLE"} onChange={handleInput} name="martalStatus" value="SINGLE"/>
                                                        <label htmlFor="single">Single</label>
                                                    </div>
                                                    <div className={"flex col-md-6"}>
                                                        <input type="radio" id="married" checked={user.martalStatus === "MARRIED"} onChange={handleInput} name="martalStatus" value="MARRIED"/>
                                                        <label htmlFor="married">Married</label>
                                                    </div>
                                                </div>
                                            </label>
                                        </div></>
                                }
                                <div className="col-md-6">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">District</span>
                                        <input type="text" value={user.district||""} onChange={handleInput} name={"district"} placeholder="District" />
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">Sector</span>
                                        <input type="text" value={user.sector||""} onChange={handleInput} name={"sector"} placeholder="Sector" />
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">Cell</span>
                                        <input type="text" value={user.cell||""} onChange={handleInput} name={"cell"} placeholder="Cell" />
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">Street</span>
                                        <input type="text" value={user.street||""} onChange={handleInput} name={"street"} placeholder="Street Code" />
                                    </label>
                                </div>
                                <div className="col-12 mb-4">
                                    <button type={"button"} onClick={handleSubmit} className="btn btn-base w-100">Update Account</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer_v2/>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
})


export default connect(mapStateToProps,{updateStateData})(Profile);
