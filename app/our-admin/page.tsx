"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FolderOpen,
  FileText,
  Users,
  ChevronRight,
  Download,
  Plus,
  TrendingUp,
  AlertCircle,
  Flag,
  UsersRound,
  ArrowRight,
  Kanban,
} from "lucide-react";
import { mockProjects } from "@/data/mockdata";

export default function OpenTrackAdminDashboard() {
  const pendingProjects = mockProjects.filter((p) => p.submissionStatus === "pending");
  const approvedProjects = mockProjects.filter((p) => p.submissionStatus === "approved");

  // Mock data for stats
  const stats = {
    totalProjects: mockProjects.length,
    pendingApplications: pendingProjects.length,
    flaggedActivities: 3,
    totalBeneficiaries: "45.2k",
  };

  // Mock applications data
  const recentApplications = [
    { id: 1, org: "Global Future", initials: "GF", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400", project: "Clean Water Initiative", region: "Sub-Saharan Africa", date: "Oct 24, 2023" },
    { id: 2, org: "EduLink Foundation", initials: "EL", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400", project: "Rural Literacy Program", region: "Southeast Asia", date: "Oct 23, 2023" },
    { id: 3, org: "HealthForAll", initials: "HA", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400", project: "Mobile Clinic Setup", region: "South America", date: "Oct 23, 2023" },
    { id: 4, org: "Women's Work", initials: "WW", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400", project: "Micro-finance Initiative", region: "India", date: "Oct 22, 2023" },
    { id: 5, org: "Green Earth", initials: "GE", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400", project: "Reforestation Phase 2", region: "Brazil", date: "Oct 21, 2023" },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-10 scroll-smooth">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Breadcrumbs & Heading */}
        <div className="flex flex-col gap-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-primary font-semibold">Dashboard</span>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Dashboard Overview</h2>
              <p className="text-muted-foreground mt-2 text-lg">Welcome back, Marcus. Here&apos;s what&apos;s happening today.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button className="gap-2 shadow-lg shadow-primary/25">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Stat 1: Total Active Projects */}
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Kanban className="h-16 w-16 text-primary" />
            </div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <FolderOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">Total Active Projects</p>
                <h3 className="text-3xl font-black text-foreground mt-1">{stats.totalProjects}</h3>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>+5% vs last month</span>
              </div>
            </div>
          </div>

          {/* Stat 2: Pending Applications (Highlighted) */}
          <div className="bg-card p-6 rounded-2xl shadow-sm border-l-4 border-l-amber-500 border-y border-r border-border relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="h-16 w-16 text-amber-500" />
            </div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex justify-between items-start">
                <div className="size-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded-md">Needs Review</span>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">Pending Applications</p>
                <h3 className="text-3xl font-black text-foreground mt-1">{stats.pendingApplications}</h3>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm font-medium">
                <span>2 submitted today</span>
              </div>
            </div>
          </div>

          {/* Stat 3: Flagged Activities */}
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="size-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400">
                <Flag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">Flagged Activities</p>
                <h3 className="text-3xl font-black text-foreground mt-1">{stats.flaggedActivities}</h3>
              </div>
              <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                <AlertCircle className="h-4 w-4" />
                <span>Potential Risks Detected</span>
              </div>
            </div>
          </div>

          {/* Stat 4: Total Beneficiaries */}
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="h-16 w-16 text-purple-500" />
            </div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <UsersRound className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">Total Beneficiaries</p>
                <h3 className="text-3xl font-black text-foreground mt-1">{stats.totalBeneficiaries}</h3>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>+12% vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Split Section: Table & Chart */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left: Recent Applications Table (2/3) */}
          <div className="flex-grow xl:w-2/3 flex flex-col bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-foreground">Recent Applications</h3>
                <p className="text-sm text-muted-foreground">Latest submissions requiring review</p>
              </div>
              <Button variant="link" className="text-primary gap-1 p-0" asChild>
                <Link href="/our-admin/projects">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-secondary/50 text-muted-foreground font-semibold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4">Organization Name</th>
                    <th className="px-6 py-4">Project Title</th>
                    <th className="px-6 py-4">Region</th>
                    <th className="px-6 py-4">Submission Date</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`size-8 rounded ${app.color} flex items-center justify-center font-bold text-xs`}>
                            {app.initials}
                          </div>
                          <span className="font-semibold text-foreground">{app.org}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{app.project}</td>
                      <td className="px-6 py-4 text-muted-foreground">{app.region}</td>
                      <td className="px-6 py-4 text-muted-foreground">{app.date}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="outline" size="sm" className="text-xs font-bold">
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Project Health (1/3) */}
          <div className="flex-grow xl:w-1/3 flex flex-col bg-card rounded-2xl shadow-sm border border-border">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Active Project Health</h3>
              <p className="text-sm text-muted-foreground">Current status distribution</p>
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center">
              {/* CSS-only Donut Chart */}
              <div
                className="relative size-56 rounded-full flex items-center justify-center"
                style={{ background: "conic-gradient(hsl(var(--primary)) 0% 65%, #f59e0b 65% 85%, #ef4444 85% 100%)" }}
              >
                {/* Inner Circle to make it a donut */}
                <div className="bg-card size-40 rounded-full flex flex-col items-center justify-center z-10 shadow-inner">
                  <span className="text-3xl font-black text-foreground">{stats.totalProjects}</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Projects</span>
                </div>
              </div>

              {/* Legend */}
              <div className="w-full mt-8 flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-primary"></div>
                    <span className="text-sm font-semibold text-foreground">On Track</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{approvedProjects.length} (65%)</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm font-semibold text-foreground">At Risk</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{pendingProjects.length} (20%)</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-semibold text-foreground">Delayed</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">18 (15%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}