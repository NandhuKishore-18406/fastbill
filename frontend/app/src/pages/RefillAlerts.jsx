import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  refillLimit: number;
}

// Mock data - items below refill threshold
const alertItems: AlertItem[] = [
  { id: "1", name: "USB Cable Type-C", category: "Cables", currentStock: 8, refillLimit: 15 },
  { id: "2", name: "Monitor Stand", category: "Furniture", currentStock: 3, refillLimit: 5 },
  { id: "3", name: "USB Hub 4-Port", category: "Accessories", currentStock: 5, refillLimit: 10 },
  { id: "4", name: "Ethernet Cable 5m", category: "Cables", currentStock: 4, refillLimit: 10 },
  { id: "5", name: "Power Strip 6-outlet", category: "Electronics", currentStock: 2, refillLimit: 8 },
];

export default function RefillAlerts() {
  const getStockPercentage = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100);
  };

  const getUrgency = (current: number, limit: number) => {
    const percentage = getStockPercentage(current, limit);
    if (percentage <= 30) return "critical";
    if (percentage <= 60) return "warning";
    return "low";
  };

  return (
    <AppLayout title="Refill Alerts">
      {alertItems.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Refill Alerts</h3>
          <p className="text-muted-foreground">
            All products are currently above their refill thresholds.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          <p className="text-secondary mb-4">
            {alertItems.length} product{alertItems.length !== 1 ? "s" : ""} below refill threshold
          </p>

          {alertItems.map((item) => {
            const urgency = getUrgency(item.currentStock, item.refillLimit);
            const percentage = getStockPercentage(item.currentStock, item.refillLimit);

            return (
              <Card
                key={item.id}
                className={cn(
                  "p-4 flex items-center gap-4",
                  urgency === "critical" && "border-warning/50"
                )}
              >
                {/* Warning Indicator */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0",
                    urgency === "critical"
                      ? "bg-warning/15 text-warning"
                      : "bg-warning/10 text-warning/70"
                  )}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-body font-medium">{item.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm">
                      <span className={cn(
                        "font-semibold",
                        urgency === "critical" ? "text-warning" : "text-foreground"
                      )}>
                        {item.currentStock}
                      </span>
                      <span className="text-muted-foreground"> / {item.refillLimit} min</span>
                    </span>
                  </div>
                </div>

                {/* Stock Bar */}
                <div className="w-32 flex-shrink-0">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        urgency === "critical" ? "bg-warning" : "bg-warning/60"
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {Math.round(percentage)}% of minimum
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
}
