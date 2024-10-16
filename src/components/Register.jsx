import React, { useState } from 'react'
import '../styles/register.css'
import axios from 'axios'
const Register = () => {
    const [uname,setuname]=useState('')
    const [password,setpassword]=useState('')
    const [confirmpassword,setconfirmpassword]=useState('')
    const [email,setemail]=useState('')
   const[formdata,setformdata]=useState({username:'',email:'',password:'',confirmpassword:''})
   async function handlebackend(){
try{
    const userregiter=await axios.post('http://localhost:5000/api/register',formdata).then((msg)=>console.log(msg)
    ).catch(err=>console.log(err)
    )
}
catch(err){
    console.log(err);
    
}
   }
    const handleSubmit =(e) => {
        e.preventDefault();
       setformdata({username:uname,email:email,password:password,confirmpassword:confirmpassword})
      handlebackend()
      };
  return (
    <div className="container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>User Registration</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={uname}
          onChange={(e)=>setuname(e.target.value) }
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e)=>setemail(e.target.value) }
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e)=>setpassword(e.target.value) }
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmpassword}
          onChange={(e)=>setconfirmpassword(e.target.value) }
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
