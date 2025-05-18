"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserRole, Employee as EmployeeType, EmployeeType as EmpType, WorkMode } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

// Employee interface that matches the structure from mock-data.ts with additional fields
interface Employee {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  profileImageUrl: string;
  dataAiHint?: string;
  designation: string;
  department: string;
  managerId?: string;
  joiningDate: string;
  employeeType: EmpType;
  location: string;
  workMode: WorkMode;
  role: UserRole;
  manager?: string;
  performanceSummary: string;
  existingSkills: string;
  createdAt?: any;
  updatedAt?: any;
}

interface AuthContextType {
  currentUser: Employee | null;
  logout: () => Promise<void>;
  isLoading: boolean;
  loginWithUserId: (userId: string) => Promise<Employee | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // This function has been removed as we're using Google authentication only

  // Handle user logout
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setCurrentUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Login with user ID
  const loginWithUserId = useCallback(async (userId: string): Promise<Employee | null> => {
    console.log('AuthContext: Attempting to fetch user data for UID:', userId);
    
    if (!userId) {
      console.error('No user ID provided to login function');
      return null;
    }
    
    try {
      // Try the users collection first (most common)
      const userDoc = await getDoc(doc(db, 'users', userId));
      const now = new Date().toISOString();
      
      if (userDoc.exists()) {
        console.log('Found user document in users collection');
        const userData = userDoc.data();
        
        // Get the display name, falling back to email username or 'User'
        const displayName = userData.fullName || 
                          (userData.email ? userData.email.split('@')[0] : 'User');
        
        // Create a complete employee object with all required fields
        const employeeData: Employee = {
          id: userDoc.id,
          email: userData.email || `${userId}@example.com`,
          fullName: displayName,
          phone: userData.phone || '',
          dateOfBirth: userData.dateOfBirth || '',
          gender: (userData.gender as 'Male' | 'Female' | 'Other' | 'Prefer not to say') || 'Other',
          profileImageUrl: userData.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`,
          dataAiHint: userData.dataAiHint || '',
          designation: userData.designation || 'Employee',
          department: userData.department || 'General',
          managerId: userData.managerId || '',
          joiningDate: userData.joiningDate || now,
          employeeType: (userData.employeeType as EmpType) || ('Full-time' as EmpType),
          location: userData.location || 'Remote',
          workMode: (userData.workMode as WorkMode) || 'Remote',
          role: (userData.role as UserRole) || 'Employee',
          manager: userData.manager || '',
          performanceSummary: userData.performanceSummary || '',
          existingSkills: userData.existingSkills || '',
          createdAt: userData.createdAt || now,
          updatedAt: now
        } as Employee; // Type assertion to ensure all required fields are present
        
        // Update the user document with any missing fields
        await setDoc(doc(db, 'users', userId), employeeData, { merge: true });
        
        setCurrentUser(employeeData);
        return employeeData;
      }
      
      // If not found in users, try other collections
      const collectionsToTry = ['Users', 'employees', 'Employees', 'profiles', 'Profiles'];
      
      // Try each collection
      for (const collection of collectionsToTry) {
        try {
          const docRef = doc(db, collection, userId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            console.log(`Found user in ${collection} collection`);
            const userData = docSnap.data();
            const now = new Date().toISOString();
            
            // Create a complete employee object with all required fields
            const employeeData: Employee = {
              ...userData,
              id: docSnap.id,
              email: userData.email || `${userId}@example.com`,
              fullName: userData.fullName || userData.email?.split('@')[0] || 'User',
              role: userData.role || 'Employee',
              joiningDate: userData.joiningDate || now,
              designation: userData.designation || 'Employee',
              department: userData.department || 'General',
              employeeType: (userData.employeeType as EmpType) || ('Full-time' as EmpType),
              location: userData.location || 'Remote',
              workMode: userData.workMode || 'Remote',
              performanceSummary: userData.performanceSummary || '',
              existingSkills: userData.existingSkills || '',
              profileImageUrl: userData.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName || 'User')}&background=random`,
              createdAt: userData.createdAt || now,
              updatedAt: now
            };
            
            // Update the user document with any missing fields
            await setDoc(doc(db, 'users', userId), employeeData, { merge: true });
            
            setCurrentUser(employeeData);
            return employeeData;
          }
        } catch (err) {
          console.error(`Error checking ${collection} collection:`, err);
        }
      }
      
      console.error('User not found in any collection');
      return null;
      
    } catch (error) {
      console.error('Error in loginWithUserId:', error);
      return null;
    }
  }, []);

  // This listener has been removed to avoid duplication with the one below

  // Listen for auth state changes and handle role-based redirection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth, 
      async (user) => {
        console.log('Auth state changed:', user ? `User authenticated: ${user.uid}` : 'No user');
        
        if (user) {
          try {
            setIsLoading(true);
            // Get user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            
            if (userDoc.exists()) {
              // User exists in Firestore
              const userData = userDoc.data() as Employee;
              setCurrentUser(userData);
              
              // Handle role-based redirection
              const role = userData.role;
              console.log(`User role: ${role}`);
              
              // Wait a moment before redirecting to avoid UI flashing
              setTimeout(() => {
                // Convert role string to lowercase for case-insensitive comparison
                const roleStr = String(role).toLowerCase();
                
                if (roleStr === 'admin') {
                  router.push('/admin-dashboard');
                } else if (roleStr === 'manager') {
                  router.push('/manager-dashboard');
                } else if (roleStr === 'employee') {
                  router.push('/employee-dashboard');
                } else if (roleStr === 'pending') {
                  router.push('/pending-approval');
                } else {
                  // Default fallback
                  router.push('/employee-dashboard');
                }
                setIsLoading(false);
              }, 500);
            } else {
              // User doesn't exist in Firestore yet - likely a new Google Sign-In
              // The saveUser API will handle creating the user document
              setCurrentUser(null);
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Error in auth state change handler:', error);
            setIsLoading(false);
          }
        } else {
          // No user is signed in
          setCurrentUser(null);
          setIsLoading(false);
          router.push('/login');
        }
      },
      (error) => {
        console.error('Auth state change error:', error);
        setCurrentUser(null);
        setIsLoading(false);
        router.push('/login');
      }
    );
    
    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [router]);

  // Provide the auth context value
  const value = {
    currentUser,
    logout,
    isLoading,
    loginWithUserId,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : <div className="flex items-center justify-center min-h-screen">Loading...</div>}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access the auth context
 * @returns The auth context with current user and auth methods
 * @throws {Error} If used outside of an AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
