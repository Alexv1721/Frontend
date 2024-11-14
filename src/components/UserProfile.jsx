import React from 'react';
import '../styles/UserProfile.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { clearUser, fetchproduct } from '../app/userSlice'
import { useEffect } from 'react';
const UserProfile = () => {
    const status=useSelector((state)=>state.user.status)
    const userdetails=useSelector((state)=>state.user)
const nav=useNavigate()
const dis=useDispatch()

console.log(userdetails);
useEffect(() => {
    if (status === 'idle') {
      dis(fetchproduct());
    }
  }, []);
 function handlelogout(){
localStorage.removeItem('token')
dis(clearUser())
nav('/login')
    }        
    return (
        <div className="profile-card">
            <h2 className="profile-title">User Profile</h2>
            <div className="profile-info">
                <label>Name:</label>
                <p>{userdetails.userdetail.username}</p>
            </div>
            <div className="profile-info">
                <label>Email:</label>
                <p>{userdetails.userdetail.email}</p>
            </div>
            <div className="profile-info">
                <label>Phone:</label>
                <p>+123 456 7890</p>
            </div>
            <div className="logout"><button onClick={()=>handlelogout()}>Logout</button></div>
        </div>
    );
};

export default UserProfile;
