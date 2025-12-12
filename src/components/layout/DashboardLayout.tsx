import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Car,
  MapPin,
  CreditCard,
  Bell,
  FileCheck,
  Truck,
  ShieldCheck,
  AlertTriangle,
  Phone,
  HelpCircle,
  Settings,
  ChevronLeft,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: string;
  badgeVariant?: 'default' | 'destructive' | 'warning' | 'success';
}

interface DashboardLayoutProps {
  children: ReactNode;
  type: 'admin' | 'operations' | 'support';
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const adminNav: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
  { label: 'Drivers', href: '/admin/drivers', icon: <Car className="h-5 w-5" /> },
  { label: 'Vehicles', href: '/admin/vehicles', icon: <Truck className="h-5 w-5" />, badge: '3', badgeVariant: 'warning' },
  { label: 'Live Rides', href: '/admin/live', icon: <MapPin className="h-5 w-5" /> },
  { label: 'Payments', href: '/admin/payments', icon: <CreditCard className="h-5 w-5" /> },
  { label: 'Notifications', href: '/admin/notifications', icon: <Bell className="h-5 w-5" /> },
];

const operationsNav: NavItem[] = [
  { label: 'Dashboard', href: '/operations', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Driver KYC', href: '/operations/kyc', icon: <FileCheck className="h-5 w-5" />, badge: '5', badgeVariant: 'warning' },
  { label: 'Vehicle Docs', href: '/operations/vehicles', icon: <Car className="h-5 w-5" /> },
  { label: 'Fleet', href: '/operations/fleet', icon: <Truck className="h-5 w-5" /> },
  { label: 'Compliance', href: '/operations/compliance', icon: <ShieldCheck className="h-5 w-5" /> },
];

const supportNav: NavItem[] = [
  { label: 'Dashboard', href: '/support', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'SOS Tickets', href: '/support/sos', icon: <AlertTriangle className="h-5 w-5" />, badge: '2', badgeVariant: 'destructive' },
  { label: 'Call Center', href: '/support/calls', icon: <Phone className="h-5 w-5" /> },
  { label: 'Help Desk', href: '/support/helpdesk', icon: <HelpCircle className="h-5 w-5" /> },
];

const panelTitles = {
  admin: 'Admin Panel',
  operations: 'Operations',
  support: 'Support',
};

const panelColors = {
  admin: 'bg-primary',
  operations: 'bg-info',
  support: 'bg-destructive',
};

export function DashboardLayout({ children, type, sidebarOpen, setSidebarOpen }: DashboardLayoutProps) {
  const location = useLocation();
  
  const navItems = type === 'admin' ? adminNav : type === 'operations' ? operationsNav : supportNav;
  
  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300 lg:relative",
          sidebarOpen ? "w-64" : "w-0 lg:w-16"
        )}
      >
        {/* Logo Area */}
        <div className={cn(
          "flex h-16 items-center border-b border-border px-4",
          !sidebarOpen && "lg:justify-center"
        )}>
          <div className={cn(
            "h-8 w-8 rounded-lg flex items-center justify-center text-primary-foreground font-bold",
            panelColors[type]
          )}>
            R
          </div>
          {sidebarOpen && (
            <span className="ml-3 font-semibold text-foreground">{panelTitles[type]}</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      !sidebarOpen && "lg:justify-center lg:px-2"
                    )}
                  >
                    {item.icon}
                    {sidebarOpen && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge variant={item.badgeVariant === 'destructive' ? 'destructive' : item.badgeVariant === 'warning' ? 'warning' : 'default'} className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-border p-2">
          <Link
            to={`/${type}/settings`}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground",
              !sidebarOpen && "lg:justify-center lg:px-2"
            )}
          >
            <Settings className="h-5 w-5" />
            {sidebarOpen && <span>Settings</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="shrink-0"
            >
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">{panelTitles[type]}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/">
              <Button variant="outline" size="sm">
                Back to Site
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
