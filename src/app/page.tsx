
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, ListChecks, BrainCircuit, BarChart3, TrendingUp, TrendingDown, Minus, User, Settings, Edit, LineChart, Download, FileText, Briefcase } from "lucide-react";
import { mockDashboardMetrics, mockDepartmentPerformance, type DepartmentPerformance } from "@/lib/mock-data";
import MetricCard from "@/components/features/dashboard/metric-card";
import PerformanceChart from "@/components/features/dashboard/performance-chart";
import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const { currentUser } = useAuth();

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

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p>Loading user data or redirecting...</p>
      </div>
    );
  }

  // Employee View
  if (currentUser.role === 'Employee') {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome, {currentUser.name}!</h1>
        <p className="text-muted-foreground">Here's your personal dashboard. Access your information and tools.</p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-6 w-6 text-primary" /> My Profile</CardTitle>
              <CardDescription>View and manage your personal details.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/employees" passHref>
                <Button className="w-full">Go to My Profile</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-6 w-6 text-primary" /> AI Training Advisor</CardTitle>
              <CardDescription>Get personalized training suggestions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/training-suggestions" passHref>
                <Button className="w-full">Get Training Advice</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><LineChart className="h-6 w-6 text-muted-foreground" /> My Performance Overview</CardTitle>
              <CardDescription>Track your performance scores and feedback over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center p-4">Feature coming soon!</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Download className="h-6 w-6 text-muted-foreground" /> Download Reports</CardTitle>
              <CardDescription>Download your performance review summaries.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center p-4">Feature coming soon!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Manager and Admin View (largely similar global dashboard for now)
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        {currentUser.role === 'Manager' ? "Manager Dashboard" : "Admin Dashboard"}
      </h1>
      <p className="text-muted-foreground">
        {currentUser.role === 'Manager' 
          ? "Overview of system-wide performance metrics. Team-specific analytics will be available in future updates."
          : "System-wide performance overview and administrative tools."}
      </p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Employees" value={mockDashboardMetrics.totalEmployees.toString()} icon={<Users className="h-6 w-6 text-muted-foreground" />} description="Currently active employees" />
        <MetricCard title="Avg. Performance" value={mockDashboardMetrics.averagePerformanceScore.toString() + "/5"} icon={<BarChart3 className="h-6 w-6 text-muted-foreground" />} description="Overall average score" />
        <MetricCard title="Trainings Suggested" value={mockDashboardMetrics.trainingsSuggested.toString()} icon={<BrainCircuit className="h-6 w-6 text-muted-foreground" />} description="AI-powered recommendations" />
        <MetricCard title="KPIs Tracked" value={mockDashboardMetrics.kpisTracked.toString()} icon={<ListChecks className="h-6 w-6 text-muted-foreground" />} description="Key Performance Indicators" />
      </div>

      {(currentUser.role === 'Manager' || currentUser.role === 'Admin') && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentUser.role === 'Manager' && (
            <>
              <Card className="shadow-lg bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Edit className="h-6 w-6 text-muted-foreground" /> Submit Team Appraisals</CardTitle>
                  <CardDescription>Complete and submit performance evaluations for your team members.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center p-4">Feature coming soon!</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BarChart3 className="h-6 w-6 text-muted-foreground" /> Detailed Team Analytics</CardTitle>
                  <CardDescription>View in-depth performance analytics for your team.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center p-4">Feature coming soon!</p>
                </CardContent>
              </Card>
            </>
          )}
          {currentUser.role === 'Admin' && (
            <>
              <Card className="shadow-lg bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-6 w-6 text-muted-foreground" /> Manage Users & Roles</CardTitle>
                  <CardDescription>Add, edit, or remove employees and assign roles.</CardDescription>
                </CardHeader>
                <CardContent>
                   <p className="text-sm text-muted-foreground text-center p-4">Feature coming soon!</p>
                </CardContent>
              </Card>
               <Card className="shadow-lg bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ListChecks className="h-6 w-6 text-muted-foreground" /> Manage KPIs</CardTitle>
                  <CardDescription>Define and update Key Performance Indicators.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center p-4">Feature coming soon!</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Settings className="h-6 w-6 text-muted-foreground" /> Configure Appraisal Cycles</CardTitle>
                  <CardDescription>Set up and manage performance review cycles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center p-4">Feature coming soon!</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Average performance scores by department (system-wide data)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] p-2">
            <PerformanceChart data={departmentPerformanceChartData} config={chartConfig} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Recent performance trends across departments (system-wide data)</CardDescription>
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

