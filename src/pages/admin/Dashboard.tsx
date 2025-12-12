import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Car,
  DollarSign,
  TrendingUp,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard, DataTable, MapPlaceholder } from '@/components/dashboard/DashboardComponents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const revenueData = [
  { name: 'Mon', revenue: 4200, rides: 120 },
  { name: 'Tue', revenue: 5100, rides: 145 },
  { name: 'Wed', revenue: 4800, rides: 138 },
  { name: 'Thu', revenue: 5600, rides: 162 },
  { name: 'Fri', revenue: 7200, rides: 198 },
  { name: 'Sat', revenue: 8100, rides: 225 },
  { name: 'Sun', revenue: 6800, rides: 188 },
];

const recentRides = [
  { id: 'RD-2024-001', user: 'John Doe', driver: 'Mike Smith', status: 'completed', amount: '$24.50', time: '5 min ago' },
  { id: 'RD-2024-002', user: 'Sarah Johnson', driver: 'Emily Davis', status: 'in-progress', amount: '$18.00', time: '12 min ago' },
  { id: 'RD-2024-003', user: 'Alex Brown', driver: 'Chris Wilson', status: 'completed', amount: '$32.75', time: '18 min ago' },
  { id: 'RD-2024-004', user: 'Lisa Wang', driver: 'David Lee', status: 'cancelled', amount: '$0.00', time: '25 min ago' },
  { id: 'RD-2024-005', user: 'Tom Harris', driver: 'Anna Chen', status: 'completed', amount: '$45.00', time: '32 min ago' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed': return <Badge variant="success">Completed</Badge>;
    case 'in-progress': return <Badge variant="info">In Progress</Badge>;
    case 'cancelled': return <Badge variant="destructive">Cancelled</Badge>;
    default: return <Badge variant="muted">{status}</Badge>;
  }
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DashboardLayout type="admin" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your ride platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatsCard
              title="Total Rides Today"
              value="1,284"
              change="+12.5% from yesterday"
              changeType="positive"
              icon={Car}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatsCard
              title="Active Users"
              value="8,429"
              change="+5.2% this week"
              changeType="positive"
              icon={Users}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatsCard
              title="Revenue Today"
              value="$42,850"
              change="+18.3% from yesterday"
              changeType="positive"
              icon={DollarSign}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatsCard
              title="Active Drivers"
              value="342"
              change="-3.1% from yesterday"
              changeType="negative"
              icon={Activity}
            />
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Revenue Overview</h3>
                <p className="text-sm text-muted-foreground">Weekly revenue trends</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 text-success">
                  <ArrowUpRight className="h-4 w-4" />
                  +18.3%
                </span>
              </div>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--accent))"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Rides Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Rides per Day</h3>
                <p className="text-sm text-muted-foreground">Weekly ride volume</p>
              </div>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="rides" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Map and Recent Rides */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <MapPlaceholder title="Live Ride Monitor" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <DataTable headers={['Ride ID', 'User', 'Driver', 'Status', 'Amount', 'Time']}>
              {recentRides.map((ride) => (
                <tr key={ride.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{ride.id}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{ride.user}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{ride.driver}</td>
                  <td className="px-4 py-3">{getStatusBadge(ride.status)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{ride.amount}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{ride.time}</td>
                </tr>
              ))}
            </DataTable>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="glass-card p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <AlertTriangle className="h-4 w-4 mr-2" />
              View SOS Alerts (2)
            </Button>
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Pending Verifications (5)
            </Button>
            <Button variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Drivers
            </Button>
            <Button variant="accent">
              <MapPin className="h-4 w-4 mr-2" />
              Open Live Map
            </Button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
