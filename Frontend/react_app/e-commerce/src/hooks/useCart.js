import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [loading, setLoading] = useState(true);

  // Load cart from mock API (localStorage-backed)
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        const data = await api.getCart();
        setCartItems(data);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const result = await api.updateCartItem(productId, newQuantity);
      setCartItems(result);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const result = await api.removeFromCart(productId);
      setCartItems(result);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        const result = await api.clearCart();
        setCartItems(result);
        setPromoCode('');
        setAppliedPromo('');
        setDiscountAmount(0);
        setPromoMessage('');
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  const handleApplyPromo = async () => {
    setPromoMessage('');

    if (!promoCode.trim()) {
      setPromoMessage('Please enter a promo code');
      return;
    }

    try {
      const result = await api.validatePromoCode(promoCode);
      setAppliedPromo(result.code);
      setPromoMessage(`✓ Promo code "${result.code}" applied successfully!`);

      // Calculate discount based on type
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      let discount = 0;

      if (result.type === 'percentage') {
        discount = subtotal * result.discount;
      } else if (result.type === 'fixed') {
        discount = result.discount;
      }

      setDiscountAmount(discount);
    } catch (error) {
      setPromoMessage('❌ ' + error.message);
      setDiscountAmount(0);
      setAppliedPromo('');
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setAppliedPromo('');
    setDiscountAmount(0);
    setPromoMessage('');
  };

  return {
    cartItems,
    promoCode,
    setPromoCode,
    discountAmount,
    promoMessage,
    appliedPromo,
    loading,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleApplyPromo,
    handleRemovePromo,
  };
}

export default useCart;
