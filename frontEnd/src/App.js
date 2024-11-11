import React, { useEffect } from 'react'
import {  RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Main from './Main/Main'
import SideNav from './Components/SideNav/SideNav'
import Navbar from './Components/Navbar/Navbar'
import Transactions from './Components/Transactions/Transactions'
import Closing from './Components/Closing/Closing'
import { ToggleProvider } from './Context/Toggle.Context'
import Penalties from './Components/Penalties/Penalties'
// import PenaltiesDetails from './Components/Penalties/PenaltiesDetails'

import OrderCreation from './Components/Order/createOrder/orderCreation';
import OrderDetails from './Components/Order/createOrder/×OrederDetails/orderDetails';
import OrderMoney from './Components/Order/orderMoney';
import AddUser from './Components/Order/Users/addUsers';
import Login from './Components/Login/Login';
import AuthProvider from './Context/authcontext';
import PenaltiesDetails from './Components/Penalties/PenaltiesDetails';
import AddSafe from './Components/Order/safe/addSafe';
import ShowSafe from './Components/Order/safe/showSafe';
import ChoseSafe from './Components/Order/safe/chooseSafe';
import AddContract from './Components/Contract/addContract';
import ShowContract from './Components/Contract/showContract';
import ShowUsers from './Components/Order/Users/showUsers';
import CloseTres from './Components/Closing/CloseTres';
import PaymentDetails from './Components/Transactions/paymentDetails';

// import AddUsers from './components/Order/Users/addUsers';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



export default function App() {

  const router = createHashRouter([
    {index:true , element:<Login/>},
    {path:"" ,element:<Main/>,children:[
      {path:"sidenav" , element: <SideNav/>},
      {path:"navbar" , element: <Navbar/>},
      {path:"/transactions" , element: <Transactions/>},
      {path:"/closing" , element: <Closing/>},
      {path:"/closeTresury" , element: <CloseTres/>},
      // {path:"/penalties" , element: <Penalties/>},
      // {index:true , element: <Penalties/>},
      {path:"/penalties/details/:id" , element: <PenaltiesDetails/>},

     // hodaaaaa 
     {path:'/orderCreate/:id' , element:<OrderCreation/>},
     {path:'/penalties' , element:<OrderMoney/>},
     {path:'/orderDetails/:id' , element:<OrderDetails/>},
     {path:'/paymentDetails/:id' , element:<PaymentDetails/>},
     {path:'/addSafe' , element:<AddSafe/>},
     {path:'/chooseSafe' , element:<ChoseSafe/>},
     {path:'/showSafes' , element:<ShowSafe/>},
     {path:'/AddContract' , element:<AddContract/>},
     {path:'/showContract' , element:<ShowContract/>},
     {path:'/addUsers' , element:<AddUser/>},
     {path:'/showUsers' , element:<ShowUsers/>},
     //hodaaa
 
  ]},
  
  ])

   useEffect(()=>{
    if(!localStorage.getItem("theme") ){
      localStorage.setItem("theme","light")
    }
 
   },[])
  return (
    <div>
   <ToggleProvider>
    <AuthProvider>
    
    <RouterProvider router={router} />


    </AuthProvider>
   </ToggleProvider>
    {/* <ToastContainer  theme='colored' /> */}
 
    </div>
  )
}
