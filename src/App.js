import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import Body from './components/Body';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Buy from './components/Buy';
import Cart from './components/Cart';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import Order from './components/Order';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/' element={

  <PrivateRoute>
        <MainLayout/>
  </PrivateRoute>
  }>

<Route index element={<Body/>} />
<Route path='/reg' element={<Register/>}/>
<Route path='buy/:id' element={<Buy/>}/>
<Route path='cart' element={<Cart/>}/>
<Route path='order' element={<Order/>}/>
  </Route>
      </Routes>
      </BrowserRouter>
 


    </div>
  );
}

export default App;
