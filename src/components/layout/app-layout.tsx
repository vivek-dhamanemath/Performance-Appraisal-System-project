
"use client";

import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger, SidebarFooter, SidebarSeparator } from '@/components/ui/sidebar';
import Navigation from '@/components/layout/navigation';
import { LogOut, MountainIcon, Bell } from 'lucide-react'; // Added Bell
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
  children: ReactNode;
}

const PUBLIC_PATHS = ['/login', '/register'];

export default function AppLayout({ children }: AppLayoutProps) {
  const { currentUser, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !currentUser && !PUBLIC_PATHS.includes(pathname)) {
      router.push('/login');
    }
  }, [isLoading, currentUser, pathname, router]);

  if (isLoading && !PUBLIC_PATHS.includes(pathname)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <MountainIcon className="h-12 w-12 animate-pulse text-primary" />
        <span className="ml-2 text-lg">Loading PerformEdge Lite...</span>
      </div>
    );
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return <main className="flex min-h-svh items-center justify-center bg-background p-4">{children}</main>;
  }
  
  if (!currentUser && !PUBLIC_PATHS.includes(pathname)) {
     // This state should ideally not be reached for long due to the useEffect redirect.
     // It acts as a fallback during the brief period before redirection or if routing is slow.
    return (
      <div className="flex h-screen items-center justify-center">
        Redirecting to login...
      </div>
    );
  }
  
  // Render full layout for authenticated users
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-sidebar-primary">
            <MountainIcon className="h-6 w-6" />
            <span>PerformEdge Lite</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <Navigation />
        </SidebarContent>
        {currentUser && (
          <SidebarFooter className="p-2">
            <SidebarSeparator />
            <div className="p-2 text-sm">
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-sidebar-foreground/70">{currentUser.role} - {currentUser.roleTitle}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start">
              <LogOut className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden ml-2">Logout</span>
            </Button>
          </SidebarFooter>
        )}
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
          <SidebarTrigger className="sm:hidden" />
          <div className="flex items-center gap-2">
            {/* Placeholder for future search or other header items */}
            <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
