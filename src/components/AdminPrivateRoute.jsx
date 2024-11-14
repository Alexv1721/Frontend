import React, { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchproduct } from '../app/userSlice';
const AdminPrivateRoute = ({ children }: { children: ReactNode }) => {
  const userDetails = useSelector((state) => state.user.userdetail);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
 
  const err = useSelector((state) => state.user.err);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchproduct());
    }
  }, []);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

if(err){
  localStorage.removeItem('token')
  return <Navigate to="/login" />;
}
console.log(userDetails,'e');

if(userDetails.role=='normal')
  return <Navigate to="ksdhk" />;

return <>{children}</>;
};

export default AdminPrivateRoute;
