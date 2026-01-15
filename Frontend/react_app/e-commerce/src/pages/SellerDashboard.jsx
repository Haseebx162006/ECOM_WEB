import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import './SellerDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const SellerDashboard = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        price: '',
        sku: '',
        stock_quantity: '',
        discount_percent: '',
        category_id: 1
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (user?.id) {
            fetchProducts();
        }
        fetchCategories();
    }, [user]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/api/categories`);
            const data = await response.json();
            setCategories(data);
            // Set default category if available
            if (data.length > 0) {
                setFormData(prev => ({ ...prev, category_id: data[0].id }));
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchProducts = async () => {
        if (!user?.id) return;
        try {
            const response = await fetch(`${API_URL}/api/products?seller_id=${user.id}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('authToken');
        const submitData = new FormData();

        submitData.append('description', formData.description);
        submitData.append('price', formData.price);
        submitData.append('sku', formData.sku);
        submitData.append('stock_quantity', formData.stock_quantity);
        submitData.append('category_id', formData.category_id);

        if (formData.discount_percent) {
            submitData.append('discount_percent', formData.discount_percent);
        }

        if (formData.image) {
            submitData.append('image', formData.image);
        } else if (formData.image_url) {
            submitData.append('image_url', formData.image_url);
        }

        try {
            const response = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Content-Type is set automatically for FormData
                },
                body: submitData
            });

            if (response.ok) {
                setFormData({
                    description: '',
                    price: '',
                    sku: '',
                    stock_quantity: '',
                    discount_percent: '',
                    image_url: '',
                    image: null,
                    category_id: categories.length > 0 ? categories[0].id : 1
                });
                setShowForm(false);
                fetchProducts();
            } else {
                console.error("Failed to create product");
            }
        } catch (error) {
            console.error('Failed to create product:', error);
        }
        setLoading(false);
    };

    return (
        <div className="seller-dashboard">
            <div className="dashboard-header">
                <h1>Seller Dashboard</h1>
                <p>Welcome, {user?.name}!</p>
            </div>

            <div className="dashboard-actions">
                <button type="button" className="add-product-btn" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add New Product'}
                </button>
            </div>

            {showForm && (
                <div className="product-form-container">
                    <h2>Add New Product</h2>
                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Wireless Headphones"
                                />
                            </div>
                            <div className="form-group">
                                <label>SKU</label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. WH-001"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Product Image</label>
                                <div className="image-input-container">
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="file-input"
                                    />
                                    <span className="separator">- OR -</span>
                                    <input
                                        type="text"
                                        name="image_url"
                                        value={formData.image_url || ''}
                                        onChange={handleChange}
                                        placeholder="Paste Image URL"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Price ($)</label>
                                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Stock</label>
                                <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Discount (%)</label>
                                <input type="number" step="0.01" name="discount_percent" value={formData.discount_percent} onChange={handleChange} />
                            </div>
                        </div>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Product'}
                        </button>
                    </form>
                </div>
            )}

            <div className="products-section">
                <h2>Your Products ({products.length})</h2>
                <div className="products-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-preview">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url.startsWith('http') ? product.image_url : `${API_URL}${product.image_url}`}
                                        alt={product.description}
                                    />
                                ) : (
                                    <span className="no-image">📷</span>
                                )}
                            </div>
                            <h3>{product.description || 'Untitled Product'}</h3>
                            <p className="sku">SKU: {product.sku}</p>
                            <p className="price">${product.price?.toFixed(2)}</p>
                            <p className="stock">Stock: {product.stock_quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
