import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import './MyOrders.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await api.getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading orders...</div>;

    return (
        <div className="my-orders-container">
            <h1>My Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <h3>Order #{order.id}</h3>
                                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                            </div>
                            <div className="order-details">
                                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                                <p>Total: <strong>${order.total_amount.toFixed(2)}</strong></p>
                                <p>Shipping Address: {order.shipping_address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
