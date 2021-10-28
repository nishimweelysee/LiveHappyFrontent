// noinspection DuplicatedCode

import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
    CallToAction, DashboardOutlined,
    DoneAll,
    HouseOutlined,
    HouseSharp,
    Payment,
    PersonAddSharp,
    RemoveCircle
} from "@material-ui/icons";
import {blue, red, yellow} from "@material-ui/core/colors";
import {Link} from "react-router-dom";
import UserDropdown from "../dashboard/userDropdown";
import Footer from "../global-components/footer-v2";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appFooter: {
        top: 'auto',
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));



export default function LandLordDashNav(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    let publicUrl = process.env.PUBLIC_URL+'/'

    return (
        <div>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                style={{backgroundColor:"#061539"}}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar  className="navbar navbar-expand-lg">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="container nav-container">
                        <div className="logo">
                            <Link to="/"><img className="h-20" src={publicUrl+"assets/img/logo.png"} alt="img" /></Link>
                        </div>
                        <div className="">
                            <UserDropdown />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List style={{marginTop:"20px"}}>
                    <Link to={"/landlord"}>
                        <ListItem  button>
                            <ListItemIcon><DashboardOutlined /></ListItemIcon>
                            <ListItemText primary={"Dashboard"} />
                        </ListItem>
                    </Link>
                    <Link to={"/landlord/house"} >
                        <ListItem  button>
                            <ListItemIcon><HouseSharp /></ListItemIcon>
                            <ListItemText primary={"New House"} />
                        </ListItem>
                    </Link>
                    <Link to={"/landlord/my-house"}>
                        <ListItem  button>
                            <ListItemIcon><HouseOutlined /></ListItemIcon>
                            <ListItemText primary={"My Houses"} />
                        </ListItem>
                    </Link>
                    <Link to={"/landlord/tenant"}>
                        <ListItem  button>
                            <ListItemIcon><PersonAddSharp /></ListItemIcon>
                            <ListItemText primary={"Tenants"} />
                        </ListItem>
                    </Link>
                    <Link to={"/landlord/income"}>
                        <ListItem  button>
                            <ListItemIcon><Payment /></ListItemIcon>
                            <ListItemText primary={"My Income"} />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to={`/landlord/request/pending`}>
                        <ListItem  button>
                            <ListItemIcon> <CallToAction style={{ color: yellow[700] }} /></ListItemIcon>
                            <ListItemText primary={"Pending Requests"} />
                        </ListItem>
                    </Link>
                    <Link to={`/landlord/request/approved`}>
                        <ListItem   button>
                            <ListItemIcon><DoneAll style={{ color: blue[700] }}/></ListItemIcon>
                            <ListItemText primary={"Approved Requests"} />
                        </ListItem>
                    </Link>
                   <Link to={`/landlord/request/rejected`}>
                       <ListItem  button>
                           <ListItemIcon> <RemoveCircle style={{ color: red[700] }} /></ListItemIcon>
                           <ListItemText primary={"Rejected Requests"} />
                       </ListItem>
                   </Link>
                </List>
            </Drawer>
            <main style={{marginTop:"10px"}} className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
            <div className={classes.appFooter}><Footer/></div>
        </div>
    );
}
