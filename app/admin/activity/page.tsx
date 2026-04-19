"use client"

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { UserCheck, Wallet, Image, Laptop, Users, Settings } from "lucide-react";

type ActivityType = "approval" | "donation" | "proof" | "assignment" | "registration" | "settings";

interface Activity {
  id: number;
  type: ActivityType;
  action: string;
  user: string;
  details?: string;
  timestamp: string;
}

const mockActivities: Activity[] = [
  { id: 1, type: "approval", action: "Beneficiary approved", user: "Admin", details: "Approved Adaeze Obiora", timestamp: "2024-01-15T14:30:00" },
  { id: 2, type: "donation", action: "Donation received", user: "System", details: "₦150,000 from Emeka Okafor", timestamp: "2024-01-15T14:15:00" },
  { id: 3, type: "proof", action: "Proof uploaded", user: "Olumide Femi", details: "Delivery proof submitted", timestamp: "2024-01-15T13:00:00" },
  { id: 4, type: "assignment", action: "Laptop assigned", user: "Admin", details: "LT-2024-089 assigned to Chioma Eze", timestamp: "2024-01-15T12:45:00" },
  { id: 5, type: "registration", action: "New registration", user: "System", details: "Ibrahim Yusuf registered", timestamp: "2024-01-15T11:30:00" },
  { id: 6, type: "settings", action: "Settings updated", user: "Admin", details: "Distribution rules modified", timestamp: "2024-01-15T10:00:00" },
  { id: 7, type: "proof", action: "Proof verified", user: "Admin", details: "Verified Adaeze Obiora's proof", timestamp: "2024-01-15T09:45:00" },
  { id: 8, type: "donation", action: "Donation received", user: "System", details: "₦500,000 (Anonymous)", timestamp: "2024-01-14T18:00:00" },
  { id: 9, type: "approval", action: "Beneficiary rejected", user: "Admin", details: "Rejected John Doe - incomplete application", timestamp: "2024-01-14T15:30:00" },
  { id: 10, type: "assignment", action: "Batch created", user: "Admin", details: "BATCH-002 with 10 laptops", timestamp: "2024-01-14T14:00:00" },
];

const typeConfig: Record<ActivityType, { icon: typeof UserCheck; color: string; label: string }> = {
  approval: { icon: UserCheck, color: "text-success", label: "Approvals" },
  donation: { icon: Wallet, color: "text-success", label: "Donations" },
  proof: { icon: Image, color: "text-primary", label: "Proofs" },
  assignment: { icon: Laptop, color: "text-primary", label: "Assignments" },
  registration: { icon: Users, color: "text-muted-foreground", label: "Registrations" },
  settings: { icon: Settings, color: "text-muted-foreground", label: "Settings" },
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function AdminActivityLogs() {
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredActivities = mockActivities.filter(activity =>
    typeFilter === "all" || activity.type === typeFilter
  );

  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-10">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Activity Logs</h1>
        <p className="text-muted-foreground">
          Track all system and admin activities
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            {Object.entries(typeConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>{config.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Activity List */}
      <div className="rounded-2xl border border-border/70 bg-card/95 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
        <div className="divide-y divide-border">
          {filteredActivities.map((activity) => {
            const config = typeConfig[activity.type];
            const Icon = config.icon;

            return (
              <div key={activity.id} className="flex items-start gap-4 p-4 md:p-6">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/70 ${config.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
                    <p className="font-medium">{activity.action}</p>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {activity.user}
                    </Badge>
                  </div>
                  {activity.details && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                  )}
                </div>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
