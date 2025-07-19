import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Dummy user data
const dummyUsers = [
  {
    id: 1,
    email: 'john.doe@email.com',
    password: 'password123',
    name: 'John Doe',
    zipCode: '10001',
    languages: ['English']
  },
  {
    id: 2,
    email: 'mary.smith@email.com',
    password: 'password123',
    name: 'Mary Smith',
    zipCode: '10002',
    languages: ['English', 'Spanish']
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = dummyUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = dummyUsers.find(u => u.email === userData.email);
    
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'User with this email already exists' };
    }
    
    // Create new user
    const newUser = {
      id: dummyUsers.length + 1,
      ...userData
    };
    
    dummyUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user data
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    
    // Update in dummy data array
    const userIndex = dummyUsers.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      dummyUsers[userIndex] = { ...dummyUsers[userIndex], ...profileData };
    }
    
    setIsLoading(false);
    return { success: true };
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};