import React, { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchproduct } from '../app/userSlice';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const userDetails = useSelector((state) => state.user.userdetail);
  const err = useSelector((state) => state.user.err);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchproduct());
    }
  }, []);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }
  if (err) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
