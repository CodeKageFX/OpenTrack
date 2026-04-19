"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  SlidersHorizontal,
  Code,
  Shield,
  Save,
  Plus,
  CheckCircle,
  PauseCircle,
  Image,
} from "lucide-react";

export default function SettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [userRegistration, setUserRegistration] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 md:py-12">
          {/* Page Header */}
          <header className="mb-10">
            <div className="flex flex-col gap-2">
              <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Link href="/our-admin" className="hover:text-primary transition-colors">Settings</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-primary font-medium">Platform</span>
              </nav>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Platform Settings</h1>
              <p className="text-muted-foreground text-base max-w-2xl">
                Manage global configurations, security protocols, and API access controls for the entire organization.
              </p>
            </div>
          </header>

          {/* Content Grid */}
          <div className="flex flex-col gap-10">
            {/* Section 1: Platform Configuration */}
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  Platform Configuration
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Toggles Card */}
                <div className="col-span-1 md:col-span-2 rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
                  <div className="flex flex-col gap-6">
                    {/* Maintenance Mode */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold text-foreground">Maintenance Mode</p>
                        <p className="text-sm text-muted-foreground">Temporarily disable access for non-admin users during updates.</p>
                      </div>
                      <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                    </div>
                    <hr className="border-border" />
                    {/* User Registration */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold text-foreground">New User Registration</p>
                        <p className="text-sm text-muted-foreground">Allow public sign-ups via the homepage registration form.</p>
                      </div>
                      <Switch checked={userRegistration} onCheckedChange={setUserRegistration} />
                    </div>
                  </div>
                </div>

                {/* Localization Card */}
                <div className="rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)] flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Localization</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Default Language</Label>
                      <Select defaultValue="en-us">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-us">English (US)</SelectItem>
                          <SelectItem value="es">Spanish (ES)</SelectItem>
                          <SelectItem value="fr">French (FR)</SelectItem>
                          <SelectItem value="de">German (DE)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1 block">System Time Zone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                          <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                          <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Branding Card */}
                <div className="rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)] flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Custom Branding</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center border border-dashed border-border text-muted-foreground">
                      <Image className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">Company Logo</p>
                      <Button variant="link" className="p-0 h-auto text-xs text-primary">Upload new</Button>
                      <p className="text-xs text-muted-foreground">Recommended 512x512px PNG.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: API Access */}
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  API Access
                </h2>
                <Button variant="link" className="text-sm p-0">View Documentation</Button>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card/95 overflow-hidden shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 border-b border-border bg-secondary/50 px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <div className="col-span-4">Key Name</div>
                  <div className="col-span-4">Token Prefix</div>
                  <div className="col-span-2">Created</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>

                {/* Row 1 */}
                <div className="grid grid-cols-12 gap-4 border-b border-border px-6 py-4 items-center hover:bg-secondary/30 transition-colors">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="bg-emerald-500/10 text-emerald-600 p-1 rounded">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Production Mobile App</span>
                  </div>
                  <div className="col-span-4">
                    <code className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">pk_live_...4829</code>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">Oct 24, 2023</div>
                  <div className="col-span-2 text-right">
                    <Button variant="link" className="text-red-500 hover:text-red-600 p-0 h-auto text-sm">Revoke</Button>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-secondary/30 transition-colors">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="bg-amber-500/10 text-amber-600 p-1 rounded">
                      <PauseCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Staging Environment</span>
                  </div>
                  <div className="col-span-4">
                    <code className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">pk_test_...9921</code>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">Nov 02, 2023</div>
                  <div className="col-span-2 text-right">
                    <Button variant="link" className="text-red-500 hover:text-red-600 p-0 h-auto text-sm">Revoke</Button>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-secondary/50 px-6 py-3 border-t border-border">
                  <Button variant="link" className="p-0 h-auto text-sm text-primary gap-2">
                    <Plus className="h-4 w-4" />
                    Generate New Token
                  </Button>
                </div>
              </div>

              {/* Rate Limiting */}
              <div className="rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
                <h3 className="text-sm font-bold text-foreground mb-4">Rate Limiting</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex-1 w-full">
                    <Label className="text-sm font-medium mb-1 block">Global Request Limit (per min)</Label>
                    <Input type="number" placeholder="e.g. 1000" />
                  </div>
                  <div className="flex-1 w-full">
                    <Label className="text-sm font-medium mb-1 block">Burst Limit</Label>
                    <Input type="number" placeholder="e.g. 50" />
                  </div>
                  <Button variant="outline" className="h-10 whitespace-nowrap">Update Limits</Button>
                </div>
              </div>
            </section>

            {/* Section 3: Security & Permissions */}
            <section className="flex flex-col gap-5 mb-24">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security &amp; Permissions
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Security Config */}
                <div className="lg:col-span-2 rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium mb-1 block">Session Timeout (minutes)</Label>
                        <Input type="number" defaultValue={60} />
                        <p className="text-xs text-muted-foreground mt-1">Auto-logout after inactivity.</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1 block">Password Expiry (days)</Label>
                        <Input type="number" defaultValue={90} />
                        <p className="text-xs text-muted-foreground mt-1">Force password reset periodically.</p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-5 mt-1">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="mfa"
                          checked={mfaEnabled}
                          onCheckedChange={(checked) => setMfaEnabled(checked as boolean)}
                          className="mt-1"
                        />
                        <div className="flex flex-col gap-1">
                          <Label htmlFor="mfa" className="text-sm font-bold cursor-pointer">Enforce Multi-Factor Authentication (MFA)</Label>
                          <p className="text-sm text-muted-foreground">Require all administrators to use an authenticator app or SMS code to log in.</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-5 mt-1">
                      <Label className="text-sm font-medium mb-2 block">IP Whitelist</Label>
                      <Textarea
                        className="font-mono text-xs"
                        placeholder="Enter IP addresses separated by commas (e.g. 192.168.1.1, 10.0.0.1)"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Role Capabilities */}
                <div className="lg:col-span-1 rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
                  <h3 className="text-sm font-bold text-foreground mb-4">Admin Capabilities</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-2 rounded hover:bg-secondary cursor-pointer">
                      <Checkbox defaultChecked />
                      <span className="text-sm text-foreground">Export User Data</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 rounded hover:bg-secondary cursor-pointer">
                      <Checkbox defaultChecked />
                      <span className="text-sm text-foreground">Delete Records</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 rounded hover:bg-secondary cursor-pointer">
                      <Checkbox />
                      <span className="text-sm text-foreground">Manage Billing</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 rounded hover:bg-secondary cursor-pointer">
                      <Checkbox />
                      <span className="text-sm text-foreground">Invite Admins</span>
                    </label>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">Note: Super Admins have all capabilities by default.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Sticky Footer Action Bar */}
      <div className="sticky bottom-0 z-10 w-full border-t border-border/70 bg-card/95 p-4 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.5)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-sm text-muted-foreground hidden sm:block">Unsaved changes will be lost.</p>
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="outline">Discard</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
