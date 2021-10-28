import React, {useEffect, useState} from 'react';
import TenantDashNav from "../Layout/TenantDashNav";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {httpRequest} from "../../config/httpRequest";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {Box, Collapse, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import cogoToast from "cogo-toast";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [files,setFiles]= useState({signedContract:null,nationalId:null})

    async function handleSign(id) {
        if(!files.signedContract){
            cogoToast.error("Please upload new Signed Contract document");
            return;
        }
        if(!files.nationalId){
            cogoToast.error("Please upload your national Id");
            return;
        }
        let form = document.getElementById("documentForm");
        let data = new FormData(form);

        console.log({...files})
        const {response,error} = await  httpRequest("POST",`/api/contract/${id}`,data,{"enctype":"multipart/form-data","Authorization":`Bearer ${props.user.token}`});
        if(!error){
            console.log(response.data)
            cogoToast.success(response.data.message);
        }
        return undefined;
    }

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.landLord.fullName}
                </TableCell>
                <TableCell align="center">{row.tenant.fullName}</TableCell>
                <TableCell align="center">{row.house.name}</TableCell>
                <TableCell align="center">{row.startDate}</TableCell>
                <TableCell align="center">{row.endDate}</TableCell>
                <TableCell align="center">{row.aggAmount}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{<button disabled={row.status!=="Not Signed"} onClick={e => handleSign(row.id)}
                                                   className={"p-2 text-white bg-blue-600 hover:bg-blue-400"}>Mark as
                    Signed</button>}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Documents
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Documents</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">
                                            <ol>
                                                {
                                                    row.documents.map((d)=>(
                                                        <li  key={d.id} className={"flex gap-4"}>
                                                            <div key={d.id} className={"p-2 border-b border-gray-200"}><a href={`${process.env.REACT_APP_BACKEND_URL}/api/contract/files/${row.id}/${d.id}`}>{d.documentName}</a></div>
                                                        </li>
                                                    ))
                                                }
                                            </ol>
                                            <form id={"documentForm"}>
                                                <div className={"row"}>
                                                    <div className="col-md-6">
                                                        <label className="single-input-inner style-bg-border">
                                                            <span className="label">Upload new Signed Contract</span>
                                                            <input  type="file" onChange={e=>setFiles({...files,signedContract: e.target.value})}  name={"signedContract"} />
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="single-input-inner style-bg-border">
                                                            <span className="label">Upload Your National Id</span>
                                                            <input onChange={e=>setFiles({...files,nationalId: e.target.value})} type="file"  name={"nationalId"} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function MyContractsT(props) {
    const [contracts,setContracts]=useState([]);

    const getContracts = async ()=>{
        const {response,error}= await  httpRequest("GET",`/api/contract/tenant/${props.user.data.userId}`,null,{"Authorization":`Bearer ${props.user.token}`})
        if(!error){
            console.log(response.data)
            setContracts([...response.data])
        }
    }
    useEffect(()=>{
        getContracts();
    },[])
    const classes = useStyles();
    return (
        <TenantDashNav>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Landlord</TableCell>
                                <TableCell align="center">Tenant</TableCell>
                                <TableCell align="center">House</TableCell>
                                <TableCell align="center">Start date</TableCell>
                                <TableCell align="center">End Date</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contracts.map((row,index) => (
                               <Row key={index} user={props.user} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </TenantDashNav>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(MyContractsT)
