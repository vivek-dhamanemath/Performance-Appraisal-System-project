
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export default function HikeLogicEnginePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Calculator className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">Hike Logic Engine</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Configure Salary Hike Rules</CardTitle>
          <CardDescription>
            Define rules for automatic salary hike calculations based on performance scores, attendance, and other factors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
