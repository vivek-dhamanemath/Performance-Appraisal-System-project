
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessagesSquare } from "lucide-react";

export default function ManagerFeedbackPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <MessagesSquare className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Team Feedback & Comments</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Provide & View Team Feedback</CardTitle>
          <CardDescription>
            Add comments, attach documents, and review feedback for your team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
