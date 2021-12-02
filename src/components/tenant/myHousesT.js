import React, {useEffect, useState} from 'react';
import {httpRequest} from "../../config/httpRequest";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import cogoToast from "cogo-toast";
import TenantDashNav from "../Layout/TenantDashNav";
import moment from "moment";
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
import { v4 as uuidv4 } from 'uuid';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import  DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {value} from "lodash/seq";
import PaymentBox from "../global-components/PaymentBox";
import {SupervisedUserCircleSharp} from "@material-ui/icons";
import UserProfile from "../section-components/UserProfile";


const columns = [
    { id: 'images', label: 'Image', maxWidth: 40 },
    {
        id: 'name',
        label: 'Title',
        align: 'center',
    },
    {
        id: 'houseCategory',
        label: 'Category',
        align: 'center',
    },
    {
        id: 'location',
        label: 'Location',
        align: 'center',
    },
    {
        id: 'status',
        label: 'Status',
        align: 'center',
    },
    {
        id: 'action',
        label: 'Action',
        align: 'center',
    },{
        id: 'owner',
        label: 'Landlord',
        align: 'center',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
    },
    container: {
        // maxHeight: 440,
    },
    image: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    table:{
        minWidth: 300
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
    },
}));

function MyHousesT(props) {
    const [houses,setHouses] = useState([]);
    useEffect(()=>{
        const getHouseData =async ()=>{
            const {response,error}=await httpRequest("GET",'/api/tenant/house',null,{"Authorization":`Bearer ${props.user.token}`});
            if(!error){
                let livedHouse = response.data.data.map(h=>{
                    return h.house;
                });
                setHouses(livedHouse);
            }
        }
        getHouseData();
    },[props.user])


    //Table
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [payments,setPayments] = useState([]);
    const [openPaymentModal, setOpenPaymentModal] = React.useState(false);
    const [openPayModal, setOpenPayModal] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [monthsToPay,setMonthsToPay] = useState(0);
    const [paymentState,setPaymentState] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [house,setHouse] = useState({})
    const [showModal, setShowModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [landLord,setLandlord] = useState({});
    const [year,setYear] = useState("");
    const [state,setState] = useState("");
    const [ogPayment,setOgPayment] = useState([])
    const handleFilter = (keyTerm)=>{
        if(typeof keyTerm=="object"){
            keyTerm =new Date(keyTerm).getFullYear();
        }
        setState(keyTerm)
        let filteredPayments  = keyTerm==""?ogPayment:ogPayment.filter(pay=>pay.paymentState===keyTerm || pay.year==keyTerm);
        setPayments([...filteredPayments])
    }
    const handleClickOpen = (landlord) => {
        setLandlord({...landlord});
        setOpen(true);
    };

    const handleCloseProfile = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleClose = () => {
        setOpenPaymentModal(false)
        setOpenPayModal(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    let publicUrl = process.env.PUBLIC_URL+'/'

    async function handlePay(houseId) {
        let house = houses.find(h=>h.id===houseId);
        setHouse({...house});
        setShowModal(true);
    }

    async function handleViewPayments(houseId) {
        const {response,error} = await httpRequest("GET",`/api/payment/${houseId}`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            setPayments([...response.data.data]);
            setOgPayment([...response.data.data]);
            setOpenPaymentModal(true);
        }
    }

    const [isMonthDisabled,setIsMonthDisabled]= useState(false);
    const [totalAmount,setTotalAmount] = useState(0);
    function handleSelectState(e) {
        setPaymentState(e.target.value);
        if(e.target.value==="Half"){
            setMonthsToPay(1);
            setIsMonthDisabled(true);
        }else{
            setIsMonthDisabled(false);
        }
    }
    function handleMonthsToPay(e) {
        setMonthsToPay(e.target.value);
        setTotalAmount(e.target.value * house.price);
    }
    const [payment,setPayment] = useState({
        houseId:house.id,
        payedAmount:totalAmount,
        message:"",
        numberOfMonths:monthsToPay,
        method:"",
        payedMonth:new Date()
    })

    const user = props.user.data;
    const config = {
        txref: `LHTXR_${uuidv4()}`,
        customer_email: user.email,
        customer_phone: user.phoneNumber,
        amount: totalAmount,
        PBFPubKey: process.env.REACT_APP_PUBLIC_KEY,
        currency: "RWF",
        orderRef: `LHODR_${uuidv4()}`,
        subaccounts: [],
        production: false,
        payment_options: 'card,mobilemoney,ussd',
        onSuccess: async (e) => {
            console.log(e)
            if(e.tx){
                if(e.tx.status==="successful"){
                    payment.houseId= house.id;
                    payment.numberOfMonths=monthsToPay;
                    payment.payedAmount=totalAmount;
                    payment.payedMonth=startDate;
                    payment.message="";
                    payment.method = e.tx.paymentType;
                    const resp = await httpRequest("POST", `/api/payment`, { ...payment }, { "Authorization": `Bearer ${props.user.token}` })
                    if (!resp.error) {
                        cogoToast.success(resp.response.data.message||"");
                    }
                }
            }

        },
        onClose: () => {

        }
    };
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

    const [showModalComplete, setShowModalComplete] = React.useState(false);
   const handleCompletePayment = (paym)=>{
       setPay({...paym});
       payment1.id=paym.id;
       payment1.houseId=paym.house;
       payment1.payedAmount=paym.totalAmountRemained;
       payment1.message=paym.message;
       payment1.numberOfMonths=1;
       payment1.method=paym.method;
       payment1.payedMonth=paym.payments[0].payedMonth;
       setPayment1({...payment1,...payment1})
       setShowModalComplete(true);
       handleClose();
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

    return (
        <TenantDashNav>
           <div className={"p-4 m-2"}>
               <Paper className="container" >
                   <TableContainer  className={classes.container}>
                       <Table  className={classes.table} stickyHeader aria-label="sticky table">
                           <TableHead>
                               <TableRow>
                                   {columns.map((column) => (
                                       <TableCell
                                           key={column.id}
                                           align={column.align}
                                           style={{ minWidth: column.minWidth,maxWidth: column.maxWidth }}
                                       >
                                           {column.label}
                                       </TableCell>
                                   ))}
                               </TableRow>
                           </TableHead>
                           <TableBody>
                               {houses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                                   return (
                                       <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                           {columns.map((column,index) => {
                                               const value = row[column.id];
                                                    return (
                                                   <TableCell key={index} align={column.align}>
                                                       {
                                                           column.id==="images"?
                                                               <img style={{maxWidth:column.maxWidth}} height={30} alt={""} src={value[0]}/>:
                                                           column.id==="action"?<div>
                                                                   <Button variant="outlined" color="primary" onClick={e=>handleViewPayments(row.id)}>
                                                                       Payments
                                                                   </Button>
                                                                   <Button variant="outlined" color="primary" onClick={e=>handlePay(row.id)}>
                                                                       Pay Now
                                                                   </Button>
                                                               </div>:
                                                           column.id==="location"?<div>
                                                               {row.district+", "+row.sector+", "+row.street}
                                                           </div>:column.id==="houseCategory"?value.name:column.id==="owner"?<div>
                                                               <span onClick={e=>handleClickOpen(row.landLord)} className={"text-white bg-blue-600 cursor-pointer p-1 rounded"}><SupervisedUserCircleSharp/> Profile</span>
                                                               </div>:value
                                                       }
                                                   </TableCell>
                                               );
                                           })}
                                       </TableRow>
                                   );
                               })}
                           </TableBody>
                       </Table>
                   </TableContainer>
                   <TablePagination
                       rowsPerPageOptions={[10, 25, 100]}
                       component="div"
                       count={houses.length}
                       rowsPerPage={rowsPerPage}
                       page={page}
                       onPageChange={handleChangePage}
                       onRowsPerPageChange={handleChangeRowsPerPage}
                   />
               </Paper>
           </div>
            <UserProfile open={open} handleClose={handleCloseProfile} userData={landLord}/>
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={openPaymentModal}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"House payments"}</DialogTitle>
                    <DialogContent style={{width:fullScreen?"auto":"600px"}}>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="single-input-inner style-bg-border">
                                    <span className="label">Filter by Year</span>
                                    <DatePicker
                                        selected={year}
                                        onChange={(date) => {
                                            handleFilter(date);
                                            setYear(date);
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
                        <div>
                            {
                                payments.map((pay,index)=>{
                                    return (
                                        <PaymentBox className={"col-md-12"} handleCompletePayment={handleCompletePayment} index={index} pay={pay} key={index}/>
                                    )
                                })
                            }
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Modal size="regular" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    Payment Process
                </ModalHeader>
                <ModalBody>
                    <div className={"flex flex-col gap-4"}>
                        <div className={"flex gap-1 justify-between"}>
                            <p>Are you going to pay full or half ?</p>
                            <FormControl className={classes.formControl}>
                                <Select
                                    className={classes.selectEmpty}
                                    value={paymentState}
                                    name="paymentState"
                                    variant="outlined"
                                    onChange={handleSelectState}
                                    inputProps={{ 'aria-label': 'paymentState' }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Full"}>Full Payment</MenuItem>
                                    <MenuItem value={"Half"}>Half Payment</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            {
                                paymentState==="Half" && <div>
                                    <div className={"flex gap-1 justify-between"}><p>Enter amount you want to pay but you were supposed to pay {house.price} /Month ? </p><input onChange={e=>setTotalAmount(e.target.value)} max={house.price} className={"border border-blue-500 p-2 "} type={'number'} name={"halfAmount"}/></div>
                                </div>
                            }
                        </div>
                        <div className={"flex gap-1 justify-between"}><p>How many months do you want to pay ? </p><input disabled={isMonthDisabled} value={monthsToPay} onChange={handleMonthsToPay} className={"border border-blue-500 p-2 "} type={'number'} name={"monthToPay"}/></div>
                        <div className="flex gap-1 justify-between">
                            <p>Select The First Month your paying  </p><div className={"flex gap-2 justify-end"}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                        payment.payedMonth=value;
                                        setPayment({...payment,...payment});
                                    }}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    showFullMonthYearPicker
                                    className={"p-2 border border-blue-500"}
                                />
                            </div>
                        </div>
                        <div>
                            {
                                monthsToPay!==0 && <div className={"flex flex-col gap-2"}>
                                    <p>Amount to pay per month is {house.price} Rwf</p>
                                    <p>Total Amount to pay  is {totalAmount} Rwf</p>
                                </div>
                            }
                        </div>

                        <div className="flex gap-4 justify-center p-2">
                                <RaveProvider {...config}>
                                    <RavePaymentButton id="ravebutton" className="bg-blue-700 rounded animated hover:fadein hover:bg-blue-400 p-1 text-white">Pay Now</RavePaymentButton>
                                </RaveProvider>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
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

export default connect(mapStateToProps)(MyHousesT)
