import React, {useEffect, useRef, useState} from 'react';
import LandLordDashNav from "../Layout/LandLordDashNav";
import {useLocation} from "react-router-dom";
import {httpRequest} from "../../config/httpRequest";
import {connect} from "react-redux";
import cogoToast from "cogo-toast";

function Contracts(props) {
    let location = useLocation();
    const [landlord,setLandlord] = useState({});
    const [tenant,setTenant] = useState({});
    const [house,setHouse] = useState({});
    let formRef = useRef();
    useEffect(()=>{
        setLandlord(location.state.landLord);
        setTenant(location.state.tenant);
        setHouse(location.state.house);

    },[location])

    async  function handleSubmit() {
        let frm = document.getElementById("contract");
        let body = new FormData(frm);
        body.append("houseId",house.id);
        body.append("tenantId",tenant.id);
        body.append("landlordId",landlord.id);
        body.append("aggAmount",house.price)
        const {response,error} = await  httpRequest("POST","/api/contract",body,{"enctype":"multipart/form-data","Authorization":`Bearer ${props.user.token}`});
        if(!error){
            console.log(response.data)
            cogoToast.success(response.data.message)
        }
    }

    return (
        <LandLordDashNav>
            <div className={"p-4"}>
                <div className={"flex justify-center p-2 "}>
                    <h2>Complete The process of Contract </h2>
                </div>
                <form id={"contract"} ref={formRef}>
                    <div className={"property-form-grid"}>
                        <div className={"row"}>
                            <div className="col-md-12">
                                <div className={"row px-3"}>
                                    <div className="col-md-6">
                                        <label className="single-input-inner style-bg-border">
                                            <span className="label">Name : {tenant.fullName}</span>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="single-input-inner style-bg-border">
                                            <span className="label">Email : {tenant.email}</span>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="single-input-inner style-bg-border">
                                            <span className="label">Phone number : {tenant.phoneNumber}</span>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="single-input-inner style-bg-border">
                                            <span className="label">District : {tenant.district}</span>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="single-input-inner style-bg-border">
                                            <span className="label">Sector : {tenant.sector}</span>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="single-input-inner style-bg-border">
                                            <span className="label">Cell : {tenant.cell}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="col-md-12">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">Start Date</span>
                                        <input type={"date"} name={"startDate"}/>
                                    </label>
                                </div>
                                <div className="col-md-12">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">End Date</span>
                                        <input type={"date"} name={"endDate"}/>
                                    </label>
                                </div>
                                <div className="col-md-12">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">Before Pay Month(s)</span>
                                        <input type={"number"} name={"beforePayMonth"}/>
                                    </label>
                                </div>
                                <div className="col-md-12">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">Upload Sample Contract Documents</span>
                                        <input type={"file"} multiple={true} name={"sampleContract"}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} type={"button"}>Submit</button>

                </form>
            </div>
        </LandLordDashNav>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Contracts)
