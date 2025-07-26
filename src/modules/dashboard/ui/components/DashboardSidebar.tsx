"use client";

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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, Star, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardUserButton from "./_DashboardUserButton";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: Star,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export default function DashboardSidebar() {
  // const pathname = usePathname();
  const pathname = "/meetings";

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground ">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" height={36} width={36} alt="LOGO" />
          <p className="text-2xl font-semibold">Talk Ai</p>
        </Link>
      </SidebarHeader>

      <div className="px-4 py-2">
        <SidebarSeparator />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((elem) => (
                <SidebarMenuItem key={elem.label}>
                  <SidebarMenuButton
                    className={cn(
                      "h-10 border hover:bg-linear-to-r/oklch border-transparent from-primary/80 from-5% via-60% via-primary/40 to-primary/40",
                      pathname === elem.href &&
                        "bg-linear-to-r/oklch text-primary-foreground hover:bg-primary/70 hover:text-primary-foreground"
                    )}
                    asChild
                  >
                    <Link href={elem.href} className="flex">
                      <elem.icon className="size-5 " />
                      <span className="text-sm font-medium tracking-tight">
                        {elem.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-2">
          <SidebarSeparator />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((elem) => (
                <SidebarMenuItem key={elem.label}>
                  <SidebarMenuButton
                    className={cn(
                      "h-10 border hover:bg-linear-to-r/oklch border-transparent from-primary/80 from-5% via-60% via-primary/40 to-primary/40",
                      pathname === elem.href &&
                        "bg-linear-to-r/oklch text-primary-foreground hover:bg-primary/70 hover:text-primary-foreground"
                    )}
                    asChild
                  >
                    <Link href={elem.href} className="flex">
                      <elem.icon className="size-5 " />
                      <span className="text-sm font-medium tracking-tight">
                        {elem.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
