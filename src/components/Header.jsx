import React, { useEffect, useState } from 'react'
import '../styles/head.css'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setsearch } from '../app/searchSlice'
import axios from 'axios'
const Header = () => {
 
  const cartcount=useSelector((state)=>state.cart.count)
  const oc=useSelector((state)=>state.order.orders)
  const nav=useNavigate()
  const dis=useDispatch()
  const [us,setuser]=useState({})
 
useEffect(
  ()=>{
    const getuser=async()=>{
      const res=await axios.get('http://localhost:5000/user/user',{headers:{Authorization:localStorage.getItem('token')}
      }
    )
      const ur=await res.data

      setuser(ur.data)
    }
    getuser()

  }
  ,[])

  
  return (
    <div className='head'>
      <div><img className='logo' src="log.png" alt="" /></div>
    <input onChange={(e)=>dis(setsearch(e.target.value))} className='search' type="text" name="" id="" placeholder='Search for Products,Brands and More'/>
<div><img onClick={()=>nav('/cart')} className='add' src="add-to-cart-icon-vector.jpg" alt="" /> <span >{cartcount}</span></div>
  <div>  <img className='admin' src="admin.jpg" alt="" onClick={()=>nav('/userProfile')}/>  <span style={{color:'red'}}>{us.username}</span></div>
<div><img className='orderimg' src="flipkart.webp " alt="" onClick={()=>nav('/order')} /><span >{oc.length}</span></div>

    </div>
  )
}

export default Header
