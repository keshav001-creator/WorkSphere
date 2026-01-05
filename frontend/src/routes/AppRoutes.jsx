import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import Login from '../pages/Login'
import AppLayout from '../components/AppLayout'
import WorkspaceLayout from '../components/WorkspaceLayout'
import {WorkspaceProvider } from '../context/WorkspaceContext'

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>

        <Route path="/workspaces/:workspaceId"
          element={<WorkspaceProvider>
            <WorkspaceLayout />
          </WorkspaceProvider>}
        >
          <Route path="task"></Route>
          <Route path="task"></Route>
          <Route path="task"></Route>


        </Route>

      </Route>
    </Routes>
  )
}

export default AppRoutes