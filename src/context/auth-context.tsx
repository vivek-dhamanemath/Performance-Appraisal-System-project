
"use client";

import type { Employee } from '@/lib/mock-data';
import { mockEmployees } from '@/lib/mock-data';
import type { UserRole } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';
import type { ReactNode} from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  currentUser: Employee | null;
  login: (employeeId: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading user from storage (e.g., localStorage)
    const storedUserId = localStorage.getItem('currentUser');
    if (storedUserId) {
      const user = mockEmployees.find(emp => emp.id === storedUserId);
      if (user) {
        setCurrentUser(user);
      } else {
        localStorage.removeItem('currentUser'); // Clean up invalid stored ID
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((employeeId: string) => {
    const user = mockEmployees.find(emp => emp.id === employeeId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', user.id);
      router.push('/'); // Redirect to dashboard after login
    } else {
      console.error("Login failed: User not found");
      // Potentially show a toast or error message
    }
  }, [router]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
