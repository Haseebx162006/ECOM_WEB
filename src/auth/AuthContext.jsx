import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for a persisted user session
        const storedUser = localStorage.getItem('cartopia_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (role) => {
        // Simple mock login logic
        const mockUser = {
            id: Date.now(),
            name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            email: `${role}@example.com`,
            role: role
        };

        setUser(mockUser);
        localStorage.setItem('cartopia_user', JSON.stringify(mockUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('cartopia_user');
    };

    const resetPassword = (email) => {
        // Mock reset password logic
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Password reset link sent to ${email}`);
                resolve(true);
            }, 1000);
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, resetPassword, loading }}>
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
