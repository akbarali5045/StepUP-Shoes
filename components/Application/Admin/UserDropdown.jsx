"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/reducer/authReducer";
import { showToast } from "@/lib/showToast";
import { LuPlus, LuShoppingBag, LuLogOut } from "react-icons/lu";

import adminLogo from "@/public/assets/images/stepup.png";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const auth = useSelector((store) => store.authStore.auth);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (data?.success) {
        showToast("success", data.message || "Logout successful.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(logout());
      router.push("/auth/login");
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group flex items-center gap-2.5 rounded-full p-1 transition-all outline-none hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-[#F04438]"
        >
          <Avatar className="h-9 w-9 border border-border/80 ring-2 ring-transparent transition-all group-hover:ring-[#F04438]/40">
            <AvatarImage src={adminLogo.src} alt="Admin" className="object-cover" />
            <AvatarFallback className="bg-[#F04438]/10 text-[#F04438] font-bold text-xs">
              {auth?.name?.charAt(0)?.toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col text-left pr-1">
            <span className="text-xs font-semibold leading-tight text-foreground group-hover:text-[#F04438] transition-colors">
              {auth?.name || "Admin User"}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              Administrator
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-2xl p-1.5 shadow-xl border-border/60 backdrop-blur-xl">
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-sm leading-none text-foreground">
              {auth?.name || "Admin User"}
            </p>
            <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1 mt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F04438]" />
              Administrator
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem asChild>
          <Link
            href="/admin/products/create"
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors cursor-pointer"
          >
            <LuPlus className="h-4 w-4 text-[#F04438]" />
            <span>Add New Product</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/admin/orders"
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors cursor-pointer"
          >
            <LuShoppingBag className="h-4 w-4 text-muted-foreground" />
            <span>Manage Orders</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={loading}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-destructive focus:text-destructive hover:bg-destructive/10 focus:bg-destructive/10 transition-colors cursor-pointer"
        >
          <LuLogOut className="h-4 w-4 text-destructive" />
          <span>{loading ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;