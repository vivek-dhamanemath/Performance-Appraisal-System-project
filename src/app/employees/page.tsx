
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEmployees, type Employee } from "@/lib/mock-data";
import { Briefcase, CalendarDays, UserCheck } from "lucide-react";
import EmployeeCard from "@/components/features/employees/employee-card";

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">Employee Profiles</h1>
      <p className="text-muted-foreground">
        View basic information and roles for all employees.
      </p>
      {mockEmployees.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <Card className="col-span-full">
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">No employees found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
