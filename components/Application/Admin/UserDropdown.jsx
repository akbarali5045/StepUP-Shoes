"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { LuChevronRight } from "react-icons/lu";
import { MdOutlineShoppingBag } from "react-icons/md";

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
  const auth = useSelector((store) => store.authStore.auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="cursor-pointer rounded-full outline-none"
        >
          <Avatar>
            <AvatarImage src={adminLogo.src} alt="Admin" />
            <AvatarFallback>
              {auth?.name?.charAt(0)?.toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 me-5">
        <DropdownMenuLabel>
          <p className="font-semibold">
            {auth?.name || "Admin"}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/admin/products/create"
            className="flex w-full items-center gap-2"
          >
            <LuChevronRight />
            <span>New Product</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/admin/orders"
            className="flex w-full items-center gap-2"
          >
            <MdOutlineShoppingBag />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;