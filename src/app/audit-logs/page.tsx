
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

export default function AuditLogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <History className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Audit Logs</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System & Activity Logs</CardTitle>
          <CardDescription>
            Track changes made in the system, view activity logs per user, and monitor system events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
