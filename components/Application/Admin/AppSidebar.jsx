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
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const [prevPathname, setPrevPathname] = useState(pathname);
  const [openIndex, setOpenIndex] = useState(() => {
    const idx = adminAppSidebarMenu.findIndex(
      (menu) =>
        menu.submenu &&
        menu.submenu.some((sub) => sub.url !== "#" && pathname?.startsWith(sub.url))
    );
    return idx !== -1 ? idx : null;
  });

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    const activeIdx = adminAppSidebarMenu.findIndex(
      (menu) =>
        menu.submenu &&
        menu.submenu.some((sub) => sub.url !== "#" && pathname?.startsWith(sub.url))
    );
    if (activeIdx !== -1) {
      setOpenIndex(activeIdx);
    }
  }

  return (
    <Sidebar className="z-50 border-r border-border/60 bg-background/95 backdrop-blur-xl transition-all duration-300">
      <SidebarHeader className="h-16 border-b border-border/60 p-0">
        <div className="flex h-full items-center justify-between px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <Image
              src={logo}
              alt="Step Up Logo"
              className="h-10 w-auto object-contain drop-shadow-xs"
              priority
            />
          </Link>

          <Button
            onClick={toggleSidebar}
            type="button"
            size="icon"
            variant="ghost"
            className="md:hidden rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <IoMdClose className="h-5 w-5" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 no-scrollbar">
        <SidebarMenu className="gap-1.5">
          {adminAppSidebarMenu.map((menu, index) => {
            const isMenuDirectActive = menu.url !== "#" && pathname === menu.url;
            const isSubChildActive =
              menu.submenu &&
              menu.submenu.some((sub) => sub.url !== "#" && pathname === sub.url);
            const isMenuActive = isMenuDirectActive || isSubChildActive;

            return (
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
                        asChild
                        isActive={isMenuActive}
                        className={`group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                          isMenuActive
                            ? "bg-[#F04438]/10 text-[#F04438] dark:bg-[#F04438]/15 dark:text-[#FF6B60] font-semibold before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-r-full before:bg-[#F04438]"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground hover:translate-x-0.5"
                        }`}
                      >
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center gap-3">
                            <div className="flex h-5 w-5 items-center justify-center shrink-0">
                              <menu.icon
                                className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                                  isMenuActive
                                    ? "text-[#F04438] dark:text-[#FF6B60]"
                                    : "text-muted-foreground group-hover:text-foreground"
                                }`}
                              />
                            </div>
                            <span>{menu.title}</span>
                          </div>

                          <LuChevronRight
                            className={`h-4 w-4 ml-auto transition-transform duration-300 ease-in-out ${
                              openIndex === index ? "rotate-90 text-[#F04438]" : "text-muted-foreground/70"
                            }`}
                          />
                        </CollapsibleTrigger>
                      </SidebarMenuButton>

                      <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <SidebarMenuSub className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-[#F04438]/20 dark:border-white/10 pl-3.5 py-1">
                          {menu.submenu.map((sub, i) => {
                            const isSubActive = sub.url !== "#" && pathname === sub.url;
                            return (
                              <SidebarMenuSubItem key={i}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubActive}
                                  className={`relative flex w-full items-center rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                                    isSubActive
                                      ? "bg-[#F04438]/10 text-[#F04438] dark:bg-[#F04438]/20 dark:text-[#FF6B60] font-semibold before:absolute before:left-[-15px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#F04438]"
                                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground hover:translate-x-1"
                                  }`}
                                >
                                  <Link href={sub.url}>{sub.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={isMenuActive}
                      className={`group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isMenuActive
                          ? "bg-[#F04438]/10 text-[#F04438] dark:bg-[#F04438]/15 dark:text-[#FF6B60] font-semibold before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-r-full before:bg-[#F04438]"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground hover:translate-x-0.5"
                      }`}
                    >
                      <Link href={menu.url}>
                        <div className="flex h-5 w-5 items-center justify-center shrink-0">
                          <menu.icon
                            className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                              isMenuActive
                                ? "text-[#F04438] dark:text-[#FF6B60]"
                                : "text-muted-foreground group-hover:text-foreground"
                            }`}
                          />
                        </div>
                        <span>{menu.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
