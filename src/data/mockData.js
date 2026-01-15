// All Products Mock Data
export const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 234,
    category: 'Electronics',
    image: '🎧',
    stock: 15,
    sku: 'WH-001',
    badge: 'Sale',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    features: ['Noise Cancellation', '30-hour Battery', 'Bluetooth 5.0', 'Comfortable Fit'],
    specifications: [
      { label: 'Color', value: 'Black' },
      { label: 'Weight', value: '250g' },
      { label: 'Warranty', value: '2 Years' },
      { label: 'Material', value: 'Premium Aluminum' }
    ]
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 189,
    category: 'Electronics',
    image: '⌚',
    stock: 20,
    sku: 'SW-002',
    badge: 'New',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor and GPS.',
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Fitness Apps'],
    specifications: [
      { label: 'Display', value: 'AMOLED' },
      { label: 'Battery', value: '7 days' },
      { label: 'Water Resistance', value: '5 ATM' },
      { label: 'OS', value: 'Custom' }
    ]
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviewCount: 156,
    category: 'Electronics',
    image: '🔊',
    stock: 30,
    sku: 'BS-003',
    badge: 'Sale',
    description: 'Portable waterproof Bluetooth speaker with 12-hour battery.',
    features: ['Waterproof', '12-hour Battery', 'Stereo Sound', 'Portable'],
    specifications: [
      { label: 'Power', value: '20W' },
      { label: 'Range', value: '30m' },
      { label: 'Weight', value: '400g' },
      { label: 'Water Rating', value: 'IPX7' }
    ]
  },
  {
    id: 4,
    name: 'Premium T-Shirt',
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 342,
    category: 'Fashion',
    image: '👕',
    stock: 50,
    sku: 'TS-004',
    badge: 'Sale',
    description: 'Comfortable 100% cotton premium quality t-shirt.',
    features: ['100% Cotton', 'Comfortable Fit', 'Durable', 'Multiple Colors'],
    specifications: [
      { label: 'Material', value: '100% Cotton' },
      { label: 'Weight', value: '180g' },
      { label: 'Care', value: 'Machine Wash' },
      { label: 'Available Colors', value: '8' }
    ]
  },
  {
    id: 5,
    name: 'Running Shoes',
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviewCount: 289,
    category: 'Sports',
    image: '👟',
    stock: 25,
    sku: 'RS-005',
    badge: 'Sale',
    description: 'Professional running shoes with advanced cushioning technology.',
    features: ['Cushioning Technology', 'Lightweight', 'Breathable', 'Durable'],
    specifications: [
      { label: 'Type', value: 'Running' },
      { label: 'Weight', value: '280g' },
      { label: 'Material', value: 'Mesh & Synthetic' },
      { label: 'Sizes', value: '6-15 US' }
    ]
  },
  {
    id: 6,
    name: 'Yoga Mat',
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.4,
    reviewCount: 178,
    category: 'Sports',
    image: '🧘',
    stock: 40,
    sku: 'YM-006',
    badge: 'Sale',
    description: 'Non-slip yoga mat with carrying strap, perfect for all types of yoga.',
    features: ['Non-Slip', 'Eco-Friendly', 'Lightweight', 'With Carrying Strap'],
    specifications: [
      { label: 'Length', value: '6ft' },
      { label: 'Width', value: '2ft' },
      { label: 'Thickness', value: '5mm' },
      { label: 'Weight', value: '600g' }
    ]
  },
  {
    id: 7,
    name: 'Desk Lamp LED',
    price: 34.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviewCount: 212,
    category: 'Home & Garden',
    image: '💡',
    stock: 35,
    sku: 'DL-007',
    badge: 'Sale',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
    features: ['LED Technology', 'Adjustable', 'USB Charging', 'Energy Efficient'],
    specifications: [
      { label: 'Power', value: '12W' },
      { label: 'Colors', value: '3 modes' },
      { label: 'Brightness', value: 'Adjustable' },
      { label: 'Material', value: 'Aluminum & Plastic' }
    ]
  },
  {
    id: 8,
    name: 'Coffee Maker',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 245,
    category: 'Home & Garden',
    image: '☕',
    stock: 18,
    sku: 'CM-008',
    badge: 'Sale',
    description: 'Automatic coffee maker with programmable timer and 12-cup capacity.',
    features: ['Programmable', '12-cup Capacity', 'Keep Warm Function', 'Auto Shut-off'],
    specifications: [
      { label: 'Capacity', value: '12 cups' },
      { label: 'Power', value: '1000W' },
      { label: 'Material', value: 'Stainless Steel' },
      { label: 'Warranty', value: '2 Years' }
    ]
  },
  {
    id: 9,
    name: 'Hardcover Novel',
    price: 19.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 567,
    category: 'Books',
    image: '📚',
    stock: 60,
    sku: 'BK-009',
    badge: null,
    description: 'Bestselling hardcover novel with beautiful dust jacket.',
    features: ['Hardcover', 'Illustrated', 'Award Winning', 'Collectible'],
    specifications: [
      { label: 'Pages', value: '432' },
      { label: 'Language', value: 'English' },
      { label: 'Author', value: 'Jane Smith' },
      { label: 'Published', value: '2025' }
    ]
  },
  {
    id: 10,
    name: 'Face Cream',
    price: 44.99,
    originalPrice: 74.99,
    rating: 4.7,
    reviewCount: 421,
    category: 'Beauty',
    image: '✨',
    stock: 45,
    sku: 'FC-010',
    badge: 'Sale',
    description: 'Premium anti-aging face cream with natural ingredients.',
    features: ['Anti-Aging', 'Natural Ingredients', 'Dermatologist Tested', 'Lightweight'],
    specifications: [
      { label: 'Size', value: '50ml' },
      { label: 'Type', value: 'Anti-Aging' },
      { label: 'For', value: 'All Skin Types' },
      { label: 'Shelf Life', value: '3 Years' }
    ]
  },
  {
    id: 11,
    name: 'Building Blocks Set',
    price: 39.99,
    originalPrice: 69.99,
    rating: 4.9,
    reviewCount: 198,
    category: 'Toys',
    image: '🧱',
    stock: 28,
    sku: 'BB-011',
    badge: 'Sale',
    description: 'Creative building blocks set with 1000+ pieces for all ages.',
    features: ['1000+ Pieces', 'Creative', 'Educational', 'Storage Box Included'],
    specifications: [
      { label: 'Pieces', value: '1000+' },
      { label: 'Ages', value: '3+' },
      { label: 'Material', value: 'Plastic' },
      { label: 'Includes', value: 'Storage Box' }
    ]
  },
  {
    id: 12,
    name: 'Action Figure',
    price: 24.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 276,
    category: 'Toys',
    image: '🤖',
    stock: 32,
    sku: 'AF-012',
    badge: 'Sale',
    description: 'Highly detailed collectible action figure with articulation.',
    features: ['Detailed Design', 'Poseable', 'Collectible', 'Licensed Product'],
    specifications: [
      { label: 'Height', value: '6 inches' },
      { label: 'Material', value: 'PVC' },
      { label: 'Articulation', value: '20+ joints' },
      { label: 'Includes', value: 'Accessories' }
    ]
  },
  {
    id: 13,
    name: 'USB-C Hub',
    price: 45.00,
    originalPrice: 75.00,
    rating: 4.4,
    reviewCount: 156,
    category: 'Electronics',
    image: '🔌',
    stock: 22,
    sku: 'UC-013',
    badge: 'Sale',
    description: 'Multi-port USB-C hub with HDMI and charging support.',
    features: ['7 Ports', 'HDMI Support', 'Fast Charging', 'Aluminum Body'],
    specifications: [
      { label: 'Ports', value: '7' },
      { label: 'Max Output', value: '100W' },
      { label: 'Material', value: 'Aluminum' },
      { label: 'Compatible', value: 'USB-C devices' }
    ]
  },
  {
    id: 14,
    name: 'Winter Jacket',
    price: 149.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 189,
    category: 'Fashion',
    image: '🧥',
    stock: 16,
    sku: 'WJ-014',
    badge: 'Sale',
    description: 'Warm and stylish winter jacket with water-resistant coating.',
    features: ['Water Resistant', 'Insulated', 'Multiple Pockets', 'Modern Design'],
    specifications: [
      { label: 'Material', value: 'Polyester with Down' },
      { label: 'Temperature', value: 'Up to -20°C' },
      { label: 'Colors', value: '5' },
      { label: 'Sizes', value: 'XS-XXL' }
    ]
  },
  {
    id: 15,
    name: 'Dumbbell Set',
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviewCount: 234,
    category: 'Sports',
    image: '🏋️',
    stock: 12,
    sku: 'DS-015',
    badge: 'Sale',
    description: 'Adjustable dumbbell set perfect for home workouts.',
    features: ['Adjustable Weight', 'Non-Slip Grip', 'Space Saving', 'Includes Stand'],
    specifications: [
      { label: 'Weight Range', value: '5-40 lbs' },
      { label: 'Adjustments', value: '8 levels' },
      { label: 'Material', value: 'Cast Iron & Rubber' },
      { label: 'Includes', value: 'Stand' }
    ]
  }
];

