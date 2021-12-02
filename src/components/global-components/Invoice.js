import React, {useEffect, useState} from 'react';
import {PrintOutlined} from "@material-ui/icons";
import moment from "moment";
import {useLocation} from "react-router-dom";
function Invoice(props) {
    let location = useLocation();
    const [tenant,setTenant] = useState({});
    const [payments,setPayments] = useState([]);
    useEffect(()=>{
        setTenant(location.state.payment.tenant);
        console.log(location.state.payment);
        setPayments(location.state.payment.payments)
    },[location.state])
    const opt = {
        margin: 1,
        filename: `raport-${moment().format("LLLL")}.pdf`,
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2},
        jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'}
    };

    function printDoc() {
        let element = document.getElementById("report");
        // eslint-disable-next-line no-undef
        html2pdf().from(element).set(opt).save();
    }
    let publicUrl = process.env.PUBLIC_URL+'/'
    return (
        <div>
            <div className={"md:px-40 py-4 bg-gray-200"}>
               <button onClick={printDoc} className={"font-bold text-base bg-white py-1 px-3 border-2 border-gray-300 hover:bg-gray-400"}> <PrintOutlined color={"primary"} fontSize={"small"}/>Print</button>
            </div>
            <div className={"md:mx-40 "}>
                <div className={"p-4 my-4 border-2 border-gray-300"} id={"report"}>
                    <div className={"title flex  border-b justify-between"}>
                        <div>
                            <img  src={publicUrl+"assets/img/logo.png"}/>
                        </div>
                        <div>
                            <p>Invoice Reference : {Math.round(Math.random() * (1000000 - 100000) + 100000)}</p>
                            <p>Invoice Date : {moment().format("lll")}</p>
                        </div>
                    </div>
                    <div  className={"body flex flex-col justify-center gap-4 p-4  border-b"}>
                        <h2 className={"text-center"}>Tenant Name : {tenant.fullName}</h2>
                        <h2 className={"text-center"}>Tenant Email : {tenant.email}</h2>
                        <h2 className={"text-center"}>Tenant Phone : {tenant.phoneNumber}</h2>
                        <h2 className={"text-center"}>Tenant Address : {tenant.district}, {tenant.sector}, {tenant.cell} , {tenant.street}</h2>
                        <h2 className={"text-center"}>Paid date  : {moment(tenant.createDate).format("lll")}</h2>
                    </div>
                    <div  className={"body flex flex-col justify-center gap-4 p-4  border-b"}>
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Month Payment
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount
                                                </th>

                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                payments.map((p,index)=>(
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {p.payedMonth} of {p.year}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {p.payedAmount} Rwf
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">Total amount</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{payments.reduce((a, b) => a + (b["payedAmount"] || 0), 0)} Rwf</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"footer p-4"}>
                        <div>
                            <p className={"flex justify-between"}>Contact on <span>nishimwelys@gmail.com</span>  <span>+25078078154</span></p>
                        </div>
                        <div>
                            <p className={"text-center mt-2"}>LiveHappy</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Invoice;
