"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Bell,
  Triangle,
  Building2,
  FileText,
  FolderOpen,
  MapPin,
  Calendar,
  ExternalLink,
  FileSpreadsheet,
  Image as ImageIcon,
  Eye,
  Gavel,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  XCircle,
} from "lucide-react";

// Mock data for the application
const applicationData = {
  id: "APP-894-KW",
  projectName: "Clean Water Initiative Phase 2",
  status: "Under Review",
  applicant: "Global Water Corps",
  submittedDate: "Oct 12, 2023",
  fundingRequest: 45000,
  duration: 18,
  beneficiaries: 12500,
  organization: {
    legalName: "Global Water Corps Ltd.",
    regNumber: "NGO-99283-X",
    headquarters: "Nairobi, Kenya",
    website: "www.globalwatercorps.org",
    mission: "To provide sustainable access to clean water and sanitation for underserved communities in East Africa through community-led infrastructure projects and education.",
  },
  proposal: {
    summary: "Phase 2 of the Clean Water Initiative aims to expand our successful borehole program into the Turkana region. This phase involves drilling 5 new solar-powered boreholes, rehabilitating 3 existing wells, and establishing Water User Committees for long-term maintenance.",
    milestones: [
      { quarter: "Q1 2024", task: "Site surveys & Procurement", completed: true },
      { quarter: "Q2 2024", task: "Drilling & Installation", completed: false },
      { quarter: "Q3 2024", task: "Community Training & Handover", completed: false },
    ],
  },
  documents: [
    { name: "Detailed_Budget_V2.pdf", size: "2.4 MB", uploaded: "2 days ago", type: "pdf" },
    { name: "Site_Photos_Phase1.jpg", size: "4.1 MB", uploaded: "5 days ago", type: "image" },
    { name: "Beneficiary_List.xlsx", size: "856 KB", uploaded: "1 week ago", type: "spreadsheet" },
  ],
  checks: [
    { label: "Budget limit valid", status: "pass" },
    { label: "Registration active", status: "pass" },
    { label: "Partner verify needed", status: "warning" },
  ],
  activity: [
    { date: "Today, 10:23 AM", action: "System flag: Partner verification pending" },
    { date: "Oct 14, 4:00 PM", action: "Admin assigned: Sarah J." },
  ],
};

