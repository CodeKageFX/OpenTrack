"use client";

import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Laptop,
  Truck,
  Image,
  Activity,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/donors", label: "Donors", icon: Users },
  { to: "/admin/beneficiaries", label: "Beneficiaries", icon: UserCheck },
  { to: "/admin/distribution", label: "Distribution", icon: Truck },
  { to: "/admin/proof-gallery", label: "Proof Gallery", icon: Image },
  { to: "/admin/activity", label: "Activity Logs", icon: Activity },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

type PropsChildren = {
  children?: React.ReactNode;
};

export default function AdminSidebar({ children }: PropsChildren) {
  return (
    <>
      <SidebarProvider>
        <Sidebar
          collapsible="icon"
          className="h-screen w-64 border-r border-border bg-sidebar fixed"
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.to}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                          <item.icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenuButton
              variant="outline"
              className="w-full text-destructive hover:text-destructive cursor-pointer"
              onClick={() => {
                // Add logout functionality here
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Exit Admin
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </>
  );
}
