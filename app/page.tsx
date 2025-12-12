"use client"

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/StatCard";
import { DonorCard } from "@/components/DonorCard";
import { BeneficiaryCard } from "@/components/BeneficiaryCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ItemIcon } from "@/components/ItemIcon";
import { 
  Wallet, 
  Users, 
  Target, 
  ArrowRight, 
  Upload,
  Gift,
  UserCheck,
  Package,
} from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mockProjects, mockDonors, mockProofs, getItemDistributionSummary } from "@/data/mockdata";

// Get active project stats
// const activeProject = mockProjects.find(p => p.status === "ongoing") || mockProjects[0];
const totalStats = {
  totalRaised: mockProjects.reduce((sum, p) => sum + p.raisedAmount, 0),
  targetAmount: mockProjects.reduce((sum, p) => sum + p.targetAmount, 0),
  donorsCount: mockDonors.length,
  beneficiariesApproved: mockProjects.reduce((sum, p) => sum + p.beneficiariesCount, 0),
  itemsDistributed: mockProjects.reduce((sum, p) => sum + p.itemsDistributed, 0),
};

const itemDistribution = getItemDistributionSummary();

const recentDonors = mockDonors.slice(0, 4).map(d => ({
  name: d.isAnonymous ? "Anonymous" : d.name,
  amount: d.amount,
  time: new Date(d.createdAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' }),
  isAnonymous: d.isAnonymous,
}));

const beneficiaries = mockProofs.filter(p => p.isVerified).slice(0, 4).map(p => ({
  name: p.beneficiaryName,
  state: p.location,
  twitterHandle: p.socialHandle || "",
  imageUrl: p.imageUrl,
  isVerified: p.isVerified,
}));

const faqs = [
  {
    question: "How do I know my donation is going to the right place?",
    answer: "Every donation is publicly tracked on our transparency board. We provide real-time updates on funds received, beneficiary verification, and delivery proof with photos and social media confirmation."
  },
  {
    question: "How are beneficiaries selected?",
    answer: "Beneficiaries apply through our registration form and undergo verification including ID checks, social media validation, and community references. The selection prioritizes those with demonstrated need and commitment."
  },
  {
    question: "What items can be distributed through OpenTrack?",
    answer: "OpenTrack supports any type of distribution - laptops, food packs, cash grants, textbooks, equipment, and more. Each project can define its own item types and distribution rules."
  },
  {
    question: "Can I donate anonymously?",
    answer: "Yes, you can choose to donate anonymously. Your contribution will still be tracked on the public board but your name will appear as 'Anonymous'."
  },
  {
    question: "What happens after a beneficiary receives their items?",
    answer: "Beneficiaries are required to upload proof of receipt within 48 hours, including a photo and a public acknowledgment. This is verified by our team before marking the distribution as complete."
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(value);
};

const Index = () => {
  const progressPercentage = (totalStats.totalRaised / totalStats.targetAmount) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="border-b border-border md:px-30 sm:px-10 px-5">
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
              <span className="text-muted-foreground">Live Projects • {totalStats.beneficiariesApproved} beneficiaries helped</span>
            </div>
            
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Transparent Distribution for Community Projects
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Every donation tracked. Every beneficiary verified. Every item delivered with proof. 
              Join us in empowering communities with full transparency.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild>
                <Link href="/donate">
                  Donate Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">Apply as Beneficiary</Link>
              </Button>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
              <span className="font-display text-lg font-bold">{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-4 mb-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">{formatCurrency(totalStats.totalRaised)} raised</span>
              <span className="text-muted-foreground">of {formatCurrency(totalStats.targetAmount)} goal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 md:px-30 sm:px-10 px-5">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Real-Time Impact</h2>
          <p className="text-muted-foreground">Track every contribution and distribution in real-time</p>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <StatCard
            title="Total Raised"
            value={formatCurrency(totalStats.totalRaised)}
            icon={Wallet}
          />
          <StatCard
            title="Target Amount"
            value={formatCurrency(totalStats.targetAmount)}
            icon={Target}
          />
          <StatCard
            title="Total Donors"
            value={totalStats.donorsCount}
            icon={Users}
          />
          <StatCard
            title="Beneficiaries Approved"
            value={totalStats.beneficiariesApproved}
            icon={UserCheck}
          />
          <StatCard
            title="Items Distributed"
            value={totalStats.itemsDistributed}
            icon={Package}
          />
        </div>
      </section>

      {/* Items Distributed Summary */}
      <section className="border-y border-border bg-secondary/30">
        <div className="py-16 md:py-24 md:px-30 sm:px-10 px-5">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Resources Distributed</h2>
            <p className="text-muted-foreground">Tracking distribution across all item types</p>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            {itemDistribution.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-md w-[200px]"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <ItemIcon name={item.icon} className="h-7 w-7" />
                </div>
                <p className="font-display text-3xl font-bold">{item.distributed}</p>
                <p className="text-sm text-muted-foreground">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Donors & How It Works */}
      <section className="py-16 md:py-24 md:px-30 sm:px-10 px-5">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Recent Donors</h2>
            <p className="mb-8 text-muted-foreground">
              Thank you to everyone who has contributed to this cause.
            </p>
            <div className="space-y-3">
              {recentDonors.map((donor, index) => (
                <DonorCard
                  key={index}
                  name={donor.name}
                  amount={donor.amount}
                  time={donor.time}
                  isAnonymous={donor.isAnonymous}
                />
              ))}
            </div>
            <Button variant="outline" className="mt-6" asChild>
              <Link href="/donors">View All Donors</Link>
            </Button>
          </div>

          {/* How It Works */}
          <div>
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="mb-8 text-muted-foreground">
              A simple, transparent process from donation to delivery.
            </p>
            <div className="space-y-6">
              {[
                { icon: Gift, title: "Donate", description: "Make a contribution of any amount. Every naira counts towards empowering communities." },
                { icon: UserCheck, title: "Verification", description: "Beneficiaries are verified through ID checks, social media validation, and community references." },
                { icon: Package, title: "Distribution", description: "Items are purchased and distributed directly to verified beneficiaries." },
                { icon: Upload, title: "Proof Uploaded", description: "Beneficiaries upload proof photos and public acknowledgment on social media." },
              ].map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beneficiary Proof Gallery */}
      <section id="proof" className="border-y border-border bg-secondary/30">
        <div className="py-16 md:py-24 md:px-30 sm:px-10 px-5">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Proof of Impact</h2>
            <p className="text-muted-foreground">
              Real beneficiaries, real items, verified deliveries
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beneficiaries.map((beneficiary, index) => (
              <BeneficiaryCard
                key={index}
                name={beneficiary.name}
                state={beneficiary.state}
                twitterHandle={beneficiary.twitterHandle}
                imageUrl={beneficiary.imageUrl}
                isVerified={beneficiary.isVerified}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/gallery">
                View All Proof Photos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="py-16 md:py-24 md:px-30 sm:px-10 px-5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-display text-3xl font-bold md:text-4xl">About OpenTrack</h2>
            <p className="mb-6 text-lg opacity-90">
              OpenTrack was born from a simple belief: transparency builds trust. We created this platform 
              to ensure that every donation to community projects reaches its intended destination, with 
              verifiable proof every step of the way.
            </p>
            <p className="text-lg opacity-90">
              Our platform supports multiple projects distributing various types of resources - from laptops 
              and educational materials to food packs and cash grants. With OpenTrack, donors can see exactly 
              where their money goes, and beneficiaries can prove they received their items.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 md:px-30 sm:px-10 px-5">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about the platform
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-16 md:pb-24 mx-auto md:px-30 sm:px-10 px-5">
        <div className="rounded-2xl bg-secondary p-8 text-center md:p-16">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Ready to Make an Impact?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join hundreds of donors supporting communities across Nigeria
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="default" size="lg" asChild>
              <Link href="/donate">
                Donate Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/register">Apply as Beneficiary</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
