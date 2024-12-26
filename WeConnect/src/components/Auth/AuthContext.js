// src/components/Auth/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        return userId ? { userId, username } : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('userId', userData.userId);
        localStorage.setItem('username', userData.username);
    };

    const logout = () => {
        setUser(null);  // Clears the context user state
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};
