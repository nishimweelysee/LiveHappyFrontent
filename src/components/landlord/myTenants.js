import React, {useEffect, useState} from 'react';
import LandLordDashNav from "../Layout/LandLordDashNav";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import {makeStyles} from "@material-ui/core/styles";
import {httpRequest} from "../../config/httpRequest";
import {connect} from "react-redux";
import {SupervisedUserCircleSharp} from "@material-ui/icons";
import UserProfile from "../section-components/UserProfile";


const columns = [
    { id: 'images', label: 'Image', maxWidth: 40 },
    {
        id: 'fullName',
        label: 'Tenant',
        align: 'center',
    },
    {
        id: 'email',
        label: 'Email',
        align: 'center',
    },
    {
        id: 'phoneNumber',
        label: 'Phone',
        align: 'center',
    },
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
        id: 'lstatus',
        label: 'Status',
        align: 'center',
    },
    {
        id: 'owner',
        label: 'Profile',
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

function MyTenants(props) {

    const [houses,setHouses] = useState([]);
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

    const getLivedHOuses  = async ()=>{
        const {response,error}=await httpRequest("GET",'/api/landlord/house/rent',null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            let livedHouses = [];
            response.data.data.map((h,index)=>{
                let lid = h.id;
                let lstatus = h.status;
                let tenant = h.tenant;
                let house = h.house;
                let {fullName,email,phoneNumber} = tenant;
                livedHouses.push({fullName,email,phoneNumber,lid,lstatus,tenant,...{...house}})
        })
            setHouses(livedHouses);
        }
    }
    useEffect(()=>{
        getLivedHOuses();
    },[])

    const [open, setOpen] = React.useState(false);
    const [tenant,setTenant] = useState({});
    const handleClickOpen = (tenant) => {
        setTenant({...tenant});
        setOpen(true);
    };

    const handleCloseProfile = () => {
        setOpen(false);
    };

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

                                                                    </div>:
                                                                    column.id==="location"?<div>
                                                                        {row.district+", "+row.sector+", "+row.street}
                                                                    </div>:column.id==="houseCategory"?value.name:column.id==="owner"?<div>
                                                                        <span onClick={e=>handleClickOpen(row.tenant)} className={"text-white bg-blue-600 cursor-pointer p-1 rounded"}><SupervisedUserCircleSharp/> Profile</span>
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
            <UserProfile open={open} handleClose={handleCloseProfile} userData={tenant}/>
        </LandLordDashNav>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(MyTenants)
