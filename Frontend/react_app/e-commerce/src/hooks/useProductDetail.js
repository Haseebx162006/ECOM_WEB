import { useEffect, useState } from 'react';
import { api } from '../services/api';

const buildEnrichedProduct = (product) => {
  if (!product) return null;

  const imageUrl = product.image_url
    ? (product.image_url.startsWith('http') ? product.image_url : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${product.image_url}`)
    : '/placeholder.jpg';

  return {
    name: product.name || product.description || 'Product Name',
    description:
      product.description ||
      `Premium quality ${product.name || product.description} designed for modern users. Features cutting-edge technology and sleek design.`,
    category: product.category?.name || product.category || 'Electronics',
    stock: product.stock_quantity ?? 15,
    sku: product.sku || `SKU-${product.id}`,
    price: product.price,
    id: product.id,
    specifications:
      product.specifications || [
        { label: 'Color', value: 'Black' },
        { label: 'Weight', value: '250g' },
        { label: 'Warranty', value: '2 Years' },
        { label: 'Material', value: 'Premium Aluminum' }
      ],
    images:
      product.images && product.images.length > 0
        ? product.images
        : [imageUrl, imageUrl],
    features:
      product.features || [
        'High Quality Audio',
        'Comfortable Fit',
        'Long Battery Life',
        'Wireless Connectivity'
      ],
    reviews:
      product.reviews || [
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
        }
      ],
    shipping: product.shipping || 'Free shipping on orders over $50'
  };
};

export function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const raw = await api.getProductById(productId);
        const enriched = buildEnrichedProduct(raw);
        setProduct(enriched);
        setError(null);
      } catch (err) {
        setError('Product not found');
        setProduct(null);
        console.error('Product fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    checkWishlist();
  }, [productId]);

  const checkWishlist = async () => {
    if (!productId) return;
    try {
      const result = await api.checkWishlistStatus(productId);
      setWishlist(result.in_wishlist);
    } catch {
      // safe fail
    }
  };

  const toggleWishlist = async () => {
    if (!productId) return;
    try {
      const result = await api.toggleWishlist(productId);
      setWishlist(result.in_wishlist);
    } catch (err) {
      console.error('Wishlist toggle error:', err);
    }
  };

  return { product, loading, error, wishlist, toggleWishlist };
}

export default useProductDetail;
