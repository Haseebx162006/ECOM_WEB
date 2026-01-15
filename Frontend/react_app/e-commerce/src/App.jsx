import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import Cart from './pages/Cart'
import About from './pages/About'
import Login from './auth/Login'
import Register from './auth/Register'
import ResetPassword from './auth/ResetPassword'
import ProtectedRoute from './auth/ProtectedRoute'
import MyOrders from './pages/MyOrders'
import Wishlist from './pages/Wishlist'
import SellerDashboard from './pages/SellerDashboard'

const DashboardLayout = ({ title, role }) => (
  <div style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh' }}>
    <h1>{title}</h1>
    <p>Welcome to the {role} dashboard.</p>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<ProtectedRoute allowedRoles={['user', 'seller', 'admin']} />}>
            <Route path="/dashboard" element={<DashboardLayout title="User Dashboard" role="User" />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['seller', 'admin']} />}>
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<DashboardLayout title="Admin Dashboard" role="Admin" />} />
          </Route>

          <Route path="/orders" element={<ProtectedRoute allowedRoles={['user', 'seller', 'admin']}><MyOrders /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute allowedRoles={['user', 'seller', 'admin']}><Wishlist /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
