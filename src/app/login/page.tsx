
"use client";

import { LoginForm } from '@/components/features/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MountainIcon } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <MountainIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Login - Performance Portal</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 space-y-2 text-center text-sm">
            <p>
              Forgot Password?{' '}
              <Button variant="link" className="p-0 h-auto text-primary" disabled> {/* Disabled for now */}
                Reset
              </Button>
            </p>
            <p>
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
