
import { TableCell, TableRow } from "@/components/ui/table";
import type { Kpi } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

interface KpiItemProps {
  kpi: Kpi;
}

export default function KpiItem({ kpi }: KpiItemProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{kpi.name}</TableCell>
      <TableCell className="text-center">
        <Badge variant="secondary">{kpi.weight}%</Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">{kpi.description}</TableCell>
    </TableRow>
  );
}
