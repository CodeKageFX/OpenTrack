import { 
  Laptop, 
  Package, 
  BookOpen, 
  Banknote, 
  Scissors, 
  Gift, 
  ShoppingBag,
  Utensils,
  Shirt,
  Briefcase,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Laptop,
  Package,
  BookOpen,
  Banknote,
  Scissors,
  Gift,
  ShoppingBag,
  Utensils,
  Shirt,
  Briefcase,
};

interface ItemIconProps {
  name: string;
  className?: string;
}

export function ItemIcon({ name, className = "h-5 w-5" }: ItemIconProps) {
  const Icon = iconMap[name] || Package;
  return <Icon className={className} />;
}
