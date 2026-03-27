"use client"

import { useState } from "react";
import Link from "next/link";
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
import {
  CheckCircle,
  Upload,
  X,
  Save,
  HelpCircle,
  BadgeCheck,
  Flag,
  Users,
  Calendar,
  Gavel,
  User,
  Bold,
  Italic,
  List,
  Link2,
  ShieldCheck,
} from "lucide-react";
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

const demographics = [
  "Children & Youth",
  "Women & Girls",
  "Refugees",
  "Elderly",
  "Disabled Persons",
  "Students",
  "General Population",
];

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

interface FormData {
  fullName: string;
  orgRegNumber: string;
  projectTitle: string;
  projectCategory: string;
  problemStatement: string;
  projectAmount: number;
  estimatedBeneficiaries: string;
  primaryDemographic: string;
  startDate: string;
  endDate: string;
  location: string;
  agreedOpenData: boolean;
  registrationDoc: File | null;
}

const steps = [
  { id: 1, title: "Identity Verification", icon: BadgeCheck },
  { id: 2, title: "Project Mission", icon: Flag },
  { id: 3, title: "Beneficiary Targets", icon: Users },
  { id: 4, title: "Timeline", icon: Calendar },
  { id: 5, title: "Transparency Agreement", icon: Gavel },
];

