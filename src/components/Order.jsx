import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/order.css'
import { useNavigate } from 'react-router-dom'
import { fetchorder } from '../app/orderSlice'
const Order = () => {
const status=useSelector((state)=>state.order.orders.status)
const dis=useDispatch()
  useEffect(()=>{
 dis(fetchorder())
  },[status])
  const nav=useNavigate('')
  const orders=useSelector((state)=>state.order.orders)
  console.log(orders);
  
console.log(orders);

  return (
 <div className='o'>
  
{orders.length>0?     <div className='orders'>
    <div className='date'>
   <div className='od'><span>Order Date :</span>{new Date().toDateString()}</div>
   <div className='ed'>Extimate Delivary :{new Date().toDateString()}</div>
    </div>
      <hr />
      {
     orders.map(

      (item)=>{
return(
  
  
<div className='order'>

<div className='left'>
<img className='cimg'  src={item.image} alt="" />
</div>

    <div className='ctexts'>

      <div className="otitle">
        {item.title}
        </div>

        <div className="orating">
       Rating:   {item.rating.rate}
        </div>

        <div className="orating">
       Reviews:   {item.rating.count}
        </div>
        </div>
<div className="cprice">
 Price {item.price}$

  </div>  

  </div>

)
      }
    )}
<div className='pay'>
      <div className='pm'>
        
        <div>Payment</div>
        <br />
        <div>Via ***56</div>
      </div>
      <hr />
      <div className='ads'>
       <p className='d' style={{color:"brown"}}>Delivery Address</p>
<br />
       <p>3/146,South Street,SLP <br /> Alangulam Taluk,Tenkasi <br />
       TamilNadu-3978793
       </p>
      </div>
    </div>
    </div>:<div><div className='emtycart'>
      Nothing Added <button className='nbn' onClick={()=>nav('/')}>Go Home</button>
      </div></div>}
 </div>
  )
}

export default Order
