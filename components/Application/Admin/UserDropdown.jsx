import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import adminLogo from "@/public/assets/images/stepup.png";
import { useSelector } from "react-redux";

import { LuChevronRight } from "react-icons/lu";
import { MdOutlineShoppingBag } from "react-icons/md";
import Link from "next/link";

const UserDropdown = () => {
  const auth = useSelector((store) => store.authStore.auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Avatar className="cursor-pointer">
            <AvatarImage src={adminLogo.src} />
          </Avatar>
        }
      />

      <DropdownMenuContent className="me-5 w-44">
        <DropdownMenuLabel>
          <p className="font-semibold">{auth?.name}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          render={
            <Link href="" className="cursor-pointer" />
          }
        >
          <LuChevronRight />
          New Product
        </DropdownMenuItem>

        <DropdownMenuItem
          render={
            <Link href="" className="cursor-pointer" />
          }
        >
          <MdOutlineShoppingBag />
          Orders
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;