export default function CreateProject() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    orgRegNumber: "",
    projectTitle: "",
    projectCategory: "",
    problemStatement: "",
    projectAmount: 0,
    estimatedBeneficiaries: "",
    primaryDemographic: "",
    startDate: "",
    endDate: "",
    location: "",
    agreedOpenData: false,
    registrationDoc: null,
  });

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedOpenData) {
      toast.error("Please agree to the Open Data Standards before submitting.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      updateField("registrationDoc", e.target.files[0]);
    }
  };

  const completionPercentage = Math.round(
    ((formData.fullName ? 1 : 0) +
      (formData.orgRegNumber ? 1 : 0) +
      (formData.projectTitle ? 1 : 0) +
      (formData.projectCategory ? 1 : 0) +
      (formData.problemStatement ? 1 : 0) +
      (formData.projectAmount ? 1 : 0) +
      (formData.estimatedBeneficiaries ? 1 : 0) +
      (formData.primaryDemographic ? 1 : 0) +
      (formData.startDate ? 1 : 0) +
      (formData.endDate ? 1 : 0) +
      (formData.agreedOpenData ? 1 : 0) +
      (formData.registrationDoc ? 1 : 0)) /
      11 *
      100
  );

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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
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
    <div className="min-h-screen bg-background font-display antialiased flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg text-primary-foreground shadow-lg shadow-primary/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold tracking-tight text-foreground leading-none">OpenTrack</h1>
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Admin Portal</span>
              </div>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground">Auto-saved</span>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
              </div>
              <div className="h-6 w-px bg-border mx-2 hidden md:block" />
              <Button variant="ghost" size="icon" className="rounded-full">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <div className="size-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar / Progress Stepper */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            <nav className="flex flex-col gap-6">
              <div>
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">Application</h2>
                <p className="text-xs text-muted-foreground">Complete all required sections</p>
              </div>

              <div className="flex flex-col gap-2 relative">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-border -z-10" />

                {steps.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  const StepIcon = step.icon;

                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`group flex items-center gap-3 p-2 rounded-lg transition-all text-left ${
                        isActive
                          ? "bg-card shadow-sm border border-border"
                          : "hover:bg-secondary opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div
                        className={`relative flex items-center justify-center size-8 rounded-full z-10 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-2 ring-background"
                            : isCompleted
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground border border-border"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <StepIcon className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm ${isActive ? "font-bold text-primary" : "font-medium text-foreground"}`}>
                          {step.title}
                        </span>
                        {isActive && <span className="text-[10px] text-muted-foreground">In Progress</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </nav>
          </aside>

          {/* Main Form Area */}
          <main className="lg:col-span-9 flex flex-col gap-6">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border">
              <div>
                <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">New Project Application</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Draft
                  </span>
                  <span className="text-muted-foreground text-sm">Step {currentStep} of 5</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Completion</span>
                <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${completionPercentage}%` }} />
                </div>
                <span className="text-xs font-bold text-foreground">{completionPercentage}%</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Form Section 1: Identity Verification */}
              <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 md:p-8 border-b border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">1. Identity Verification</h3>
                  </div>

                  <div className="space-y-8">
                    {/* File Upload Area */}
                    <div className="w-full">
                      <Label className="block text-sm font-bold text-foreground mb-2">
                        Organization Registration Document
                      </Label>
                      <label className="relative group flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed border-border bg-secondary/50 hover:bg-secondary hover:border-primary/50 transition-all cursor-pointer">
                        {formData.registrationDoc ? (
                          <div className="flex flex-col items-center text-center">
                            <div className="p-3 bg-primary/10 rounded-full mb-3">
                              <CheckCircle className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-sm font-medium text-foreground">{formData.registrationDoc.name}</p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                updateField("registrationDoc", null);
                              }}
                              className="mt-2 text-xs text-destructive hover:underline flex items-center gap-1"
                            >
                              <X className="h-3 w-3" /> Remove
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="p-3 bg-card rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                              <Upload className="h-8 w-8 text-primary" />
                            </div>
                            <p className="mb-1 text-sm text-muted-foreground font-medium">
                              <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PDF, JPG or PNG (MAX. 10MB)</p>
                          </div>
                        )}
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
                      </label>
                    </div>

                    {/* Text Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-bold text-foreground mb-1.5 block">Full Legal Name</Label>
                        <Input
                          value={formData.fullName}
                          onChange={(e) => updateField("fullName", e.target.value)}
                          className="h-12 px-4 shadow-sm"
                          placeholder="e.g. John Doe"
                        />
                        <span className="text-xs text-muted-foreground mt-1 block">As it appears on your government ID</span>
                      </div>
                      <div>
                        <Label className="text-sm font-bold text-foreground mb-1.5 block">Organization Reg. Number</Label>
                        <Input
                          value={formData.orgRegNumber}
                          onChange={(e) => updateField("orgRegNumber", e.target.value)}
                          className="h-12 px-4 shadow-sm"
                          placeholder="e.g. NGO-88291-X"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section 2: Project Mission */}
              <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 border-b border-border bg-secondary/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary rounded-lg text-muted-foreground">
                        <Flag className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">2. Project Mission</h3>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-sm font-bold text-foreground mb-1.5 block">Project Title</Label>
                        <Input
                          value={formData.projectTitle}
                          onChange={(e) => updateField("projectTitle", e.target.value)}
                          className="h-12 px-4 shadow-sm"
                          placeholder="Enter concise project title"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-bold text-foreground mb-1.5 block">Project Category</Label>
                        <Select value={formData.projectCategory} onValueChange={(value) => updateField("projectCategory", value)}>
                          <SelectTrigger className="py-[23px] w-full px-4 shadow-sm">
                            <SelectValue placeholder="Select a category..." />
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
                        <Label className="text-sm font-bold text-foreground mb-1.5 block">Project Amount</Label>
                        <Input
                          type="number"
                          value={formData.projectAmount}
                          onChange={(e) => updateField("projectAmount", Number(e.target.value))}
                          className="h-12 px-4 shadow-sm"
                          placeholder="Enter project amount"
                        />
                      </div>

                    </div>

                    <div>
                      <Label className="text-sm font-bold text-foreground mb-1.5 block">Problem Statement</Label>
                      <div className="w-full rounded-lg border border-border bg-card overflow-hidden shadow-sm">
                        {/* Toolbar */}
                        <div className="flex items-center gap-1 p-2 bg-secondary/50 border-b border-border">
                          <button type="button" className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                            <Bold className="h-4 w-4" />
                          </button>
                          <button type="button" className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                            <Italic className="h-4 w-4" />
                          </button>
                          <button type="button" className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                            <List className="h-4 w-4" />
                          </button>
                          <div className="w-px h-4 bg-border mx-1" />
                          <button type="button" className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                            <Link2 className="h-4 w-4" />
                          </button>
                        </div>
                        <Textarea
                          value={formData.problemStatement}
                          onChange={(e) => updateField("problemStatement", e.target.value)}
                          className="w-full border-none p-4 bg-transparent focus-visible:ring-0 min-h-32 resize-y"
                          placeholder="Describe the core problem your project addresses..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section 3: Beneficiary Targets */}
              <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-secondary rounded-lg text-muted-foreground">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">3. Beneficiary Targets</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Label className="text-sm font-bold text-foreground mb-1.5 block">Estimated Beneficiaries</Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                          <User className="h-5 w-5" />
                        </span>
                        <Input
                          type="number"
                          value={formData.estimatedBeneficiaries}
                          onChange={(e) => updateField("estimatedBeneficiaries", e.target.value)}
                          className="h-12 pl-10 pr-4 shadow-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-bold text-foreground mb-1.5 block">Primary Demographic</Label>
                      <Select value={formData.primaryDemographic} onValueChange={(value) => updateField("primaryDemographic", value)}>
                        <SelectTrigger className="h-12 px-4 shadow-sm">
                          <SelectValue placeholder="Select a demographic..." />
                        </SelectTrigger>
                        <SelectContent>
                          {demographics.map((demo) => (
                            <SelectItem key={demo} value={demo}>
                              {demo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <Label className="text-sm font-bold text-foreground mb-1.5 block">Location (State)</Label>
                      <Select value={formData.location} onValueChange={(value) => updateField("location", value)}>
                        <SelectTrigger className="h-12 px-4 shadow-sm">
                          <SelectValue placeholder="Select state..." />
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
              </div>

              {/* Form Section 4: Timeline */}
              <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-secondary rounded-lg text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">4. Timeline</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-bold text-foreground mb-1.5 block">Start Date</Label>
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateField("startDate", e.target.value)}
                        className="h-12 px-4 shadow-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-bold text-foreground mb-1.5 block">Projected End Date</Label>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateField("endDate", e.target.value)}
                        className="h-12 px-4 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section 5: Transparency Agreement */}
              <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 md:p-8 bg-gradient-to-br from-card to-secondary/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-secondary rounded-lg text-muted-foreground">
                      <Gavel className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">5. Transparency Agreement</h3>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/50 border border-border text-sm text-muted-foreground mb-6 leading-relaxed">
                    <p className="mb-2">
                      <strong className="text-foreground">Open Data Commitment:</strong> By submitting this project, you agree to adhere to the OpenTrack Transparency Standards. This includes:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Quarterly financial reporting with proof of expenditure.</li>
                      <li>Real-time impact tracking updates.</li>
                      <li>Public accessibility of non-sensitive project data.</li>
                    </ul>
                  </div>

                  <label className="flex items-start gap-4 p-4 rounded-lg border border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
                    <div className="flex items-center h-6">
                      <Checkbox
                        checked={formData.agreedOpenData}
                        onCheckedChange={(checked) => updateField("agreedOpenData", checked as boolean)}
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="text-sm">
                      <span className="font-bold text-foreground">I agree to the Open Data Standards</span>
                      <p className="text-muted-foreground mt-1">
                        I certify that all information provided is accurate and I am authorized to represent this organization.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Form Footer Actions */}
              <div className="sticky bottom-4 z-40">
                <div className="bg-card/80 backdrop-blur-lg p-4 rounded-2xl shadow-2xl border border-border flex items-center justify-between">
                  <Button type="button" variant="ghost" asChild>
                    <Link href="/projects">Back</Link>
                  </Button>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" className="hidden sm:flex">
                      Save for Later
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom Spacer */}
              <div className="h-12" />
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
