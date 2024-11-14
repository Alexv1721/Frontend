import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { fetchcat } from '../app/categoriesSlice'
import '../styles/body.css'
import { logout } from '../app/loginSlice'
import Header from '../components/Header';
import Product from '../components/Product';
import { productfilter } from '../app/productsSlice'
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel'
const Body = ({search,setsearch}) => {
   const session=useSelector((state)=>state.log.session)
    const nav=useNavigate()
    const[cato,setcat]=useState('')
    const user=useSelector((state)=>state.user.userdetail)
    const cat=useSelector((state)=>state.cat.categories)
    const status=useSelector((state)=>state.pro.status)
    const err=useSelector((state)=>state.cat.err)
   const dis=useDispatch()
   const images= ['com.jpg','jwel.jpg','cloth.jpg','girls.jpg']
   const[vis,setvis]=useState(true)
   const[ses,setses]=useState('')
  let s=''

   useEffect(()=>{
if(status=='idle'){
    dis(fetchcat())

}
},[status])

function handlefilter(filter){
  setvis(false)
  setcat(filter)

  
}

return (<div className=''>
      {/* {user.role=='admin'?<AdminPanel/>: */}
<div>
<Header/>
            <hr/>
        <div className='body'>
          
        {status=='loading' ? <div className='load'>Loading...</div>:<div></div>}
        {
            cat.map((item,index)=>
            {
                return( 
                <div className='catitem' onClick={()=>handlefilter(item)} >
                  
                    <img className='catimg' src={images[index]} alt=""/>
                    <p>{item}</p>
                </div>
           
            )
            })
        }
     
      
        </div>

     
     <center><Product ses={ses} setses={setses} cato={cato} vis={vis} /></center>
      {/* {
      setTimeout(() => {
        handlesession()
    },5000)

      } */}
</div>
      
         
    </div>
  )
}

export default Body
