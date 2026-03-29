"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, Shield } from "lucide-react"
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
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-card/95 backdrop-blur-md border-b border-border py-4 shadow-sm" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="mx-auto flex items-center justify-between px-5 sm:px-10 md:px-30">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="h-6 w-6" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight">
            LazTrack
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                pathname === link.href ? "text-foreground font-semibold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Section */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Link 
            href="/our-admin" 
            className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors pr-2"
          >
            Admin
          </Link>
          <Button asChild className="bg-warning hover:bg-warning/90 text-warning-foreground rounded-full px-6 font-semibold shadow-sm transition-all">
            <Link href="/donate">Donate Now</Link>
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full border-b border-border bg-background/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col px-5 py-6 sm:px-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between py-4 text-sm font-medium transition-colors hover:text-accent border-b border-border/50",
                  pathname === link.href ? "text-primary font-semibold" : "text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
               <Button variant="outline" className="w-full justify-center border-border hover:bg-neutral-100 dark:hover:bg-neutral-800" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/our-admin">Admin</Link>
               </Button>
               <Button className="w-full justify-center bg-warning hover:bg-warning/90 text-warning-foreground font-semibold" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/donate">Donate Now</Link>
               </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
