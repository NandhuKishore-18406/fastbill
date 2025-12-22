import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "warning" | "success";
  subtitle?: string;
}

export function StatCard({ title, value, icon: Icon, variant = "default", subtitle }: StatCardProps) {
  return (
    <div className={cn(
      "stat-card group",
      variant === "warning" && "border-warning/30",
      variant === "success" && "border-success/30"
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="stat-card-label">{title}</p>
          <p className={cn(
            "stat-card-value",
            variant === "warning" && "text-warning",
            variant === "success" && "text-success"
          )}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "icon-container transition-transform duration-300 group-hover:scale-110",
          variant === "warning" && "icon-container-warning",
          variant === "success" && "icon-container-success",
          variant === "default" && "icon-container-primary"
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
