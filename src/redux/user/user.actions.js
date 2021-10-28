import cogoToast from "cogo-toast";

export const loginAction = (type,data) => {
    localStorage.setItem("user",JSON.stringify(data));
    return {
        type:type,
        data:data
    };
};


export const logoutAction= (type)=>{
    localStorage.removeItem("user");
    cogoToast.success("Your are logged out success")
    return {
        type
    }
}
