
"use client";

import { useAuth } from '@/context/auth-context';
import { mockEmployees } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function LoginForm() {
  const { login } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedUserId) {
      setIsLoggingIn(true);
      // Simulate network delay for login
      setTimeout(() => {
        login(selectedUserId);
        // setIsLoggingIn(false); // State will change upon navigation
      }, 500);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="user-select">Select User Profile</Label>
        <Select value={selectedUserId} onValueChange={setSelectedUserId} required>
          <SelectTrigger id="user-select" className="w-full">
            <SelectValue placeholder="Select a user..." />
          </SelectTrigger>
          <SelectContent>
            {mockEmployees.map((employee) => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.name} ({employee.role} - {employee.roleTitle})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={!selectedUserId || isLoggingIn}>
        {isLoggingIn ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
