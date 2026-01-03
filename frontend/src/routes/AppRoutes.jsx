import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home"
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import Login from '../pages/Login'

const AppRoutes = () => {
  return (
   <Routes>
    
    <Route path="/" element={<Home/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/login" element={<Login/>}></Route>

   </Routes>
  )
}

export default AppRoutes