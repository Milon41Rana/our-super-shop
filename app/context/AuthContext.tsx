'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the shape of a user
interface User {
  id: string;
  fullName: string;
  email: string;
}

// Define the shape of the context
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (fullName: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // On initial load, try to get the user from localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      // If parsing fails, ensure user is logged out
      localStorage.removeItem('user');
    }
    setLoading(false); // Finished loading
  }, []);

  useEffect(() => {
    // When user state changes, update localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const isAuthenticated = !!user;

  const login = async (email: string, pass: string) => {
    if (email && pass) {
      const mockUser: User = { id: '1', fullName: 'John Doe', email: email };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const register = async (fullName: string, email: string, pass: string) => {
    if (fullName && email && pass) {
      const mockUser: User = { id: '1', fullName: fullName, email: email };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
  };
  
  // Don't render children until we have checked for a stored user
  if (loading) {
      return null; // Or a loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
