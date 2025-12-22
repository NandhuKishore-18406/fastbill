import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/ui/stat-card";
import { Package, PackageCheck, AlertTriangle, DollarSign, TrendingUp, ShoppingCart, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

// Mock data
const stats = {
  totalProducts: 248,
  inStock: 216,
  lowStock: 12,
  todaySales: 3420,
};

const salesData = [
  { name: "Mon", sales: 2400, orders: 24 },
  { name: "Tue", sales: 1398, orders: 18 },
  { name: "Wed", sales: 3800, orders: 35 },
  { name: "Thu", sales: 3908, orders: 42 },
  { name: "Fri", sales: 4800, orders: 48 },
  { name: "Sat", sales: 3200, orders: 32 },
  { name: "Sun", sales: 2100, orders: 21 },
];

const categoryData = [
  { name: "Electronics", value: 45, color: "hsl(234, 89%, 62%)" },
  { name: "Accessories", value: 25, color: "hsl(152, 69%, 42%)" },
  { name: "Cables", value: 18, color: "hsl(35, 92%, 55%)" },
  { name: "Storage", value: 12, color: "hsl(280, 65%, 55%)" },
];

const topProducts = [
  { name: "Wireless Mouse Pro", sales: 156, revenue: 4680, trend: 12.5 },
  { name: "USB-C Hub 7-in-1", sales: 124, revenue: 6200, trend: 8.3 },
  { name: "Mechanical Keyboard", sales: 98, revenue: 7840, trend: -2.1 },
  { name: "4K Monitor Stand", sales: 87, revenue: 3480, trend: 15.7 },
  { name: "Laptop Sleeve 15\"", sales: 76, revenue: 1520, trend: 5.2 },
];

const recentActivity = [
  { type: "success", message: "Sale completed - Invoice #1042", time: "2 min ago" },
  { type: "warning", message: "Low stock alert - USB Cable Type-C", time: "15 min ago" },
  { type: "primary", message: "New product added - Wireless Mouse", time: "1 hour ago" },
  { type: "success", message: "Sale completed - Invoice #1041", time: "2 hours ago" },
];

export default function Dashboard() {
  const weeklyTotal = salesData.reduce((sum, day) => sum + day.sales, 0);
  const weeklyOrders = salesData.reduce((sum, day) => sum + day.orders, 0);

  return (
    <AppLayout title="Dashboard">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
        />
        <StatCard
          title="In Stock"
          value={stats.inStock}
          icon={PackageCheck}
          subtitle="87% of inventory"
        />
        <StatCard
          title="Low Stock"
          value={stats.lowStock}
          icon={AlertTriangle}
          variant={stats.lowStock > 0 ? "warning" : "default"}
          subtitle="Requires attention"
        />
        <StatCard
          title="Today's Sales"
          value={`$${stats.todaySales.toLocaleString()}`}
          icon={DollarSign}
          variant="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 activity-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-section-title">Sales Overview</h3>
              <p className="text-secondary text-sm mt-1">Weekly performance</p>
            </div>
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">${weeklyTotal.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                  <ArrowUpRight className="w-3 h-3 text-success" />
                  <span className="text-success font-medium">12.5%</span> vs last week
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{weeklyOrders}</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(234, 89%, 62%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(234, 89%, 62%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px hsl(var(--foreground) / 0.1)'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="hsl(234, 89%, 62%)" 
                strokeWidth={2.5}
                fill="url(#salesGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="activity-card p-6">
          <h3 className="text-section-title mb-2">Category Distribution</h3>
          <p className="text-secondary text-sm mb-4">Products by category</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px hsl(var(--foreground) / 0.1)'
                }}
                itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
                formatter={(value: number, name: string) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-xs text-muted-foreground">{category.name}</span>
                <span className="text-xs font-semibold text-foreground ml-auto">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Top Products */}
        <div className="activity-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-section-title">Top Products</h3>
              <p className="text-secondary text-sm mt-1">Best sellers this month</p>
            </div>
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">${product.revenue.toLocaleString()}</p>
                  <p className={cn(
                    "text-xs flex items-center justify-end gap-0.5",
                    product.trend > 0 ? "text-success" : "text-destructive"
                  )}>
                    {product.trend > 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(product.trend)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-card">
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-section-title">Recent Activity</h3>
                <p className="text-secondary text-sm mt-1">Latest updates</p>
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={cn(
                  "status-dot",
                  activity.type === "success" && "status-dot-success",
                  activity.type === "warning" && "status-dot-warning",
                  activity.type === "primary" && "status-dot-primary"
                )} />
                <span className="text-body flex-1 font-medium">{activity.message}</span>
                <span className="text-secondary text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <QuickStat 
          label="Avg. Order Value" 
          value="$86.50" 
          change={5.2} 
        />
        <QuickStat 
          label="Conversion Rate" 
          value="3.24%" 
          change={-0.8} 
        />
        <QuickStat 
          label="Active Customers" 
          value="1,847" 
          change={12.1} 
        />
        <QuickStat 
          label="Return Rate" 
          value="2.1%" 
          change={-1.5} 
          invertColor
        />
      </div>
    </AppLayout>
  );
}

function QuickStat({ 
  label, 
  value, 
  change, 
  invertColor = false 
}: { 
  label: string; 
  value: string; 
  change: number;
  invertColor?: boolean;
}) {
  const isPositive = invertColor ? change < 0 : change > 0;
  
  return (
    <div className="bg-card rounded-xl border border-border/60 p-4 hover:shadow-soft transition-shadow">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      <div className="flex items-end justify-between mt-2">
        <p className="text-xl font-bold text-foreground">{value}</p>
        <span className={cn(
          "text-xs font-medium flex items-center gap-0.5",
          isPositive ? "text-success" : "text-destructive"
        )}>
          {change > 0 ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
