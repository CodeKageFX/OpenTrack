"use client";

import Link from "next/link";
import { SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

const sidebarLinks = [
  { href: "/our-admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/our-admin/projects", label: "Project Reviews", icon: FolderKanban },
  { href: "/our-admin/users", label: "Platform Users", icon: Users },
  { href: "/our-admin/settings", label: "Settings", icon: Settings },
];

type PropsChildren = {
  children?: React.ReactNode;
};

export default function AdminSidebar({ children }: PropsChildren) {
  const pathname = usePathname();
  return (
    <>
      <SidebarProvider>
        <Sidebar
          className="h-screen w-64 border-r border-border bg-sidebar"
        >
          <SidebarHeader>
            <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="font-display text-lg font-bold">OpenTrack</span>
            <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
              Super Admin
            </span>
          </div>
        </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/our-admin" && pathname.startsWith(link.href));

                    return (
                      <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={link.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
             <div className="border-t border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <span className="text-xs font-medium">SA</span>
              </div>
              <div>
                <p className="text-sm font-medium">Super Admin</p>
                <p className="text-xs text-muted-foreground">Platform Owner</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <Button variant="ghost" size="sm" className="mt-3 w-full justify-start gap-2" asChild>
            <Link href="/">
              <LogOut className="h-4 w-4" />
              Exit Admin
            </Link>
          </Button>
        </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </>
  );
}
