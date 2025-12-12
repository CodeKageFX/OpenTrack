"use client"

import { useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, CheckCircle, FileText, User, Briefcase, Shield, X } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Tech Tools",
  "Scholarships",
  "Community Support",
  "Food Drive",
  "Healthcare",
  "Education",
  "Emergency Relief",
  "Skills Training",
  "Housing",
  "Other",
];

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

interface FormData {
  // Personal Details
  fullName: string;
  email: string;
  phone: string;
  twitterHandle: string;
  location: string;
  // Project Details
  projectTitle: string;
  projectCategory: string;
  projectDescription: string;
  targetAmount: string;
  expectedBeneficiaries: string;
  startDate: string;
  endDate: string;
  // Uploads
  governmentId: File | null;
  personalPhoto: File | null;
  supportingDocs: File[];
  // Why Approve
  whyApprove: string;
  trackRecord: string;
  previousWorkLinks: string;
  // Agreements
  agreedTransparency: boolean;
  agreedProofUpload: boolean;
  agreedRevokeAccess: boolean;
  agreedDonationResponsibility: boolean;
}

export default function CreateProject() {
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    twitterHandle: "",
    location: "",
    projectTitle: "",
    projectCategory: "",
    projectDescription: "",
    targetAmount: "",
    expectedBeneficiaries: "",
    startDate: "",
    endDate: "",
    governmentId: null,
    personalPhoto: null,
    supportingDocs: [],
    whyApprove: "",
    trackRecord: "",
    previousWorkLinks: "",
    agreedTransparency: false,
    agreedProofUpload: false,
    agreedRevokeAccess: false,
    agreedDonationResponsibility: false,
  });

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone || !formData.location) {
          toast.error("Please fill in all required personal details.");
          return false;
        }
        return true;
      case 2:
        if (!formData.projectTitle || !formData.projectCategory || !formData.projectDescription || !formData.targetAmount || !formData.expectedBeneficiaries || !formData.startDate || !formData.endDate) {
          toast.error("Please fill in all required project details.");
          return false;
        }
        return true;
      case 3:
        if (!formData.governmentId || !formData.personalPhoto) {
          toast.error("Please upload your Government ID and personal photo.");
          return false;
        }
        return true;
      case 4:
        if (!formData.whyApprove) {
          toast.error("Please explain why your project should be approved.");
          return false;
        }
        return true;
      case 5:
        if (!formData.agreedTransparency || !formData.agreedProofUpload || !formData.agreedRevokeAccess || !formData.agreedDonationResponsibility) {
          toast("Please agree to all terms before submitting.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleFileUpload = (field: "governmentId" | "personalPhoto", file: File | null) => {
    updateField(field, file);
  };

  const handleSupportingDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateField("supportingDocs", [...formData.supportingDocs, ...Array.from(e.target.files)]);
    }
  };

  const removeSupportingDoc = (index: number) => {
    updateField("supportingDocs", formData.supportingDocs.filter((_, i) => i !== index));
  };

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Project Details", icon: Briefcase },
    { number: 3, title: "Identity Verification", icon: FileText },
    { number: 4, title: "Why Approve", icon: CheckCircle },
    { number: 5, title: "Agreements", icon: Shield },
  ];

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <main className="flex flex-1 items-center justify-center p-4">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold">Application Submitted!</h1>
            <p className="mt-4 text-muted-foreground">
              Your project application is now under review. Our team will verify your details and documents.
            </p>
            
            <div className="mt-8 rounded-xl border border-border bg-card p-6 text-left">
              <h2 className="font-semibold">Application Status</h2>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/20">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-warning" />
                </div>
                <div>
                  <p className="font-medium">Pending Review</p>
                  <p className="text-sm text-muted-foreground">Estimated review time: 2-3 business days</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-3 text-sm">
                <h3 className="font-medium">What happens next?</h3>
                <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
                  <li>Our team reviews your application and documents</li>
                  <li>We may contact you for additional information</li>
                  <li>You&apos;ll receive an email notification once a decision is made</li>
                  <li>If approved, you&apos;ll get access to your Project Admin Dashboard</li>
                </ol>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              A confirmation email has been sent to <span className="font-medium text-foreground">{formData.email}</span>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="outline" asChild>
                <Link href="/projects">Browse Projects</Link>
              </Button>
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-3xl">
          <Button variant="ghost" asChild className="mb-6 gap-2">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          {/* Progress Steps */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex min-w-max justify-between gap-2">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;

                return (
                  <div key={step.number} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                          isActive
                            ? "border-primary bg-primary text-primary-foreground"
                            : isCompleted
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
                      </div>
                      <span className={`mt-2 text-xs font-medium ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`mx-2 h-0.5 flex-1 ${isCompleted ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold md:text-3xl">Project Admin Application</h1>
              <p className="mt-2 text-muted-foreground">
                Apply to become a project admin and start receiving donations for your cause.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <User className="h-5 w-5" />
                    Personal Details
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Your full legal name"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitterHandle">X (Twitter) Handle</Label>
                      <Input
                        id="twitterHandle"
                        placeholder="@yourhandle"
                        value={formData.twitterHandle}
                        onChange={(e) => updateField("twitterHandle", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="location">State *</Label>
                      <Select value={formData.location} onValueChange={(value) => updateField("location", value)}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {nigerianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Briefcase className="h-5 w-5" />
                    Project Details
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="projectTitle">Project Title *</Label>
                      <Input
                        id="projectTitle"
                        placeholder="e.g., Tech Empowerment Lagos 2025"
                        value={formData.projectTitle}
                        onChange={(e) => updateField("projectTitle", e.target.value)}
                        className="mt-1.5"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="projectCategory">Project Category *</Label>
                        <Select value={formData.projectCategory} onValueChange={(value) => updateField("projectCategory", value)}>
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="targetAmount">Target Amount (₦) *</Label>
                        <Input
                          id="targetAmount"
                          type="number"
                          placeholder="e.g., 5000000"
                          value={formData.targetAmount}
                          onChange={(e) => updateField("targetAmount", e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="projectDescription">Full Project Description *</Label>
                      <Textarea
                        id="projectDescription"
                        placeholder="Describe your project in detail: what you need donations for, who will benefit, how the items/funds will be distributed..."
                        value={formData.projectDescription}
                        onChange={(e) => updateField("projectDescription", e.target.value)}
                        className="mt-1.5 min-h-[150px]"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <Label htmlFor="expectedBeneficiaries">Expected Beneficiaries *</Label>
                        <Input
                          id="expectedBeneficiaries"
                          type="number"
                          placeholder="e.g., 100"
                          value={formData.expectedBeneficiaries}
                          onChange={(e) => updateField("expectedBeneficiaries", e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="startDate">Start Date *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => updateField("startDate", e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date *</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => updateField("endDate", e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Identity Verification */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <FileText className="h-5 w-5" />
                    Proof of Identity
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Upload documents to verify your identity. This helps us ensure the authenticity of project admins.
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Government ID */}
                    <div>
                      <Label>Government ID *</Label>
                      <p className="mb-2 text-xs text-muted-foreground">NIN, Driver&apos;s License, or International Passport</p>
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-foreground/30 hover:bg-secondary/50">
                        {formData.governmentId ? (
                          <div className="text-center">
                            <CheckCircle className="mx-auto mb-2 h-8 w-8 text-primary" />
                            <span className="text-sm font-medium">{formData.governmentId.name}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); handleFileUpload("governmentId", null); }}
                              className="mt-2 text-xs text-destructive hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                            <span className="text-sm font-medium">Click to upload</span>
                            <span className="mt-1 text-xs text-muted-foreground">PNG, JPG, or PDF</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg,.pdf"
                          onChange={(e) => handleFileUpload("governmentId", e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Personal Photo */}
                    <div>
                      <Label>Personal Photo *</Label>
                      <p className="mb-2 text-xs text-muted-foreground">A clear photo of yourself</p>
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-foreground/30 hover:bg-secondary/50">
                        {formData.personalPhoto ? (
                          <div className="text-center">
                            <CheckCircle className="mx-auto mb-2 h-8 w-8 text-primary" />
                            <span className="text-sm font-medium">{formData.personalPhoto.name}</span>
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); handleFileUpload("personalPhoto", null); }}
                              className="mt-2 text-xs text-destructive hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                            <span className="text-sm font-medium">Click to upload</span>
                            <span className="mt-1 text-xs text-muted-foreground">PNG or JPG</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg"
                          onChange={(e) => handleFileUpload("personalPhoto", e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Supporting Documents */}
                  <div>
                    <Label>Supporting Documents (Optional)</Label>
                    <p className="mb-2 text-xs text-muted-foreground">
                      Proposals, budgets, organization registration, or any relevant documents
                    </p>
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-foreground/30 hover:bg-secondary/50">
                      <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                      <span className="text-sm font-medium">Click to upload files</span>
                      <span className="mt-1 text-xs text-muted-foreground">PDF, DOC, or images up to 10MB each</span>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        onChange={handleSupportingDocsChange}
                        className="hidden"
                      />
                    </label>

                    {formData.supportingDocs.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.supportingDocs.map((file, index) => (
                          <div key={index} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-sm">
                            <span className="truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeSupportingDoc(index)}
                              className="ml-2 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Why Should This Be Approved */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    Why Should This Project Be Approved?
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="whyApprove">Make Your Case *</Label>
                      <p className="mb-2 text-xs text-muted-foreground">
                        Explain why your project should be approved. What impact will it have?
                      </p>
                      <Textarea
                        id="whyApprove"
                        placeholder="Tell us about the need for this project, the community you'll serve, and the impact you expect to make..."
                        value={formData.whyApprove}
                        onChange={(e) => updateField("whyApprove", e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="trackRecord">Track Record / Experience (Optional)</Label>
                      <p className="mb-2 text-xs text-muted-foreground">
                        Have you organized similar projects before? Share your experience.
                      </p>
                      <Textarea
                        id="trackRecord"
                        placeholder="Describe any previous projects, community work, or relevant experience..."
                        value={formData.trackRecord}
                        onChange={(e) => updateField("trackRecord", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="previousWorkLinks">Links to Previous Work (Optional)</Label>
                      <p className="mb-2 text-xs text-muted-foreground">
                        Add links to portfolios, social media posts, news articles, or other evidence
                      </p>
                      <Textarea
                        id="previousWorkLinks"
                        placeholder="https://twitter.com/yourhandle/status/...&#10;https://yourwebsite.com/project"
                        value={formData.previousWorkLinks}
                        onChange={(e) => updateField("previousWorkLinks", e.target.value)}
                        className="min-h-20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Agreements */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Shield className="h-5 w-5" />
                    Terms & Agreements
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Please read and agree to the following terms before submitting your application.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                      <Checkbox
                        id="transparency"
                        checked={formData.agreedTransparency}
                        onCheckedChange={(checked) => updateField("agreedTransparency", checked as boolean)}
                      />
                      <label htmlFor="transparency" className="cursor-pointer text-sm leading-relaxed">
                        <span className="font-medium">Transparency Agreement</span>
                        <p className="mt-1 text-muted-foreground">
                          I agree to provide full transparency for beneficiaries, including public listing of distributions and progress updates.
                        </p>
                      </label>
                    </div>

                    <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                      <Checkbox
                        id="proofUpload"
                        checked={formData.agreedProofUpload}
                        onCheckedChange={(checked) => updateField("agreedProofUpload", checked as boolean)}
                      />
                      <label htmlFor="proofUpload" className="cursor-pointer text-sm leading-relaxed">
                        <span className="font-medium">Proof of Distribution</span>
                        <p className="mt-1 text-muted-foreground">
                          I agree to upload proof of distribution for all items delivered to beneficiaries.
                        </p>
                      </label>
                    </div>

                    <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                      <Checkbox
                        id="revokeAccess"
                        checked={formData.agreedRevokeAccess}
                        onCheckedChange={(checked) => updateField("agreedRevokeAccess", checked as boolean)}
                      />
                      <label htmlFor="revokeAccess" className="cursor-pointer text-sm leading-relaxed">
                        <span className="font-medium">Platform Terms</span>
                        <p className="mt-1 text-muted-foreground">
                          I agree that OpenTrack can revoke my access if I misuse the platform or violate the terms of service.
                        </p>
                      </label>
                    </div>

                    <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                      <Checkbox
                        id="donationResponsibility"
                        checked={formData.agreedDonationResponsibility}
                        onCheckedChange={(checked) => updateField("agreedDonationResponsibility", checked as boolean)}
                      />
                      <label htmlFor="donationResponsibility" className="cursor-pointer text-sm leading-relaxed">
                        <span className="font-medium">Donation Responsibility</span>
                        <p className="mt-1 text-muted-foreground">
                          I understand that OpenTrack does not collect money for me; I am responsible for managing donations properly and ensuring they reach intended beneficiaries.
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between gap-4">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <Button type="button" onClick={handleNext}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
