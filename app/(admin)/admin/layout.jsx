import AppSidebar from "@/components/Application/Admin/AppSidebar";
import ThemeProvider from "@/components/Application/Admin/Theme/ThemeProvider";
import Topbar from "@/components/Application/Admin/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />

        <div className="flex flex-1 flex-col min-w-0 min-h-screen bg-background">
          <Topbar />

          <main className="flex-1 pt-16 px-4 sm:px-6 lg:px-8 py-6 min-h-[calc(100vh-4rem)]">
            <div className="mx-auto max-w-7xl space-y-6">
              {children}
            </div>
          </main>

          <footer className="border-t border-border/50 bg-card/30 px-6 py-4 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 StepUp Shoes. All Rights Reserved.</span>
            <div className="flex items-center gap-4 text-muted-foreground/80">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                System Operational
              </span>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AdminLayout;
