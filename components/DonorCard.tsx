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
      "flex items-center justify-between rounded-2xl border border-border/70 bg-card/95 p-4 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary font-bold shadow-inner">
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
