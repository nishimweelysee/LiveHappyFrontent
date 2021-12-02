import React, {useEffect, useRef, useState} from 'react';
import LandLordDashNav from "../Layout/LandLordDashNav";
import {httpRequest} from "../../config/httpRequest";
import moment from "moment";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import {MenuItem, Select} from "@material-ui/core";

function MyIncome(props) {
    const [payments,setPayments] = useState([]);
    const [ogPayment,setOgPayment] = useState([])
    const [startDate,setStartDate] = useState("");
    const [state,setState] = useState("");
    const handlePayments = async (houseId)=>{
        const {response,error} = await httpRequest("GET",`/api/payment/landlord`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            setPayments([...response.data.data]);
            setOgPayment([...response.data.data]);
        }
    }
    const handleFilter = (keyTerm)=>{
        if(typeof keyTerm=="object"){
            keyTerm =new Date(keyTerm).getFullYear();
        }
        setState(keyTerm)
        let filteredPayments  = keyTerm==""?ogPayment:ogPayment.filter(pay=>pay.paymentState===keyTerm || pay.year==keyTerm);
        setPayments([...filteredPayments])
    }
    useEffect(()=>{
        handlePayments();
    },[])
    return (
        <LandLordDashNav>
            <div className="row p-4">
                <div className="row col-md-12">
                    <div className="col-md-6">
                        <label className="single-input-inner style-bg-border">
                            <span className="label">Filter by Year</span>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    handleFilter(date);
                                    setStartDate(date);
                                }}
                                placeHolder={"Filter by Year"}
                                dateFormat="yyyy"
                                showYearPicker
                                className={"p-2 border-2 border-blue-500"}
                            />
                        </label>
                    </div>
                    <div className="col-md-6">
                        <div className="single-select-inner style-bg-border">
                            <span className="label">Filter by Status</span>
                            <Select id={"stateFilter"} className={"w-full p-2"}  value={state} onChange={e=>handleFilter(e.target.value)}>
                                <MenuItem  value={""}>None</MenuItem>
                                <MenuItem key={"FULL"} value={"FULL"}>FULL</MenuItem>
                                <MenuItem key={"PARTIAL"} value={"PARTIAL"}>PARTIAL</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        payments.map((pay,index)=>{
                            let brColor  = pay.paymentState!=="FULL"?"border-red-600":"border-blue-600";
                            let bgColor  = pay.paymentState!=="FULL"?"bg-red-600":"bg-blue-600";
                            return (
                                <div key={index} className={`flex flex-col p-2 my-2 col-md-6 border-2 ${brColor}`}>

                                    <div className={"w-full p-2 bg-gray-300 flex justify-between"}>
                                        <p>This invoice dated {moment(pay.createDate).format("lll")}</p>
                                        <p className={"text-blue-700 font-bold"}>Payed Month {pay.payedMonth} of {pay.year}</p>
                                        <p className={bgColor+" text-white p-1"} >{pay.paymentState} Payed</p>
                                    </div>
                                    <div className={"flex flex-col gap-2 bg-gray-100"}>

                                        <div>Tenant names : {pay.tenant.fullName}</div>
                                        <div>Tenant Email : {pay.tenant.email}</div>
                                        <div>Tenant phoneNumber : {pay.tenant.phoneNumber}</div>
                                        <div>Status of payments : {pay.paymentState}</div>
                                        <div> {pay.payments.map((p,i)=>{
                                            return <div className={"flex gap-1"} key={i}>
                                                <p>Payment Made at {p.payedMonth}</p>, <p>{p.year}</p> via {p.method}
                                            </div>
                                        })}</div>
                                        <div className={"bg-blue-600 text-white p-2"}>Total amount payed : {pay.totalAmountPayed} Rwf</div>
                                        <div className={"bg-blue-900 text-white p-2"}>Total amount Remained : {pay.totalAmountRemained} Rwf</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </LandLordDashNav>
    );
}


const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(MyIncome)
