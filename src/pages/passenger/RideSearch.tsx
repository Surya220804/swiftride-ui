import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Filter,
  Star,
  Users,
  Wifi,
  Snowflake,
  Music,
  ChevronDown,
  Clock,
  Shield,
  ArrowLeft,
  Car,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ThemeToggle } from '@/components/ThemeToggle';

const mockRides = [
  {
    id: 1,
    driver: 'John Smith',
    rating: 4.9,
    trips: 1243,
    vehicle: 'Toyota Camry',
    type: 'Comfort',
    price: 24,
    duration: '35 min',
    distance: '12.5 km',
    departure: '10:30 AM',
    amenities: ['wifi', 'ac', 'music'],
    freeCancellation: true,
    avatar: '👨',
  },
  {
    id: 2,
    driver: 'Sarah Johnson',
    rating: 4.8,
    trips: 892,
    vehicle: 'Honda Accord',
    type: 'Economy',
    price: 18,
    duration: '40 min',
    distance: '12.5 km',
    departure: '10:45 AM',
    amenities: ['ac'],
    freeCancellation: true,
    avatar: '👩',
  },
  {
    id: 3,
    driver: 'Mike Chen',
    rating: 5.0,
    trips: 2105,
    vehicle: 'Mercedes E-Class',
    type: 'Premium',
    price: 45,
    duration: '30 min',
    distance: '12.5 km',
    departure: '11:00 AM',
    amenities: ['wifi', 'ac', 'music'],
    freeCancellation: true,
    avatar: '👨‍💼',
  },
  {
    id: 4,
    driver: 'Emily Davis',
    rating: 4.7,
    trips: 567,
    vehicle: 'Chevrolet Suburban',
    type: 'SUV',
    price: 55,
    duration: '32 min',
    distance: '12.5 km',
    departure: '11:15 AM',
    amenities: ['wifi', 'ac', 'music'],
    freeCancellation: false,
    avatar: '👩‍💼',
  },
];

const vehicleTypes = ['All', 'Economy', 'Comfort', 'Premium', 'SUV'];
const priceRanges = ['Any', '$0-20', '$20-40', '$40+'];

export default function RideSearch() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('Any');
  const [showFilters, setShowFilters] = useState(false);

  const amenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'ac': return <Snowflake className="h-4 w-4" />;
      case 'music': return <Music className="h-4 w-4" />;
      default: return null;
    }
  };

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
              <Link to="/trips">
                <Button variant="outline" size="sm">My Trips</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="glass-card p-4 mb-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent" />
              <Input
                placeholder="Downtown Station"
                defaultValue="Downtown Station"
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
              <Input
                placeholder="Airport Terminal 1"
                defaultValue="Airport Terminal 1"
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="date"
                defaultValue="2024-12-15"
                className="pl-10"
              />
            </div>
            <Button variant="accent">
              Update Search
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide' : 'Show'}
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Vehicle Type */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Vehicle Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {vehicleTypes.map((type) => (
                      <Button
                        key={type}
                        variant={selectedType === type ? 'accent' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedType(type)}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Price Range</h4>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <Button
                        key={range}
                        variant={selectedPrice === range ? 'accent' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedPrice(range)}
                      >
                        {range}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Minimum Rating</h4>
                  <div className="flex items-center gap-2">
                    {[4, 4.5, 4.8].map((rating) => (
                      <Button key={rating} variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-1 text-warning fill-warning" />
                        {rating}+
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'wifi', label: 'WiFi', icon: Wifi },
                      { id: 'ac', label: 'Air Conditioning', icon: Snowflake },
                      { id: 'music', label: 'Music System', icon: Music },
                    ].map((amenity) => (
                      <div key={amenity.id} className="flex items-center gap-2">
                        <Checkbox id={amenity.id} />
                        <label htmlFor={amenity.id} className="text-sm text-foreground flex items-center gap-2 cursor-pointer">
                          <amenity.icon className="h-4 w-4 text-muted-foreground" />
                          {amenity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Free Cancellation */}
                <div className="flex items-center gap-2">
                  <Checkbox id="freeCancellation" />
                  <label htmlFor="freeCancellation" className="text-sm text-foreground cursor-pointer">
                    Free cancellation only
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{mockRides.length} rides</span> found
              </p>
              <Button variant="ghost" size="sm">
                Sort by: Best Match
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-4">
              {mockRides.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Driver Info */}
                    <div className="flex items-center gap-3 md:w-1/4">
                      <div className="text-4xl">{ride.avatar}</div>
                      <div>
                        <h4 className="font-semibold text-foreground">{ride.driver}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          <span>{ride.rating}</span>
                          <span>•</span>
                          <span>{ride.trips} trips</span>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle & Details */}
                    <div className="flex-1 md:w-1/3">
                      <p className="font-medium text-foreground">{ride.vehicle}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <Badge variant="muted">{ride.type}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {ride.duration}
                        </span>
                        <span>{ride.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {ride.amenities.map((amenity) => (
                          <span key={amenity} className="text-muted-foreground">
                            {amenityIcon(amenity)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Departure & Price */}
                    <div className="flex items-center justify-between md:w-1/3 md:justify-end gap-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Departs</p>
                        <p className="font-semibold text-foreground">{ride.departure}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">${ride.price}</p>
                        {ride.freeCancellation && (
                          <Badge variant="success" className="mt-1">
                            <Shield className="h-3 w-3 mr-1" />
                            Free Cancel
                          </Badge>
                        )}
                      </div>
                      <Link to={`/ride/${ride.id}`}>
                        <Button variant="accent">Select</Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
