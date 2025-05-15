
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
            Select your role to continue. After selecting, you will be asked to enter only your username and password for login.
            If you're not registered, you'll be redirected to the registration page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
