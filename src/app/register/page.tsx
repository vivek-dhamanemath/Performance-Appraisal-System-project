
"use client";

import { RegisterForm } from '@/components/features/auth/register-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MountainIcon } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <MountainIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Register - Performance Portal</CardTitle>
          <CardDescription>
            Create your account to access PerformEdge Lite.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className="mt-4 text-center text-sm">
            Already registered?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
