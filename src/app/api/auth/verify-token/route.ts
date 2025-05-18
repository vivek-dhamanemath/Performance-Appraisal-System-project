import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken, getUserData } from '@/lib/firebase-admin';

/**
 * API route to verify a Firebase ID token and return user data
 * This can be used by server components to verify authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('Authorization');
    
    // Get the token from the request body as an alternative
    const body = await request.json().catch(() => ({}));
    const tokenFromBody = body.token;
    
    // Extract the token from Authorization header or request body
    let token = '';
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (tokenFromBody) {
      token = tokenFromBody;
    } else {
      return NextResponse.json({ error: 'No authentication token provided' }, { status: 401 });
    }
    
    // Verify the token
    const decodedToken = await verifyIdToken(token);
    
    // Get the user data from Firestore
    const userData = await getUserData(decodedToken.uid);
    
    if (!userData) {
      // User exists in Firebase Auth but not in Firestore
      // You could create a new user document here if needed
      return NextResponse.json({ 
        authenticated: true,
        user: {
          uid: decodedToken.uid,
          email: decodedToken.email,
          emailVerified: decodedToken.email_verified,
        },
        userDataExists: false
      });
    }
    
    // Return the user data
    return NextResponse.json({ 
      authenticated: true,
      user: userData,
      userDataExists: true
    });
    
  } catch (error) {
    console.error('Error verifying authentication:', error);
    return NextResponse.json({ error: 'Invalid authentication token' }, { status: 401 });
  }
}
