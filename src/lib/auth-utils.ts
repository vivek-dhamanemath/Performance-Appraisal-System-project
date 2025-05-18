import { auth } from './firebase';
import { 
  isSignInWithEmailLink, 
  signInWithEmailLink,
  sendSignInLinkToEmail
} from 'firebase/auth';

/**
 * Sends a passwordless sign-in link to the provided email address
 * @param email - The email address to send the sign-in link to
 * @param redirectUrl - The URL to redirect to after successful sign-in (defaults to current URL)
 */
export async function sendPasswordlessLink(email: string, redirectUrl?: string) {
  try {
    // If no redirect URL provided, use the current URL
    const actualRedirectUrl = redirectUrl || window.location.href;
    
    // Configure the email link sign-in
    const actionCodeSettings = {
      url: actualRedirectUrl,
      handleCodeInApp: true,
    };
    
    // Send the sign-in link
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    
    // Save the email in localStorage to use it later for sign-in
    localStorage.setItem('emailForSignIn', email);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending sign-in link:', error);
    return { success: false, error };
  }
}

/**
 * Completes the passwordless sign-in process when the user clicks the email link
 * @param url - The full URL with the sign-in link (defaults to current URL)
 */
export async function completePasswordlessSignIn(url?: string) {
  try {
    // Get the URL to check
    const signInUrl = url || window.location.href;
    
    // Check if the URL is a sign-in link
    if (!isSignInWithEmailLink(auth, signInUrl)) {
      return { success: false, error: 'Not a valid sign-in link' };
    }
    
    // Get the email from localStorage or prompt the user
    let email = localStorage.getItem('emailForSignIn');
    
    // If we don't have the email in localStorage, we need to ask the user
    if (!email) {
      // This would typically be handled by your UI
      return { success: false, error: 'Email not found in localStorage', needsEmail: true };
    }
    
    // Complete the sign-in process
    const result = await signInWithEmailLink(auth, email, signInUrl);
    
    // Clean up localStorage
    localStorage.removeItem('emailForSignIn');
    
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error completing sign-in:', error);
    return { success: false, error };
  }
}

/**
 * Checks if the current URL is a sign-in link
 */
export function isCurrentUrlSignInLink() {
  return isSignInWithEmailLink(auth, window.location.href);
}
