
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, ListChecks, BrainCircuit, BarChart3, TrendingUp, TrendingDown, Minus, User, Settings, Edit, LineChart, Download, FileText, Briefcase, CalendarClock, Calculator, Building2, UserCog, History, BarChartBig, FileSignature, MessagesSquare, MessageSquare, UsersRound, BookOpenCheck, Info, Bell, AlertTriangle, CheckCircle2, Phone, Mail, MapPin, BuildingIcon } from "lucide-react"; // Added more icons
import { mockDashboardMetrics, mockDepartmentPerformance, type DepartmentPerformance } from "@/lib/mock-data";
import MetricCard from "@/components/features/dashboard/metric-card";
import PerformanceChart from "@/components/features/dashboard/performance-chart";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    const initials = currentUser.fullName.split(' ').map((n) => n[0]).join('');
    return (
      <div className="flex flex-col gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20"> {/* Increased avatar size */}
              <AvatarImage src={currentUser.profileImageUrl} alt={currentUser.fullName} data-ai-hint={currentUser.dataAiHint || "person"} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">Welcome, {currentUser.fullName}!</CardTitle>
              <CardDescription className="text-md">{currentUser.designation} - {currentUser.department}</CardDescription>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4"/>{currentUser.email}</div>
                {currentUser.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4"/>{currentUser.phone}</div>}
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/>{currentUser.location} ({currentUser.workMode})</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <p className="text-lg">Current Appraisal Status: <span className="font-semibold text-primary">Review Pending</span> (Illustrative)</p>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg hover:shadow-xl transition-shadow col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><LineChart className="h-6 w-6 text-primary" /> Performance Trend</CardTitle>
              <CardDescription>Your performance scores over recent cycles.</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] flex items-center justify-center">
              <p className="text-muted-foreground">Performance trend graph coming soon!</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ListChecks className="h-6 w-6 text-primary" /> KPI Scores</CardTitle>
              <CardDescription>Your scores against key performance indicators.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between p-2 bg-muted/50 rounded-md"><span>Code Quality:</span> <span className="font-semibold">4.5/5</span></div>
              <div className="flex justify-between p-2 bg-muted/50 rounded-md"><span>Task Completion:</span> <span className="font-semibold">95%</span></div>
              <div className="flex justify-between p-2 bg-muted/50 rounded-md"><span>Communication:</span> <span className="font-semibold">Good</span></div>
              <p className="text-xs text-muted-foreground text-center pt-2">Detailed KPI breakdown in "My Appraisals".</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MessageSquare className="h-6 w-6 text-primary" /> Feedback Summary</CardTitle>
                    <CardDescription>Highlights from your recent feedback.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-medium">Manager Feedback:</p>
                    <p className="text-sm text-muted-foreground mb-2">"{currentUser.fullName} consistently delivers high-quality work..."</p>
                    <p className="font-medium">Peer Feedback:</p>
                    <p className="text-sm text-muted-foreground mb-2">"Great collaborator, always helpful."</p>
                    <p className="font-medium">Self-Assessment:</p>
                    <p className="text-sm text-muted-foreground">"Identified areas for growth in project leadership."</p>
                    <Link href="/employee-feedback" passHref><Button variant="link" className="p-0 h-auto mt-2">View All Feedback</Button></Link>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-6 w-6 text-primary" /> Suggested Trainings</CardTitle>
                    <CardDescription>AI-powered recommendations for your development.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Advanced React Patterns</li>
                        <li>Effective Technical Leadership</li>
                    </ul>
                    <Link href="/training-suggestions" passHref><Button className="w-full mt-4">Explore Training</Button></Link>
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  // Manager View
  if (currentUser.role === 'Manager') {
    return (
      <div className="flex flex-col gap-6">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-3xl">Welcome, {currentUser.fullName} (Manager)!</CardTitle>
                <CardDescription>Oversee your team's performance and manage appraisals for the {currentUser.department} department.</CardDescription>
            </CardHeader>
        </Card>

        <Card className="border-destructive/50 shadow-lg">
            <CardHeader className="flex flex-row items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle className="text-destructive">Pending Appraisals (3)</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>You have 3 team members awaiting appraisal submission for Q3 2024.</CardDescription>
                <Link href="/submit-appraisals" passHref><Button variant="destructive" className="mt-3">Go to Appraisals</Button></Link>
            </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard title="Team Members" value="5" icon={<Users className="h-6 w-6 text-muted-foreground" />} description="Direct reports" />
            <MetricCard title="Team Avg. Score" value="4.1/5" icon={<BarChartBig className="h-6 w-6 text-muted-foreground" />} description="Latest cycle" />
            <MetricCard title="Appraisals Due" value="3" icon={<FileSignature className="h-6 w-6 text-muted-foreground" />} description="This cycle" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Team Performance Distribution</CardTitle>
                    <CardDescription>Score distribution for your team in the last cycle.</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                     <p className="text-muted-foreground">Team performance graph coming soon!</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks for managing your team.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Link href="/submit-appraisals" passHref><Button className="w-full"><FileSignature className="mr-2"/> Appraise Team Member</Button></Link>
                    <Link href="/manager-feedback" passHref><Button variant="outline" className="w-full"><MessagesSquare className="mr-2"/> Add Feedback</Button></Link>
                     <Link href="/training-suggestions" passHref><Button variant="outline" className="w-full"><BrainCircuit className="mr-2"/> Recommend Training</Button></Link>
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  // Admin View
  if (currentUser.role === 'Admin') {
    return (
      <div className="flex flex-col gap-6">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
                <CardDescription>System-wide overview and administrative tools for PerformEdge Lite.</CardDescription>
            </CardHeader>
        </Card>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Employees" value={mockDashboardMetrics.totalEmployees.toString()} icon={<UsersRound className="h-6 w-6 text-muted-foreground" />} description="All active users" />
          <MetricCard title="Avg. Performance" value={mockDashboardMetrics.averagePerformanceScore.toString() + "/5"} icon={<BarChartBig className="h-6 w-6 text-muted-foreground" />} description="Company-wide average" />
          <MetricCard title="Appraisal Cycles Active" value="1" icon={<CalendarClock className="h-6 w-6 text-muted-foreground" />} description="Q3 2024 Open" />
          <MetricCard title="KPIs Defined" value={mockDashboardMetrics.kpisTracked.toString()} icon={<ListChecks className="h-6 w-6 text-muted-foreground" />} description="Across all departments" />
        </div>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Appraisal Cycle Status: Q3 2024</CardTitle>
                <CardDescription className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Cycle is <span className="font-semibold">Open</span>. Ends on 30 Sep 2024.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
                <Link href="/appraisal-cycles" passHref><Button><CalendarClock className="mr-2"/> Manage Cycles</Button></Link>
                <Link href="/kpis" passHref><Button variant="outline"><ListChecks className="mr-2"/> Manage KPIs</Button></Link>
                <Link href="/user-roles-access" passHref><Button variant="outline"><UserCog className="mr-2"/> Manage Users</Button></Link>
                 <Link href="/company-reports" passHref><Button variant="outline"><BuildingIcon className="mr-2"/> View Reports</Button></Link> {/* Changed icon */}
            </CardContent>
        </Card>

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
                    <CardTitle>System Health & Logs</CardTitle>
                    <CardDescription>Quick access to system logs and configurations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Link href="/audit-logs" passHref><Button variant="secondary" className="w-full"><History className="mr-2"/> View Audit Logs</Button></Link>
                    <Link href="/hike-logic-engine" passHref><Button variant="secondary" className="w-full"><Calculator className="mr-2"/> Configure Hike Logic</Button></Link>
                    <Link href="/settings" passHref><Button variant="secondary" className="w-full"><Settings className="mr-2"/> System Settings</Button></Link>
                </CardContent>
            </Card>
        </div>
         <Card className="shadow-lg bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Info className="h-6 w-6 text-muted-foreground" /> Approvals Pending</CardTitle>
              <CardDescription>No critical approvals pending at this time.</CardDescription>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground text-center p-4">This section will highlight items needing admin attention.</p>
            </CardContent>
        </Card>
      </div>
    );
  }

  // Fallback for any unhandled role (should not happen with current setup)
  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Your dashboard is being prepared. Role: {currentUser.role}</p>
    </div>
  );
}
