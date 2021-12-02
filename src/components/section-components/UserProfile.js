import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {makeStyles} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";
import Rating from '@material-ui/lab/Rating';
import {httpRequest} from "../../config/httpRequest";
import {connect} from "react-redux";
import RateBox from "../global-components/RateBox";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
}));
function UserProfile({user,open,handleClose,userData}) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [rates,setRates] = useState([]);

    const getUserRates = async ()=>{
        if(userData.id) {
            const {
                response,
                error
            } = await httpRequest("GET", `/api/rate/${userData.id}`, {"Authorization": `Bearer ${user.token}`})
            if (!error) {
                setRates(response.data.data);
            }
        }
    }

    useEffect(()=>{
        getUserRates()
    },[userData])

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" className={"text-center"}>{"User Profile"}</DialogTitle>
                <DialogContent style={{minWidth:'500px'}}>
                    <div className={"flex flex-col"}>
                        <div className={"flex flex-col p-4"}>
                            <div>
                                <h1 className={"float-left"}><label>Full Name</label></h1>
                                <p className={"float-right"}>{userData.fullName}</p>
                            </div>
                            <div>
                                <h1 className={"float-left"}><label>username</label></h1>
                                <p className={"float-right"}>{userData.username}</p>
                            </div>
                            <div>
                                <h1 className={"float-left"}><label>E-mail</label></h1>
                                <p className={"float-right"}>{userData.email}</p>
                            </div>
                            <div>
                                <h1 className={"float-left"}><label>Phone Number</label></h1>
                                <p className={"float-right"}>{userData.phoneNumber}</p>
                            </div>
                        </div>
                        <div className={classes.root}>
                            <Avatar alt={userData.fullName} src={userData.image} className={classes.large} />
                        </div>
                        <Divider />
                        <div className={"py-4"}>
                            <RateBox userData={userData} rates={rates} getUserRates={getUserRates}/>
                        </div>
                        <Divider />

                    </div>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(UserProfile)
