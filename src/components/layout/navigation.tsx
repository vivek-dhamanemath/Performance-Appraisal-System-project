
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { 
  LayoutDashboard, Users, ListChecks, BrainCircuit, FileText, MessageSquare, 
  GraduationCap, Download, Settings, FileSignature, BarChartBig, MessagesSquare,
  UsersRound, CalendarClock, Calculator, BuildingIcon, BookOpenCheck, UserCog, History, // Changed Building2 to BuildingIcon
  Lightbulb 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';

const commonNavItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
];

const employeeNavItems = [
  ...commonNavItems,
  { href: '/my-appraisals', label: 'My Appraisals', icon: FileText },
  { href: '/employee-feedback', label: 'Feedback', icon: MessageSquare },
  { href: '/training-suggestions', label: 'Learning & Dev', icon: BrainCircuit }, 
  { href: '/documents', label: 'Documents', icon: Download },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const managerNavItems = [
  ...commonNavItems,
  { href: '/employees', label: 'My Team', icon: Users }, 
  { href: '/submit-appraisals', label: 'Submit Appraisals', icon: FileSignature },
  { href: '/team-reports', label: 'Team Reports', icon: BarChartBig },
  { href: '/manager-feedback', label: 'Feedback/Comments', icon: MessagesSquare },
  { href: '/training-suggestions', label: 'Training Recommends', icon: BrainCircuit },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const adminNavItems = [
  ...commonNavItems,
  { href: '/employees', label: 'All Employees', icon: UsersRound }, 
  { href: '/appraisal-cycles', label: 'Appraisal Cycles', icon: CalendarClock },
  { href: '/hike-logic-engine', label: 'Hike Logic Engine', icon: Calculator },
  { href: '/company-reports', label: 'Company Reports', icon: BuildingIcon }, // Changed Building2 to BuildingIcon
  { href: '/kpis', label: 'KPI Management', icon: ListChecks }, 
  { href: '/training-suggestions', label: 'Learning Hub', icon: BookOpenCheck }, 
  { href: '/user-roles-access', label: 'User Roles & Access', icon: UserCog },
  { href: '/audit-logs', label: 'Audit Logs', icon: History },
  { href: '/settings', label: 'Settings', icon: Settings },
];


export default function Navigation() {
  const pathname = usePathname();
  const { currentUser } = useAuth();

  let navItemsToDisplay = commonNavItems; 

  if (currentUser) {
    switch (currentUser.role) {
      case 'Employee':
        navItemsToDisplay = employeeNavItems;
        break;
      case 'Manager':
        navItemsToDisplay = managerNavItems;
        break;
      case 'Admin':
        navItemsToDisplay = adminNavItems;
        break;
      default:
        navItemsToDisplay = commonNavItems; 
    }
  }
  

  return (
    <SidebarMenu>
      {navItemsToDisplay.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
              tooltip={{ children: item.label, side: 'right', align: 'center' }}
              className={cn(
                "justify-start",
                (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)))
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
