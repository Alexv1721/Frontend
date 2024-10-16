import {ReactNode} from 'react'
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PrivateRoute=({children} : {children:ReactNode})=>{
const accesstoken=localStorage.getItem('token')
console.log(accesstoken);

return accesstoken?children:<Navigate to='/login' />

}

export default PrivateRoute
