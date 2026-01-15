import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Auth.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword(email);
        setSubmitted(true);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Reset Password</h2>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="auth-form">
                        <p className="auth-subtitle">Enter your email to receive reset instructions.</p>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                            />
                        </div>

                        <button type="submit" className="auth-btn primary-btn">
                            Send Reset Link
                        </button>
                    </form>
                ) : (
                    <div className="success-message">
                        <div className="check-icon">✓</div>
                        <h3>Check your email</h3>
                        <p>If an account exists for {email}, we have sent password reset instructions.</p>
                        <Link to="/login" className="back-link">Back to Login</Link>
                    </div>
                )}

                {!submitted && (
                    <div className="auth-footer">
                        <Link to="/login">Back to Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
