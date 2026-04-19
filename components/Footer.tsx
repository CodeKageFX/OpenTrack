import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f2e1f] py-16 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-xl bg-white/10 p-2">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">LazTrack</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/75">
              A transparent, community-driven platform ensuring every donation reaches real people with verified proof.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Platform</p>
            <Link className="block text-sm text-white/75 transition-colors hover:text-warning" href="/projects">
              Projects
            </Link>
            <Link className="block text-sm text-white/75 transition-colors hover:text-warning" href="/donate">
              Donate
            </Link>
            <Link className="block text-sm text-white/75 transition-colors hover:text-warning" href="/register">
              Apply as Beneficiary
            </Link>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Company</p>
            <Link className="block text-sm text-white/75 transition-colors hover:text-warning" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="block text-sm text-white/75 transition-colors hover:text-warning" href="/terms">
              Terms of Service
            </Link>
            <Link className="block text-sm text-white/75 transition-colors hover:text-warning" href="/contact">
              Contact
            </Link>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Connect</p>
            <div className="flex gap-4">
              <a
                aria-label="Twitter"
                className="text-white/80 transition-colors hover:text-warning"
                href="https://twitter.com/laztrack"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743A11.65 11.65 0 0 1 3.392 4.75a4.106 4.106 0 0 0 1.27 5.477A4.072 4.072 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84" />
                </svg>
              </a>
              <a
                aria-label="LinkedIn"
                className="text-white/80 transition-colors hover:text-warning"
                href="https://linkedin.com/company/laztrack"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14C24 2.239 21.761 0 19 0zm-11 19H5V8h3v11zM6.5 6.732a1.764 1.764 0 1 1 0-3.528 1.764 1.764 0 0 1 0 3.528zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-white/60">hello@laztrack.org</p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-8 text-center text-sm font-medium text-white/65">
          &copy; {new Date().getFullYear()} LazTrack Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
