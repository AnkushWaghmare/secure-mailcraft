
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService, User } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
