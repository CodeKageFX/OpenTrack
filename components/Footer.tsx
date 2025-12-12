import Link from "next/link";
import { Twitter, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30 md:px-30 sm:px-10 px-5">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">OT</span>
              </div>
              <span className="font-display text-xl font-bold">OpenTrack</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Bringing transparency to community projects through open tracking and verified proof.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/#about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/#proof" className="text-sm text-muted-foreground hover:text-foreground">
                Proof Gallery
              </Link>
              <Link href="/donate" className="text-sm text-muted-foreground hover:text-foreground">
                Donate
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">For Beneficiaries</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/register" className="text-sm text-muted-foreground hover:text-foreground">
                Register
              </Link>
              <Link href="/beneficiary" className="text-sm text-muted-foreground hover:text-foreground">
                Check Status
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://twitter.com/opentrack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@opentrack.org"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OpenTrack. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-destructive" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
