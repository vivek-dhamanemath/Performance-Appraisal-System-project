"use client";

import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

export default function PendingApprovalPage() {
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
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-2" />
          <CardTitle className="text-2xl">Account Pending Approval</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Thank you for signing up, <strong>{currentUser.fullName}</strong>!
          </p>
          <p className="text-center">
            Your account is currently pending approval from an administrator. Once approved, you'll be able to access the system with your assigned role.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            This usually takes 1-2 business days. If you have any questions, please contact your administrator.
          </p>
          <div className="flex justify-center pt-4">
            <Button onClick={logout} variant="outline">Sign Out</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
