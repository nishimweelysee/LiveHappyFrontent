import React, {useEffect, useState} from 'react';
import {httpRequest} from "../config/httpRequest";

import {connect} from "react-redux";
import {UserContext} from "./UserContext";
import {logoutAction} from "../redux/user/user.actions";
import {LOGOUT_SUCCESS} from "../redux/user/user.types";
import {handleLogout} from "../components/helpers/functions";
function UserContextProvider(props) {
    const [user,setUser] = useState({});
    const [house,setHouse] = useState([]);
    let [categories,setCategories] = useState([])
    const getUser = async ()=>{
        if(props.user.isLoggedIn){
            const {response,error}=await httpRequest("GET","/api/auth/user/me",null,{"Authorization":`Bearer ${props.user.token}`});
            if(!error) {
                setUser(response.data.data);
            }
            else if(error.response.status==401){
                handleLogout();
            }
        }
    }

    const fetchData= async () =>{
        const {response,error} = await httpRequest("GET","/api/category");
        if(!error){
            let data = response.data;
            categories=data.data;
            setCategories(data.data);
        }
    }


    const getHouses =async ()=>{
        const {response,error}=await httpRequest("GET",'/api/house');
        if(!error){
            setHouse(response.data.data);
        }
    }


    useEffect(()=>{
        getHouses();
    },[])
    useEffect(()=>{
        getUser();

    },[props.user])
    useEffect(()=>{
        fetchData();
    },[house])
    const value = {
        user,setUser,getUser,categories,fetchData,house,getHouses
    }
    return (
        <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
    );
}
const mapStateToProps = state => ({
    user: state.user
})


export default connect(mapStateToProps)(UserContextProvider);
