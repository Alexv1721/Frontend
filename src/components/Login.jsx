import React, { useState } from 'react'
import '../styles/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userlogin } from '../app/loginSlice'
import axios from 'axios'
const Login = () => {
const [uname,setuname]=useState('')
const [pwd,setpwd]=useState('')
const[err,seterr]=useState('')
const[perr,setperr]=useState('')
const un=useSelector((state)=>state.log.uname)
const pw=useSelector((state)=>state.log.password)
const nav=useNavigate('')
const dis=useDispatch()

const [u,setu]=useState('')

console.log(sessionStorage.getItem('token'));

async function handlelogin(){

const data={email:uname,password:pwd}
const user=await axios.post('http://localhost:5000/api/login',data).then((data)=>  localStorage.setItem('token', data.data.token)
 ).catch((err)=>console.log(err)
 )
 nav('/')


}
  return (
    <div className='logpage'>
      <div className='login'>
      <div>
        Login
      </div>
      <br />
     <div> UserName: <input onChange={(e)=>
        setuname(e.target.value)
     
     } className='un' type="text" name="" id="" /></div>
     <span className='err'>{err}</span>
     <br />
     <div>PassWord: <input onChange={(e)=>
        setpwd(e.target.value)
 
     } className='up' type="text" name="" id="" /></div>
     <span className='err'>{perr}</span>
     <br />
     <div><input type="checkbox" name="" id="" /> Remember me</div>
    <center> <button className='lbn' onClick={()=>handlelogin()}>Login</button></center>
         
         <a href="">Forgot password</a>
      </div>
         </div>
  )
}

export default Login
