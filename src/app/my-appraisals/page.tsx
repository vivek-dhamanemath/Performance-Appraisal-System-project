
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function MyAppraisalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">My Appraisals</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Performance Reviews</CardTitle>
          <CardDescription>
            View your past and current performance appraisals, scores, and feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
