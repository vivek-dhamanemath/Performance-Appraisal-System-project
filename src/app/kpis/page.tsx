
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockKpis, type Kpi } from "@/lib/mock-data";
import KpiItem from "@/components/features/kpis/kpi-item";

export default function KpisPage() {
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
        Overview of standard KPIs used for performance evaluation.
      </p>
      
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
