
"use client";

import { useAuth } from '@/context/auth-context';
import { mockEmployees, type UserRole, type Employee } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Loader2, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ROLES: UserRole[] = ['Employee', 'Manager', 'Admin'];

export function LoginForm() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Password state, though not used for validation
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(undefined);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !selectedRole) {
      toast({
        title: "Login Error",
        description: "Please enter your email and select a role.",
        variant: "destructive",
      });
      return;
    }

    setIsLoggingIn(true);

    // Simulate API call and authentication
    setTimeout(() => {
      const foundUser = mockEmployees.find(
        (emp) => emp.email.toLowerCase() === email.toLowerCase() && emp.role === selectedRole
      );

      if (foundUser) {
        // In a real app, password would be verified here
        login(foundUser.id);
        // For "Remember Me", real implementation would use secure storage or cookies
        if (rememberMe) {
          console.log("Remember me selected (UI only for now). Email:", email);
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or role combination. Please try again.",
          variant: "destructive",
        });
        setIsLoggingIn(false);
      }
      // No need to set setIsLoggingIn(false) on success, as navigation will occur
    }, 750);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoggingIn}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoggingIn}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role-select">Role</Label>
        <Select 
          value={selectedRole} 
          onValueChange={(value) => setSelectedRole(value as UserRole)} 
          required
          disabled={isLoggingIn}
        >
          <SelectTrigger id="role-select" className="w-full">
            <SelectValue placeholder="Select your role..." />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember-me" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          disabled={isLoggingIn}
        />
        <Label htmlFor="remember-me" className="text-sm font-normal">Remember Me</Label>
      </div>
      <Button type="submit" className="w-full" disabled={isLoggingIn}>
        {isLoggingIn ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </>
        )}
      </Button>
    </form>
  );
}
