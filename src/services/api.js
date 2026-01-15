import axios from 'axios';
import { mockProducts, mockCategories, promoCodes } from '../data/mockData';

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
const USE_MOCK_API = true; // Set to false when backend is ready

// Configure axios instance
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token
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
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== MOCK HELPERS ====================

const API_DELAY = 200; // Simulate network delay (ms)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getCartFromStorage = () => {
  const savedCart = localStorage.getItem('cartItems');
  const parsed = savedCart ? JSON.parse(savedCart) : [];
  return parsed.map(item => ({
    productId: item.productId ?? item.id,
    quantity: item.quantity ?? 1
  }));
};

const saveCartToStorage = (cart) => {
  const minimal = cart.map(item => ({
    productId: item.productId ?? item.id,
    quantity: item.quantity
  }));
  localStorage.setItem('cartItems', JSON.stringify(minimal));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'));
  }
};

const expandCartItems = (storedCart) => {
  return storedCart
    .map(item => {
      const product = mockProducts.find(p => p.id === (item.productId ?? item.id));
      if (!product) return null;
      return {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity,
        stock: product.stock
      };
    })
    .filter(Boolean);
};

// ==================== API SERVICE ====================
export const api = {
  // ==================== PRODUCTS ====================
  
  /**
   * Get all products with optional filtering
   * GET /api/products
   */
  getProducts: async (filters = {}) => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      let filtered = [...mockProducts];

      if (filters.category && filters.category !== 'All') {
        filtered = filtered.filter(p => p.category === filters.category);
      }
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice);
      }
      if (filters.minRating !== undefined) {
        filtered = filtered.filter(p => (p.rating || 0) >= filters.minRating);
      }

      if (filters.sort) {
        switch (filters.sort) {
          case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          default:
            break;
        }
      }

      return filtered;
    }
    const response = await axiosInstance.get('/products', { params: filters });
    return response.data;
  },

  /**
   * Get product by ID
   * GET /api/products/:id
   */
  getProductById: async (productId) => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      return mockProducts.find(p => p.id === parseInt(productId));
    }
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  },

  getRelatedProducts: async (productId) => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      const product = mockProducts.find(p => p.id === parseInt(productId));
      if (!product) return [];
      return mockProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
    }
    const response = await axiosInstance.get(`/products/${productId}/related`);
    return response.data;
  },

  // ==================== CART ====================

  getCart: async () => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      return expandCartItems(getCartFromStorage());
    }
    const response = await axiosInstance.get('/cart');
    return response.data;
  },

  addToCart: async (productId, quantity = 1) => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      const cart = getCartFromStorage();
      const existing = cart.find(item => item.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ productId, quantity });
      }
      saveCartToStorage(cart);
      window.dispatchEvent(new Event('cartUpdated'));
      return { cart: expandCartItems(cart) };
    }
    const response = await axiosInstance.post('/cart', { productId, quantity });
    return response.data;
  },

  updateCartItem: async (productId, quantity) => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      const cart = getCartFromStorage();
      const item = cart.find(i => i.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      saveCartToStorage(cart);
      window.dispatchEvent(new Event('cartUpdated'));
      return { cart: expandCartItems(cart) };
    }
    const response = await axiosInstance.put(`/cart/${productId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (productId) => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      let cart = getCartFromStorage();
      cart = cart.filter(item => item.productId !== productId);
      saveCartToStorage(cart);
      window.dispatchEvent(new Event('cartUpdated'));
      return { cart: expandCartItems(cart) };
    }
    const response = await axiosInstance.delete(`/cart/${productId}`);
    return response.data;
  },

  clearCart: async () => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      saveCartToStorage([]);
      window.dispatchEvent(new Event('cartUpdated'));
      return { cart: [] };
    }
    const response = await axiosInstance.delete('/cart');
    return response.data;
  },

  validatePromoCode: async (code) => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      const promo = promoCodes[code.toUpperCase()];
      if (!promo) {
        throw new Error('Invalid promo code');
      }
      return promo;
    }
    const response = await axiosInstance.post('/cart/promo', { code });
    return response.data;
  },

  getProductReviews: async (productId) => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      const product = mockProducts.find(p => p.id === parseInt(productId));
      return product?.reviews || [];
    }
    const response = await axiosInstance.get(`/products/${productId}/reviews`);
    return response.data;
  },

  addReview: async (productId, reviewData) => {
    if (USE_MOCK_API) {
      await delay(API_DELAY);
      return { success: true, message: 'Review added successfully' };
    }
    const response = await axiosInstance.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  },

  // ==================== AUTH ====================

  login: async (email, password) => {
    if (USE_MOCK_API) {
      return { token: 'mock-token', user: { email } };
    }
    const response = await axiosInstance.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  register: async (userData) => {
    if (USE_MOCK_API) {
      return { token: 'mock-token', user: userData };
    }
    const response = await axiosInstance.post('/auth/register', userData);
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
