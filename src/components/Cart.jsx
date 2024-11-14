import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/cart.css';
import { removecart, emtycart, fetchcart } from '../app/cartSlice';
import { placeorder } from '../app/orderSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import PopupMessage from './opupMessage';
const Cart = () => {
  const cart = useSelector((state) => state.cart.carts);
  const status = useSelector((state) => state.cart.status);
  const [price, setPrice] = useState([]);
  const [select, setSelect] = useState([]);
  const discount = [10, 2, 12, 4, 5, 8, 22, 6, 23, 5, 2, 6, 1, 0, 7, 3];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[count,setcount]=useState(1)
  useEffect(() => {
    dispatch(fetchcart());
  }, []);

  useEffect(() => {
    const prices = cart.map((item) => item.price);
    setPrice(prices);
  }, [cart]);

  function handleSel(val, id) {
    console.log();
    
    setcount(val)
    const existingItem = select.find((item) => item.id === id);
    if (existingItem) {
      const updatedSelect = select.map((item) =>
        item.id === id ? { ...item, count: val } : item
      );
      setSelect(updatedSelect);
    } else {
      const newItem = { id, count: val };
      setSelect([...select, newItem]);
    }
  }

  function handlep(id) {
    if (!select || select.length <= 0) {
      return 1;
    } else {
      let val = 1;
      select.forEach((item) => {
        if (item.id === id) {
          val = item.count;
        }
      });
      return val;
    }
  }

  function pricecalculation() {
    let quantity = '';
    if (cart.length < 1) {
      quantity = 1;
    } else {
      select.forEach((item) => {
        parseInt(quantity);
        quantity += item.count;
      });
    }
    const a = Math.round(Math.random() * 15 - 1);
    const b = Math.round(Math.random() * 15 - 1);
    const totalPrice = price.reduce((a, i) => (a += i), 0);
    return a - b + totalPrice * quantity;
  }

  async function handleremove(id) {

    PopupMessage({ message: 'Product removed from cart!', type: 'warn' });
    try{
const res=await axios.delete(`http://localhost:5000/cart/delcart/${id}`,{headers:{Authorization:localStorage.getItem('token')}})
const d=await res.data    

setTimeout(() => {
  navigate('/');
}, 2000);
dispatch(removecart(id));
setPrice([]);
}
    catch(err){
console.log(err);

    }

  }

async  function handlebuy(id) {
    if (id === 'full') {
      dispatch(placeorder(cart));
      dispatch(emtycart());
      const finalPrice = pricecalculation();
const items=[]
cart.forEach(
(item)=>{
  items.push(
    { cat: item.cat,
       description: item.description, 
       image: item.image
    , price: item.price, rating: {
      rate: item.rating.rate,
      count: item.rating.count
      ,title:item.title
    }})
}
)

try{
  await axios.post(`http://localhost:5000/order/addorders`,{},{headers:{Authorization:localStorage.getItem('token')}})
}
catch(err){
  console.log('error in adding',err.message);
  
}
    } else {
      const selectedCart = cart.filter((item) => item._id === id);
      dispatch(placeorder(selectedCart));
      const val = selectedCart[0].price * handlep(id);
      setPrice(val);
      handleremove(id);
      console.log('count',count);
      
   try{
    await axios.post(`http://localhost:5000/order/addorder/${id}`,{count:count},{headers:{Authorization:localStorage.getItem('token')}})
   }
   catch(err){
    console.log(err.message);
    
   }
    }

  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading cart data.</div>;
  }

  return (
    <div className='carts'>
      {cart.map((item) => (
        <div className='cart' key={item.id}>
          <div className='cleft'>
            <img className='cimg' src={item.image} alt='' />
            <select onChange={(e) => handleSel(e.target.value, item._id)}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>

          <div className='ctexts'>
            <div className='ctitle'>{item.title.slice(0, 27)}</div>
            <div className='crating'>({item.rating.count} Reviews)****</div>
            <div className='cr'>Rating: {item.rating.rate}</div>
            <div className='cprice'>{item.price * handlep(item._id)}$</div>
            <div>
              <button className='buybn' onClick={() => handlebuy(item._id)}>
                Buy
              </button>
              <button className='rbn' onClick={() => handleremove(item._id)}>
                Remove
              </button>
            </div>
            <hr />
          </div>
        </div>
      ))}
      {cart.length !== 0 ? (
        <div className='pdetails'>
          <div>
            <p className='pd'>Price Details</p>
            <p className='pp'>Price({cart.length})</p>
            <p className='pp'>Discount</p>
            <p className='pp'>Platform Fee</p>
            <p className='pp'>Delivery Charges</p>
            <hr />
            <p>Total Amount</p>
          </div>
          <div style={{ marginTop: '37px' }}>
            <p>{price.reduce((a, i) => (a += i), 0)}</p>
            <p>10%</p>
            <p>1$</p>
            <p className='del'>
              <span className='delfree'>$40</span> Free
            </p>
            <p>{pricecalculation().toLocaleString().slice(0, 8)} $</p>
            <button className='placeorder' onClick={() => handlebuy('full')}>
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className='emtycart'>
          Nothing Added <button className='gbn' onClick={() => navigate('/')}>Go Home</button>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default Cart;
