"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, Shield, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/#proof", label: "Proof" },
  { href: "/#faq", label: "FAQ" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 border-b",
        scrolled 
          ? "bg-background/70 backdrop-blur-2xl border-border/50 py-2" 
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex h-16 items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">
              Open<span className="text-primary italic">Track</span>
            </span>
            <span className="text-[8px] font-black tracking-[0.3em] text-muted-foreground uppercase opacity-60">Transparency</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors group",
                pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="relative z-10">{link.label}</span>
              {pathname === link.href && (
                <div className="absolute inset-0 bg-primary/5 rounded-lg z-0" />
              )}
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </Link>
          ))}
        </nav>

        {/* Action Section */}
        <div className="hidden items-center gap-6 md:flex">
          <ThemeToggle />
          <div className="h-4 w-px bg-border/50" />
          <Link 
            href="/our-admin" 
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            Admin
            <ChevronRight className="h-3 w-3" />
          </Link>
          <Button asChild className="rounded-xl px-6 h-11 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <Link href="/donate">Donate Now</Link>
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/50 border border-border/50 transition-all active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[73px] z-40 md:hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
          <nav className="relative flex flex-col gap-2 p-8 h-full">
            <div className="mb-8 pl-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Navigation</span>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-6 py-5 text-sm font-black uppercase tracking-widest transition-all",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20"
                    : "bg-secondary/30 text-muted-foreground active:bg-secondary"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
                <ChevronRight className={cn("h-4 w-4", pathname === link.href ? "opacity-100" : "opacity-20")} />
              </Link>
            ))}
            <div className="mt-auto pb-12 space-y-4">
               <Button variant="outline" className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs border-2" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/our-admin">Admin</Link>
               </Button>
               <Button className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/donate">Donate Now</Link>
               </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
