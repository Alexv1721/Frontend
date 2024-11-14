import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchproduct } from '../app/productsSlice';
import { Link } from 'react-router-dom';
import '../styles/AdminLandingPage.css';
import axios from 'axios';

const AdminPanel = () => {
  const products = useSelector((state) => state.pro.products);
  const status = useSelector((state) => state.pro.status);
  const error = useSelector((state) => state.pro.err);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchproduct());
    }
  }, [status, dispatch]);
async function handledelp(id) {

  try{
const product=await axios.delete(`http://localhost:5000/products/delproduct/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
  }
  catch(err){
console.log(err);

  }
  
}
  return (
    <div className="admin-landing-page">
      <h1>Welcome to Admin Panel</h1>
   
      <div className="product-list">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
<center>            <img src={item.image} alt={item.title} /></center>
            <div className="product-card-content">
              <div className="product-card-title">
                {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
              </div>
              <div className="product-card-description">
                {item.description.slice(0, 80)}...
              </div>
              <div className="product-card-price">Price: ${item.price} <br /> <br /> <button className='viewbn'>View</button><br />
              <br /> <button onClick={()=>{handledelp(item._id)}}>Delete</button></div>
              <hr />
              <hr />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default AdminLandingPage;
// import axios from 'axios';
// import { fetchproduct } from '../app/userSlice'
// import {useSelector,useDispatch} from 'react-redux'
// import { ReactNode, useState, useEffect } from 'react';
// import { useNavigate, Navigate } from "react-router-dom";
// const AdminPrivateRoute = ({ children }: { children: ReactNode }) => {

//   const dis=useDispatch()

//   const status=useSelector((state)=>state.user.status)
//     const userdetails=useSelector((state)=>state.user.userdetail)
//   const err=useSelector((state)=>state.user.err)


//   if (!localStorage.getItem('token')) {
//     return <Navigate to="/login" />;
//   }
// if(err)
// {
//   localStorage.removeItem('token')
//   return <Navigate to="/login" />;
// }

// if(userdetails.role=='admin'){
//   return <>{children}</>
// }

// };

export default AdminPanel;
