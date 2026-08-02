"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IoMoonOutline, IoSunnyOutline, IoCheckmark } from "react-icons/io5";
import { useTheme } from "./useTheme";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer transition-all"
        >
          {theme === "dark" ? (
            <IoMoonOutline className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
          ) : (
            <IoSunnyOutline className="h-4 w-4 transition-transform duration-300 hover:rotate-45" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 rounded-xl p-1.5 shadow-xl border-border/60 backdrop-blur-xl">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium cursor-pointer transition-colors ${
              theme === "light"
                ? "bg-[#F04438]/10 text-[#F04438] font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
            }`}
          >
            <div className="flex items-center gap-2">
              <IoSunnyOutline className="h-4 w-4" />
              <span>Light</span>
            </div>
            {theme === "light" && <IoCheckmark className="h-4 w-4 text-[#F04438]" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium cursor-pointer transition-colors mt-0.5 ${
              theme === "dark"
                ? "bg-[#F04438]/10 text-[#F04438] font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
            }`}
          >
            <div className="flex items-center gap-2">
              <IoMoonOutline className="h-4 w-4" />
              <span>Dark</span>
            </div>
            {theme === "dark" && <IoCheckmark className="h-4 w-4 text-[#F04438]" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;