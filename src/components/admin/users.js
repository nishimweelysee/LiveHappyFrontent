import React, {useEffect, useState} from 'react';
import AdminDashNav from "../Layout/AdminDashNav";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {httpRequest} from "../../config/httpRequest";
import {connect} from "react-redux";
import {BlockOutlined, CheckCircleOutlineOutlined, SupervisedUserCircle} from "@material-ui/icons";
import UserProfile from "../section-components/UserProfile";
import cogoToast from "cogo-toast";
import {Badge} from "@material-ui/core";

function Users(props) {
    const [users,setUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [user,setUser] = useState({});
    const handleClickOpen = (id) => {
        const u = users.find(u=>u.id===id);
        setUser({...u});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    async function fetchData() {
        const {response,error} = await httpRequest("GET","/api/auth/users",null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            console.log(response.data.data);
            setUsers([...response.data.data])
        }
    }
    const handleBlock = async (userId)=>{
        const {response,error} = await httpRequest("GET",`/api/auth/user/${userId}/Blocked`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            cogoToast.info(response.data.message);
            fetchData();
        }
    }
    useEffect(()=>{
        fetchData();
    },[])

    async function handleUnBlock(userId) {
        const {response,error} = await httpRequest("GET",`/api/auth/user/${userId}/Active`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            cogoToast.info(response.data.message);
            fetchData();
        }
    }

    return (
        <AdminDashNav>
            <div>
                ({users.length}) Users ,
            </div>
            <div>
                <Paper className="container-tbl">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(({id, fullName,email,phoneNumber,district,userRole,status }) => (
                                <TableRow key={id}>
                                    <TableCell component="th" scope="row">
                                        {fullName}
                                    </TableCell>
                                    <TableCell>{email}</TableCell>
                                    <TableCell>{phoneNumber}</TableCell>
                                    <TableCell>{district}</TableCell>
                                    <TableCell>{userRole}</TableCell>
                                    <TableCell><Badge badgeContent={status} color={status==="Blocked"?"error":"primary"}/></TableCell>
                                    <TableCell>
                                       <SupervisedUserCircle onClick={e=>handleClickOpen(id)} className={"text-blue-500 cursor-pointer"}/> {status==="Blocked"?
                                        <CheckCircleOutlineOutlined onClick={e => handleUnBlock(id)}
                                                       className={"text-green-500 cursor-pointer"}/>
                                        :<BlockOutlined onClick={e => handleBlock(id)}
                                                       className={"text-red-500 cursor-pointer"}/>
                                    }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
            <div>
                <UserProfile open={open} handleClose={handleClose} userData={user}/>
            </div>
        </AdminDashNav>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Users)
