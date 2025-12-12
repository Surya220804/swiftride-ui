import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Eye,
  Edit,
  Ban,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable } from '@/components/dashboard/DashboardComponents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 555-123-4567',
    location: 'New York, NY',
    status: 'active',
    rides: 45,
    rating: 4.8,
    joined: '2024-01-15',
    kyc: 'verified',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 555-234-5678',
    location: 'Los Angeles, CA',
    status: 'active',
    rides: 128,
    rating: 4.9,
    joined: '2023-08-22',
    kyc: 'verified',
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 555-345-6789',
    location: 'Chicago, IL',
    status: 'suspended',
    rides: 12,
    rating: 3.2,
    joined: '2024-03-10',
    kyc: 'pending',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1 555-456-7890',
    location: 'Houston, TX',
    status: 'active',
    rides: 67,
    rating: 4.6,
    joined: '2023-11-05',
    kyc: 'verified',
  },
  {
    id: 5,
    name: 'Alex Brown',
    email: 'alex.b@email.com',
    phone: '+1 555-567-8901',
    location: 'Phoenix, AZ',
    status: 'inactive',
    rides: 3,
    rating: 4.0,
    joined: '2024-06-18',
    kyc: 'not-submitted',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active': return <Badge variant="success">Active</Badge>;
    case 'suspended': return <Badge variant="destructive">Suspended</Badge>;
    case 'inactive': return <Badge variant="muted">Inactive</Badge>;
    default: return <Badge variant="muted">{status}</Badge>;
  }
};

const getKycBadge = (kyc: string) => {
  switch (kyc) {
    case 'verified': return <Badge variant="success">Verified</Badge>;
    case 'pending': return <Badge variant="warning">Pending</Badge>;
    case 'not-submitted': return <Badge variant="muted">Not Submitted</Badge>;
    default: return <Badge variant="muted">{kyc}</Badge>;
  }
};

export default function AdminUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout type="admin" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Manage passenger accounts and profiles</p>
          </div>
          <Button variant="accent">
            Export Users
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">Status: All</Button>
            <Button variant="outline">KYC: All</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{mockUsers.length}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-success">{mockUsers.filter(u => u.status === 'active').length}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-warning">{mockUsers.filter(u => u.kyc === 'pending').length}</p>
            <p className="text-sm text-muted-foreground">KYC Pending</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{mockUsers.filter(u => u.status === 'suspended').length}</p>
            <p className="text-sm text-muted-foreground">Suspended</p>
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DataTable headers={['User', 'Contact', 'Status', 'KYC', 'Rides', 'Rating', 'Joined', 'Actions']}>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-lg">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {user.location}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <p className="text-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {user.phone}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                <td className="px-4 py-3">{getKycBadge(user.kyc)}</td>
                <td className="px-4 py-3 text-sm text-foreground">{user.rides}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="text-sm text-foreground">{user.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {user.joined}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="h-4 w-4 mr-2" />
                        Suspend User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </DataTable>
        </motion.div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {mockUsers.length} users
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
