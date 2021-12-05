import React, {useEffect, useState} from 'react';
import LandLordDashNav from "../Layout/LandLordDashNav";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {httpRequest} from "../../config/httpRequest";
import {connect} from "react-redux";
import cogoToast from "cogo-toast";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



function MyContracts(props) {
    const [contracts,setContracts]=useState([]);

    const getContracts = async ()=>{
        const {response,error}= await  httpRequest("GET",`/api/contract/landlord/${props.user.data.userId}`,null,{"Authorization":`Bearer ${props.user.token}`})
        if(!error){
            setContracts([...response.data])
        }
    }
    useEffect(()=>{
        getContracts();
    },[])

    const classes = useStyles();

    async  function handleSign(id) {
        const {response,error} = await  httpRequest("GET",`/api/contract/sign/${id}`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            cogoToast.success(response.data.message);
            getContracts()
        }
    }

    async function handleDeleteDocu(contractId, documentId) {
        const {response,error} = await  httpRequest("GET",`/api/contract/delete/${contractId}/${documentId}`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            cogoToast.success(response.data.message);
            getContracts();
        }
    }

    return (
        <LandLordDashNav>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Landlord</TableCell>
                                <TableCell align="center">Tenant</TableCell>
                                <TableCell align="center">House</TableCell>
                                <TableCell align="center">Start date</TableCell>
                                <TableCell align="center">End Date</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align={"center"}>Documents</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contracts.map((row,index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {row.landLord.fullName}
                                    </TableCell>
                                    <TableCell align="center">{row.tenant.fullName}</TableCell>
                                    <TableCell align="center">{row.house.name}</TableCell>
                                    <TableCell align="center">{row.startDate}</TableCell>
                                    <TableCell align="center">{row.endDate}</TableCell>
                                    <TableCell align="center">{row.aggAmount}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="center">
                                        <ol>
                                            {
                                                row.documents.map((d,index)=>(
                                                   <li key={index}>
                                                       <div key={d.id} className={"p-2 border-b border-gray-200"}><a href={`${process.env.REACT_APP_BACKEND_URL}/api/contract/files/${row.id}/${d.id}`}>{d.documentName}</a><button disabled={row.status==="Active"} onClick={e=>handleDeleteDocu(row.id,d.id)} className={"p-1 bg-red-600 hover:bg-red-300 rounded float-right text-white"}>Delete</button></div>
                                                   </li>
                                                ))
                                            }
                                        </ol>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.status==="Half Signed" && <button onClick={e=>handleSign(row.id)}
                                        className={"p-2 text-white bg-blue-600 hover:bg-blue-400"}>Mark as
                                        Signed</button>
                                    }</TableCell>
                                </TableRow>
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

export default connect(mapStateToProps)(MyContracts)
