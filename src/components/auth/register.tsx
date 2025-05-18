import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/auth-context';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from 'firebase/auth';
import { useDebouncedCallback } from 'use-debounce';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const firebaseErrorMessages = {
  'auth/email-already-in-use': 'Email already exists. Please try another email.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
  'auth/too-many-requests': 'Too many failed attempts. Try again later.',
} as const;

type FirebaseErrorCode = keyof typeof firebaseErrorMessages;

export default function Register() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [role, setRole] = useState<UserRole>('Employee');
  const { login } = useAuth();
  const router = useRouter();

  const validateEmail = useCallback(async (email: string) => {
    if (!email) {
      setEmailError('');
      return true;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }

    try {
      setIsCheckingEmail(true);
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setEmailError('This email is already registered');
        return false;
      }
      setEmailError('');
      return true;
    } catch (error) {
      console.error('Error checking email:', error);
      return true; // Don't block the user if the check fails
    } finally {
      setIsCheckingEmail(false);
    }
  }, []);

  // Debounce email validation to avoid too many API calls
  const debouncedValidateEmail = useDebouncedCallback(
    (email: string) => validateEmail(email),
    500
  );

  useEffect(() => {
    if (email) {
      debouncedValidateEmail(email);
    } else {
      setEmailError('');
    }
  }, [email, debouncedValidateEmail]);

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError('Name is required');
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(value.trim())) {
      setNameError('Name can only contain letters and spaces');
      return false;
    }
    if (value.trim().length < 2) {
      setNameError('Name must be at least 2 characters long');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate both name and email before proceeding
    const isNameValid = validateName(name);
    const isEmailValid = await validateEmail(email);

    if (!isNameValid || !isEmailValid) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: nameError
      });
      return;
    }
    try {
      console.log('Attempting registration with:', { email, password: '*****', name, role });
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created successfully:', user.uid);

      // Update user profile
      await updateProfile(user, {
        displayName: name,
      });
      console.log('User profile updated successfully');

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email,
        name: name,
        role: role,
        createdAt: new Date().toISOString(),
      });
      console.log('User data stored in Firestore successfully');

      // Show success message and redirect to login
      toast({
        title: "Registration Successful",
        description: "Please login with your credentials"
      });
      router.push('/login');
    } catch (error: any) {
      console.error('Registration error:', error.message || error);
      if (error.code) {
        // Handle email-specific errors differently
        if (error.code === 'auth/email-already-in-use') {
          setEmailError('Email already exists. Please try another email.');
        } else {
          const errorMessage = error.code && error.code in firebaseErrorMessages
            ? firebaseErrorMessages[error.code as FirebaseErrorCode]
            : 'An error occurred during registration.';
          toast({
            variant: "destructive",
            title: "Registration Error",
            description: errorMessage
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Please try again."
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleRegister} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            required
            placeholder="John Doe"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            aria-describedby="name-error"
          />
          {nameError && (
            <p className="text-sm text-destructive" id="name-error">
              {nameError}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isCheckingEmail}
            aria-describedby="email-error"
          />
          {isCheckingEmail && (
            <p className="text-sm text-muted-foreground" id="email-error">
              Checking email availability...
            </p>
          )}
          {emailError && (
            <p className="text-sm text-destructive" id="email-error">
              {emailError}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Employee">Employee</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
    <Toaster />
    </>
  );
}
