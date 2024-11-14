import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Buy from './components/Buy';
import Cart from './components/Cart';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import Order from './components/Order';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import PageNotFound from './components/PageNotFOund'
import K from './components/K';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import AdminLayout from './components/AdminLayout';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/reg' element={<Register />} />
          <Route path='/login' element={<Login />} />
          
          <Route path='/' element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }>
            <Route index element={<Body />} />
            <Route path='buy/:id' element={<Buy />} />
            <Route path='cart' element={<Cart />} />
            <Route path='order' element={<Order />} />
            <Route path='userProfile' element={<UserProfile />} />
          </Route>

          <Route path='/admin' element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }>
               
            <Route index element={<AdminPanel />}/>
            <Route path='add' element={<AddProduct/>} />
            <Route path='order' element={<PageNotFound />} />
          </Route>

          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
