"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Kanban,
  FileText,
  Users,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

const navItems = [
  { label: "Dashboard Overview", icon: LayoutGrid, href: "/our-admin" },
  { label: "Projects", icon: Kanban, href: "/our-admin/projects" },
  { label: "Applications", icon: FileText, href: "/our-admin/applications", badge: 8 },
  { label: "Users", icon: Users, href: "/our-admin/users" },
  { label: "Audit Logs", icon: ShieldCheck, href: "/our-admin/logs" },
  { label: "Settings", icon: Settings, href: "/our-admin/settings" },
];

type PropsChildren = {
  children?: React.ReactNode;
};

export default function AdminLayout({ children }: PropsChildren) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(0,135,81,0.08),_transparent_45%)]">
      {/* Sidebar Navigation */}
      <aside className="w-72 hidden md:flex flex-col bg-card/95 border-r border-border/70 h-full z-20 shadow-[0_30px_60px_-50px_rgba(15,23,42,0.5)]">
        {/* Header / Logo */}
        <div className="p-6 pb-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground leading-none">LazTrack</h1>
              <p className="text-xs text-muted-foreground font-medium mt-1">Super Admin Console</p>
            </div>
          </Link>
        </div>

        {/* User Profile Snippet */}
        <div className="mx-4 mt-6 mb-4 p-3 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
            WC
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-foreground truncate">Wizarab Chen</span>
            <span className="text-xs text-muted-foreground truncate">Wizarab@opentrack.org</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/our-admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-3 rounded-2xl transition-all group",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className={cn("text-sm", isActive ? "font-semibold" : "font-medium")}>
                    {item.label}
                  </span>
                </div>
                {item.badge && (
                  <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/">
              <LogOut className="h-5 w-5" />
              Exit Admin
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-card/95 border-b border-border/70 p-4 flex items-center justify-between z-30 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <LayoutGrid className="h-4 w-4" />
            </div>
            <span className="font-bold text-foreground">LazTrack</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-card/95 border-b border-border/70 z-20 p-4 space-y-1 backdrop-blur-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/our-admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-3 rounded-2xl transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span className={cn("text-sm", isActive ? "font-semibold" : "font-medium")}>
                      {item.label}
                    </span>
                  </div>
                  {item.badge && (
                    <span className="bg-amber-500/20 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <Button variant="ghost" className="w-full justify-start gap-2 mt-2" asChild>
              <Link href="/">
                <LogOut className="h-5 w-5" />
                Exit Admin
              </Link>
            </Button>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
