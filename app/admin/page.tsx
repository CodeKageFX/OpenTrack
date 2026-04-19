import { StatCard } from "@/components/StatCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Users,
  UserCheck,
  Package,
  Clock,
  Image as ImageIcon,
  ArrowUpRight,
  Plus,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats, mockActivityLogs, mockProjects, getItemDistributionSummary } from "@/data/mockdata";
import { ItemIcon } from "@/components/ItemIcon";

const stats = getDashboardStats();
const itemDistribution = getItemDistributionSummary();
const recentActivity = mockActivityLogs.slice(0, 5);
const totalTarget = mockProjects.reduce((sum, p) => sum + p.targetAmount, 0);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(value);
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "approval": return UserCheck;
    case "donation": return Wallet;
    case "proof": return ImageIcon;
    case "assignment": return Package;
    case "registration": return Users;
    case "project": return FolderKanban;
    case "verification": return ImageIcon;
    default: return Users;
  }
};

export default function AdminDashboard() {
  const fundingProgress = (stats.totalRaised / totalTarget) * 100;

  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-10">
      <div className="mb-8 rounded-[28px] border border-border/70 bg-gradient-to-br from-primary/10 via-white to-warning/10 p-6 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.5)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold md:text-3xl">Dashboard Overview</h1>
            <p className="text-muted-foreground">Track donations, beneficiaries, and distribution progress in real time.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/projects">
                <FolderKanban className="mr-2 h-4 w-4" />
                View Projects
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/items">
                <Plus className="mr-2 h-4 w-4" />
                Add Items
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 w-full flex flex-wrap gap-3">
        <StatCard
          title="Total Raised"
          value={formatCurrency(stats.totalRaised)}
          icon={Wallet}
        />
        <StatCard
          title="Total Donors"
          value={stats.totalDonors}
          icon={Users}
        />
        <StatCard
          title="Approved"
          value={stats.beneficiariesApproved}
          icon={UserCheck}
        />
        <StatCard
          title="Delivered"
          value={stats.itemsDelivered}
          icon={Package}
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={Clock}
          className="border-warning/50 bg-warning/5"
        />
        <StatCard
          title="Pending Proofs"
          value={stats.pendingProofs}
          icon={ImageIcon}
          className="border-warning/50 bg-warning/5"
        />
      </div>      

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Funding Progress */}
        <div className="rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Funding Progress</h2>
            <span className="text-2xl font-bold">{fundingProgress.toFixed(0)}%</span>
          </div>
          <Progress value={fundingProgress} className="mb-4 h-4" />
          <div className="flex justify-between text-sm">
            <span className="font-medium">{formatCurrency(stats.totalRaised)}</span>
            <span className="text-muted-foreground">of {formatCurrency(totalTarget)}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
          <h2 className="mb-4 font-display text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" asChild className="h-auto flex-col gap-2 py-4">
              <Link href="/admin/beneficiaries?status=pending">
                <Clock className="h-5 w-5" />
                <span>Review Pending ({stats.pendingApprovals})</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto flex-col gap-2 py-4">
              <Link href="/admin/proof-gallery?status=unverified">
                <ImageIcon className="h-5 w-5" />
                <span>Verify Proofs ({stats.pendingProofs})</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto flex-col gap-2 py-4">
              <Link href="/admin/distribution">
                <Package className="h-5 w-5" />
                <span>Assign Items</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto flex-col gap-2 py-4">
              <Link href="/admin/projects">
                <FolderKanban className="h-5 w-5" />
                <span>Manage Projects</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Item Distribution Summary */}
      <div className="mt-8 rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Items Distribution</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/items">
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {itemDistribution.map((item, index) => {
            const progress = (item.distributed / item.total) * 100;
            return (
              <div key={index} className="rounded-xl border border-border/70 bg-secondary/50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <ItemIcon name={item.icon} className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="mb-1">
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{item.distributed} distributed</span>
                  <span>{item.total - item.distributed} left</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.45)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent Activity</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/activity">
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user}
                      {activity.details && ` • ${activity.details}`}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(activity.timestamp).toLocaleDateString('en-NG', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
