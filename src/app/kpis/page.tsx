
"use client"; // Ensure this is a client component if using hooks like useAuth directly, or pass role as prop

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockKpis, type Kpi } from "@/lib/mock-data";
import KpiItem from "@/components/features/kpis/kpi-item";
import { useAuth } from "@/context/auth-context"; // Import useAuth
import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function KpisPage() {
  const { currentUser } = useAuth(); // Get current user

  // Group KPIs by category for better display
  const kpisByCategory: Record<string, Kpi[]> = mockKpis.reduce((acc, kpi) => {
    if (!acc[kpi.category]) {
      acc[kpi.category] = [];
    }
    acc[kpi.category].push(kpi);
    return acc;
  }, {} as Record<string, Kpi[]>);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">Key Performance Indicators (KPIs)</h1>
      <p className="text-muted-foreground">
        Overview of standard KPIs used for performance evaluation. Employees can view KPIs relevant to their role and performance.
        Managers use these to guide evaluations.
      </p>

      {currentUser?.role === 'Admin' && (
        <Alert className="border-primary/50 text-primary dark:border-primary/70 [&>svg]:text-primary">
          <Info className="h-4 w-4" />
          <AlertTitle>Admin Note</AlertTitle>
          <AlertDescription>
            As an Administrator, you will be able to manage KPI definitions, categories, and weights in a future update. Currently, all roles have view-only access to this page.
          </AlertDescription>
        </Alert>
      )}
      
      {Object.entries(kpisByCategory).map(([category, kpis]) => (
        <Card key={category} className="shadow-lg">
          <CardHeader>
            <CardTitle>{category}</CardTitle>
            <CardDescription>KPIs related to {category.toLowerCase()}.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">KPI Name</TableHead>
                  <TableHead className="w-[15%] text-center">Weight</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpis.map((kpi) => (
                  <KpiItem key={kpi.id} kpi={kpi} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {mockKpis.length === 0 && (
         <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">No KPIs defined yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

