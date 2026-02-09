//json-server --watch data.json --port 8080
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from './pages/CartPage';
import CheckOut from './pages/CheckOut';
import Home from './pages/Home';
import { ProdDetPage } from './pages/ProdDetPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedIn, selectUserChecked } from './features/auth/authSlice';
import { fetchItemsByUseridAsync } from './features/cart/cartSlice';
import ErrorPage from './pages/ErrorPage';
import OrderSuccess from './pages/OrderSuccess';
import UserOrderPage from './pages/UserOrderPage';
import { fLoginUserAsync, fLoginUserOrderAsync, selectUserInfo, UpdateUserAsync } from './features/user/userSlice';
import { UserProfilePage } from './pages/UserProfilePage';
import { Logout } from './features/auth/components/Logout';
import ForgetPassword from './features/auth/components/ForgetPassword';
import { AdminHome } from './pages/AdminHome';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import { AdminProductDetPage } from './pages/AdminProductDetPage';
import ProductForm from './features/admin/components/ProductForm';
import { OrdersManagement } from './features/admin/components/OrdersManagement';
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import PaymentIntent from './pages/PaymentIntent';
import AutoImageSlider from './pages/AutoImageSlider';
import Invoice from './features/invoice/Invoice';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
      <Home></Home>
    </Protected>),
  },
  {
    path: "/Admin",
    element: (<ProtectedAdmin>
      <AdminHome></AdminHome>
    </ProtectedAdmin>),
  },
  {
    path: "/Login",
    element: (<LoginPage></LoginPage>),
  },
  {
    path: "/SignUp",
    element: (<SignUpPage></SignUpPage>),
  },
  {
    path: "/Cart",
    element: (<Protected>
      <CartPage></CartPage>
    </Protected>),
  },
  {
    path: "/CheckOut",
    element: (<Protected>
      <CheckOut></CheckOut>
    </Protected>),
  },
  {
    path: "/ProductDet/:id",
    element: (<Protected>
      <ProdDetPage></ProdDetPage>
    </Protected>),
  },
   {
    path: "/PaymentIntent",
    element: (<Protected>
      <PaymentIntent></PaymentIntent>
    </Protected>),
  },
 
  {
    path: "/admin/ProductDet/:id",
    element: (<ProtectedAdmin>
      <AdminProductDetPage></AdminProductDetPage>
    </ProtectedAdmin>),
  },
  {
    path: "/admin/ProductForm",
    element: (<ProtectedAdmin>
      <ProductForm></ProductForm>
    </ProtectedAdmin>),
  },
  {
    path: "/admin/ProductEdit/:id",
    element: (<ProtectedAdmin>
      <ProductForm></ProductForm>
    </ProtectedAdmin>),
  },
  {
    path: "/admin/OrdersManagement",
    element: (<ProtectedAdmin>
      <OrdersManagement></OrdersManagement>
    </ProtectedAdmin>),
  },
  {
    path: "/OrderSuccess/:id",
    element: <OrderSuccess></OrderSuccess>,
  },
  {
    path: "/UserOrder",
    element: <UserOrderPage></UserOrderPage>,
  },
   {
    path: "/AutoImageSlider",
    element: <AutoImageSlider></AutoImageSlider>,
  },
  {
    path: "/UserProfile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/Logout",
    element: <Logout></Logout>,
  },
  {
    path: "/ForgetPassword",
    element: <ForgetPassword></ForgetPassword>,
  },
  {
    path: "/Invoice/:id",
    element: <Invoice></Invoice>,
  },
  
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);



function App() {
  const user = useSelector(selectLoggedIn)
  const dispatch = useDispatch()
  // const users = useSelector(selectUserInfo);
  const userChecked = useSelector(selectUserChecked);
  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUseridAsync())
      dispatch(fLoginUserAsync())
      // dispatch(fLoginUserOrderAsync(user.id))
      // dispatch(UpdateUserAsync(user.id))
    }
  }, [dispatch, user])


  // useEffect(() => {
  //   if(user){
  //     dispatch(fetchItemsByUseridAsync(user.id))
  //     dispatch(fLoginUserAsync(user.id))
  //     // dispatch(UpdateUserAsync())
  //   }
  // }, [dispatch,users])

  return (

    <div className="App">{
      userChecked &&
      <AlertProvider template={AlertTemplate} {...options}>

        <RouterProvider router={router} />
      </AlertProvider>}
    </div>
  );
}

export default App;
