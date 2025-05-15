
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ListChecks, BrainCircuit, BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { mockDashboardMetrics, mockDepartmentPerformance, type DepartmentPerformance } from "@/lib/mock-data";
import MetricCard from "@/components/features/dashboard/metric-card";
import PerformanceChart from "@/components/features/dashboard/performance-chart";

export default function DashboardPage() {
  const departmentPerformanceChartData = mockDepartmentPerformance.map(dp => ({
    name: dp.department,
    score: dp.averageScore,
  }));

  const chartConfig = {
    score: {
      label: "Avg. Score",
      color: "hsl(var(--primary))",
    },
  };
  
  const getTrendIcon = (trend: DepartmentPerformance['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">Performance Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Employees" value={mockDashboardMetrics.totalEmployees.toString()} icon={<Users className="h-6 w-6 text-muted-foreground" />} description="Currently active employees" />
        <MetricCard title="Avg. Performance" value={mockDashboardMetrics.averagePerformanceScore.toString() + "/5"} icon={<BarChart3 className="h-6 w-6 text-muted-foreground" />} description="Overall average score" />
        <MetricCard title="Trainings Suggested" value={mockDashboardMetrics.trainingsSuggested.toString()} icon={<BrainCircuit className="h-6 w-6 text-muted-foreground" />} description="AI-powered recommendations" />
        <MetricCard title="KPIs Tracked" value={mockDashboardMetrics.kpisTracked.toString()} icon={<ListChecks className="h-6 w-6 text-muted-foreground" />} description="Key Performance Indicators" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Average performance scores by department</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] p-2">
            <PerformanceChart data={departmentPerformanceChartData} config={chartConfig} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Recent performance trends across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockDepartmentPerformance.map((dept) => (
                <li key={dept.department} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                  <span className="font-medium">{dept.department}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Score: {dept.averageScore}/5</span>
                    {getTrendIcon(dept.trend)}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
