import { AppSidebar } from "./AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  action?: ReactNode;
}

export function AppLayout({ children, title, action }: AppLayoutProps) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-surface)' }}>
      <AppSidebar />
      
      {/* Main content area */}
      <div className="ml-[80px] min-h-screen">
        {/* Top bar - floating style */}
        <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between backdrop-blur-md bg-background/80 border-b border-border/50">
          <h1 className="text-page-title">{title}</h1>
          <div className="flex items-center gap-4">
            {action && <div>{action}</div>}
            <ThemeToggle />
          </div>
        </header>

        {/* Content with subtle animation */}
        <main className="p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
