import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, email, name, photo } = body;

    // Get Firestore instance from admin SDK
    const db = adminDb;

    // Check if user exists and create if not
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      // For new users, create a complete user profile with pending role
      const now = Timestamp.now();
      
      await db.collection('users').doc(uid).set({
        uid,
        email,
        fullName: name || email.split('@')[0],
        profileImageUrl: photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=random`,
        role: 'pending', // Role is pending until assigned by admin
        phone: '',
        dateOfBirth: '',
        gender: 'Other',
        dataAiHint: '',
        designation: 'Employee',
        department: 'General',
        managerId: '',
        joiningDate: now,
        employeeType: 'Full-time',
        location: 'Remote',
        workMode: 'Remote',
        manager: '',
        performanceSummary: '',
        existingSkills: '',
        createdAt: now,
        updatedAt: now
      });
      
      console.log(`Created new user with UID: ${uid} and pending role`);
      return NextResponse.json({ success: true, newUser: true, role: 'pending' });
    } else {
      // User exists, return their current role
      const userData = userDoc.data();
      if (!userData) {
        throw new Error('User document exists but data is undefined');
      }
      
      console.log(`User ${uid} already exists with role: ${userData.role || 'undefined'}`);
      
      // Update the last login timestamp
      await db.collection('users').doc(uid).update({
        updatedAt: Timestamp.now(),
        lastLogin: Timestamp.now()
      });
      
      return NextResponse.json({ 
        success: true, 
        newUser: false, 
        role: userData.role || 'pending' 
      });
    }
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ success: false, error: (error as any).message }, { status: 500 });
  }
}