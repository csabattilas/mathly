import { Routes, Route } from 'react-router-dom'
import AuthProvider from './components/auth/AuthProvider'
import * as React from 'react'
import Layout from './components/Layout'
import RequireAuth from './components/auth/RequireAuth'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Math10 from './pages/math/Math10'

export default function App() {
    return (
        <AuthProvider>
              <Routes> 
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/dashboard" 
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/math10"
                        element={
                            <RequireAuth>
                                <Math10 />
                            </RequireAuth>
                        }
                    />
                </Route>
            </Routes>
                </AuthProvider>
    )
}
