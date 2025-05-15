
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Download className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">My Documents</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Download Center</CardTitle>
          <CardDescription>
            Download your performance review summaries and other relevant documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
