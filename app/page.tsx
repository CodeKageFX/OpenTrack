"use client"

import Link from "next/link";
import {
  ArrowRight,
  Gift,
  HeartHandshake,
  Package,
  ScanSearch,
  ShieldCheck,
  Target,
  Upload,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

import { BeneficiaryCard } from "@/components/BeneficiaryCard";
import { DonorCard } from "@/components/DonorCard";
import { Footer } from "@/components/Footer";
import { ItemIcon } from "@/components/ItemIcon";
import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getItemDistributionSummary,
  mockDonors,
  mockProjects,
  mockProofs,
} from "@/data/mockdata";

const totalStats = {
  totalRaised: mockProjects.reduce((sum, p) => sum + p.raisedAmount, 0),
  targetAmount: mockProjects.reduce((sum, p) => sum + p.targetAmount, 0),
  donorsCount: mockDonors.length,
  beneficiariesApproved: mockProjects.reduce((sum, p) => sum + p.beneficiariesCount, 0),
  itemsDistributed: mockProjects.reduce((sum, p) => sum + p.itemsDistributed, 0),
};

const itemDistribution = getItemDistributionSummary();
const featuredProjects = mockProjects.slice(0, 3);

const recentDonors = mockDonors.slice(0, 4).map((d) => ({
  name: d.isAnonymous ? "Anonymous" : d.name,
  amount: d.amount,
  time: new Date(d.createdAt).toLocaleDateString("en-NG", { month: "short", day: "numeric" }),
  isAnonymous: d.isAnonymous,
}));

const beneficiaries = mockProofs.filter((p) => p.isVerified).slice(0, 4).map((p) => ({
  name: p.beneficiaryName,
  state: p.location,
  twitterHandle: p.socialHandle || "",
  imageUrl: p.imageUrl,
  isVerified: p.isVerified,
}));

