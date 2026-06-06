"use client";

import { SidebarProvider, useSidebar } from "@/lib/sidebar-context";
import AuthGuard from "@/components/auth-guard";
import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";

function MainContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <main
      id="main-content"
      className={cn(
        "flex-1 min-h-screen overflow-x-hidden transition-all duration-300",
        collapsed ? "md:ml-[68px]" : "md:ml-[240px]"
      )}
    >
      {/* Mobile padding for hamburger button */}
      <div className="md:hidden h-16" />
      {children}
    </main>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex h-full">
          <Sidebar />
          <MainContent>{children}</MainContent>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
