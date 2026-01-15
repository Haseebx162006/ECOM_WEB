import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './auth/Login';
import ResetPassword from './auth/ResetPassword';
import Navbar from './components/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import './App.css';

// Check if Backend/app/auth exists via file exploration previously
// Implemented specific Dashboards for RBAC demonstration
const DashboardLayout = ({ title, role }) => (
  <div style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh' }}>
    <h1>{title}</h1>
    <p>Welcome to the {role} dashboard. You have special access.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Main Layout Routes */}
            <Route path="*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute allowedRoles={['user', 'seller', 'admin']} />}>
                    <Route path="/dashboard" element={<DashboardLayout title="User Dashboard" role="User" />} />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={['seller', 'admin']} />}>
                    <Route path="/seller/dashboard" element={<DashboardLayout title="Seller Dashboard" role="Seller" />} />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin/dashboard" element={<DashboardLayout title="Admin Dashboard" role="Admin" />} />
                  </Route>

                  {/* Catch all redirect */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