export default function ApplicationReviewPage() {
  const [notes, setNotes] = useState("");

  const stepProgress = 3; // Current step (1-5)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top Navigation Bar */}
      <header className="flex-none border-b border-border bg-card z-20">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo Area */}
            <Link href="/our-admin" className="flex items-center gap-3 text-foreground">
              <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
                <Triangle className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold tracking-tight">OpenTrack</h2>
            </Link>
            <div className="h-6 w-px bg-border mx-2" />
            {/* Breadcrumbs */}
            <nav className="hidden md:flex items-center gap-2 text-sm">
              <Link href="/our-admin/applications" className="text-muted-foreground hover:text-primary transition-colors">Applications</Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Review #{applicationData.id}</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-xs">
              AD
            </div>
          </div>
        </div>

        {/* Project Header & Status Bar */}
        <div className="px-6 py-4 bg-secondary/50 border-t border-border flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                {applicationData.status}
              </span>
              <span className="text-xs text-muted-foreground font-mono">ID: {applicationData.id}</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground leading-tight">{applicationData.projectName}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Applicant: <span className="font-semibold text-primary">{applicationData.applicant}</span>
              <span className="mx-1">•</span>
              Submitted: {applicationData.submittedDate}
            </p>
          </div>

          {/* Status Stepper */}
          <div className="hidden lg:flex items-center gap-1 min-w-[400px]">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-medium text-muted-foreground">
                <span className={stepProgress >= 1 ? "text-primary font-bold" : ""}>Submission</span>
                <span className={stepProgress >= 2 ? "text-primary font-bold" : ""}>Verification</span>
                <span className={stepProgress >= 3 ? "text-primary font-bold" : ""}>Review</span>
                <span className={stepProgress >= 4 ? "text-primary font-bold" : ""}>Approval</span>
                <span className={stepProgress >= 5 ? "text-primary font-bold" : ""}>Funded</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden flex">
                <div className="bg-primary h-full" style={{ width: `${(stepProgress / 5) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area: Split Screen */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* LEFT PANEL: Application Data (Scrollable) */}
        <div className="flex-1 overflow-y-auto bg-secondary/30 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-20">
            {/* Section 1: Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col gap-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Funding Request</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">${applicationData.fundingRequest.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">USD</span>
                </div>
              </div>
              <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col gap-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Project Duration</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">{applicationData.duration}</span>
                  <span className="text-xs text-muted-foreground">Months</span>
                </div>
              </div>
              <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col gap-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Beneficiaries</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">{applicationData.beneficiaries.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">People</span>
                </div>
              </div>
            </div>

            {/* Section 2: Organization Details */}
            <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-secondary/50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Organization Details
                </h3>
                <Button variant="link" className="text-xs p-0">View Profile</Button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Legal Name</label>
                  <div className="text-sm font-medium text-foreground">{applicationData.organization.legalName}</div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Registration Number</label>
                  <div className="text-sm font-medium text-foreground font-mono bg-secondary px-2 py-0.5 rounded w-fit">
                    {applicationData.organization.regNumber}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Headquarters</label>
                  <div className="text-sm font-medium text-foreground">{applicationData.organization.headquarters}</div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Website</label>
                  <a href="#" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                    {applicationData.organization.website}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Mission Statement</label>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {applicationData.organization.mission}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Project Proposal */}
            <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-secondary/50">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Project Proposal
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-2">Executive Summary</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {applicationData.proposal.summary}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border p-4 bg-secondary/30">
                    <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Location
                    </h4>
                    <div className="aspect-video w-full rounded-md bg-secondary overflow-hidden relative flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Turkana, Kenya</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-4 bg-secondary/30">
                    <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Key Milestones
                    </h4>
                    <ul className="space-y-3 relative before:absolute before:left-[5px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
                      {applicationData.proposal.milestones.map((milestone, index) => (
                        <li key={index} className="relative pl-5 text-sm">
                          <div className={`absolute left-0 top-1.5 size-2.5 rounded-full ring-2 ring-card ${milestone.completed ? "bg-primary" : "bg-muted-foreground"}`} />
                          <span className="font-semibold text-foreground block">{milestone.quarter}</span>
                          <span className="text-muted-foreground">{milestone.task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Supporting Documents */}
            <section className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-secondary/50">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  Evidence &amp; Documents
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {applicationData.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="group relative flex flex-col gap-2 p-3 rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card cursor-pointer"
                    >
                      <div className="aspect-[4/3] rounded bg-secondary overflow-hidden relative flex items-center justify-center">
                        {doc.type === "pdf" && <FileText className="h-12 w-12 text-muted-foreground/50" />}
                        {doc.type === "image" && <ImageIcon className="h-12 w-12 text-muted-foreground/50" />}
                        {doc.type === "spreadsheet" && <FileSpreadsheet className="h-12 w-12 text-muted-foreground/50" />}
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="icon" variant="secondary" className="rounded-full">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size} • Uploaded {doc.uploaded}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* RIGHT PANEL: Audit Sidebar */}
        <aside className="w-[380px] hidden xl:flex flex-none bg-card border-l border-border flex-col z-10 shadow-xl">
          <div className="p-5 border-b border-border">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Gavel className="h-5 w-5 text-primary" />
              Review Decision
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
            {/* Compliance Checklist */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Automated Checks</p>
              <div className="space-y-2">
                {applicationData.checks.map((check, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg border ${
                      check.status === "pass"
                        ? "bg-emerald-500/10 border-emerald-500/20"
                        : "bg-amber-500/10 border-amber-500/20"
                    }`}
                  >
                    {check.status === "pass" ? (
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    )}
                    <span className={`text-sm font-medium ${check.status === "pass" ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Notes */}
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Internal Notes</p>
                <span className="text-[10px] text-muted-foreground">Saved 2m ago</span>
              </div>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="flex-1 min-h-[160px] resize-none"
                placeholder="Enter your review notes here... These are only visible to other admins."
              />
            </div>

            {/* History Log */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Activity</p>
              <div className="space-y-4 pl-2 border-l border-border">
                {applicationData.activity.map((item, index) => (
                  <div key={index} className="pl-4 relative">
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-muted-foreground border-2 border-card" />
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                    <p className="text-xs font-medium text-foreground">{item.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Action Footer */}
          <div className="p-5 border-t border-border bg-card z-20">
            <div className="flex flex-col gap-3">
              <Button className="w-full gap-2 shadow-lg shadow-primary/20">
                <CheckCircle className="h-5 w-5" />
                Approve Application
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Request Info
                </Button>
                <Button variant="outline" className="gap-2 border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-600">
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
