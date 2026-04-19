"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Search,
  Filter,
  FolderOpen,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";

type ApplicationStatus = "pending" | "approved" | "rejected";

interface Application {
  id: string;
  applicant: string;
  email: string;
  avatar: string;
  projectTitle: string;
  category: string;
  date: string;
  status: ApplicationStatus;
}

const mockApplications: Application[] = [
  { id: "1", applicant: "Sarah Jenkins", email: "sarah.j@techflow.io", avatar: "SJ", projectTitle: "DataStream Analytics API", category: "API Integration", date: "Oct 24, 2023", status: "pending" },
  { id: "2", applicant: "David Ross", email: "david.r@startuphub.com", avatar: "DR", projectTitle: "EcoTrack Mobile App", category: "Mobile Development", date: "Oct 23, 2023", status: "approved" },
  { id: "3", applicant: "Michael Chang", email: "m.chang@devstudio.net", avatar: "MC", projectTitle: "Payment Gateway V2", category: "FinTech", date: "Oct 22, 2023", status: "pending" },
  { id: "4", applicant: "Emily Clark", email: "e.clark@design.co", avatar: "EC", projectTitle: "Legacy Migration Tool", category: "Internal Tools", date: "Oct 21, 2023", status: "rejected" },
  { id: "5", applicant: "James Wilson", email: "j.wilson@cloudsys.io", avatar: "JW", projectTitle: "Cloud Infrastructure Setup", category: "DevOps", date: "Oct 20, 2023", status: "pending" },
];

const statusConfig: Record<ApplicationStatus, { label: string; bgClass: string; textClass: string; dotClass: string }> = {
  pending: { label: "Pending", bgClass: "bg-amber-500/10", textClass: "text-amber-700 dark:text-amber-400", dotClass: "bg-amber-500" },
  approved: { label: "Approved", bgClass: "bg-emerald-500/10", textClass: "text-emerald-700 dark:text-emerald-400", dotClass: "bg-emerald-500" },
  rejected: { label: "Rejected", bgClass: "bg-red-500/10", textClass: "text-red-700 dark:text-red-400", dotClass: "bg-red-500" },
};

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | ApplicationStatus>("all");

  const stats = {
    total: 24,
    pending: 4,
    approved: 12,
    rejected: 8,
  };

  return (
    <div className="p-4 md:p-10 lg:p-12 scroll-smooth">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Link href="/our-admin" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-primary font-semibold">Applications</span>
        </div>

        {/* Page Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Application Management</h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Review, approve, or reject incoming project administration requests. Ensure all compliance checks are met before approval.
          </p>
        </header>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col justify-between p-5 rounded-2xl border border-border/70 bg-card/95 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
            <p className="text-muted-foreground text-sm font-medium">Total Applications</p>
            <div className="flex items-end justify-between mt-2">
              <span className="text-3xl font-bold text-foreground">{stats.total}</span>
              <FolderOpen className="h-8 w-8 text-primary/40" />
            </div>
          </div>
          <div className="flex flex-col justify-between p-5 rounded-2xl border-l-4 border-l-amber-500 border-y border-r border-border/70 bg-card/95 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
            <p className="text-muted-foreground text-sm font-medium">Pending Review</p>
            <div className="flex items-end justify-between mt-2">
              <span className="text-3xl font-bold text-foreground">{stats.pending}</span>
              <Clock className="h-8 w-8 text-amber-500/40" />
            </div>
          </div>
          <div className="flex flex-col justify-between p-5 rounded-2xl border border-border/70 bg-card/95 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
            <p className="text-muted-foreground text-sm font-medium">Approved</p>
            <div className="flex items-end justify-between mt-2">
              <span className="text-3xl font-bold text-foreground">{stats.approved}</span>
              <CheckCircle className="h-8 w-8 text-emerald-500/40" />
            </div>
          </div>
          <div className="flex flex-col justify-between p-5 rounded-2xl border border-border/70 bg-card/95 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
            <p className="text-muted-foreground text-sm font-medium">Rejected</p>
            <div className="flex items-end justify-between mt-2">
              <span className="text-3xl font-bold text-foreground">{stats.rejected}</span>
              <XCircle className="h-8 w-8 text-red-500/40" />
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-card"
              placeholder="Search by applicant or project..."
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
            >
              All Statuses
            </Button>
            <Button
              variant={activeFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={activeFilter === "approved" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("approved")}
            >
              Approved
            </Button>
            <Button
              variant={activeFilter === "rejected" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("rejected")}
            >
              Rejected
            </Button>
            <div className="w-px h-6 bg-border mx-2" />
            <Button variant="ghost" size="sm" className="gap-1.5">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="w-full overflow-hidden rounded-2xl border border-border/70 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)] bg-card/95">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[30%]">Applicant</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[25%]">Project Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[15%]">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[15%]">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[15%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockApplications.map((app) => {
                  const status = statusConfig[app.status];
                  return (
                    <tr key={app.id} className="group hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
                            {app.avatar}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground">{app.applicant}</span>
                            <span className="text-xs text-muted-foreground">{app.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-foreground">{app.projectTitle}</p>
                        <p className="text-xs text-muted-foreground">{app.category}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{app.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${status.bgClass} ${status.textClass}`}>
                          <span className={`size-1.5 rounded-full ${status.dotClass} mr-1.5`}></span>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {app.status === "pending" ? (
                          <Button size="sm" className="shadow-sm shadow-primary/20">
                            Review
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-card">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">1</span> to <span className="font-medium text-foreground">5</span> of <span className="font-medium text-foreground">{stats.total}</span> results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
