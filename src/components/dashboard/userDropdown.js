import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {SupervisedUserCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutAction} from '../../redux/user/user.actions'
import {handleLogout} from "../helpers/functions";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const CustomizedMenus=(props)=> {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div className={classes.root+' flex justify-center'}>

                <Avatar aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="circular"
                        color="primary"
                        onClick={handleClick}
                        alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
                <h6 className={"m-auto text-white pl-4"}>{props.user.data.username}</h6>
            </div>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemIcon>
                        <SupervisedUserCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <i className="fas fa-sign-out-alt"/>
                    </ListItemIcon>
                    <ListItemText onClick={e=>handleLogout()}  primary="Logout" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

CustomizedMenus.protoTypes = {
    logoutAction: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    user: state.user
})


export default connect(mapStateToProps,{logoutAction})(CustomizedMenus);
