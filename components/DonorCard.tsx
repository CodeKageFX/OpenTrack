import { cn } from "@/lib/utils";

interface DonorCardProps {
  name: string;
  amount: number;
  time: string;
  isAnonymous?: boolean;
  className?: string;
}

export function DonorCard({ name, amount, time, isAnonymous, className }: DonorCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={cn(
      "flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:bg-secondary/50",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-medium">
          {isAnonymous ? "?" : name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium">{isAnonymous ? "Anonymous" : name}</p>
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
      </div>
      <p className="font-semibold text-success">{formatCurrency(amount)}</p>
    </div>
  );
}
