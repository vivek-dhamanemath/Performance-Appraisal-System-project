import React, { useState, useEffect } from 'react';
import { sendPasswordlessLink, completePasswordlessSignIn, isCurrentUrlSignInLink } from '@/lib/auth-utils';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export default function PasswordlessSignIn() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [needsEmail, setNeedsEmail] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();

  // Check if the current URL is a sign-in link when the component mounts
  useEffect(() => {
    const checkSignInLink = async () => {
      if (isCurrentUrlSignInLink()) {
        setLoading(true);
        setMessage('Completing sign-in...');
        
        try {
          const result = await completePasswordlessSignIn();
          
          if (result.success) {
            setMessage('Sign-in successful! Redirecting...');
            // The auth state listener in AuthContext will handle the redirect
          } else if (result.needsEmail) {
            setNeedsEmail(true);
            setMessage('Please enter your email to complete sign-in');
          } else {
            setError(`Sign-in failed: ${result.error}`);
          }
        } catch (err) {
          setError(`Error during sign-in: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
          setLoading(false);
        }
      }
    };
    
    checkSignInLink();
  }, []);

  // Redirect if user is already signed in
  useEffect(() => {
    if (currentUser) {
      router.push('/dashboard');
    }
  }, [currentUser, router]);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const result = await sendPasswordlessLink(email);
      
      if (result.success) {
        setMessage(`Sign-in link sent to ${email}. Please check your email.`);
      } else {
        setError(`Failed to send sign-in link: ${result.error}`);
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Store the email first since completePasswordlessSignIn will look for it
      localStorage.setItem('emailForSignIn', email);
      
      const result = await completePasswordlessSignIn();
      
      if (result.success) {
        setMessage('Sign-in successful! Redirecting...');
        // The auth state listener in AuthContext will handle the redirect
      } else {
        setError(`Sign-in failed: ${result.error}`);
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {needsEmail ? 'Complete Sign-In' : 'Passwordless Sign-In'}
      </h2>
      
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 w-full">
          {message}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">
          {error}
        </div>
      )}
      
      <form onSubmit={needsEmail ? handleCompleteSignIn : handleSendLink} className="w-full">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="your.email@example.com"
            disabled={loading}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : needsEmail ? 'Complete Sign-In' : 'Send Sign-In Link'}
        </button>
      </form>
    </div>
  );
}
