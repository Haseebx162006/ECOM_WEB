import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/common/ProductCard';
import './Wishlist.css';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const data = await api.getWishlist();
            setWishlistItems(data);
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading wishlist...</div>;

    return (
        <div className="wishlist-container">
            <h1>My Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlistItems.map(item => (
                        item.product ? (
                            <ProductCard key={item.id} product={item.product} />
                        ) : null
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
