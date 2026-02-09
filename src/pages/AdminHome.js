import React from 'react'
import { AdminProduct } from '../features/admin/components/AdminProduct'
import Navbar from '../features/navbar/Navbar'

export const AdminHome = () => {
  return (
    <>
    <Navbar>
  <AdminProduct></AdminProduct>
    </Navbar>
    </>
  )
}
