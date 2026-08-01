"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/public/assets/images/stepup.png";

import { Button } from "@/components/ui/button";

import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

import { adminAppSidebarMenu } from "@/lib/adminSidebarMenu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const AppSidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <Sidebar className="z-50">
      <SidebarHeader className="h-14 border-b p-0">
        <div className="flex h-full items-center justify-between px-4">
          <Image src={logo} alt="Step Up Logo" className="h-[50px] w-auto" />

          <Button type="button" size="icon" variant="ghost">
            <IoMdClose />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {adminAppSidebarMenu.map((menu, index) => (
            <Collapsible
              key={index}
              open={openIndex === index}
              onOpenChange={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {menu.submenu ? (
                  <>
                    <SidebarMenuButton
                      render={<CollapsibleTrigger className="w-full" />}
                    >
                      <menu.icon className="h-4 w-4" />
                      <span>{menu.title}</span>

                      <LuChevronRight
                        className={`ml-auto transition-transform duration-200 ${
                          openIndex === index ? "rotate-90" : ""
                        }`}
                      />
                    </SidebarMenuButton>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {menu.submenu.map((sub, i) => (
                          <SidebarMenuSubItem key={i}>
                            <SidebarMenuSubButton
                              render={<Link href={sub.url} />}
                            >
                              {sub.title}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : (
                  <SidebarMenuButton render={<Link href={menu.url} />}>
                    <menu.icon className="h-4 w-4" />
                    <span>{menu.title}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
