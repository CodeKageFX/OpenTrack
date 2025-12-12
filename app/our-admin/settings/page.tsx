"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function PlatformSettings() {
  const handleSave = () => {
    toast.success("Platform settings have been updated successfully")
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Platform Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Configure global OpenTrack platform settings
        </p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Branding */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Branding</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Customize the platform appearance
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                defaultValue="OpenTrack"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                defaultValue="Transparency-focused donation tracking"
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* Project Submissions */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Project Submissions</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure how projects are submitted and reviewed
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Public Submissions</Label>
                <p className="text-sm text-muted-foreground">
                  Let anyone submit a project for review
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Require Documents</Label>
                <p className="text-sm text-muted-foreground">
                  Make document uploads mandatory
                </p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div>
              <Label htmlFor="reviewEmail">Review Notification Email</Label>
              <Input
                id="reviewEmail"
                type="email"
                placeholder="admin@opentrack.com"
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* Email Templates */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Email Templates</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Customize automated email messages
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="approvalEmail">Project Approval Message</Label>
              <Textarea
                id="approvalEmail"
                placeholder="Congratulations! Your project has been approved..."
                className="mt-1.5 min-h-[100px]"
              />
            </div>
            <div>
              <Label htmlFor="rejectionEmail">Project Rejection Message</Label>
              <Textarea
                id="rejectionEmail"
                placeholder="Thank you for your submission. Unfortunately..."
                className="mt-1.5 min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full sm:w-auto">
          Save Changes
        </Button>
      </div>
    </div>
  );
}