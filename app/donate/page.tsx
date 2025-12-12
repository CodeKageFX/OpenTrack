"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link"
import { toast } from "sonner";

const suggestedAmounts = [10000, 25000, 50000, 100000, 250000, 500000];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(value);
};

export default function Donate() {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    isAnonymous: false,
    receipt: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setStep("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setStep("success");
    toast.success("Thank you for your donation!");
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container flex min-h-[70vh] items-center justify-center py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h1 className="mb-4 font-display text-3xl font-bold">Thank You!</h1>
            <p className="mb-6 text-muted-foreground">
              Your donation of {formatCurrency(Number(formData.amount))} has been recorded. 
              You&apos;ll appear on our public transparency board shortly.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/">Return to Home</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/donors">View Donor Board</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 md:py-16">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">Make a Donation</h1>
            <p className="text-muted-foreground">
              Your contribution helps empower Nigerian tech talents with the tools they need to succeed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={step === "loading"}
              />
            </div>

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

            <div className="space-y-3">
              <Label>Donation Amount (NGN) *</Label>
              <div className="grid grid-cols-3 gap-2">
                {suggestedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={formData.amount === String(amount) ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, amount: String(amount) })}
                    disabled={step === "loading"}
                  >
                    {formatCurrency(amount)}
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                placeholder="Or enter custom amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                disabled={step === "loading"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt">Upload Receipt (Optional)</Label>
              <div className="flex items-center gap-4">
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-secondary/50">
                  <Upload className="h-5 w-5" />
                  <span>{formData.receipt ? formData.receipt.name : "Click to upload receipt"}</span>
                  <input
                    id="receipt"
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => setFormData({ ...formData, receipt: e.target.files?.[0] || null })}
                    disabled={step === "loading"}
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="h-4 w-4 rounded border-border"
                disabled={step === "loading"}
              />
              <Label htmlFor="anonymous" className="font-normal">
                Donate anonymously (your name won&apos;t appear on the public board)
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={step === "loading"}>
              {step === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Donation"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By donating, you agree to our terms and acknowledge that your contribution 
              will be publicly tracked for transparency.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
