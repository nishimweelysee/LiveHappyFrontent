import React, {useEffect, useState} from 'react';
import TenantDashNav from "../Layout/TenantDashNav";
import {httpRequest} from "../../config/httpRequest";
import moment from "moment";
import {connect} from "react-redux";
import PaymentBox from "../global-components/PaymentBox";
import {v4 as uuidv4} from "uuid";
import cogoToast from "cogo-toast";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import {RavePaymentButton, RaveProvider} from "react-ravepayment";
import {value} from "lodash/seq";
import DatePicker from "react-datepicker";
import {MenuItem, Select} from "@material-ui/core";

function MyPayments(props) {
    const [payments,setPayments] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [state,setState] = useState("");
    const [ogPayment,setOgPayment] = useState([])
    const handlePayments = async (houseId)=>{
        const {response,error} = await httpRequest("GET",`/api/payment/tenant`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            setPayments([...response.data.data]);
            setOgPayment([...response.data.data]);
        }
    }
    const [pay,setPay]=useState({});
    const [payment1,setPayment1] = useState({
        id:"",
        houseId:"",
        payedAmount:"",
        message:"",
        numberOfMonths:1,
        method:"",
        payedMonth:""
    })

    const getDate = (month,year)=>{
        console.log(month,year)
        var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        const index = monthNames.findIndex(element => {
            return element.toLowerCase() === month.toLowerCase();
        });
        let date = `${year}-${index+1}-1`;
        return new Date(date);
    }

    const [showModalComplete, setShowModalComplete] = React.useState(false);
    const handleCompletePayment = (paym)=>{
        setPay({...paym});
        payment1.id=paym.id;
        payment1.houseId=paym.house;
        payment1.payedAmount=paym.totalAmountRemained;
        payment1.message=paym.message;
        payment1.numberOfMonths=1;
        payment1.method=paym.method;
        payment1.payedMonth=getDate(paym.payments[0].payedMonth,paym.payments[0].year);
        setPayment1({...payment1,...payment1})
        setShowModalComplete(true);
    }
    const config1 = {
        txref: `LHTXR_${uuidv4()}`,
        customer_email: props.user.data.email,
        customer_phone: props.user.data.phoneNumber,
        amount: payment1.payedAmount,
        PBFPubKey: process.env.REACT_APP_PUBLIC_KEY,
        currency: "RWF",
        orderRef: `LHODR_${uuidv4()}`,
        subaccounts: [],
        production: false,
        payment_options: 'card,mobilemoney,ussd',
        onSuccess: async (e) => {
            console.log(e)
            if(e.tx) {
                if (e.tx.status === "successful") {
                    payment1.method = e.tx.paymentType;
                    const resp = await httpRequest("POST", `/api/payment`, { ...payment1 }, { "Authorization": `Bearer ${props.user.token}` })
                    if (!resp.error) {
                        cogoToast.success(resp.response.data.message||"");
                    }
                }
            }
        },
        onClose: () => {

        }
    };
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
        <TenantDashNav>
            <div className={"p-4"}>
                <div className={"row"}>
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
                    <div className={"row"}>
                    {
                        payments.map((pay,index)=>{
                            return (
                                <PaymentBox handleCompletePayment={handleCompletePayment} className={"col-md-6"} index={index} pay={pay} key={index}/>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            <Modal size="regular" active={showModalComplete} toggler={() => setShowModalComplete(false)}>
                <ModalHeader toggler={() => setShowModalComplete(false)}>
                    Payment Process
                </ModalHeader>
                <ModalBody>
                    <div className={"flex flex-col gap-4"}>
                        <div>
                            <div className={"flex flex-col gap-2"}>
                                <p>Amount to pay per month is {pay.totalAmountPayed+pay.totalAmountRemained} Rwf and you have payed {pay.totalAmountPayed}</p>
                                <p>Total Amount to pay  is {pay.totalAmountRemained} Rwf</p>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center p-2">
                            <RaveProvider {...config1}>
                                <RavePaymentButton id="ravebutton" className="bg-blue-700 rounded animated hover:fadein hover:bg-blue-400 p-1 text-white">Pay Now</RavePaymentButton>
                            </RaveProvider>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </TenantDashNav>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(MyPayments)
