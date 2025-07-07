"use client";

import { LogIn, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavigationMenus } from "@/config/navigations";
import { Input } from "../ui/input";

export const AppSidebar = () => {
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();

  const navMenu = NavigationMenus;

  if (isMobile) {
    return (
      <Sidebar>
        <SidebarHeader>
          <div className="flex justify-between">
            <span className="font-bold text-[#b31c8c]">AEON</span>
            <div className="flex gap-5">
              <X className="w-5 cursor-pointer" onClick={toggleSidebar} />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <Input
                placeholder="Search documentation"
                className="h-[25px] text-sm"
              />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navMenu.map((menu) => (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton asChild>
                      <a href={menu.url}>
                        <span>{menu.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/login" className="justify-between">
                  <span>Login</span>
                  <LogIn />
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    );
  }
};
