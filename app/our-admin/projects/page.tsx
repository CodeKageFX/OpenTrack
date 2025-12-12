"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Mail,
  User,
  Calendar,
  DollarSign,
  MapPin,
//   Phone,
//   Twitter,
  Users,
  Link as LinkIcon,
  Shield,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import type { ProjectSubmissionStatus } from "@/types";

// Extended mock data for applications
interface ProjectApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  twitterHandle?: string;
  location: string;
  projectTitle: string;
  projectCategory: string;
  projectDescription: string;
  targetAmount: number;
  expectedBeneficiaries: number;
  startDate: string;
  endDate: string;
  governmentIdUrl?: string;
  personalPhotoUrl?: string;
  supportingDocuments?: string[];
  whyApprove: string;
  trackRecord?: string;
  previousWorkLinks?: string[];
  status: ProjectSubmissionStatus;
  submittedAt: string;
  reviewedAt?: string;
  adminNotes?: string;
  rejectionReason?: string;
}

const mockApplications: ProjectApplication[] = [
  {
    id: "app-1",
    fullName: "Adebayo Ogunlesi",
    email: "adebayo@example.com",
    phone: "+234 801 234 5678",
    twitterHandle: "@adebayotech",
    location: "Lagos",
    projectTitle: "Tech Empowerment Lagos 2025",
    projectCategory: "Tech Tools",
    projectDescription: "A comprehensive program to distribute laptops to 200 underprivileged students in Lagos State who are studying computer science and related fields. The goal is to bridge the digital divide and provide these students with the tools they need to succeed in their studies and future careers.",
    targetAmount: 15000000,
    expectedBeneficiaries: 200,
    startDate: "2025-02-01",
    endDate: "2025-06-30",
    governmentIdUrl: "/placeholder.svg",
    personalPhotoUrl: "/placeholder.svg",
    supportingDocuments: ["proposal.pdf", "budget.xlsx"],
    whyApprove: "I have been working in tech education for 5 years and have successfully organized 3 similar programs. This project addresses a critical need in our community where many talented students lack access to basic computing resources.",
    trackRecord: "Previously organized laptop distribution for 50 students in 2023. Volunteered with Code Lagos for 2 years. Founded a local coding bootcamp that has trained 200+ students.",
    previousWorkLinks: ["https://twitter.com/adebayotech/status/123", "https://codelags.org/volunteers/adebayo"],
    status: "pending",
    submittedAt: "2025-01-10T10:30:00Z",
  },
  {
    id: "app-2",
    fullName: "Fatima Abubakar",
    email: "fatima@example.com",
    phone: "+234 803 456 7890",
    location: "Kano",
    projectTitle: "Northern Girls Education Fund",
    projectCategory: "Scholarships",
    projectDescription: "Scholarship program for 100 girls in Northern Nigeria to continue their secondary education. Covers tuition, books, and uniforms.",
    targetAmount: 8000000,
    expectedBeneficiaries: 100,
    startDate: "2025-03-01",
    endDate: "2025-12-31",
    governmentIdUrl: "/placeholder.svg",
    personalPhotoUrl: "/placeholder.svg",
    whyApprove: "As a teacher for 10 years, I've seen many girls drop out due to financial constraints. This program will give them a chance to complete their education.",
    status: "approved",
    submittedAt: "2025-01-05T08:00:00Z",
    reviewedAt: "2025-01-08T14:00:00Z",
    adminNotes: "Strong application with clear impact metrics. Approved for immediate launch.",
  },
  {
    id: "app-3",
    fullName: "Chukwuemeka Obi",
    email: "emeka@example.com",
    phone: "+234 805 678 9012",
    twitterHandle: "@emekaobi",
    location: "Enugu",
    projectTitle: "Community Food Drive",
    projectCategory: "Food Drive",
    projectDescription: "Monthly food distribution to 500 families in underserved communities.",
    targetAmount: 3000000,
    expectedBeneficiaries: 500,
    startDate: "2025-01-15",
    endDate: "2025-07-15",
    governmentIdUrl: "/placeholder.svg",
    personalPhotoUrl: "/placeholder.svg",
    whyApprove: "I run a small NGO focused on food security. We have partnerships with local suppliers.",
    status: "rejected",
    submittedAt: "2025-01-02T12:00:00Z",
    reviewedAt: "2025-01-06T10:00:00Z",
    rejectionReason: "Insufficient documentation provided. Please reapply with organization registration documents and detailed distribution plan.",
  },
  {
    id: "app-4",
    fullName: "Blessing Okoro",
    email: "blessing@example.com",
    phone: "+234 807 890 1234",
    location: "Rivers",
    projectTitle: "Skills Acquisition for Youth",
    projectCategory: "Skills Training",
    projectDescription: "Vocational training program for 150 unemployed youth in Port Harcourt. Covers tailoring, welding, and digital skills.",
    targetAmount: 5000000,
    expectedBeneficiaries: 150,
    startDate: "2025-04-01",
    endDate: "2025-10-31",
    governmentIdUrl: "/placeholder.svg",
    personalPhotoUrl: "/placeholder.svg",
    whyApprove: "Youth unemployment is a major issue in our community. This program will provide practical skills that lead to employment or self-employment.",
    trackRecord: "Ran a similar program in 2022 with 50 participants, 80% of whom found employment within 6 months.",
    status: "pending",
    submittedAt: "2025-01-12T09:00:00Z",
  },
];

