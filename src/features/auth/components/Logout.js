import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutUserAsync, selectLoggedIn } from '../authSlice';
import { Navigate } from 'react-router-dom';

export const Logout = () => {
    const dispatch= useDispatch();
    const user=useSelector(selectLoggedIn)
    console.log("this is this")
    console.log(user)
    console.log("w")
    useEffect(() => {
       dispatch(LogoutUserAsync())
    }, [])
    
  return (
    <>
    {!user && <Navigate to={"/"} replace={true}></Navigate>}
    </>
  )
}
