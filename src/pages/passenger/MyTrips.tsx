import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Clock,
  Star,
  ArrowLeft,
  Car,
  Download,
  Filter,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockTrips = [
  {
    id: 1,
    status: 'completed',
    date: '2024-12-10',
    time: '10:30 AM',
    pickup: 'Downtown Station',
    drop: 'Airport Terminal 1',
    driver: 'John Smith',
    rating: 4.9,
    vehicle: 'Toyota Camry',
    price: 24,
    distance: '12.5 km',
    duration: '35 min',
  },
  {
    id: 2,
    status: 'upcoming',
    date: '2024-12-15',
    time: '2:00 PM',
    pickup: 'Central Mall',
    drop: 'Tech Park',
    driver: 'Sarah Johnson',
    rating: 4.8,
    vehicle: 'Honda Accord',
    price: 18,
    distance: '8.2 km',
    duration: '25 min',
  },
  {
    id: 3,
    status: 'completed',
    date: '2024-12-05',
    time: '9:00 AM',
    pickup: 'Home',
    drop: 'Office Complex',
    driver: 'Mike Chen',
    rating: 5.0,
    vehicle: 'Mercedes E-Class',
    price: 32,
    distance: '15.0 km',
    duration: '40 min',
  },
  {
    id: 4,
    status: 'cancelled',
    date: '2024-12-03',
    time: '6:00 PM',
    pickup: 'Restaurant District',
    drop: 'Home',
    driver: 'Emily Davis',
    rating: null,
    vehicle: 'Chevrolet Suburban',
    price: 0,
    distance: '10.0 km',
    duration: '30 min',
  },
];

export default function MyTrips() {
  const [activeTab, setActiveTab] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'upcoming':
        return <Badge variant="info">Upcoming</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="muted">{status}</Badge>;
    }
  };

  const filteredTrips = activeTab === 'all' 
    ? mockTrips 
    : mockTrips.filter(trip => trip.status === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                  <Car className="h-5 w-5 text-accent-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground hidden sm:block">RideFlow</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link to="/profile">
                <Button variant="outline" size="sm">Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Trips</h1>
            <p className="text-muted-foreground">View and manage your ride history</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Trips</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {filteredTrips.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No trips found</h3>
                  <p className="text-muted-foreground mb-4">You don't have any {activeTab !== 'all' ? activeTab : ''} trips yet.</p>
                  <Link to="/search">
                    <Button variant="accent">Book Your First Ride</Button>
                  </Link>
                </div>
              ) : (
                filteredTrips.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Date & Status */}
                      <div className="lg:w-1/6">
                        <div className="flex items-center gap-2 lg:flex-col lg:items-start">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {trip.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {trip.time}
                          </div>
                        </div>
                        <div className="mt-2">
                          {getStatusBadge(trip.status)}
                        </div>
                      </div>

                      {/* Route */}
                      <div className="lg:w-1/3">
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-accent" />
                            <div className="w-0.5 h-8 bg-border" />
                            <div className="w-3 h-3 rounded-full bg-destructive" />
                          </div>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Pickup</p>
                              <p className="font-medium text-foreground">{trip.pickup}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Drop-off</p>
                              <p className="font-medium text-foreground">{trip.drop}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Driver & Vehicle */}
                      <div className="lg:w-1/4">
                        <p className="font-medium text-foreground">{trip.driver}</p>
                        <p className="text-sm text-muted-foreground">{trip.vehicle}</p>
                        {trip.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 text-warning fill-warning" />
                            <span className="text-sm text-foreground">{trip.rating}</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="lg:w-1/6 flex items-center justify-between lg:justify-end gap-4">
                        <div className="text-right">
                          <p className="text-xl font-bold text-foreground">
                            ${trip.price}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {trip.distance} • {trip.duration}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Actions */}
                    {trip.status === 'completed' && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Invoice
                        </Button>
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-2" />
                          Rate Trip
                        </Button>
                        <Button variant="ghost" size="sm">
                          Book Again
                        </Button>
                      </div>
                    )}

                    {trip.status === 'upcoming' && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Track Ride
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancel Trip
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
