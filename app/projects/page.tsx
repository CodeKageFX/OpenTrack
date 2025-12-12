"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowRight, Users, Package } from "lucide-react";
import { mockProjects } from "@/data/mockdata";

const statusConfig = {
  ongoing: { label: "Ongoing", variant: "default" as const },
  finished: { label: "Finished", variant: "secondary" as const },
  upcoming: { label: "Upcoming", variant: "outline" as const },
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>("ongoing");

  // Only show approved projects
  const approvedProjects = mockProjects.filter(p => p.submissionStatus === "approved");
  
  const filteredProjects = approvedProjects.filter(p => {
    if (activeTab === "all") return true;
    return p.status === activeTab;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 md:px-30 sm:px-10 px-5">
        {/* Hero Section */}
        <section className="border-b border-border py-7">
          <div>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                  Projects
                </h1>
                <p className="mt-2 max-w-xl text-lg text-muted-foreground">
                  Browse transparent community projects. Every donation tracked, every impact verified.
                </p>
              </div>
              <Button size="lg" asChild className="gap-2">
                <Link href="/projects/create">
                  <Plus className="h-5 w-5" />
                  Create a Project
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section className="py-12">
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8 grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="finished">Finished</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                {filteredProjects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
                    <Package className="mb-4 h-12 w-12 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold">No projects found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      There are no {activeTab} projects at the moment.
                    </p>
                    <Button variant="outline" asChild className="mt-4">
                      <Link href="/projects/create">Create the first one</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => {
                      const progress = (project.raisedAmount / project.targetAmount) * 100;
                      const config = statusConfig[project.status];
                      
                      return (
                        <div
                          key={project.id}
                          className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-lg"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <Badge variant={config.variant} className="mb-3">
                                {config.label}
                              </Badge>
                              <h3 className="font-display text-xl font-semibold line-clamp-2">
                                {project.name}
                              </h3>
                            </div>
                          </div>
                          
                          <p className="mt-2 text-sm text-muted-foreground">
                            by <span className="font-medium text-foreground">{project.ownerName}</span>
                          </p>
                          
                          <p className="mt-3 flex-1 text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>

                          <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-semibold">{formatCurrency(project.raisedAmount)}</span>
                              <span className="text-muted-foreground">of {formatCurrency(project.targetAmount)}</span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{project.beneficiariesCount} beneficiaries</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="h-4 w-4" />
                              <span>{project.itemsDistributed} items</span>
                            </div>
                          </div>

                          <Button variant="outline" asChild className="mt-4 w-full gap-2">
                            <Link href={`/projects/${project.id}`}>
                              View Project
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
}