// Categories
export const mockCategories = [
  { id: 1, name: 'Electronics', icon: '💻', slug: 'electronics' },
  { id: 2, name: 'Fashion', icon: '👔', slug: 'fashion' },
  { id: 3, name: 'Home & Garden', icon: '🏠', slug: 'home-garden' },
  { id: 4, name: 'Sports', icon: '⚽', slug: 'sports' },
  { id: 5, name: 'Books', icon: '📚', slug: 'books' },
  { id: 6, name: 'Beauty', icon: '✨', slug: 'beauty' },
  { id: 7, name: 'Toys', icon: '🎮', slug: 'toys' }
];

// Featured Products (subset)
export const featuredProducts = mockProducts.slice(0, 6);

// Sample Reviews for products
export const mockReviews = [
  {
    id: 1,
    user: 'John Doe',
    rating: 5,
    comment: 'Amazing product! Highly recommended.',
    date: '2025-01-10',
    verified: true
  },
  {
    id: 2,
    user: 'Jane Smith',
    rating: 4,
    comment: 'Great quality, shipping was fast.',
    date: '2025-01-08',
    verified: true
  },
  {
    id: 3,
    user: 'Mike Johnson',
    rating: 5,
    comment: 'Best purchase I made this year!',
    date: '2025-01-05',
    verified: true
  },
  {
    id: 4,
    user: 'Sarah Williams',
    rating: 4,
    comment: 'Good value for money.',
    date: '2025-01-02',
    verified: true
  },
  {
    id: 5,
    user: 'Tom Brown',
    rating: 5,
    comment: 'Exactly as described!',
    date: '2024-12-28',
    verified: true
  }
];

