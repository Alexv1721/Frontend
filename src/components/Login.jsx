import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';
import { fetchproduct } from '../app/userSlice';
import BarLoader from "react-spinners/BarLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const [loading, setLoading] = useState(false);
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [perr, setPerr] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchproduct());
    }
  }, [status, dispatch]);

  const validateForm = () => {
    setErr('');
    setPerr('');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!uname) {
      setErr('Email is required');
      return false;
    } else if (!emailPattern.test(uname)) {
      setErr('Enter a valid email');
      return false;
    }
    if (!pwd) {
      setPerr('Password is required');
      return false;
    }
    return true;
  };

  async function handleLogin() {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const user = await axios.post('http://localhost:5000/user/login', { email: uname, password: pwd });
      localStorage.setItem('token', user.data.token);
      const roleResponse = await axios.get('http://localhost:5000/user/role', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      navigate(roleResponse.data.data === 'admin' ? '/admin' : '/');
    } catch (error) {
      if (error.response && error.response.data.message) {
        if (error.response.data.message.includes('Invalid email')) setErr('Invalid email');
        else if (error.response.data.message.includes('Invalid password')) setPerr('Invalid password');
      } else {
        setErr('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <div className='logpage'>
      <BarLoader cssOverride={override} size={150} color='red' loading={loading} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  ) : (
    <div className='login'>
      <div>
        <input
          onChange={(e) => setUname(e.target.value)}
          placeholder='Email'
          className={`un ${err ? 'input-error-custom' : ''}`}
          type="text"
          value={uname}
          ref={emailRef}
        />
        <span className='form-error-custom'>{err}</span>
      </div>
      <div>
        <input
          onChange={(e) => setPwd(e.target.value)}
          placeholder='Password'
          className={`up ${perr ? 'input-error-custom' : ''}`}
          type="password"
          value={pwd}
          ref={passwordRef}
        />
        <span className='form-error-custom'>{perr}</span>
      </div>
      <button className='lbn' onClick={handleLogin}>Login</button>
      <div className='login-links'>
        <p>Don't have an account? <a href="/reg">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
