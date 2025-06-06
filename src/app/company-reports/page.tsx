
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BuildingIcon } from "lucide-react"; // Changed Building2 to BuildingIcon

export default function CompanyReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <BuildingIcon className="h-8 w-8 text-primary" /> {/* Changed Building2 to BuildingIcon */}
        <h1 className="text-3xl font-semibold tracking-tight">Company Reports</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Organizational Performance Analytics</CardTitle>
          <CardDescription>
            Generate and view department-level reports, performance comparisons over cycles, and other company-wide analytics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
