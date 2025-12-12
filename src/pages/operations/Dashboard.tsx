import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, CheckCircle, XCircle, Clock, Eye, Download } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard, DataTable } from '@/components/dashboard/DashboardComponents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const kycQueue = [
  { id: 1, driver: 'Tom Wilson', document: "Driver's License", submitted: '2024-12-10', status: 'pending' },
  { id: 2, driver: 'Anna Lee', document: 'Vehicle Registration', submitted: '2024-12-09', status: 'pending' },
  { id: 3, driver: 'Chris Park', document: 'Insurance Certificate', submitted: '2024-12-08', status: 'approved' },
  { id: 4, driver: 'Maria Garcia', document: 'Background Check', submitted: '2024-12-07', status: 'rejected' },
];

export default function OperationsDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DashboardLayout type="operations" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Operations Dashboard</h1>
          <p className="text-muted-foreground">Driver and vehicle verification management</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Pending KYC" value="12" change="5 urgent" changeType="negative" icon={Clock} />
          <StatsCard title="Approved Today" value="28" change="+40% vs yesterday" changeType="positive" icon={CheckCircle} />
          <StatsCard title="Rejected" value="3" changeType="neutral" icon={XCircle} />
          <StatsCard title="Total Fleet" value="456" change="+12 this week" changeType="positive" icon={FileCheck} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <DataTable headers={['Driver', 'Document', 'Submitted', 'Status', 'Actions']}>
            {kycQueue.map((item) => (
              <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{item.driver}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{item.document}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{item.submitted}</td>
                <td className="px-4 py-3">
                  <Badge variant={item.status === 'approved' ? 'success' : item.status === 'rejected' ? 'destructive' : 'warning'}>
                    {item.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                    {item.status === 'pending' && (
                      <>
                        <Button variant="success" size="sm">Approve</Button>
                        <Button variant="destructive" size="sm">Reject</Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </DataTable>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
