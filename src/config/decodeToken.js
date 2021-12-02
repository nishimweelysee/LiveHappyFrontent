import jwt from 'jwt-decode'
export const decodeToken = ()=>{
    try {
        let user = JSON.parse(localStorage.getItem('user'));
        const data = jwt(user.token);
        let auth = data.authorities.find(aut=>aut.authority.includes("ROLE")?aut.authority:"");
        let role = auth.authority;
        return role;
    }catch (e){
        return ""
    }
}
