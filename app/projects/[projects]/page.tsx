"use client"

import { useParams } from "next/navigation";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { BeneficiaryCard } from "@/components/BeneficiaryCard";
import { DonorCard } from "@/components/DonorCard";
import { ItemIcon } from "@/components/ItemIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProjects, mockBeneficiaries, mockDonors, mockProofs, mockItemTypes } from "@/data/mockdata";
import { 
  Heart, 
  Users, 
  Package, 
  TrendingUp, 
  Calendar,
  MapPin,
  User,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";

const ProjectDetail = () => {
  const { projects } = useParams();
  const project = mockProjects.find(p => p.id === projects);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </main>
      </div>
    );
  }

  const progressPercentage = (project.raisedAmount / project.targetAmount) * 100;
  const projectDonors = mockDonors.filter(d => d.projectId === project.id);
  const projectBeneficiaries = mockBeneficiaries.filter(b => b.projectId === project.id);
  const projectProofs = mockProofs.filter(p => p.projectId === project.id);

  // Get items for this project (simplified - using first few item types)
  const projectItems = mockItemTypes.slice(0, 3);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ongoing":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Ongoing</Badge>;
      case "finished":
        return <Badge variant="secondary">Finished</Badge>;
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10">
        <div className="relative mb-10 overflow-hidden rounded-[32px] border border-border/70 bg-gradient-to-br from-primary/10 via-white to-warning/15 p-10 shadow-[0_35px_90px_-60px_rgba(15,23,42,0.55)]">
          <div className="absolute inset-0 grid-dots opacity-40" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              {getStatusBadge(project.status)}
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Started {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              {project.name}
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <div className="mt-5 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>by <strong>{project.ownerName}</strong></span>
              </div>
              {project.category && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{project.category}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <span>/</span>
          <span className="text-foreground">{project.name}</span>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            {/* Items Being Distributed */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Items Being Distributed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {projectItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-2 px-3 py-2 bg-secondary/70 rounded-xl border border-border/70"
                    >
                      <ItemIcon name={item.icon} className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.assignedQuantity} {item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-3xl font-bold">{formatCurrency(project.raisedAmount)}</span>
                    <span className="text-muted-foreground">of {formatCurrency(project.targetAmount)}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {progressPercentage.toFixed(0)}% funded
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-secondary/70 rounded-xl border border-border/70">
                    <p className="text-2xl font-bold">{projectDonors.length}</p>
                    <p className="text-xs text-muted-foreground">Donors</p>
                  </div>
                  <div className="p-3 bg-secondary/70 rounded-xl border border-border/70">
                    <p className="text-2xl font-bold">{project.beneficiariesCount}</p>
                    <p className="text-xs text-muted-foreground">Beneficiaries</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href={`/donate?project=${project.id}`} className="block">
                    <Button variant="cta" className="w-full" size="lg">
                      <Heart className="mr-2 h-5 w-5" />
                      Donate Now
                    </Button>
                  </Link>
                  <Link href={`/register?project=${project.id}`} className="block">
                    <Button variant="outline" className="w-full">
                      Apply as Beneficiary
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Verified by LazTrack</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard
            title="Total Raised"
            value={formatCurrency(project.raisedAmount)}
            icon={TrendingUp}
          />
          <StatCard
            title="Donors"
            value={projectDonors.length.toString()}
            icon={Heart}
          />
          <StatCard
            title="Beneficiaries"
            value={project.beneficiariesCount.toString()}
            icon={Users}
          />
          <StatCard
            title="Items Distributed"
            value={project.itemsDistributed.toString()}
            icon={Package}
          />
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="story" className="mb-12">
          <TabsList className="w-full justify-start">
            <TabsTrigger 
              value="story"
            >
              Story
            </TabsTrigger>
            <TabsTrigger 
              value="updates"
            >
              Updates
            </TabsTrigger>
            <TabsTrigger 
              value="donors"
            >
              Donors ({projectDonors.length})
            </TabsTrigger>
            <TabsTrigger 
              value="beneficiaries"
            >
              Beneficiaries ({projectBeneficiaries.length})
            </TabsTrigger>
            <TabsTrigger 
              value="proof"
            >
              Proof Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="story" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/70 bg-secondary/50 p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Raised</p>
                    <p className="text-lg font-semibold">{formatCurrency(project.raisedAmount)}</p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-secondary/50 p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Goal</p>
                    <p className="text-lg font-semibold">{formatCurrency(project.targetAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="updates" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4">
                    <p className="text-sm text-muted-foreground mb-1">2 days ago</p>
                    <h4 className="font-medium mb-2">Distribution Started!</h4>
                    <p className="text-muted-foreground">
                      We&apos;ve begun distributing items to approved beneficiaries. 
                      First batch delivered successfully.
                    </p>
                  </div>
                  <div className="border-l-2 border-muted pl-4">
                    <p className="text-sm text-muted-foreground mb-1">1 week ago</p>
                    <h4 className="font-medium mb-2">Target 75% Reached</h4>
                    <p className="text-muted-foreground">
                      Thanks to our amazing donors, we&apos;ve reached 75% of our funding goal!
                    </p>
                  </div>
                  <div className="border-l-2 border-muted pl-4">
                    <p className="text-sm text-muted-foreground mb-1">2 weeks ago</p>
                    <h4 className="font-medium mb-2">Project Launched</h4>
                    <p className="text-muted-foreground">
                      {project.name} is now live on LazTrack. We&apos;re accepting donations and beneficiary applications.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donors" className="mt-6">
            <div className="space-y-3">
              {projectDonors.map((donor) => (
                <DonorCard 
                  key={donor.id} 
                  name={donor.name}
                  amount={donor.amount}
                  time={"2025-10-9"}
                  isAnonymous={donor.isAnonymous}
                />
              ))}
              {projectDonors.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No donors yet. Be the first to donate!
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="beneficiaries" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectBeneficiaries
                .filter(b => b.status === "completed" || b.status === "delivered")
                .map((beneficiary) => {
                  const proof = projectProofs.find(p => p.beneficiaryId === beneficiary.id);
                  return (
                    <BeneficiaryCard 
                      key={beneficiary.id} 
                      name={beneficiary.name}
                      state={beneficiary.location}
                      twitterHandle={beneficiary.socialHandle || ""}
                      imageUrl={proof?.imageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"}
                      isVerified={proof?.isVerified}
                    />
                  );
                })}
              {projectBeneficiaries.filter(b => b.status === "completed" || b.status === "delivered").length === 0 && (
                <p className="col-span-full text-center text-muted-foreground py-8">
                  No beneficiaries have received items yet.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="proof" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projectProofs.map((proof) => (
                <Card key={proof.id} className="overflow-hidden group cursor-pointer">
                  <div className="aspect-square bg-muted relative">
                    <Image 
                      src={proof.imageUrl} 
                      alt={`Proof from ${proof.beneficiaryName}`}
                      className="w-full h-full object-cover"
                      width={400}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ExternalLink className="h-6 w-6 text-white" />
                    </div>
                    {proof.isVerified && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium text-sm truncate">{proof.beneficiaryName}</p>
                    <p className="text-xs text-muted-foreground">{proof.location}</p>
                  </CardContent>
                </Card>
              ))}
              {projectProofs.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground py-8">
                  No proof submissions yet.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Donate", desc: "Support the project with any amount" },
              { step: "2", title: "Verify", desc: "Beneficiaries are verified by admins" },
              { step: "3", title: "Distribute", desc: "Items are assigned and delivered" },
              { step: "4", title: "Proof", desc: "Beneficiaries upload proof of receipt" },
            ].map((item) => (
              <div key={item.step} className="text-center rounded-2xl border border-border/70 bg-card/80 p-6 shadow-[0_18px_45px_-38px_rgba(15,23,42,0.4)]">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetail;
