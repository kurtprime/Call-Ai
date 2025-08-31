import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/components/DashboardNavbar";
import DashboardSidebar from "@/modules/dashboard/ui/components/DashboardSidebar";
import { Analytics } from "@vercel/analytics/next";
import { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        <SpeedInsights />
        <Analytics />
        {children}
      </main>
    </SidebarProvider>
  );
}
