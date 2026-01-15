import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Auth.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role) => {
        login(role);
        // Redirect based on role
        if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'seller') navigate('/seller/dashboard');
        else navigate('/');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login to Cartopia</h2>
                <p className="auth-subtitle">Select a role to simulate login:</p>

                <div className="role-buttons">
                    <button
                        className="auth-btn user-btn"
                        onClick={() => handleLogin('user')}
                    >
                        Login as User
                    </button>

                    <button
                        className="auth-btn seller-btn"
                        onClick={() => handleLogin('seller')}
                    >
                        Login as Seller
                    </button>

                    <button
                        className="auth-btn admin-btn"
                        onClick={() => handleLogin('admin')}
                    >
                        Login as Admin
                    </button>
                </div>

                <div className="auth-footer">
                    <Link to="/reset-password">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
