"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Upload, Loader2, Clock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockItemTypes, mockProjects } from "@/data/mockdata";
import { ItemIcon } from "@/components/ItemIcon";

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const activeProjects = mockProjects.filter(p => p.status === "ongoing" && p.submissionStatus === "approved");

export default function Register() {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    socialHandle: "",
    location: "",
    reason: "",
    selectedItems: [] as string[],
    projectId: "",
    supportingDocument: null as File | null,
    agreedToTerms: false,
  });

  const toggleItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(itemId)
        ? prev.selectedItems.filter(id => id !== itemId)
        : [...prev.selectedItems, itemId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.selectedItems.length === 0) {
      toast.error("Please select at least one item you're applying for");
      return;
    }

    if (!formData.agreedToTerms) {
      toast.error("Please agree to the terms");
      return;
    }

    setStep("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setStep("success");
    toast.success("Registration submitted successfully!");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex min-h-[70vh] items-center justify-center py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-warning/10">
              <Clock className="h-10 w-10 text-warning" />
            </div>
            <h1 className="mb-4 font-display text-3xl font-bold">Application Submitted!</h1>
            <p className="mb-6 text-muted-foreground">
              Your application is now pending review. We&apos;ll verify your information and 
              notify you via email within 3-5 business days.
            </p>
            <div className="rounded-lg border border-border bg-secondary/50 p-4 text-left">
              <h3 className="mb-2 font-semibold">What happens next?</h3>
              <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                <li>Our team reviews your application</li>
                <li>We verify your identity and references</li>
                <li>If approved, you&apos;ll receive an email with next steps</li>
                <li>Once items are available, they will be assigned and delivered</li>
                <li>You upload proof of receipt to complete the process</li>
              </ol>
            </div>
            <Button asChild className="mt-6 w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8 md:py-16">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">Apply as Beneficiary</h1>
            <p className="text-muted-foreground">
              Register to be considered for resources. We&apos;ll review your application and notify you of the outcome.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                disabled={step === "loading"}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={step === "loading"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="080XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={step === "loading"}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location / State *</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                  disabled={step === "loading"}
                >
                  <SelectTrigger>
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
              <div className="space-y-2">
                <Label htmlFor="socialHandle">Social Handle (Optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                  <Input
                    id="socialHandle"
                    placeholder="yourhandle"
                    className="pl-8"
                    value={formData.socialHandle}
                    onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value.replace("@", "") })}
                    disabled={step === "loading"}
                  />
                </div>
              </div>
            </div>

            {/* Project Selection (if multiple active projects) */}
            {activeProjects.length > 1 && (
              <div className="space-y-2">
                <Label>Select Project</Label>
                <Select
                  value={formData.projectId}
                  onValueChange={(value) => setFormData({ ...formData, projectId: value })}
                  disabled={step === "loading"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Item Selection */}
            <div className="space-y-3">
              <Label>Select Item(s) You&apos;re Applying For *</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {mockItemTypes.map((item) => {
                  const isSelected = formData.selectedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-secondary/50"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <Checkbox checked={isSelected} onCheckedChange={() => toggleItem(item.id)} />
                      <div className="flex items-center gap-2">
                        <ItemIcon name={item.icon} className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Application</Label>
              <Textarea
                id="reason"
                placeholder="Tell us why you're applying and how these resources will help you..."
                rows={4}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                disabled={step === "loading"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportingDocument">Supporting Document (Optional)</Label>
              <div className="flex items-center gap-4">
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-secondary/50">
                  <Upload className="h-5 w-5" />
                  <span>{formData.supportingDocument ? formData.supportingDocument.name : "Upload ID or supporting document"}</span>
                  <input
                    id="supportingDocument"
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => setFormData({ ...formData, supportingDocument: e.target.files?.[0] || null })}
                    disabled={step === "loading"}
                  />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Uploading supporting documents speeds up the verification process
              </p>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
                disabled={step === "loading"}
              />
              <Label htmlFor="terms" className="font-normal text-sm cursor-pointer">
                I agree to upload proof of receipt (photo with item) and post a public acknowledgment 
                within 48 hours of receiving the resources. *
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={step === "loading"}>
              {step === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By applying, you consent to verification of your identity and public acknowledgment 
              of receiving resources through this program.
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
