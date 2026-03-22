"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  Download,
  Plus,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";

type ProjectStatus = "active" | "at-risk" | "completed" | "delayed" | "draft";

interface Project {
  id: string;
  name: string;
  code: string;
  region: string;
  org: string;
  orgInitials: string;
  orgColor: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
}

const mockProjects: Project[] = [
  { id: "1", name: "Clean Water Initiative Ph.2", code: "#CW-204", region: "Sub-Saharan Africa", org: "Global Future", orgInitials: "GF", orgColor: "bg-orange-500/10 text-orange-600", status: "active", progress: 65, dueDate: "Dec 20, 2024" },
  { id: "2", name: "Rural Literacy Program", code: "#RL-882", region: "Southeast Asia", org: "EduLink Fdn.", orgInitials: "EL", orgColor: "bg-indigo-500/10 text-indigo-600", status: "at-risk", progress: 42, dueDate: "Nov 15, 2024" },
  { id: "3", name: "Mobile Health Clinic", code: "#MH-301", region: "South America", org: "HealthForAll", orgInitials: "HA", orgColor: "bg-teal-500/10 text-teal-600", status: "completed", progress: 100, dueDate: "Oct 01, 2024" },
  { id: "4", name: "Reforestation Zone A", code: "#RZ-110", region: "Brazil", org: "Green Earth", orgInitials: "GE", orgColor: "bg-blue-500/10 text-blue-600", status: "delayed", progress: 15, dueDate: "Jan 12, 2025" },
  { id: "5", name: "Women's Micro-Finance", code: "#WM-554", region: "India", org: "Women's Work", orgInitials: "WW", orgColor: "bg-pink-500/10 text-pink-600", status: "active", progress: 88, dueDate: "Nov 01, 2024" },
  { id: "6", name: "Disaster Relief Logistics", code: "#DR-901", region: "Global", org: "Rapid Cor.", orgInitials: "RC", orgColor: "bg-purple-500/10 text-purple-600", status: "draft", progress: 0, dueDate: "TBD" },
];

const statusConfig: Record<ProjectStatus, { label: string; bgClass: string; textClass: string; dotClass: string }> = {
  active: { label: "Active", bgClass: "bg-emerald-500/10", textClass: "text-emerald-700 dark:text-emerald-400", dotClass: "bg-emerald-500" },
  "at-risk": { label: "At Risk", bgClass: "bg-amber-500/10", textClass: "text-amber-700 dark:text-amber-400", dotClass: "bg-amber-500" },
  completed: { label: "Completed", bgClass: "bg-blue-500/10", textClass: "text-blue-700 dark:text-blue-400", dotClass: "bg-blue-500" },
  delayed: { label: "Delayed", bgClass: "bg-red-500/10", textClass: "text-red-700 dark:text-red-400", dotClass: "bg-red-500" },
  draft: { label: "Draft", bgClass: "bg-secondary", textClass: "text-muted-foreground", dotClass: "bg-muted-foreground" },
};

const progressColor: Record<ProjectStatus, string> = {
  active: "bg-primary",
  "at-risk": "bg-amber-500",
  completed: "bg-blue-500",
  delayed: "bg-red-500",
  draft: "bg-muted-foreground",
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");

  return (
    <div className="p-4 md:p-8 lg:p-10 scroll-smooth">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Breadcrumbs & Heading */}
        <div className="flex flex-col gap-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Link href="/our-admin" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-primary font-semibold">Projects</span>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Projects Directory</h2>
              <p className="text-muted-foreground mt-2 text-lg">Manage, track, and audit all NGO initiatives across regions.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button className="gap-2 shadow-lg shadow-primary/25">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
              placeholder="Search by project name, ID, or manager..."
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status: All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Region: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Region: All</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="south-america">South America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-px h-8 bg-border mx-1" />
            <Button variant="outline" size="icon" title="More Filters">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-1/3">Project Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockProjects.map((project) => {
                  const status = statusConfig[project.status];
                  return (
                    <tr key={project.id} className="group hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground text-base">{project.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{project.code}</span>
                            <span className="text-xs text-muted-foreground">{project.region}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`size-8 rounded-full ${project.orgColor} flex items-center justify-center font-bold text-xs ring-2 ring-background`}>
                            {project.orgInitials}
                          </div>
                          <span className="text-sm font-medium text-foreground">{project.org}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.bgClass} ${status.textClass} border border-current/20`}>
                          <span className={`size-1.5 rounded-full ${status.dotClass}`}></span>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 min-w-[140px]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">{project.progress}%</span>
                          {project.status === "delayed" && (
                            <span className="text-[10px] text-red-500 font-bold">Stalled</span>
                          )}
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                          <div className={`${progressColor[project.status]} h-2 rounded-full`} style={{ width: `${project.progress}%` }} />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{project.dueDate}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">1</span> to <span className="font-medium text-foreground">6</span> of <span className="font-medium text-foreground">124</span> results
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="text-muted-foreground px-1">...</span>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
