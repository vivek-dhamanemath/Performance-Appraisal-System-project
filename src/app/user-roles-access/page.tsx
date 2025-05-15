
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog } from "lucide-react";

export default function UserRolesAccessPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <UserCog className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">User Roles & Access</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Users and Permissions</CardTitle>
          <CardDescription>
            Add, edit, or delete employees. Assign roles, define reporting structures, and manage access permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
