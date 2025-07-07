"use client";

import { NavigationMenus } from "@/config/navigations";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { Input } from "../ui/input";
import { LogIn } from "lucide-react";

export const TopNavigationMenu = () => {
  const isMobile = useIsMobile();

  const navMenu = NavigationMenus;

  if (!isMobile) {
    return (
      <div className="w-screen h-[50px] border-b-2 flex items-center justify-between pl-2 pr-2">
        <div className="flex gap-6">
          <span className="font-bold text-[#b31c8c]">AEON</span>
          <div className="flex gap-4">
            {navMenu.map((menu, i) => (
              <Link href={menu.url} key={i}>
                <span className="font-semibold text-sm hover:text-zinc-400">
                  {menu.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <Input placeholder="Search documentation" className="h-[30px]" />
          <Link href="/login" className="flex gap-1 items-center">
            <span className="font-semibold text-sm hover:text-zinc-400">
              Login
            </span>
            <LogIn className="w-4" />
          </Link>
        </div>
      </div>
    );
  }
};
