import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn(
      "group relative w-full overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-white via-white to-primary/5 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.45)] md:w-fit",
      className
    )}>
      <div className="flex items-start justify-between md:gap-5">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-4xl font-bold tracking-tight text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className="rounded-2xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground shadow-inner">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
