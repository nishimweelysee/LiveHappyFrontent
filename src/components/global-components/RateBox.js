import React, {useEffect, useState} from 'react'
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {connect} from "react-redux";
import _ from "lodash";
import {RATE} from "../../redux/user/user.types";
import {saveRate} from "../../redux/user/loadState";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {httpRequest} from "../../config/httpRequest";
import cogoToast from "cogo-toast";


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: '0 auto'
    },
});
function RateBox({rates,userData,user,getUserRates}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [rate,setRate] = React.useState({rates:2.5, comment:"", userToBeRated:userData.id})

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const [five,setFive] = useState({value:0,avg:0});
    const [four,setFour] = useState({value:0,avg:0});
    const [three,setThree] = useState({value:0,avg:0});
    const [two,setTwo] = useState({value:0,avg:0});
    const [one,setOne] = useState({value:0,avg:0});
    const [backColor,setBackCOlor] = useState("")

    useEffect(()=>{
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
            setBackCOlor("bg-warning")
        else
            setBackCOlor("bg-danger")
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
        console.log(rates)
    }, [rates])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSendReview = async ()=>{
        rate.userToBeRated=userData.id
        const {response,error} = await httpRequest("POST","/api/rate",rate,{"Authorization":`Bearer ${user.token}`})
        if(!error){
            cogoToast.success(response.data.message);
            getUserRates()
        }
    }
    let publicUrl = process.env.PUBLIC_URL+'/'
    return (
        <div>
            <div className="widget widget-author text-center">
                <div  className="details">
                    <div>
                        <div className={classes.root}>
                            <Rating
                                name="hover-feedback"
                                size="large"
                                value={value}
                                defaultValue={2}
                                precision={0.5}
                                readOnly={true}
                            />
                            {value !== null && <Box className={"text-white p-1 rounded-full "+backColor} ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                        </div>
                        <div id="popover"  className="transition z-50   duration-150 ease-in-out  w-full mx-auto">
                            <div className="container">
                                <div className="rating-card">
                                    <div className="text-center m-b-30">
                                        <h4>{userData.userType} Rating Overview</h4>
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
                                    <div><Link to={"/reviews"} className={"underline hover:text-blue-700 p-2 text-base"}>View all {userData.userType} reviews</Link></div>
                                    <div>
                                        <button onClick={handleClickOpen} className={"btn btn-primary"}>Add your Review</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title" className={"text-center"}>{"Rating landlord"}</DialogTitle>
                        <DialogContent>
                            <div className="add-property-area">
                                <div className="container">
                                    <form>
                                        <div className="property-form-grid">
                                            <div className="row">
                                                <div className={classes.root}>
                                                    <p>{rate.rates}</p>
                                                    <Rating

                                                        name="hover-feedback"
                                                        size="large"
                                                        value={rate.rates}
                                                        defaultValue={2}
                                                        precision={0.5}
                                                        onChange={(event, newValue) => {
                                                            setRate({...rates,rates: newValue })
                                                        }}

                                                        onChangeActive={(event, newHover) => {
                                                            setHover(newHover);
                                                        }}
                                                    />
                                                    {rate.rates !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rate.rates]}</Box>}
                                                </div>
                                                <div className="col-12">
                                                    <label className="single-input-inner style-bg-border">
                                                        <span className="label">Comment</span>
                                                        <textarea type="text" value={rate.comment} onChange={e=>setRate({...rate,comment: e.target.value})}  name={"comment"} />
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
                            <Button onClick={handleSendReview} color="primary" autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(RateBox)
