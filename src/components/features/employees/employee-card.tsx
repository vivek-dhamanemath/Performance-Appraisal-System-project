
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Employee } from "@/lib/mock-data";
import { Briefcase, CalendarDays, UserCheck, Building, Computer, Phone } from "lucide-react";

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const initials = employee.fullName
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center text-center">
        <Avatar className="h-24 w-24 mb-2">
          <AvatarImage src={employee.profileImageUrl} alt={employee.fullName} data-ai-hint={employee.dataAiHint || "person"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <CardTitle>{employee.fullName}</CardTitle>
        <CardDescription>{employee.designation} ({employee.role})</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span>{employee.department}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          <span>{employee.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Computer className="h-4 w-4" />
          <span>{employee.workMode} ({employee.employeeType})</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>Joined: {new Date(employee.joiningDate).toLocaleDateString()}</span>
        </div>
        {employee.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{employee.phone}</span>
          </div>
        )}
        {employee.manager && (
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span>Manager: {employee.manager}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {/* Potential actions like "View Full Profile" could go here */}
      </CardFooter>
    </Card>
  );
}
