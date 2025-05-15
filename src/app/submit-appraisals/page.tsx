
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSignature } from "lucide-react";

export default function SubmitAppraisalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <FileSignature className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Submit Appraisals</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Evaluation</CardTitle>
          <CardDescription>
            Select team members, fill out KPI forms, and submit their performance evaluations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
