import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { useAuth } from '../../auth/AuthContext';

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const categoriesRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setShowCategories(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sync cart count with mock API/localStorage
  useEffect(() => {
    let isMounted = true;

    const refreshCartCount = async () => {
      try {
        const cart = await api.getCart();
        if (!isMounted) return;
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error('Failed to load cart count:', error);
      }
    };

    refreshCartCount();

    const handleCartUpdate = () => refreshCartCount();
    const handleStorage = (event) => {
      if (event.key === 'cartItems') refreshCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      isMounted = false;
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <nav className="navbar">
      {/* Left Section - Logo & Categories */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>

        {/* Categories Dropdown */}
        <div className="categories-dropdown" ref={categoriesRef}>
          <button
            className="categories-button"
            onClick={() => setShowCategories(!showCategories)}
          >
            <span>☰</span>
            <span>Categories</span>
          </button>

          {showCategories && (
            <div className="dropdown-menu">
              {categories.map((category, index) => (
                <Link key={category.id || index} to={`/products?category=${category.name || category}`} className="dropdown-item">
                  {category.name || category}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Section - Search Bar */}
      <div className="navbar-center">
        <form className="search-container" onSubmit={(e) => {
          e.preventDefault();
          if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
          }
        }}>
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <span>🔍</span>
          </button>
        </form>
      </div>

      {/* Right Section - Icons and User */}
      <div className="navbar-right">
        {/* Wishlist Icon */}
        {/* Wishlist Icon */}
        <Link to="/wishlist" className="icon-button" title="Wishlist">
          <span>❤️</span>
        </Link>

        {/* Cart Icon with Count */}
        <Link to="/cart" className="icon-button cart-button" title="Cart">
          <span>🛍️</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        {/* User Account Menu */}
        <div className="user-menu" ref={userMenuRef}>
          <button
            className="user-profile"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <span className="user-name">{user ? user.name : 'Guest'}</span>
            <div className="user-avatar">{user ? user.name.charAt(0).toUpperCase() : '👤'}</div>
          </button>

          {showUserMenu && (
            <div className="dropdown-menu user-dropdown">
              {user ? (
                <>
                  <div className="dropdown-item" style={{ background: '#f3f4f6', color: '#6b7280', cursor: 'default' }}>
                    <small>Logged in as <b>{user.role}</b></small>
                  </div>
                  <div className="dropdown-divider"></div>
                  {user.role === 'admin' && <Link to="/admin/dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>Admin Dashboard</Link>}
                  {user.role === 'seller' && <Link to="/seller/dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>Seller Dashboard</Link>}
                  {user.role === 'user' && <Link to="/dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>My Dashboard</Link>}
                  <Link to="#" className="dropdown-item">My Orders</Link>
                  <Link to="#" className="dropdown-item">My Wishlist</Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={() => { logout(); setShowUserMenu(false); navigate('/'); }} className="dropdown-item" style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626' }}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="dropdown-item" onClick={() => setShowUserMenu(false)}>Login</Link>
                  <Link to="/login" className="dropdown-item" onClick={() => setShowUserMenu(false)}>Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
