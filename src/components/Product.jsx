
import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { fetchproduct } from '../app/productsSlice'
import '../styles/pro.css'
const Product = ({cato,vis,search,setsearch,ses,setses}) => {
  const pro=useSelector((state)=>state.pro.products)

const nav=useNavigate()
    const status=useSelector((state)=>state.pro.status)
    const err=useSelector((state)=>state.pro.err)
const ser=useSelector((state)=>state.search.val)
   const dis=useDispatch()


   useEffect(()=>{
    if(status=='idle'){
        dis(fetchproduct())
    }
    },[status])  
    function handlenavigate(id){
      
        
if(ses=='/'){
    nav(ses)
}
else
nav(`/buy/${id}`)
    }
  
  return (
    
    <div className='products'>

      
      {

ser=='' || ser=='undifined'?


        vis?pro.map((item,index)=>{

       
          return(
            
              <div className='pro' key={item._id} onClick={()=>handlenavigate(item._id)}>
          
          <img className='proimg' src={item.image} alt="" />
          
          <div className='title'>{item.title.length>20? item.title.slice(0,20):item.title}</div>
          
          <div className='des'>{item.description.slice(0,80)}...</div>
      
          <div className='price'>Price: {item.price}$</div>
          <hr/>
              </div>
              
          )   
          }):
pro.map((item,index)=>{

if(item.cat==cato && cato!='')
return(
    <div className='pro' key={item._id} onClick={()=>handlenavigate(item.id)}>
<img className='proimg' src={item.image} alt="" />

<div className='title'>{item.title.length>20? item.title.slice(0,20):item.title}</div>

<div className='des'>{item.description.slice(0,80)}...</div>

<div className='price'>Price: {item.price}$</div>
<hr/>
    </div>
    
)   
})
     :<div>
{
  pro.map((item,index)=>{
       if(item.title.includes(ser) ||item.description.includes(ser) )
    return(
        <div className='pro' key={item._id} onClick={()=>handlenavigate(item._id)}>
    <img className='proimg' src={item.image} alt="" />
    
    <div className='title'>{item.title.length>20? item.title.slice(0,20):item.title}</div>
    
    <div className='des'>{item.description.slice(0,80)}...</div>
    
    <div className='price'>Price: {item.price}$</div>
    <hr/>
        </div>
        
    )   
    })
}
     </div> }
      
    
    </div>

  )
}

export default Product
