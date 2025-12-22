import { LayoutDashboard, Package, Receipt, AlertTriangle } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: Receipt, label: "Billing", path: "/billing" },
  { icon: AlertTriangle, label: "Refill Alerts", path: "/refill-alerts" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[80px] bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6">
      {/* Logo with gradient */}
      <div 
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-10 shadow-lg"
        style={{ background: 'var(--gradient-primary)' }}
      >
        <Package className="w-5 h-5 text-primary-foreground" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-nav-item group",
                isActive ? "sidebar-nav-item-active" : "sidebar-nav-item-inactive"
              )}
              title={item.label}
            >
              {/* Active indicator */}
              {isActive && (
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-r-full"
                  style={{ background: 'var(--gradient-primary)' }}
                />
              )}
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200",
                "group-hover:scale-110"
              )} />
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom decoration */}
      <div className="w-8 h-1 rounded-full bg-border" />
    </aside>
  );
}
