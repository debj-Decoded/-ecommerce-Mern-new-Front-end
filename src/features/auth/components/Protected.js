import React from 'react'
import { selectLoggedIn } from "../authSlice";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedIn)

  if (!user) {
    return <Navigate to='/Login' replace={true}> </Navigate>
  }
  return children;
}

export default Protected