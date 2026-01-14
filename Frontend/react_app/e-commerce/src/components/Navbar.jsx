import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const categoriesRef = useRef(null);
  const userMenuRef = useRef(null);

  // Sample categories - will be dynamic later
  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Beauty',
    'Toys'
  ];

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

  return (
    <nav className="navbar">
      {/* Left Section - Logo & Categories */}
      <div className="navbar-left">
        <div className="logo">
          <span className="logo-icon">HA</span>
          <span className="logo-text">Cartopia</span>
        </div>
        
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
                <a key={index} href="#" className="dropdown-item">
                  {category}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Section - Search Bar */}
      <div className="navbar-center">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
          />
          <button className="search-button">
            <span>🔍</span>
          </button>
        </div>
      </div>

      {/* Right Section - Icons and User */}
      <div className="navbar-right">
        {/* Wishlist Icon */}
        <button className="icon-button" title="Wishlist">
          <span>❤️</span>
        </button>
        
        {/* Cart Icon with Count */}
        <button className="icon-button cart-button" title="Cart">
          <span>🛍️</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        
        {/* User Account Menu */}
        <div className="user-menu" ref={userMenuRef}>
          <button 
            className="user-profile"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <span className="user-name">Guest</span>
            <div className="user-avatar">👤</div>
          </button>
          
          {showUserMenu && (
            <div className="dropdown-menu user-dropdown">
              <a href="#" className="dropdown-item">Login</a>
              <a href="#" className="dropdown-item">Register</a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">My Orders</a>
              <a href="#" className="dropdown-item">My Wishlist</a>
              <a href="#" className="dropdown-item">Account Settings</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
