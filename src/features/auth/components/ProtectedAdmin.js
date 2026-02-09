import React from 'react'
import { selectLoggedIn } from "../authSlice";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../user/userSlice';

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedIn)
  const userInfo=useSelector(selectUserInfo)

  if (!user) {
    return <Navigate to='/Login' replace={true}> </Navigate>
  }
  if (userInfo && userInfo.role !== 'admin') {
    return <Navigate to='/' replace={true}> </Navigate>
  }
  return children;
}

export default ProtectedAdmin