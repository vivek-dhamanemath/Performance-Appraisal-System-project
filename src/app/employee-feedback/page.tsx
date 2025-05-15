
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function EmployeeFeedbackPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">My Feedback</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Feedback Center</CardTitle>
          <CardDescription>
            Access feedback from your manager, peers, and your self-assessments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
