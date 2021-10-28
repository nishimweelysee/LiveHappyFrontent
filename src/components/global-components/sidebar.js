import React, {useEffect, useState} from 'react'
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {httpRequest} from "../../config/httpRequest";
import {connect} from "react-redux";
import cogoToast from "cogo-toast";
import _ from "lodash";
import {RATE} from "../../redux/user/user.types";
import {saveRate} from "../../redux/user/loadState";


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
        alignItems: 'center',
        flexDirection: 'row',
        margin: '0 auto'
    },
});
function Sidebar({house,rates,categories,landLord,user,average}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [rate,setRate] = React.useState({rates:2, comment:"", userToBeRated:landLord.id})

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
    function showPopover() {
        document.getElementById("popover").removeAttribute("hidden");
        // document.getElementById("popover").classList.add("opacity-100");
    }
    function closePopover(){
        // document.getElementById("popover").classList.remove("opacity-100");
        document.getElementById("popover").setAttribute("hidden",'true');
    }
    const handleSendReview = async ()=>{
        rate.userToBeRated=landLord.id
        const {response,error} = await httpRequest("POST","/api/rate",rate,{"Authorization":`Bearer ${user.token}`})
        if(!error){
            cogoToast.success(response.data.message);
        }
    }
    let publicUrl = process.env.PUBLIC_URL+'/'
    return (
        <aside className="sidebar-area">
            <div className="widget widget-author text-center">
                <h4 className="widget-title">House Owner</h4>
                <div className="thumb">
                    <img src={publicUrl+"assets/img/agent/1.png"} alt="img" />
                </div>
                <div  className="details">
                    <h5>{landLord.fullName}</h5>
                   <div onMouseLeave={closePopover}>
                       <div onMouseOver={showPopover} className={classes.root}>
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
                       <div id="popover" hidden={true} onMouseLeave={closePopover} className="transition z-50   duration-150 ease-in-out  w-full mx-auto">
                           <div className="container">
                               <div className="relative bg-gray-200 rounded-t ">
                                   <svg className="absolute -mt-6" width="30px" height="30px" viewBox="0 0 9 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                       <g id="Page-1"  strokeWidth={1} fill="none" fillRule="evenodd">
                                           <g id="Tooltips-"  transform="translate(-874.000000, -1029.000000)" fill="#ededed">
                                               <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                                                   <g id="Group-2" transform="translate(24.000000, 0.000000)">
                                                       <polygon id="Triangle" transform="translate(4.500000, 62.000000) rotate(0.000000) translate(-4.500000, -62.000000) " points="4.5 57.5 12.5 66.5 -3.5 66.5" />
                                                   </g>
                                               </g>
                                           </g>
                                       </g>
                                   </svg>
                                   <p className="text-base text-gray-800 font-normal leading-normal tracking-normal opacity-50">User rates</p>
                               </div>
                               <div className="rating-card">
                                   <div className="text-center m-b-30">
                                       <h4>Landlord Rating Overview</h4>
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
                                   <div><Link to={"/reviews"} className={"underline hover:text-blue-700 p-2 text-base"}>View all landlord reviews</Link></div>
                                   <div>
                                       <button onClick={handleClickOpen} className={"btn btn-primary"}>Add your Review</button>
                                   </div>
                               </div>

                           </div>
                       </div>
                   </div>
                    <ul>
                        <li><a href="https://www.facebook.com"><i className="fab fa-facebook-f" aria-hidden="true" /> </a></li>
                        <li><a href="https://www.linkedin.com"><i className="fab fa-linkedin-in" aria-hidden="true" /> </a></li>
                        <li><a href="https://www.instagram.com"><i className="fab fa-instagram" aria-hidden="true" /> </a></li>
                        <li><a href="https://twitter.com/home"><i className="fab fa-twitter" aria-hidden="true" /> </a></li>
                    </ul>
                </div>
            </div>
            <div className="widget widget-category">
                <h5 className="widget-title">Category</h5>
                <ul>
                    {
                        categories.map((cat,index)=>{
                            return <li key={index}><Link to={{ pathname: "/property-grid", state: { category: cat }, }}>{cat.name} <span>{cat.houses.length}</span></Link></li>
                        })
                    }
                </ul>
            </div>
            <div className="widget widget-place">
                <h5 className="widget-title">Place</h5>
                <ul>
                    {
                        Object.keys(house).map((h,index)=>{console.log(h);
                            return <li key={index} >{h} <span>{house[h].length}</span></li>
                        })
                    }
                </ul>
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
        </aside>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Sidebar)
