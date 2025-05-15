
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Employee } from "@/lib/mock-data";
import { Briefcase, CalendarDays, UserCheck } from "lucide-react";

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const initials = employee.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center text-center">
        <Avatar className="h-24 w-24 mb-2">
          <AvatarImage src={employee.avatarUrl} alt={employee.name} data-ai-hint={employee.dataAiHint || "person"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <CardTitle>{employee.name}</CardTitle>
        <CardDescription>{employee.role}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span>{employee.department}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>Joined: {new Date(employee.joiningDate).toLocaleDateString()}</span>
        </div>
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
