
"use client"; // Must be a client component to use useAuth

import { Card, CardContent } from "@/components/ui/card";
import { mockEmployees, type Employee } from "@/lib/mock-data";
import EmployeeCard from "@/components/features/employees/employee-card";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";

export default function EmployeesPage() {
  const { currentUser } = useAuth();
  const [displayedEmployees, setDisplayedEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'Employee') {
        setDisplayedEmployees(mockEmployees.filter(emp => emp.id === currentUser.id));
      } else if (currentUser.role === 'Manager') {
        // Manager sees themselves and their direct reports
        setDisplayedEmployees(mockEmployees.filter(emp => emp.manager === currentUser.name || emp.id === currentUser.id));
      } else if (currentUser.role === 'Admin') {
        setDisplayedEmployees(mockEmployees);
      }
    } else {
      setDisplayedEmployees([]); // Should not happen if auth guard is working
    }
  }, [currentUser]);

  if (!currentUser) {
    // This should ideally be handled by the layout's auth guard
    return <p>Loading user information or redirecting...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">Employee Profiles</h1>
      <p className="text-muted-foreground">
        {currentUser.role === 'Employee' 
          ? "View your profile."
          : currentUser.role === 'Manager' 
          ? "View your profile and your team's profiles."
          : "View basic information and roles for all employees."}
      </p>
      {displayedEmployees.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <Card className="col-span-full">
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              {currentUser.role === 'Employee' ? "Your profile could not be loaded." : "No employees to display based on your role."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
