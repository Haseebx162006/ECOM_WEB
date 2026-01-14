/**
 * Mock Data File
 * 
 * IMPORTANT: This file is for DEVELOPMENT ONLY with dummy data
 * 
 * When backend is ready, use the API service instead:
 * 
 * Example with axios service:
 * ============================
 * import { apiService } from '../services/api';
 * 
 * // In your component:
 * const [products, setProducts] = useState([]);
 * 
 * useEffect(() => {
 *   const fetchProducts = async () => {
 *     try {
 *       const data = await apiService.getFeaturedProducts();
 *       setProducts(data);
 *     } catch (error) {
 *       console.error('Failed to fetch products:', error);
 *     }
 *   };
 *   fetchProducts();
 * }, []);
 * 
 * ENVIRONMENT VARIABLES:
 * Set REACT_APP_API_URL in your .env file:
 * REACT_APP_API_URL=http://localhost:8000/api
 */

// Featured Products Data
export const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 234,
    badge: 'Sale',
    image: null
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    rating: 4.7,
    reviewCount: 189,
    badge: 'New',
    image: null
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviewCount: 456,
    badge: 'Trending',
    image: null
  },
  {
    id: 4,
    name: 'Premium Sneakers',
    price: 84.00,
    rating: 4.7,
    reviewCount: 89,
    image: null
  }
];

// New Arrivals Products Data
export const newArrivalsProducts = [
  {
    id: 5,
    name: 'Vintage Camera',
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.9,
    reviewCount: 125,
    badge: 'New',
    image: null
  },
  {
    id: 6,
    name: 'Wireless Charger',
    price: 39.99,
    rating: 4.5,
    reviewCount: 78,
    image: null
  },
  {
    id: 7,
    name: 'Portable Power Bank',
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 342,
    badge: 'Sale',
    image: null
  },
  {
    id: 8,
    name: 'USB-C Hub',
    price: 45.00,
    rating: 4.4,
    reviewCount: 156,
    image: null
  }
];

// Categories Data
export const categories = [
  {
    id: 1,
    name: 'Electronics',
    icon: '💻',
    itemCount: '250+'
  },
  {
    id: 2,
    name: 'Fashion',
    icon: '👔',
    itemCount: '180+'
  },
  {
    id: 3,
    name: 'Home & Garden',
    icon: '🏠',
    itemCount: '320+'
  },
  {
    id: 4,
    name: 'Sports',
    icon: '⚽',
    itemCount: '145+'
  },
  {
    id: 5,
    name: 'Books',
    icon: '📚',
    itemCount: '95+'
  },
  {
    id: 6,
    name: 'Beauty',
    icon: '💄',
    itemCount: '200+'
  }
];

// Product Moments Data
export const productMoments = [
  {
    id: 1,
    image: '🎧',
    title: 'Premium Audio',
    tagline: 'Experience crystal clear sound'
  },
  {
    id: 2,
    image: '👟',
    title: 'Sport Collection',
    tagline: 'Stay active in style'
  },
  {
    id: 3,
    image: '⌚',
    title: 'Smart Watches',
    tagline: 'Technology on your wrist'
  },
  {
    id: 4,
    image: '📱',
    title: 'Latest Gadgets',
    tagline: 'Innovation at your fingertips'
  },
  {
    id: 5,
    image: '🎮',
    title: 'Gaming Gear',
    tagline: 'Level up your experience'
  }
];

// Testimonials Data
export const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    comment: 'Amazing quality and fast shipping!',
    avatar: '👨‍💼'
  },
  {
    id: 2,
    name: 'Sarah Smith',
    rating: 5,
    comment: 'Best prices I found anywhere!',
    avatar: '👩‍💼'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    rating: 4.5,
    comment: 'Great customer service, very helpful.',
    avatar: '👨‍🦱'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    rating: 5,
    comment: 'Will definitely shop here again!',
    avatar: '👩‍🦰'
  }
];

// Hero Section Data
export const heroData = {
  tag: '🎵 Music is Classic',
  title: 'Discover Amazing\nProducts.',
  description: 'Making your shopping experience come true with amazing deals!',
  buttonText: 'View All Products',
  image: '🎧'
};

// Promotional Banner Data
export const promotionalBanner = {
  discount: '50%',
  title: 'Big Sale',
  description: 'Get up to 50% off on selected items',
  buttonText: 'Shop Sale',
  backgroundColor: 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)'
};

/**
 * API Service Template
 * Uncomment and update with your backend URLs when ready
 */

/*
const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your backend URL

export const apiService = {
  // Products
  async getFeaturedProducts() {
    const response = await fetch(`${API_BASE_URL}/products/featured`);
    return response.json();
  },

  async getNewArrivals() {
    const response = await fetch(`${API_BASE_URL}/products/new-arrivals`);
    return response.json();
  },

  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return response.json();
  },

  // Orders
  async getOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
  },

  async createOrder(orderData) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return response.json();
  },

  // Cart
  async getCart() {
    const response = await fetch(`${API_BASE_URL}/cart`);
    return response.json();
  },

  async addToCart(productId, quantity) {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    return response.json();
  }
};
*/
