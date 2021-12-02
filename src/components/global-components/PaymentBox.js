import React from 'react';
import moment from "moment";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function PaymentBox({pay,index,className,handleCompletePayment}) {
    const completePayment = ()=>{
        return handleCompletePayment(pay);
    }
    let bgColor = pay.paymentState!=="FULL"?"border-red-600":"border-blue-600";
    return (
        <div key={index} className={"flex flex-col p-2 my-2 "+className+" border-2 "+bgColor}>
            <div className={"w-full p-2 bg-gray-300 flex justify-between"}>
                <p>Your invoice dated {moment(pay.createDate).format("lll")}</p>
                <p className={"text-blue-700 font-bold"}>Payed Month {pay.payedMonth} of {pay.year}</p>
                <div className={"flex gap-2"}>{
                pay.paymentState!=="FULL" && <button onClick={completePayment} className={"p-1 shadow rounded bg-gray-100"}>Complete Payment</button>}
                    <Link to={{pathname:"/report",state:{payment:pay}}}  className={"p-1 shadow rounded bg-gray-100"}>View</Link>
                </div></div>
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
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(PaymentBox)
