import { useState, useEffect } from 'react';
import { atom, useAtom } from 'jotai';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'email' | 'linkedin';
}

const userAtom = atom<User | null>(null);
const loadingAtom = atom<boolean>(true);

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage (mock persistence)
    const storedUser = localStorage.getItem('vibentribe_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('vibentribe_user');
      }
    }
    setLoading(false);
  }, [setUser]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email && password) {
        const mockUser: User = {
          id: '123456',
          email,
          name: email.split('@')[0],
          provider: 'email'
        };
        
        setUser(mockUser);
        localStorage.setItem('vibentribe_user', JSON.stringify(mockUser));
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithLinkedIn = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful LinkedIn login
      const mockUser: User = {
        id: 'linkedin_123456',
        email: 'linkedin.user@example.com',
        name: 'LinkedIn User',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        provider: 'linkedin'
      };
      
      setUser(mockUser);
      localStorage.setItem('vibentribe_user', JSON.stringify(mockUser));
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      if (email && password && name) {
        const mockUser: User = {
          id: '123456',
          email,
          name,
          provider: 'email'
        };
        
        setUser(mockUser);
        localStorage.setItem('vibentribe_user', JSON.stringify(mockUser));
        return true;
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vibentribe_user');
  };

  return {
    user,
    loading,
    error,
    login,
    loginWithLinkedIn,
    register,
    logout,
    isAuthenticated: !!user
  };
}
