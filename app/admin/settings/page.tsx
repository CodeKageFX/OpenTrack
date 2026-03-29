"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Save, Upload } from "lucide-react";

export default function AdminSettings() {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Settings</h1>
        <p className="text-muted-foreground">
          Configure your project settings
        </p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Project Branding */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">Project Branding</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" defaultValue="LazTrack Laptop Distribution" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Description</Label>
              <Input id="projectDescription" defaultValue="Empowering Nigerian tech talents with laptops" />
            </div>
            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
                  <span className="text-xl font-bold text-primary-foreground">OT</span>
                </div>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Donation Settings */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">Donation Settings</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount (NGN)</Label>
              <Input id="targetAmount" type="number" defaultValue="15000000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minDonation">Minimum Donation (NGN)</Label>
              <Input id="minDonation" type="number" defaultValue="5000" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Anonymous Donations</Label>
                <p className="text-sm text-muted-foreground">
                  Let donors hide their names on the public board
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        <Separator />

        {/* Distribution Rules */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">Distribution Rules</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require ID Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Beneficiaries must upload a valid ID document
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Social Media Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Verify beneficiary's X (Twitter) account
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Proof of Receipt</Label>
                <p className="text-sm text-muted-foreground">
                  Beneficiaries must upload a photo with their laptop
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proofDeadline">Proof Upload Deadline (hours)</Label>
              <Input id="proofDeadline" type="number" defaultValue="48" />
            </div>
          </div>
        </section>

        <Separator />

        {/* Admin Accounts */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">Admin Accounts</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">admin@opentrack.org</p>
                <p className="text-sm text-muted-foreground">Owner</p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Primary
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              + Add Admin
            </Button>
          </div>
        </section>

        <Separator />

        {/* Notifications */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email on New Donation</Label>
                <p className="text-sm text-muted-foreground">
                  Receive an email when someone donates
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email on New Registration</Label>
                <p className="text-sm text-muted-foreground">
                  Receive an email when someone applies
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email on Proof Upload</Label>
                <p className="text-sm text-muted-foreground">
                  Receive an email when proof is submitted
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
