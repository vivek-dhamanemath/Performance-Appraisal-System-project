
"use client";

import { LoginForm } from '@/components/features/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MountainIcon } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <MountainIcon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to PerformEdge Lite</CardTitle>
          <CardDescription>
            Please select a role to proceed. You will then select your profile.
            In a full system, you would enter your name and password for authentication.
            If you're not yet registered, you would be redirected to a registration page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
