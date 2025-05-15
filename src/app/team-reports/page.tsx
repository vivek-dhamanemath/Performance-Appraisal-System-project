
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartBig } from "lucide-react";

export default function TeamReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <BarChartBig className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Team Reports</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Analytics</CardTitle>
          <CardDescription>
            View detailed performance reports, trends, and analytics for your team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