const statusConfig: Record<ProjectSubmissionStatus, { label: string; icon: React.ElementType; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pending Review", icon: Clock, variant: "outline" },
  approved: { label: "Approved", icon: CheckCircle, variant: "default" },
  rejected: { label: "Rejected", icon: XCircle, variant: "destructive" },
};

export default function ProjectReviews() {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<ProjectApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");

  const filteredApplications = mockApplications.filter((app) => {
    const matchesTab = activeTab === "all" || app.status === activeTab;
    const matchesSearch =
      app.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleReview = (action: "approve" | "reject") => {
    if (!selectedApplication) return;

    switch (action) {
        case "approve":
            toast.success(`${selectedApplication.projectTitle} has been approved.`);
            break;
        case "reject":
            toast.error(`${selectedApplication.projectTitle} has been rejected.`);
            break;
    }

    setSelectedApplication(null);
    setReviewNotes("");
    setReviewAction(null);
    setViewMode("list");
  };

  const getCounts = () => ({
    all: mockApplications.length,
    pending: mockApplications.filter((a) => a.status === "pending").length,
    approved: mockApplications.filter((a) => a.status === "approved").length,
    rejected: mockApplications.filter((a) => a.status === "rejected").length,
  });

  const counts = getCounts();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Project Applications</h1>
        <p className="mt-1 text-muted-foreground">
          Review and manage project admin applications
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by project title, name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending
            {counts.pending > 0 && (
              <span className="ml-1 rounded-full bg-warning/20 px-2 py-0.5 text-xs font-semibold text-warning">
                {counts.pending}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            <XCircle className="h-4 w-4" />
            Rejected
          </TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredApplications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
              <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold">No applications found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchQuery
                  ? "Try a different search term"
                  : `No ${activeTab} applications at the moment`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => {
                const config = statusConfig[application.status];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={application.id}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start gap-2">
                          <Badge variant={config.variant} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                          </Badge>
                          <Badge variant="outline">{application.projectCategory}</Badge>
                        </div>

                        <h3 className="mt-3 font-display text-xl font-semibold">
                          {application.projectTitle}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {application.projectDescription}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {application.fullName}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {application.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {application.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {formatCurrency(application.targetAmount)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {application.expectedBeneficiaries} beneficiaries
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(application.submittedAt).toLocaleDateString()}
                          </div>
                        </div>

                        {application.adminNotes && (
                          <div className="mt-4 rounded-lg bg-secondary/50 p-3">
                            <p className="text-xs font-medium text-muted-foreground">
                              Admin Notes:
                            </p>
                            <p className="mt-1 text-sm">{application.adminNotes}</p>
                          </div>
                        )}

                        {application.rejectionReason && (
                          <div className="mt-4 rounded-lg bg-destructive/10 p-3">
                            <p className="text-xs font-medium text-destructive">
                              Rejection Reason:
                            </p>
                            <p className="mt-1 text-sm">{application.rejectionReason}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 lg:flex-col">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => {
                            setSelectedApplication(application);
                            setViewMode("detail");
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                        {application.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="gap-1"
                              onClick={() => {
                                setSelectedApplication(application);
                                setReviewAction("approve");
                              }}
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="gap-1"
                              onClick={() => {
                                setSelectedApplication(application);
                                setReviewAction("reject");
                              }}
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Review Action Dialog */}
      <Dialog
        open={!!selectedApplication && !!reviewAction}
        onOpenChange={() => {
          setSelectedApplication(null);
          setReviewAction(null);
          setReviewNotes("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "approve" ? "Approve" : "Reject"} Application
            </DialogTitle>
            <DialogDescription>
              {reviewAction === "approve"
                ? "This will grant the applicant access to their Project Admin Dashboard and make their project visible on the platform."
                : "This will notify the applicant that their application was not approved. Please provide a reason."}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-4">
              <div className="rounded-lg bg-secondary/50 p-4">
                <h4 className="font-medium">{selectedApplication.projectTitle}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  by {selectedApplication.fullName}
                </p>
              </div>

              <div>
                <Label htmlFor="notes">
                  {reviewAction === "approve" ? "Notes (optional)" : "Rejection Reason *"}
                </Label>
                <Textarea
                  id="notes"
                  placeholder={
                    reviewAction === "approve"
                      ? "Add any notes for internal reference..."
                      : "Explain why this application was rejected (this will be sent to the applicant)..."
                  }
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedApplication(null);
                setReviewAction(null);
                setReviewNotes("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant={reviewAction === "approve" ? "default" : "destructive"}
              onClick={() => handleReview(reviewAction!)}
              disabled={reviewAction === "reject" && !reviewNotes}
            >
              {reviewAction === "approve" ? "Approve Application" : "Reject Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Full Detail View Dialog */}
      <Dialog
        open={!!selectedApplication && viewMode === "detail" && !reviewAction}
        onOpenChange={() => {
          setSelectedApplication(null);
          setViewMode("list");
        }}
      >
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                {/* Status & Category */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant={statusConfig[selectedApplication.status].variant} className="gap-1">
                    {statusConfig[selectedApplication.status].label}
                  </Badge>
                  <Badge variant="outline">{selectedApplication.projectCategory}</Badge>
                </div>

                {/* Project Title */}
                <div>
                  <h3 className="font-display text-2xl font-bold">
                    {selectedApplication.projectTitle}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Submitted on {new Date(selectedApplication.submittedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <Separator />

                {/* Personal Details */}
                <div>
                  <h4 className="flex items-center gap-2 font-semibold">
                    <User className="h-4 w-4" />
                    Personal Details
                  </h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="font-medium">{selectedApplication.fullName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedApplication.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedApplication.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium">{selectedApplication.location}</p>
                    </div>
                    {selectedApplication.twitterHandle && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Twitter</p>
                        <p className="font-medium">{selectedApplication.twitterHandle}</p>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Project Details */}
                <div>
                  <h4 className="flex items-center gap-2 font-semibold">
                    <FileText className="h-4 w-4" />
                    Project Details
                  </h4>
                  <div className="mt-3 space-y-4">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Target Amount</p>
                        <p className="font-medium">{formatCurrency(selectedApplication.targetAmount)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Expected Beneficiaries</p>
                        <p className="font-medium">{selectedApplication.expectedBeneficiaries}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Timeline</p>
                        <p className="font-medium">
                          {new Date(selectedApplication.startDate).toLocaleDateString()} - {new Date(selectedApplication.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Description</p>
                      <p className="text-sm">{selectedApplication.projectDescription}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Identity Verification */}
                <div>
                  <h4 className="flex items-center gap-2 font-semibold">
                    <Shield className="h-4 w-4" />
                    Identity Verification
                  </h4>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-xs text-muted-foreground">Government ID</p>
                      <div className="mt-2 flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Document uploaded</span>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-border p-3">
                      <p className="text-xs text-muted-foreground">Personal Photo</p>
                      <div className="mt-2 flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Photo uploaded</span>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                  {selectedApplication.supportingDocuments && selectedApplication.supportingDocuments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-muted-foreground">Supporting Documents</p>
                      {selectedApplication.supportingDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 rounded bg-secondary px-3 py-2 text-sm">
                          <FileText className="h-4 w-4" />
                          <span>{doc}</span>
                          <Button variant="link" size="sm" className="ml-auto h-auto p-0">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Why Approve */}
                <div>
                  <h4 className="flex items-center gap-2 font-semibold">
                    <CheckCircle className="h-4 w-4" />
                    Why This Project Should Be Approved
                  </h4>
                  <div className="mt-3 space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Applicant&apos;s Case</p>
                      <p className="text-sm">{selectedApplication.whyApprove}</p>
                    </div>
                    {selectedApplication.trackRecord && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Track Record</p>
                        <p className="text-sm">{selectedApplication.trackRecord}</p>
                      </div>
                    )}
                    {selectedApplication.previousWorkLinks && selectedApplication.previousWorkLinks.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Previous Work Links</p>
                        <div className="space-y-1">
                          {selectedApplication.previousWorkLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              <LinkIcon className="h-3 w-3" />
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons for Pending Applications */}
                {selectedApplication.status === "pending" && (
                  <>
                    <Separator />
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 gap-1"
                        onClick={() => setReviewAction("approve")}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve Application
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1 gap-1"
                        onClick={() => setReviewAction("reject")}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject Application
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
