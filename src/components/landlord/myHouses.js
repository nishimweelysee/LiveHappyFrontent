import React, {useEffect, useState} from 'react';
import LandLordDashNav from "../Layout/LandLordDashNav";
import {httpRequest} from "../../config/httpRequest";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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
import {Multiselect} from "multiselect-react-dropdown";
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import cogoToast from "cogo-toast";
import moment from "moment";
import DatePicker from "react-datepicker";
import {MenuItem, Select} from "@material-ui/core";


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
}));

function MyHouses(props) {
    const [houses,setHouse] = useState([]);
    const [categories,setCategories] = useState([])
    const [selectedHouse,setSelectedHouse] = useState({
        id:"",
        name:"",
        price:"",
        houseCategory:"",
        bedrooms:0,
        kitchens:0,
        livingRoom:0,
        bathrooms:0,
        area:"",
        yearBuilt:"",
        sqft:"",
        images:[],
        amenities:[],
        googleMapLocation:"",
        description:"",
        district:"",
        sector:"",
        cell:"",
        street:"",
        status:""
    });


    const [open, setOpen] = React.useState(false);
    const [openPaymentModal, setOpenPaymentModal] = React.useState(false);
    const [payments,setPayments] = useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [startDate,setStartDate] = useState("");
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
    useEffect(()=>{
        handlePayments();
    },[])

    const handleClickOpen = (action,houseId) => {
        let obj = houses.find(o => o.id === houseId);
        console.log(houses)
        console.log(obj)
        const {houseCategory,...data}=obj;
        setSelectedHouse({...selectedHouse,houseCategory: houseCategory.id,...data});
        if(action==="update"){
            setOpen(true);
        }
        if(action==="delete"){
            handledelete()
        }
    };

    const handlePayments = async (houseId)=>{
        const {response,error} = await httpRequest("GET",`/api/payment/${houseId}`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            setPayments([...response.data.data]);
            setOgPayment([...response.data.data]);
            setOpenPaymentModal(true);
        }
    }

    const handleClose = () => {
        setOpenPaymentModal(false)
        setOpen(false);
    };


    const getHouses =async ()=>{
        const {response,error}=await httpRequest("GET",'/api/landlord/house',null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            console.log(response.data.data)
            setHouse(response.data.data);
        }
    }
    const getCategory = async ()=>{
        const {response,error} = await httpRequest("GET","/api/category");
        if(!error){
            let data = response.data;
            cogoToast.success(data.message);
            console.log(data);
            setCategories(data.data);
        }
    }
    useEffect(()=>{
        const getHouseData =async ()=>{
            const {response,error}=await httpRequest("GET",'/api/landlord/house',null,{"Authorization":`Bearer ${props.user.token}`});
            if(!error){
                console.log(response.data.data)
                setHouse(response.data.data);
            }
        }
        getHouseData();
        getCategory();
    },[props.user])


    //Table
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    //Updating House

    const handleInput = (e) =>{
        setSelectedHouse({...selectedHouse,[e.target.name]:e.target.value});
    }
    const handleSelect = (e)=>{
        setSelectedHouse({...selectedHouse,amenities: e})
    }

    const handleUpload = async (e)=>{
        let fileInput = e.target;
        const formdata = new FormData();
        Object.values(fileInput.files).map(fi)
        function fi(f) {
            formdata.append("files", f, f.name);
        }
        const {response,error} = await httpRequest("POST",'/api/image', formdata, {"Authorization":`Bearer ${props.user.token}`})
        if(!error){
            const images = response.data.data;
            selectedHouse.images=selectedHouse.images.concat(images)
            setSelectedHouse({...selectedHouse,...selectedHouse})
            cogoToast.success(response.data.message);
        }
    }
    const handleUpdate =  async (e)=>{
        const {response,error} = await httpRequest("PUT","/api/house",selectedHouse,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            let data = response.data;
            cogoToast.success(data.message);
            await getHouses();
        }
    }
    const handledelete =  async (e)=>{
        const {response,error} = await httpRequest("DELETE","/api/house",selectedHouse,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            let data = response.data;
            cogoToast.success(data.message);
            await getHouses();
        }
    }
    let publicUrl = process.env.PUBLIC_URL+'/'

    return (
        <LandLordDashNav>
           <div className={"p-4 m-2"}>
               <Paper className="container-tbl" >
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
                                               const value = row[column.id] || [];
                                                    return (
                                                   <TableCell key={index} align={column.align}>
                                                       {
                                                           column.id==="images"?
                                                               <img style={{maxWidth:column.maxWidth}} height={30} alt={""} src={value[0]}/>:
                                                           column.id==="action"?<div>
                                                                   <Button variant="outlined" color="primary" onClick={e=>handleClickOpen("update",row.id)}>
                                                                       Edit
                                                                   </Button>
                                                                   <Button variant="outlined" color="secondary" onClick={e=>handleClickOpen("delete",row.id)}>
                                                                       Delete
                                                                   </Button>
                                                                   <Button variant="outlined" color="primary" onClick={e=>handlePayments(row.id)}>
                                                                       Payments
                                                                   </Button>
                                                               </div>:
                                                           column.id==="location"?<div>
                                                               {row.district+", "+row.sector+", "+row.street}
                                                           </div>:column.id==="houseCategory"?value.name:value
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
                        <div>
                            {
                                payments.map((pay,index)=>{
                                    let brColor  = pay.paymentState!=="FULL"?"border-red-600":"border-blue-600";
                                    let bgColor  = pay.paymentState!=="FULL"?"bg-red-600":"bg-blue-600";
                                    return (
                                        <div key={index} className={"flex flex-col p-2 my-2 border-2 "+brColor}>

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
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Update House Information"}</DialogTitle>
                    <DialogContent>
                        <div className="add-property-area">
                            <div className="container">
                                <form>
                                    <div className="property-form-grid">
                                        <div className="row">
                                            <div className="col-12">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">House Title</span>
                                                    <input type="text" value={selectedHouse.name} onChange={handleInput} name={"name"} />
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">Price/Month</span>
                                                    <input type="text" value={selectedHouse.price} onChange={handleInput} name={"price"}/>
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="single-select-inner style-bg-border">
                                                    <span className="label">Category</span>
                                                    <select id={"houseCategory"}   value={selectedHouse.houseCategory.id} onChange={handleInput} name={"houseCategory"}>
                                                        {
                                                            categories.map((cat,index)=>{
                                                                return <option key={index} value={cat.id}>{cat.name}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="single-select-inner style-bg-border">
                                                    <span className="label">Beds</span>
                                                    <select  value={selectedHouse.bedrooms} onChange={handleInput}name={"bedrooms"}>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="single-select-inner style-bg-border">
                                                    <span className="label">Amenities</span>
                                                    <Multiselect
                                                        value={selectedHouse.amenities}
                                                        isObject={false}
                                                        onRemove={function noRefCheck(){}}
                                                        onSearch={function noRefCheck(){}}
                                                        onSelect={handleSelect}
                                                        options={[
                                                            'Car Parking',
                                                            'Air Condition',
                                                            'Internet',
                                                            'Power backup',
                                                            'Sports and Recreation',
                                                            'Security system',
                                                            'Gym and spa',
                                                            'Water supply',
                                                            'Near Schools'
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="single-select-inner style-bg-border">
                                                    <span className="label">Kitchens</span>
                                                    <select value={selectedHouse.kitchens} onChange={handleInput} name={"kitchens"}>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="single-select-inner style-bg-border">
                                                    <span className="label">LivingRooms</span>
                                                    <select value={selectedHouse.livingRoom} onChange={handleInput} name={"livingRoom"}>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">Baths</span>
                                                    <input type="number" value={selectedHouse.bathrooms} onChange={handleInput} name={"bathrooms"} />
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">Area</span>
                                                    <input type="number" value={selectedHouse.area} onChange={handleInput} name={"area"} />
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">YearBuilt</span>
                                                    <input type="number" value={selectedHouse.yearBuilt} onChange={handleInput} name={"yearBuilt"} />
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">Sqft</span>
                                                    <input type="number" value={selectedHouse.sqft} onChange={handleInput} name={"sqft"} />
                                                </label>
                                            </div>
                                            <div className="col-12">
                                                <div className={classes.image}>
                                                    <ImageList className={classes.imageList} cols={2.5}>
                                                        {selectedHouse.images.map((item,index) => (
                                                            <ImageListItem key={index}>
                                                                <img src={item} alt={""} />
                                                            </ImageListItem>
                                                        ))}
                                                    </ImageList>
                                                </div>
                                                <div className="avatar-upload-input text-center">
                                                    <img src={publicUrl+"assets/img/icon/upload.png"} alt="img" />
                                                    <h2>Upload your photo</h2>
                                                    <p>Its must be a clean photo</p>
                                                    <div className="avatar-edit-input">
                                                        <input className="btn btn-base"  name={"images"} onChange={handleUpload} type="file" multiple id="imageUpload" size={"1048576"} accept=".png, .jpg, .jpeg" />
                                                        <label className="btn btn-base" htmlFor="imageUpload">Click here to Upload</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">District</span>
                                                    <input type="text" value={selectedHouse.district} onChange={handleInput} name={"district"} />
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">Sector</span>
                                                    <input type="text" value={selectedHouse.sector} onChange={handleInput} name={"sector"} />
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">Cell</span>
                                                    <input type="text" value={selectedHouse.cell} onChange={handleInput} name={"cell"} />
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">Street Code</span>
                                                    <input type="text" value={selectedHouse.street} onChange={handleInput} name={"street"} />
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">Google Map Location(Copy and Past the Iframe here  <a href={"https://www.google.rw/maps?hl=en&authuser=0"} rel="noopener noreferrer" target={'_blank'}>Google Map</a>)</span>
                                                    <input type="text" value={selectedHouse.googleMapLocation} onChange={handleInput} name={"googleMapLocation"} />
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="single-input-inner style-bg-border">
                                                    <span className="label">Description</span>
                                                    <textarea type="text" value={selectedHouse.description} onChange={handleInput} name={"description"} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions className={"mr-4"}>
                        <Button autoFocus onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} color="primary" autoFocus>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </LandLordDashNav>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(MyHouses)
