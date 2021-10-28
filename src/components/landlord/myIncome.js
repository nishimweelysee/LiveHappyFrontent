import React, {useEffect, useState} from 'react';
import LandLordDashNav from "../Layout/LandLordDashNav";
import {httpRequest} from "../../config/httpRequest";
import moment from "moment";
import {connect} from "react-redux";

function MyIncome(props) {
    const [payments,setPayments] = useState([]);
    const handlePayments = async (houseId)=>{
        const {response,error} = await httpRequest("GET",`/api/payment/landlord`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            console.log(response.data)
            setPayments([...response.data.data]);
        }
    }
    useEffect(()=>{
        handlePayments();
    },[])
    return (
        <LandLordDashNav>
            <div>
                <div>
                    {
                        payments.map((pay,index)=>{
                            return (
                                <div key={index} className={"flex flex-col p-2 my-2"}>

                                    <div className={"w-full p-2 bg-gray-300"}>This invoice dated {moment(pay.createDate).format("lll")}</div>
                                    <div className={"flex flex-col gap-2 bg-gray-100"}>

                                        <div>Tenant names : {pay.tenant.fullName}</div>
                                        <div>Tenant Email : {pay.tenant.email}</div>
                                        <div>Tenant phoneNumber : {pay.tenant.phoneNumber}</div>
                                        <div>Status of payments : {pay.paymentState}</div>
                                        <div> {pay.payments.map((p,i)=>{
                                            return <div className={"flex gap-1"} key={i}>
                                                <p>Payed Month {p.payedMonth}</p> of <p>{p.year}</p> via {p.method}
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
