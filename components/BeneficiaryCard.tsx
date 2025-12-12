import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, Twitter } from "lucide-react";
import Image from "next/image";

interface BeneficiaryCardProps {
  name: string;
  state: string;
  twitterHandle: string;
  imageUrl: string;
  isVerified?: boolean;
  className?: string;
}

export function BeneficiaryCard({ 
  name, 
  state, 
  twitterHandle, 
  imageUrl, 
  isVerified,
  className 
}: BeneficiaryCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg",
      className
    )}>
      <div className="aspect-square overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={`${name}'s proof`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={400}
          height={400}
        />
      </div>
      {isVerified && (
        <div className="absolute right-3 top-3">
          <div className="flex items-center gap-1 rounded-full bg-success/90 px-2 py-1 text-xs font-medium text-success-foreground backdrop-blur-sm">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold">{name}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Twitter className="h-4 w-4" />
          <span>@{twitterHandle}</span>
        </div>
        <Badge variant="secondary" className="mt-3">
          {state}
        </Badge>
      </div>
    </div>
  );
}
