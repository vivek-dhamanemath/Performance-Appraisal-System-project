"use client";

import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

export default function EmployeeDashboard() {
  const { currentUser, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, isLoading, router]);

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
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {currentUser.fullName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You are logged in as an Employee</p>
            <p className="mb-2"><strong>Email:</strong> {currentUser.email}</p>
            <p className="mb-2"><strong>Department:</strong> {currentUser.department}</p>
            <p className="mb-4"><strong>Designation:</strong> {currentUser.designation}</p>
            <Button onClick={logout} variant="outline">Logout</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{currentUser.performanceSummary || "No performance data available yet."}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Skills & Development</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4"><strong>Current Skills:</strong></p>
            <p>{currentUser.existingSkills || "No skills data available yet."}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
