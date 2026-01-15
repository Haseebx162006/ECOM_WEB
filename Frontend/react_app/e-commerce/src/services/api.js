import axios from 'axios';

/**
 * API Service with Axios
 * 
 * DEVELOPMENT MODE: Uses mock data internally
 * PRODUCTION MODE: Switch to real backend by changing USE_MOCK_API flag
 * 
 * When backend is ready:
 * 1. Set USE_MOCK_API = false
 * 2. Update API_BASE_URL in .env (VITE_API_URL)
 * 3. NO COMPONENT CHANGES NEEDED!
 */

// Toggle between mock and real API
const USE_MOCK_API = false; // Set to false when backend is ready

// Configure axios instance
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for app.auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/reset-password') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ==================== MOCK HELPERS ====================
// ==================== API SERVICE ====================
export const api = {
  // ==================== PRODUCTS ====================

  /**
   * Get all products with optional filtering
   * GET /api/products
   */
  getProducts: async (filters = {}) => {
    const response = await axiosInstance.get('/api/products', { params: filters });
    return response.data;
  },

  getCategories: async () => {
    const response = await axiosInstance.get('/api/categories');
    return response.data;
  },

  /**
   * Get product by ID
   * GET /api/products/:id
   */
  getProductById: async (productId) => {
    const response = await axiosInstance.get(`/api/products/${productId}`);
    return response.data;
  },

  getRelatedProducts: async (productId) => {
    const response = await axiosInstance.get(`/api/products/${productId}/related`);
    return response.data;
  },

  // ==================== CART ====================

  getCart: async () => {
    const response = await axiosInstance.get('/api/cart');
    return response.data;
  },

  addToCart: async (productId, quantity = 1) => {
    const response = await axiosInstance.post('/api/cart', { productId, quantity });
    window.dispatchEvent(new Event('cartUpdated'));
    return response.data;
  },

  updateCartItem: async (productId, quantity) => {
    const response = await axiosInstance.put(`/api/cart/${productId}`, { quantity });
    window.dispatchEvent(new Event('cartUpdated'));
    return response.data;
  },

  removeFromCart: async (productId) => {
    const response = await axiosInstance.delete(`/api/cart/${productId}`);
    window.dispatchEvent(new Event('cartUpdated'));
    return response.data;
  },

  clearCart: async () => {
    const response = await axiosInstance.delete('/api/cart');
    window.dispatchEvent(new Event('cartUpdated'));
    return response.data;
  },

  validatePromoCode: async (code) => {
    const response = await axiosInstance.post('/api/cart/promo', { code });
    return response.data;
  },

  getProductReviews: async (productId) => {
    const response = await axiosInstance.get(`/api/products/${productId}/reviews`);
    return response.data;
  },

  addReview: async (productId, reviewData) => {
    const response = await axiosInstance.post(`/api/products/${productId}/reviews`, reviewData);
    return response.data;
  },

  // ==================== WISHLIST ====================
  getWishlist: async () => {
    const response = await axiosInstance.get('/api/wishlist');
    return response.data;
  },

  toggleWishlist: async (productId) => {
    const response = await axiosInstance.post(`/api/wishlist/toggle/${productId}`);
    return response.data;
  },

  checkWishlistStatus: async (productId) => {
    const response = await axiosInstance.get(`/api/wishlist/check/${productId}`);
    return response.data;
  },

  // ==================== ORDERS ====================
  getOrders: async () => {
    const response = await axiosInstance.get('/api/orders');
    return response.data;
  },

  createOrder: async (shippingAddress) => {
    const response = await axiosInstance.post('/api/orders', null, { params: { shipping_address: shippingAddress } });
    window.dispatchEvent(new Event('cartUpdated')); // Cart is cleared after order
    return response.data;
  },

  // ==================== app.auth ====================

  login: async (email, password) => {
    const response = await axiosInstance.post('/api/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post('/api/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
  }
};

export default api;
