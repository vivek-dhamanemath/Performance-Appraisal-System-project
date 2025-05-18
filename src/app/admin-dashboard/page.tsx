"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';
import { Users, Settings, Shield, UserCog } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboard() {
  const { currentUser, logout, isLoading } = useAuth();
  const router = useRouter();
  const [pendingUsers, setPendingUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push('/login');
    } else if (!isLoading && currentUser && currentUser.role !== UserRole.Admin) {
      // Redirect if user doesn't have admin role
      if (currentUser.role === UserRole.Manager) {
        router.push('/manager-dashboard');
      } else {
        router.push('/employee-dashboard');
      }
    }
  }, [currentUser, isLoading, router]);

  // Fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      if (currentUser?.role === UserRole.Admin) {
        try {
          setLoadingStats(true);
          
          // Get pending users count
          const pendingQuery = query(collection(db, 'users'), where('role', '==', 'pending'));
          const pendingSnapshot = await getDocs(pendingQuery);
          setPendingUsers(pendingSnapshot.size);
          
          // Get total users count
          const usersSnapshot = await getDocs(collection(db, 'users'));
          setTotalUsers(usersSnapshot.size);
        } catch (error) {
          console.error('Error fetching user statistics:', error);
        } finally {
          setLoadingStats(false);
        }
      }
    };
    
    if (!isLoading && currentUser) {
      fetchUserStats();
    }
  }, [currentUser, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Welcome, {currentUser.fullName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2"><strong>Email:</strong> {currentUser.email}</p>
          <p className="mb-2"><strong>Department:</strong> {currentUser.department}</p>
          <p className="mb-2"><strong>Role:</strong> Administrator</p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push('/admin/users')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{loadingStats ? '...' : totalUsers}</p>
            <p className="text-sm text-muted-foreground">Manage all users</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push('/admin/pending-users')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Pending Approvals</CardTitle>
            <UserCog className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{loadingStats ? '...' : pendingUsers}</p>
            <p className="text-sm text-muted-foreground">Users awaiting role assignment</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push('/admin/settings')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">System Settings</CardTitle>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Configure</p>
            <p className="text-sm text-muted-foreground">Manage system settings</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push('/admin/permissions')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Role Management</CardTitle>
            <Shield className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Manage</p>
            <p className="text-sm text-muted-foreground">Configure user roles and permissions</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Role Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">As an administrator, you can:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Approve new user registrations and assign roles</li>
            <li>Change existing user roles</li>
            <li>Configure system settings and permissions</li>
            <li>Manage performance evaluation cycles</li>
          </ul>
          <div className="mt-4">
            <Button onClick={() => router.push('/admin/pending-users')} className="mr-2">
              Manage Pending Users ({loadingStats ? '...' : pendingUsers})
            </Button>
            <Button variant="outline" onClick={() => router.push('/admin/users')}>
              View All Users
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
