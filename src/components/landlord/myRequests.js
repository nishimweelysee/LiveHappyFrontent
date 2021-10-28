import React, {useEffect, useState} from 'react';
import LandLordDashNav from "../Layout/LandLordDashNav";
import {Link, useParams} from "react-router-dom";
import {httpRequest} from "../../config/httpRequest";
import {connect} from "react-redux";
import {
    Collapse,
    Dialog,
    DialogContent,
    TableCell,
    TableContainer,
    Typography
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import moment from 'moment';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Heading6} from "@material-tailwind/react";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import _ from "lodash";
import {saveRate} from "../../redux/user/loadState";
import {RATE} from "../../redux/user/user.types";
import cogoToast from "cogo-toast";


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
}));

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [openModal,setOpenModal] = React.useState(false);
    const classes = useRowStyles();
    const {tenant} = row;
    const {house} = row;
    const classes2 = useStyles();
    const getRequests = props.getRequests;

    const [value, setValue] = React.useState(2);
    const [five,setFive] = useState({value:0,avg:0});
    const [four,setFour] = useState({value:0,avg:0});
    const [three,setThree] = useState({value:0,avg:0});
    const [two,setTwo] = useState({value:0,avg:0});
    const [one,setOne] = useState({value:0,avg:0});
    const [backColor,setBackCOlor] = useState("");
    const [rates,setRates] = useState([]);


    const getRates = async ()=>{
        const resp = await httpRequest('GET',`/api/rate/${tenant.id}`);
        if(!resp.error){
            let rates = resp.response.data.data;
            setRates(rates)
        }
        let sum = _.sumBy(rates,'rates');
        let avg =sum/rates.length;
        setValue(_.round(avg,1));
        saveRate(RATE,_.round(avg,1))
        if(avg>=4 &&avg <5)
            setBackCOlor("bg-success");
        else if(avg>=3 &&avg <4)
            setBackCOlor("bg-primary");
        else if(avg>=2 &&avg <3)
            setBackCOlor("bg-info");
        else if(avg>=1 &&avg <2)
            setBackCOlor("bg-warning");
        else
            setBackCOlor("bg-danger");
        let fiv = _.countBy(rates,r=>r.rates>=4 && r.rates <5).true||0;
        let fou = _.countBy(rates,r=>r.rates>=3 && r.rates <4).true||0;
        let thre = _.countBy(rates,r=>r.rates>=2 && r.rates <3).true||0;
        let tw = _.countBy(rates,r=>r.rates>=1 && r.rates <2).true||0;
        let on = _.countBy(rates,r=>r.rates>=0 && r.rates <1).true||0;
        let min = 100/rates.length;
        setFive({...five,value: fiv,avg: _.round(fiv*min,0)});
        setFour({...four, value: fou,avg: _.round(fou*min,0)});
        setThree({...three,value: thre,avg: _.round(thre*min,0)});
        setTwo({...two,value: tw,avg: _.round(tw*min,0)});
        setOne({...one,value: on,avg: _.round(on*min,0)});
    }

    function getStatusColor(status) {
        switch (status) {
            case "pending":
                return "bg-warning";
            case "rejected":
                return "bg-danger";
            case "approved":
                return "bg-primary";
            default:
                return "";
        }
    }

    let publicUrl = process.env.PUBLIC_URL+'/'

    function handleOpenProfile() {
        getRates();
        setOpenModal(true);
    }

    async  function handleApproveRequest() {
        const {response,error} = await  httpRequest("GET",`/api/request/${row.id}/Approved`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            cogoToast.success(response.data.message);
            getRequests();
        }
    }

    async  function handleRejectRequest() {
        const {response,error} = await  httpRequest("GET",`/api/request/${row.id}/Rejected`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            cogoToast.success(response.data.message)
            getRequests();
        }
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{tenant.fullName}</TableCell>
                <TableCell align="center">{tenant.email}</TableCell>
                <TableCell align="center">{house.name}</TableCell>
                <TableCell align="center">{moment(row.createDate).format('lll')}</TableCell>
                <TableCell align="center"><p className={`${getStatusColor(row.status.toLowerCase())} text-white rounded-full p-1`}>{row.status}</p></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tenant
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">Phone</TableCell>
                                        <TableCell align="right"/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {tenant.fullName}
                                            </TableCell>
                                            <TableCell>{tenant.email}</TableCell>
                                            <TableCell align="right">{tenant.phoneNumber}</TableCell>
                                            <TableCell align="right">
                                               <button onClick={handleOpenProfile} className={"btn btn-primary"}>View Profile</button>
                                            </TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                            <Typography variant="h6" gutterBottom component="div">
                                House
                            </Typography>
                            <div className={"flex flex-row w-full border-2 border-gray-200 shadow-lg"}>
                                <div  className={"w-1/3"}>
                                    <img src={house.images[0]} alt={"House "}/>
                                </div>
                                <div  className={"w-full p-2"}>
                                    <h1 className={"text-xl font-bold text-center"}>{house.name}</h1>
                                    <div className={"flex justify-evenly"}>
                                        <div className={"flex flex-col gap-2"}>
                                            <p>Location: {house.district}, {house.sector}, {house.cell}, {house.strict}</p>
                                            <p>Category: {house.houseCategory.name}</p>
                                            <p>Price: {house.price} /Month</p>
                                        </div>
                                        <div className={"flex flex-col gap-2"}>
                                            <p>Bedrooms : {house.bedrooms}</p>
                                            <p>Bathrooms : {house.bathrooms}</p>
                                            <p>Kitchens : {house.kitchens}</p>

                                        </div>
                                        <div>
                                            {row.status.toLowerCase()==="approved" && <Link to={{pathname: "/landlord/send/contract", state: {...row}}}
                                                   className={"p-2 rounded bg-blue-600 hover:bg-blue-300 text-white"}>Send
                                                Contract</Link>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
                <Dialog
                    className={"w-full"}
                    open={openModal}
                    onClose={e=>setOpenModal(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <div className={"w-full flex flex-col gap-4"}>
                            <div className={classes.root+' flex justify-center'}>

                                <Avatar aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        variant="circular"
                                        color="primary"

                                        alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes2.large} />
                            </div>
                            <div className={"grid sm:grid-cols-2 grid-cols-1"}>
                                <div className={"flex flex-col"}>

                                    <div  className="details">
                                        <div>
                                            <div id="popover" className="transition z-50   duration-150 ease-in-out  w-full mx-auto">
                                                <div className="container">
                                                    <div className="rating-card">
                                                        <div className="text-center m-b-30">
                                                            <h4>Tenant Rating Overview</h4>
                                                            <br/>
                                                            <h1 className="rating-number">{value}<small>/5</small>
                                                            </h1>
                                                            <div
                                                                className="rating-stars d-inline-block position-relative mr-2">
                                                                <img src={publicUrl+"assets/img/icon/grey-star.svg"} alt=""/>
                                                                <div className="filled-star" style={{width:(value*20)+'%'}}/>
                                                            </div>
                                                            <div className="text-muted">{rates.length} ratings</div>
                                                        </div>
                                                        <div className="rating-divided">
                                                            <div className="rating-progress">
                                                                   <span className="rating-grade">5 <img
                                                                       src={publicUrl+"assets/img/icon/star.svg"} alt=""/></span>
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-warning" role="progressbar" style={{width: five.avg+'%'}} aria-valuenow={five.avg} aria-valuemin="0" aria-valuemax="100"/>
                                                                </div>
                                                                <span className="rating-value">{five.avg} %</span>
                                                            </div>
                                                            <div className="rating-progress">
                                                                   <span className="rating-grade">4 <img
                                                                       src={publicUrl+"assets/img/icon//star.svg"} alt=""/></span>
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-warning" role="progressbar" style={{width: four.avg+'%'}} aria-valuenow={four.avg} aria-valuemin="0" aria-valuemax="100"/>
                                                                </div>
                                                                <span className="rating-value">{four.avg} %</span>
                                                            </div>
                                                            <div className="rating-progress">
                                                                   <span className="rating-grade">3 <img
                                                                       src={publicUrl+"assets/img/icon/star.svg"} alt=""/></span>
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-warning" role="progressbar" style={{width: three.avg+'%'}} aria-valuenow={three.avg} aria-valuemin="0" aria-valuemax="100"/>
                                                                </div>
                                                                <span className="rating-value">{three.avg} %</span>
                                                            </div>
                                                            <div className="rating-progress">
                                                                   <span className="rating-grade">2 <img
                                                                       src={publicUrl+"assets/img/icon/star.svg"} alt=""/></span>
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-warning" role="progressbar" style={{width: two.avg+'%'}} aria-valuenow={two.avg} aria-valuemin="0" aria-valuemax="100"/>
                                                                </div>
                                                                <span className="rating-value">{two.avg} %</span>
                                                            </div>
                                                            <div className="rating-progress">
                                                                   <span className="rating-grade">1 <img
                                                                       src={publicUrl+"assets/img/icon/star.svg"} alt=""/></span>
                                                                <div className="progress">
                                                                    <div className="progress-bar bg-warning" role="progressbar" style={{width: one.avg+'%'}} aria-valuenow={one.avg} aria-valuemin="0" aria-valuemax="100"/>
                                                                </div>
                                                                <span className="rating-value">{one.avg} %</span>
                                                            </div>
                                                        </div>
                                                        <hr className="my-5 border-t border-gray-200" />
                                                        <div><Link to={"/reviews"} className={"underline hover:text-blue-700 p-2 text-sm"}>View all Tenant reviews</Link></div>
                                                        <div>
                                                            <button className={"p-2 rounded bg-blue-600 text-white hover:bg-blue-300"}>Add your Review</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className={"shadow-lg flex flex-col justify-between p-4 mb-4"}>
                                    <div className={"flex flex-col gap-2"}>
                                        <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>Full Name: </label><label>{tenant.fullName}</label></div>
                                        <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>User Name: </label><label>{tenant.username}</label></div>
                                        <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>Email Address: </label><label>{tenant.email}</label></div>
                                        <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>Phone Number : </label><label>{tenant.phoneNumber}</label></div>
                                        <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>Gender: </label><label>{tenant.gender}</label></div>
                                        <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>Marital status: </label><label>{tenant.martalStatus}</label></div>

                                       <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>District : </label><label>{tenant.district}</label></div>
                                       <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>Sector: </label><label>{tenant.sector}</label></div>
                                       <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>Cell: </label><label>{tenant.cell}</label></div>
                                       <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>Village: </label><label>{tenant.village}</label></div>
                                       <div className={"flex justify-between gap-4"}><label className={"text-sm font-bold"}>Street Code: </label><label>{tenant.street}</label></div>

                                    </div>
                                    <div className={"flex justify-around mb-2"}>
                                        <button onClick={handleApproveRequest} className={"p-2 rounded bg-blue-600 text-white hover:bg-blue-300"}>Approve</button>
                                        <button onClick={handleRejectRequest} className={"p-2 rounded bg-red-600 text-white hover:bg-red-300"}>Reject</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </DialogContent>
                </Dialog>
            </TableRow>
        </React.Fragment>
    );
}

function MyRequests(props) {
    const {status} = useParams()
    const {token} = props.user;
    const [requests,setRequests] = useState([]);
    const getRequests = async ()=>{
        const {response,error}=await httpRequest('GET','/api/request/landlord',null,{"Authorization":`Bearer ${token}`});
        if(!error){
            let requests = response.data.data.filter(r=>r.status.toLowerCase()===status.toLowerCase());
            setRequests([...requests]);
        }
    }
    useEffect(()=>{
        getRequests();
    },[status,Row])
    return (
        <LandLordDashNav>
           <div className={"p-4"}>
               <Heading6 className={"text-center p-2 m-auto"}>List of {status} Requests ({requests.length})</Heading6>
               <TableContainer>
                   <Table aria-label="simple table">
                       <TableHead>
                           <TableRow>
                               <TableCell />
                               <TableCell align="center">Tenant Name</TableCell>
                               <TableCell align="center">Tenant Email</TableCell>
                               <TableCell align="center">House Title</TableCell>
                               <TableCell align="center">Sent Date</TableCell>
                               <TableCell align="center">Status</TableCell>
                               <TableCell />
                           </TableRow>
                       </TableHead>
                       <TableBody>
                           {requests.map((row,index) => (
                               <Row key={index} getRequests={getRequests} user={props.user} row={row} />
                           ))}
                       </TableBody>
                   </Table>
               </TableContainer>
           </div>
        </LandLordDashNav>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(MyRequests)