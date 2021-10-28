import React, {useEffect, useState} from 'react';
import AdminDashNav from "../Layout/AdminDashNav";
import {httpRequest} from "../../config/httpRequest";
import cogoToast from "cogo-toast";
import {connect} from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';

function Categories(props) {
    let [category,setCategory] = useState({name:"",image:""})
    const [categories,setCategories] = useState([])
    const [message,setMessage] = useState("")
    const handleInput = (e) =>{
        e.preventDefault();
        setCategory({...category,[e.target.name]:e.target.value});
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
            setCategory({...category,image: images[0]})
            cogoToast.success(response.data.message);
        }
    }

    const handleSubmit =  async (e)=>{
        const {response,error} = await httpRequest("POST","/api/category",category,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            let data = response.data;
            cogoToast.success(data.message);
            console.log(data);
            setMessage((data.message))
        }
    }

    const handleUpdate =  async (e)=>{
        const {response,error} = await httpRequest("PUT","/api/category",category,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            let data = response.data;
            cogoToast.success(data.message);
            console.log(data);
            setMessage((data.message))
        }
    }

    const handleDelete =  async (id)=>{
        const {response,error} = await httpRequest("DELETE",`/api/category/${id}`,null,{"Authorization":`Bearer ${props.user.token}`});
        if(!error){
            let data = response.data;
            cogoToast.success(data.message);
            console.log(data);
            setMessage((data.message))
        }
    }
    useEffect(()=>{

        async function fetchData() {
            const {response,error} = await httpRequest("GET","/api/category",category,{"Authorization":`Bearer ${props.user.token}`});
            if(!error){
                let data = response.data;
                setCategories(data.data);
                setMessage("");
            }
        }
        fetchData();
    },[category, message, props.user.token])
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (id) => {
        category=categories.find(c => c.id === id);
        setCategory(({...category,...category}))
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let publicUrl ="/";
    return (
        <AdminDashNav>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8"}>
                <div>
                    <form>
                        <div className="btn btn-base hover-none">Category Information</div>
                        <div className="property-form-grid">
                                <div className={"row"}>
                                    <div className="col-12">
                                        <label className="single-input-inner style-bg-border">
                                            <span className="label">House Title</span>
                                            <input type="text" value={category.name} onChange={handleInput} name={"name"} />
                                        </label>
                                    </div>
                                </div>
                            <div className={"row"}>
                                <div className="col-12">
                                    <div className="avatar-upload-input text-center">
                                        <img className={"mx-auto"} src={publicUrl+"assets/img/icon/upload.png"} alt="img" />
                                        <h2>Upload your photo</h2>
                                        <p>Its must be a clean photo</p>
                                        <div className="avatar-edit-input">
                                            <input className="btn btn-base"  name={"images"} onChange={handleUpload} type="file" multiple id="imageUpload" size={"1048576"} accept=".png, .jpg, .jpeg" />
                                            <label className="btn btn-base" htmlFor="imageUpload">Click here to Upload</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center mb-4">
                                <button className="btn btn-base" type={"button"} onClick={handleSubmit}>Submit Now</button>
                            </div>
                        </div>
                    </form>
                </div>
               <div>
                   <div className="btn btn-base hover-none">Category Data</div>
                   <TableContainer component={Paper}>
                       <Table  aria-label="simple table">
                           <TableHead>
                               <TableRow>
                                   <TableCell align="center">ID</TableCell>
                                   <TableCell align="center">Name</TableCell>
                                   <TableCell align="center">Image</TableCell>
                                   <TableCell align="center">Actions</TableCell>
                               </TableRow>
                           </TableHead>
                           <TableBody>
                               {categories.map((row,index) => (
                                   <TableRow key={index}>
                                       <TableCell component="th" scope="row">
                                           {row.id}
                                       </TableCell>
                                       <TableCell component="th" scope="row">
                                           {row.name}
                                       </TableCell>
                                       <TableCell align="center"><img height={100} width={100} alt={""} src={row.image}/></TableCell>
                                       <TableCell align="center" component="th" scope="row">
                                          <button onClick={e=>handleClickOpen(row.id)} className={"p-2 bg-warning m-1 rounded"}>Edit</button>
                                           <button onClick={e=>handleDelete(row.id)} className={"p-2 bg-danger m-1 rounded"}>Delete</button>
                                       </TableCell>
                                   </TableRow>
                               ))}
                           </TableBody>
                       </Table>
                   </TableContainer>
               </div>
            </div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <form>
                        <div className="btn btn-base hover-none">Category Data</div>
                        <div className="property-form-grid">
                            <div className={"row"}>
                                <div className="col-12">
                                    <label className="single-input-inner style-bg-border">
                                        <span className="label">House Title</span>
                                        <input type="text" value={category.name} onChange={handleInput} name={"name"} />
                                    </label>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className="col-12">
                                    <div className="avatar-upload-input text-center">
                                        <img className={"mx-auto"} src={publicUrl+"assets/img/icon/upload.png"} alt="img" />
                                        <h2>Upload your photo</h2>
                                        <p>Its must be a clean photo</p>
                                        <div className="avatar-edit-input">
                                            <input className="btn btn-base"  name={"images"} onChange={handleUpload} type="file" multiple id="imageUpload" size={"1048576"} accept=".png, .jpg, .jpeg" />
                                            <label className="btn btn-base" htmlFor="imageUpload">Click here to Upload</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <div className={"px-16 flex gap-2"}>
                        <button autoFocus onClick={handleClose} className={"p-2 bg-warning text-white rounded"}>
                            Close
                        </button>
                        <button onClick={handleUpdate}  className={"p-2 bg-primary text-white rounded"} autoFocus>
                            Edit
                        </button>
                    </div>
                </DialogActions>
            </Dialog>
        </AdminDashNav>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Categories)
