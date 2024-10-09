import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import CounterContextProvider from './Context/CounterContext.js';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext.js';
import {Toaster} from 'react-hot-toast'
import Wishlist from './Components/Wishlist/Wishlist.jsx';
import ShippingAddress from './Components/ShippingAddress/ShippingAddress.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx';
import VerifyCode from './Components/VerifyCode/VerifyCode.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';

export default function App() {
  let routes = createHashRouter([
    { path: '/', element: <Layout />, children: [
      {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'wishlist' , element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'allorders' , element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:'shippingaddress/:cartId' , element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:'login' , element:<Login/>},
      {path:'forgotpassword' , element:<ForgotPassword/>},
      {path:'verifycode' , element:<VerifyCode/>},
      {path:'resetpassword' , element:<ResetPassword/>},
      {path:'register' , element:<Register/>},
      {path:'productdetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'*',element:<NotFound/>}

    ] }
  ])

  let {setUserToken} =useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])
  return <>
  <CounterContextProvider>
    <RouterProvider router={routes}></RouterProvider>
    <Toaster/>
  </CounterContextProvider>
  </>
}


