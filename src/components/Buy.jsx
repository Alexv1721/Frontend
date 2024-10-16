import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import '../styles/buy.css'
import { addcart } from '../app/cartSlice'
import Product from '../components/Product';
import Body from './Body'
import axios from 'axios'
const Buy = () => {
    const {id}=useParams()
    const nav=useNavigate()
    const pro=useSelector((state)=>state.pro.products)
    const dis=useDispatch()
    const car=useSelector((state)=>state.cart.carts)


 async function handleaddcart(id){
  nav('/')
const res=await axios.post(`http://localhost:5000/cart/addcart/${id}`).then(()=>console.log('addesd suceesfully')
).catch(err=>console.log(err)
)

dis(addcart(res))


  }


    return (
   <div className='buy'>
     <div  className=''>
{
    pro.map(
        (item)=>{
if(item._id==id){
    return( 
    <div className='b'  key={item._id} >

      <div><img className='buyimg'  src={item.image} alt="" /></div>
   <div>
<center>   <div className='btitle' >
  
  {item.title.slice(0,25)}</div>
</center>
<div className='breview'>****({item.rating.count} reviews)</div>
    <div className='bdes'><span>Description:</span> {item.description.slice(0,80)}</div> 
    <div  className='bprice'>{item.price}$ <br /><span className='bb'>Best price ever</span></div>
    <div style={{display:'flex', gap:20}}>
  <button onClick={()=>handleaddcart(item._id)} className='addbn'>Add To Cart -></button>

<button className='buyn' >Buy Now</button>
</div>
   
   </div>

        </div>
        )
}
        }
    )
}


    </div>
   </div>
  )
}

export default Buy
