'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  const isAuthenticated = !!user;

  // Dummy login function
  const login = async (email: string, pass: string) => {
    console.log('Attempting login with:', { email, pass });
    // In a real app, you would call an API here.
    // For now, we'll simulate a successful login.
    if(email && pass) { 
        const mockUser: User = { id: '1', fullName: 'John Doe', email: email };
        setUser(mockUser);
        return true;
    }
    return false;
  };

  // Dummy register function
  const register = async (fullName: string, email: string, pass: string) => {
    console.log('Attempting to register:', { fullName, email, pass });
    // In a real app, you would call an API here.
    // For now, we'll simulate a successful registration.
    if(fullName && email && pass) {
        const mockUser: User = { id: '1', fullName: fullName, email: email };
        setUser(mockUser);
        return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    console.log('User logged out');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
