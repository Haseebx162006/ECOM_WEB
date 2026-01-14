import axios from 'axios';

// Configure axios instance
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token (when available)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to headers if available
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
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Service Object
export const apiService = {
  // ==================== PRODUCTS ====================
  
  /**
   * Get featured products
   * GET /api/products/featured
   */
  getFeaturedProducts: async () => {
    try {
      const response = await axiosInstance.get('/products/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  /**
   * Get new arrivals
   * GET /api/products/new-arrivals
   */
  getNewArrivals: async () => {
    try {
      const response = await axiosInstance.get('/products/new-arrivals');
      return response.data;
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  },

  /**
   * Get product by ID
   * GET /api/products/:id
   */
  getProductById: async (productId) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  /**
   * Search products
   * GET /api/products/search?query=:query
   */
  searchProducts: async (query) => {
    try {
      const response = await axiosInstance.get('/products/search', {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // ==================== CATEGORIES ====================

  /**
   * Get all categories
   * GET /api/categories
   */
  getCategories: async () => {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  /**
   * Get category by ID
   * GET /api/categories/:id
   */
  getCategoryById: async (categoryId) => {
    try {
      const response = await axiosInstance.get(`/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  // ==================== CART ====================

  /**
   * Get user's cart
   * GET /api/cart
   */
  getCart: async () => {
    try {
      const response = await axiosInstance.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  /**
   * Add item to cart
   * POST /api/cart/add
   */
  addToCart: async (productId, quantity) => {
    try {
      const response = await axiosInstance.post('/cart/add', {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  /**
   * Remove item from cart
   * DELETE /api/cart/:productId
   */
  removeFromCart: async (productId) => {
    try {
      const response = await axiosInstance.delete(`/cart/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  /**
   * Update cart item quantity
   * PUT /api/cart/:productId
   */
  updateCartQuantity: async (productId, quantity) => {
    try {
      const response = await axiosInstance.put(`/cart/${productId}`, {
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },

  // ==================== ORDERS ====================

  /**
   * Get user's orders
   * GET /api/orders
   */
  getOrders: async () => {
    try {
      const response = await axiosInstance.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  /**
   * Get order by ID
   * GET /api/orders/:id
   */
  getOrderById: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  /**
   * Create new order
   * POST /api/orders
   */
  createOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // ==================== WISHLIST ====================

  /**
   * Get user's wishlist
   * GET /api/wishlist
   */
  getWishlist: async () => {
    try {
      const response = await axiosInstance.get('/wishlist');
      return response.data;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  },

  /**
   * Add to wishlist
   * POST /api/wishlist/add
   */
  addToWishlist: async (productId) => {
    try {
      const response = await axiosInstance.post('/wishlist/add', {
        productId
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },

  /**
   * Remove from wishlist
   * DELETE /api/wishlist/:productId
   */
  removeFromWishlist: async (productId) => {
    try {
      const response = await axiosInstance.delete(`/wishlist/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  // ==================== REVIEWS ====================

  /**
   * Get product reviews
   * GET /api/products/:productId/reviews
   */
  getProductReviews: async (productId) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  /**
   * Create review
   * POST /api/products/:productId/reviews
   */
  createReview: async (productId, reviewData) => {
    try {
      const response = await axiosInstance.post(
        `/products/${productId}/reviews`,
        reviewData
      );
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  // ==================== AUTH ====================

  /**
   * User login
   * POST /api/auth/login
   */
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      });
      // Store token if provided
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  /**
   * User registration
   * POST /api/auth/register
   */
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  /**
   * User logout
   */
  logout: () => {
    localStorage.removeItem('authToken');
  }
};

export default apiService;
