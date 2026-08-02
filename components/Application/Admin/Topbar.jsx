"use client";
import React from "react";
import ThemeSwitch from "./Theme/ThemeSwitch";
import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { RiMenu4Fill } from "react-icons/ri";
import { LuSearch, LuBell } from "react-icons/lu";
import { useSidebar } from "@/components/ui/sidebar";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl px-4 sm:px-6 lg:px-8 transition-all">
      <div className="flex h-full items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full group">
            <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-[#F04438]" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="h-10 w-full rounded-xl border border-input/60 bg-accent/40 dark:bg-card/60 pl-10 pr-12 text-sm placeholder:text-muted-foreground/70 transition-all focus:border-[#F04438] focus:bg-background focus:outline-none focus:ring-2 focus:ring-[#F04438]/20"
            />
            <kbd className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 rounded-md border border-border/80 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Notification Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
            aria-label="Notifications"
          >
            <LuBell className="h-4 w-4" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-[#F04438] ring-2 ring-background animate-pulse" />
          </Button>

          {/* Theme Toggle */}
          <ThemeSwitch />

          <div className="h-5 w-px bg-border/60 mx-1 hidden sm:block" />

          {/* User Profile */}
          <UserDropdown />

          {/* Mobile Sidebar Toggle */}
          <Button
            onClick={toggleSidebar}
            type="button"
            size="icon"
            variant="ghost"
            className="md:hidden rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Toggle Navigation Sidebar"
          >
            <RiMenu4Fill className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
