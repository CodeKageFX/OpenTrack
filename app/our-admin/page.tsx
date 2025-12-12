import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { mockProjects } from "@/data/mockdata";

export default function OpenTrackAdminDashboard() {
  const pendingProjects = mockProjects.filter((p) => p.submissionStatus === "pending");
  const approvedProjects = mockProjects.filter((p) => p.submissionStatus === "approved");
  const rejectedProjects = mockProjects.filter((p) => p.submissionStatus === "rejected");

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Platform Overview</h1>
        <p className="mt-1 text-muted-foreground">
          Manage all OpenTrack projects and platform settings
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={mockProjects.length}
          icon={FolderKanban}
        />
        <StatCard
          title="Pending Review"
          value={pendingProjects.length}
          icon={Clock}
          subtitle={pendingProjects.length > 0 ? "Action needed" : undefined}
        />
        <StatCard
          title="Approved"
          value={approvedProjects.length}
          icon={CheckCircle}
        />
        <StatCard
          title="Rejected"
          value={rejectedProjects.length}
          icon={XCircle}
        />
      </div>

      {/* Pending Reviews */}
      {pendingProjects.length > 0 && (
        <div className="mb-8 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div>
              <h2 className="font-display text-lg font-semibold">Pending Reviews</h2>
              <p className="text-sm text-muted-foreground">
                Projects waiting for your review
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/our-admin/projects">View All</Link>
            </Button>
          </div>
          <div className="divide-y divide-border">
            {pendingProjects.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {project.ownerName} • Submitted{" "}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild className="gap-1">
                  <Link href={`/our-admin/projects`}>
                    Review
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/our-admin/projects"
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-secondary/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <FolderKanban className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Project Reviews</h3>
            <p className="text-sm text-muted-foreground">
              Review and manage project submissions
            </p>
          </div>
        </Link>

        <Link
          href="/our-admin/users"
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-secondary/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Platform Users</h3>
            <p className="text-sm text-muted-foreground">
              Manage project owners and admins
            </p>
          </div>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-secondary/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
            <ArrowRight className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">View Public Site</h3>
            <p className="text-sm text-muted-foreground">
              See how users experience OpenTrack
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}