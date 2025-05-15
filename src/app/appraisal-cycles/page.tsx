
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

export default function AppraisalCyclesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <CalendarClock className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Appraisal Cycles</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Appraisal Cycles</CardTitle>
          <CardDescription>
            Create, edit, open, and close performance appraisal cycles. Notify users and track progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
