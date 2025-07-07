"use client";

import { AlignJustify, X } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export const AppSidebarTrigger = () => {
  const isMobile = useIsMobile();
  const { toggleSidebar, open } = useSidebar();

  const Icon = open ? X : AlignJustify;

  if (isMobile)
    return (
      <div className="p-2">
        <Icon className="w-5 cursor-pointer" onClick={toggleSidebar} />
      </div>
    );
};