const faqs = [
  {
    question: "How do I know my donation is going to the right place?",
    answer:
      "Every donation is publicly tracked on our transparency board. We share updates on funds received, beneficiary verification, and delivery proof with photos and social confirmation.",
  },
  {
    question: "How are beneficiaries selected?",
    answer:
      "Beneficiaries apply through our registration form and undergo verification including ID checks, social media validation, and community references. Selection prioritizes demonstrated need and commitment.",
  },
  {
    question: "What items can be distributed through LazTrack?",
    answer:
      "LazTrack supports laptop support, food packs, cash grants, textbooks, equipment, and more. Each campaign can define item types and distribution rules.",
  },
  {
    question: "Can I donate anonymously?",
    answer:
      "Yes. Your contribution will still be tracked publicly, while your name appears as Anonymous.",
  },
  {
    question: "What happens after a beneficiary receives their items?",
    answer:
      "Beneficiaries upload proof of receipt within 48 hours, including a photo and a public acknowledgment. Our team verifies this before marking delivery complete.",
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function Index() {
  const progressPercentage = (totalStats.totalRaised / totalStats.targetAmount) * 100;
  const heroStats = [
    { title: "Families Reached", value: `${totalStats.beneficiariesApproved}+`, icon: HeartHandshake },
    { title: "Public Donations", value: `${totalStats.donorsCount}+`, icon: Wallet },
    { title: "Proofs Reviewed", value: `${mockProofs.length}+`, icon: ScanSearch },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a]">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-[#eef7f2] via-[#f7f8f6] to-[#edf4f0]">
        <div className="absolute inset-0">
          <div className="absolute -top-28 right-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 left-4 h-72 w-72 rounded-full bg-warning/15 blur-3xl" />
          <div className="absolute inset-0 grid-dots opacity-45" />
        </div>

        <div className="relative z-10 py-20 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-10">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="text-muted-foreground">Live projects and verified disbursements</span>
              </div>

              <h1 className="mb-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-[#0f2e1f] md:text-6xl">
                A donation platform built on trust, proof, and community impact.
              </h1>

              <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Track every naira from contribution to delivery. Support projects that share verified beneficiary records and proof of impact.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button variant="cta" asChild className="rounded-full px-8 py-6 text-lg">
                  <Link href="/donate">
                    Donate Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="rounded-full bg-card px-8 py-6 text-lg font-semibold" asChild>
                  <Link href="/register">Apply as Beneficiary</Link>
                </Button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {heroStats.map((item, idx) => (
                  <div key={idx} className="surface-card flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.title}</p>
                      <p className="text-lg font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-hero p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-muted-foreground">Current Campaign Progress</p>
                <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Verified
                </div>
              </div>

              <p className="font-display text-4xl font-bold tracking-tight">{formatCurrency(totalStats.totalRaised)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Raised toward {formatCurrency(totalStats.targetAmount)} total goal
              </p>

              <div className="my-6">
                <Progress value={progressPercentage} className="h-3.5" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-background p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Beneficiaries Approved</p>
                  <p className="mt-1 text-2xl font-bold">{totalStats.beneficiariesApproved}</p>
                </div>
                <div className="rounded-2xl bg-background p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Items Distributed</p>
                  <p className="mt-1 text-2xl font-bold">{totalStats.itemsDistributed}</p>
                </div>
              </div>

              <Button variant="outline" asChild className="mt-6 w-full justify-between rounded-xl">
                <Link href="/projects">
                  View full transparency board
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-2 font-display text-3xl font-bold md:text-4xl">Featured Projects</h2>
              <p className="text-muted-foreground">Support verified community programs with public accountability.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/projects">Explore All Projects</Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => {
              const progress = (project.raisedAmount / project.targetAmount) * 100;
              return (
                <div
                  key={project.id}
                  className="surface-hero flex flex-col gap-5 p-6 transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="h-40 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/15 via-white to-warning/15" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Verified Campaign</p>
                    <h3 className="mt-2 text-xl font-bold">{project.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <div>
                    <Progress value={progress} className="h-3" />
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatCurrency(project.raisedAmount)} raised</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                  </div>
                  <Button variant="cta" asChild className="rounded-full">
                    <Link href={`/projects/${project.id}`}>View Project</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Live Community Impact</h2>
            <p className="text-muted-foreground">Track every contribution and distribution in real-time</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <StatCard title="Total Raised" value={formatCurrency(totalStats.totalRaised)} icon={Wallet} />
            <StatCard title="Target Amount" value={formatCurrency(totalStats.targetAmount)} icon={Target} />
            <StatCard title="Total Donors" value={totalStats.donorsCount} icon={Users} />
            <StatCard title="Beneficiaries Approved" value={totalStats.beneficiariesApproved} icon={UserCheck} />
            <StatCard title="Items Distributed" value={totalStats.itemsDistributed} icon={Package} />
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card">
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Resources Distributed</h2>
              <p className="text-muted-foreground">Tracking distribution across all item categories</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {itemDistribution.map((item, index) => (
                <div
                  key={index}
                  className="w-[200px] rounded-3xl border border-border/70 bg-background p-6 text-center shadow-[0_18px_45px_-35px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ItemIcon name={item.icon} className="h-7 w-7" />
                  </div>
                  <p className="font-display text-3xl font-bold">{item.distributed}</p>
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Recent Donors</h2>
              <p className="mb-8 text-muted-foreground">Community members funding visible, measurable outcomes.</p>
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
                <Link href="/projects">See donation activity</Link>
              </Button>
            </div>

            <div>
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">How Transparency Works</h2>
              <p className="mb-8 text-muted-foreground">A simple process from donation to verified delivery.</p>
              <div className="space-y-6">
                {[
                  {
                    icon: Gift,
                    title: "Donate",
                    description: "Give any amount. Every contribution is instantly recorded on the platform.",
                  },
                  {
                    icon: UserCheck,
                    title: "Verification",
                    description: "Beneficiaries are verified through ID checks, social validation, and references.",
                  },
                  {
                    icon: Package,
                    title: "Distribution",
                    description: "Resources are delivered directly to approved beneficiaries.",
                  },
                  {
                    icon: Upload,
                    title: "Proof Uploaded",
                    description: "Delivery proof is uploaded and reviewed before completion is confirmed.",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-[0_18px_45px_-38px_rgba(15,23,42,0.4)]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-inner">
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
        </div>
      </section>

      <section id="proof" className="border-y border-border/70 bg-card">
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Proof of Impact</h2>
              <p className="text-muted-foreground">Real beneficiaries, real deliveries, verified outcomes.</p>
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
                <Link href="/projects">
                  View More Verified Proof
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 font-display text-3xl font-bold md:text-4xl">About LazTrack</h2>
              <p className="mb-6 text-lg opacity-90">
                LazTrack was built from one core belief: transparency creates trust. Every campaign is designed so
                donors can follow funds and communities can benefit with dignity.
              </p>
              <p className="text-lg opacity-90">
                From laptops and educational materials to food packs and grants, each delivery is tied to verified
                records and public proof so support stays accountable end to end.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know before donating.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-card pb-16 pt-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="rounded-[32px] border border-primary/25 bg-gradient-to-r from-[#006b40] via-primary to-accent p-8 text-center text-primary-foreground shadow-[0_40px_90px_-60px_rgba(0,0,0,0.6)] md:p-16">
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">Help a Household Today</h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-white/90">
              Join neighbors, teams, and community partners supporting families across Nigeria.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="cta" className="rounded-full px-8 py-6 text-lg" asChild>
                <Link href="/donate">
                  Donate Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-primary-foreground/20 bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/register">Apply as Beneficiary</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
