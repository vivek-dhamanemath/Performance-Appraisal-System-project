
"use client";

import { useAuth } from '@/context/auth-context';
import { mockEmployees, type UserRole, type Employee } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { Loader2, ArrowRight, LogIn, UserPlus } from 'lucide-react';

const ROLES: UserRole[] = ['Employee', 'Manager', 'Admin'];

export function LoginForm() {
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState<'selectRole' | 'selectUser'>('selectRole');
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(undefined);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (selectedRole) {
      setFilteredEmployees(mockEmployees.filter(emp => emp.role === selectedRole));
    } else {
      setFilteredEmployees([]);
    }
    setSelectedUserId(undefined); // Reset selected user when role changes
  }, [selectedRole]);

  const handleRoleSelected = () => {
    if (selectedRole) {
      setCurrentStep('selectUser');
    }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedUserId) {
      setIsLoggingIn(true);
      setTimeout(() => {
        login(selectedUserId);
        // setIsLoggingIn(false); // State will change upon navigation
      }, 500);
    }
  };

  const handleBackToRoleSelect = () => {
    setCurrentStep('selectRole');
    setSelectedRole(undefined);
    setSelectedUserId(undefined);
  };

  if (currentStep === 'selectRole') {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="role-select">Select Your Role</Label>
          <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)} required>
            <SelectTrigger id="role-select" className="w-full">
              <SelectValue placeholder="Choose a role..." />
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
        <Button onClick={handleRoleSelected} className="w-full" disabled={!selectedRole}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <div className="text-center">
          <Button variant="link" disabled className="text-sm text-muted-foreground cursor-not-allowed">
            <UserPlus className="mr-2 h-4 w-4" />
            Register (Coming Soon)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-1">
        <Label>Role: {selectedRole}</Label>
        <Button variant="link" size="sm" onClick={handleBackToRoleSelect} className="p-0 h-auto text-xs -mt-1">
            (Change role)
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="user-select">Select Your Profile</Label>
        <Select value={selectedUserId} onValueChange={setSelectedUserId} required>
          <SelectTrigger id="user-select" className="w-full">
            <SelectValue placeholder="Select your profile..." />
          </SelectTrigger>
          <SelectContent>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.name} ({employee.roleTitle})
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-users" disabled>No users found for this role.</SelectItem>
            )}
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
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </>
        )}
      </Button>
       <div className="text-center">
          <Button variant="link" disabled className="text-sm text-muted-foreground cursor-not-allowed">
             <UserPlus className="mr-2 h-4 w-4" />
            Register (Coming Soon)
          </Button>
        </div>
    </form>
  );
}