// Promo Codes
export const promoCodes = {
  'SAVE10': { discount: 0.10, type: 'percentage', description: '10% off' },
  'SAVE20': { discount: 0.20, type: 'percentage', description: '20% off' },
  'FREESHIP': { discount: 9.99, type: 'fixed', description: 'Free Shipping' }
};

// Legacy exports for backward compatibility
export const categories = mockCategories;
export const productMoments = [
  { id: 1, image: '🎧', title: 'Premium Audio', tagline: 'Experience crystal clear sound' },
  { id: 2, image: '👟', title: 'Sport Collection', tagline: 'Stay active in style' },
  { id: 3, image: '⌚', title: 'Smart Watches', tagline: 'Technology on your wrist' },
  { id: 4, image: '📱', title: 'Latest Gadgets', tagline: 'Innovation at your fingertips' },
  { id: 5, image: '🎮', title: 'Gaming Gear', tagline: 'Level up your experience' }
];

export const testimonials = [
  { id: 1, name: 'John Doe', rating: 5, comment: 'Amazing quality and fast shipping!', avatar: '👨‍💼' },
  { id: 2, name: 'Sarah Smith', rating: 5, comment: 'Best prices I found anywhere!', avatar: '👩‍💼' },
  { id: 3, name: 'Mike Johnson', rating: 4.5, comment: 'Great customer service, very helpful.', avatar: '👨‍🦱' },
  { id: 4, name: 'Emma Wilson', rating: 5, comment: 'Will definitely shop here again!', avatar: '👩‍🦰' }
];

export const heroData = {
  tag: '🎵 Music is Classic',
  title: 'Discover Amazing\nProducts.',
  description: 'Making your shopping experience come true with amazing deals!',
  buttonText: 'View All Products',
  image: '🎧'
};

export const promotionalBanner = {
  discount: '50%',
  title: 'Big Sale',
  description: 'Get up to 50% off on selected items',
  buttonText: 'Shop Sale',
  backgroundColor: 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)'
};

export default mockProducts;
