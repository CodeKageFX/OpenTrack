"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, Shield } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/#proof", label: "Proof" },
  { href: "/#faq", label: "FAQ" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10 bg-[#0f2e1f] py-3 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.7)]"
      )}
    >
      <div className="mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-10 max-w-7xl">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_12px_24px_-18px_rgba(0,0,0,0.5)]">
            <Shield className="h-6 w-6" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-white">
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
                "text-sm font-semibold transition-colors hover:text-warning",
                pathname === link.href || (pathname === "/" && link.href.startsWith("/#"))
                  ? "text-white"
                  : "text-white/75"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Section */}
        <div className="hidden items-center gap-4 md:flex">
          <Link 
            href="/our-admin" 
            className="pr-2 text-sm font-semibold text-white/75 transition-colors hover:text-warning"
          >
            Admin
          </Link>
          <Button variant="cta" asChild className="rounded-full px-6">
            <Link href="/donate">Donate Now</Link>
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full border-b border-white/10 bg-[#0f2e1f] md:hidden">
          <nav className="flex flex-col px-5 py-6 sm:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between border-b border-white/10 py-4 text-sm font-semibold transition-colors hover:text-warning",
                  pathname === link.href ? "text-white" : "text-white/80"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
               <Button variant="outline" className="w-full justify-center border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/our-admin">Admin</Link>
               </Button>
               <Button variant="cta" className="w-full justify-center font-semibold" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/donate">Donate Now</Link>
               </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
