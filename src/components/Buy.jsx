import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/buy.css';
import PopupMessage from './opupMessage';
import { addcart } from '../app/cartSlice';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const Buy = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const pro = useSelector((state) => state.pro.products);
  const dis = useDispatch();
const [products,setproducts]=useState([])
useEffect(()=>{
  async function sproduct(params) {
  
try{
  console.log(id);
  
  const p=await axios.get(`http://localhost:5000/products/product/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
console.log(p.data.data);
setproducts(p.data.data)
  
}
catch(err){
  console.log(err);
  
nav('/')
}
  }
sproduct()
},[])
  async function handleAddCart(id) {
    try {
      const res = await axios.post(
        `http://localhost:5000/cart/addcart/${id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );

      const responseData = res.data.data;
      dis(addcart(responseData));
      PopupMessage({ message: 'Product added to cart!', type: 'suc' });

      setTimeout(() => {
        nav('/');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="buy">

      {
      
      pro==''||pro==undefined ? 
         products._id === id &&(
            <div className="b" key={products._id}>
              <img className="buyimg" src={products.image} alt={products.title} />
              <div>
                <div className="btitle">{products.title.slice(0, 25)}</div>
                <div className="breview">**** ({products.rating.count} reviews)</div>
                <div className="bdes">
                  <span>Description:</span> {products.description.slice(0, 80)}
                </div>
                <div className="bprice">
                  ${products.price}
                  <br />
                  <span className="bb">Best price ever</span>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  <button
                    onClick={() => handleAddCart(products._id)}
                    className="addbn"
                  >
                    Add To Cart
                  </button>
                  <button className="buyn">Buy Now</button>
                </div>
              </div>
            </div>
          )
        : pro.map((item) => {
        if (item._id === id) {
          return (
            <div className="b" key={item._id}>
              <img className="buyimg" src={item.image} alt={item.title} />
              <div>
                <div className="btitle">{item.title.slice(0, 25)}</div>
                <div className="breview">**** ({item.rating.count} reviews)</div>
                <div className="bdes">
                  <span>Description:</span> {item.description.slice(0, 80)}
                </div>
                <div className="bprice">
                  ${item.price}
                  <br />
                  <span className="bb">Best price ever</span>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  <button
                    onClick={() => handleAddCart(item._id)}
                    className="addbn"
                  >
                    Add To Cart
                  </button>
                  <button className="buyn">Buy Now</button>
                </div>
              </div>
            </div>
          )
        }
        return null;
      })}
      <ToastContainer />
    </div>
  );
};

export default Buy;
