import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('cartopia_user');
        const token = localStorage.getItem('authToken');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.login(email, password);
        if (response.access_token) {
            localStorage.setItem('authToken', response.access_token);
            localStorage.setItem('cartopia_user', JSON.stringify(response.user));
            setUser(response.user);
            return { success: true, user: response.user };
        }
        return { success: false };
    };

    const register = async (userData) => {
        const response = await api.register(userData);
        return response;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('cartopia_user');
        localStorage.removeItem('authToken');
        api.logout();
    };

    const resetPassword = async (email) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Password reset link sent to ${email}`);
                resolve(true);
            }, 1000);
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, resetPassword, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
