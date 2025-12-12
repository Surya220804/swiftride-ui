import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard, DataTable, MapPlaceholder } from '@/components/dashboard/DashboardComponents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const sosTickets = [
  { id: 'SOS-001', user: 'John Doe', type: 'Emergency', location: 'Downtown', time: '2 min ago', status: 'active' },
  { id: 'SOS-002', user: 'Sarah J.', type: 'Accident', location: 'Highway 101', time: '8 min ago', status: 'responding' },
  { id: 'SOS-003', user: 'Mike C.', type: 'Dispute', location: 'Mall Area', time: '15 min ago', status: 'resolved' },
];

export default function SupportDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DashboardLayout type="support" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Support Dashboard</h1>
          <p className="text-muted-foreground">Emergency response and help desk</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Active SOS" value="2" change="Urgent!" changeType="negative" icon={AlertTriangle} />
          <StatsCard title="Open Tickets" value="24" changeType="neutral" icon={MessageSquare} />
          <StatsCard title="Avg Response" value="2.5m" change="-30s today" changeType="positive" icon={Clock} />
          <StatsCard title="Resolved Today" value="45" changeType="positive" icon={Phone} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <DataTable headers={['Ticket', 'User', 'Type', 'Location', 'Time', 'Actions']}>
              {sosTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{ticket.id}</td>
                  <td className="px-4 py-3 text-sm">{ticket.user}</td>
                  <td className="px-4 py-3"><Badge variant={ticket.type === 'Emergency' ? 'live' : 'warning'}>{ticket.type}</Badge></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{ticket.location}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{ticket.time}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="sos" size="sm"><Phone className="h-4 w-4 mr-1" />Call</Button>
                      <Button variant="outline" size="sm"><MapPin className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </DataTable>
          </motion.div>
          <MapPlaceholder title="Live SOS Tracking" />
        </div>
      </div>
    </DashboardLayout>
  );
}
