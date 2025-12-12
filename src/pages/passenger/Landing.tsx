import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ArrowRight,
  Shield,
  Clock,
  Star,
  Menu,
  X,
  Car,
  CreditCard,
  Headphones,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
import heroImage from '@/assets/hero-ride.jpg';

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Verified drivers and real-time tracking for your peace of mind',
  },
  {
    icon: Clock,
    title: 'Always On Time',
    description: 'Punctual pickups with smart route optimization',
  },
  {
    icon: Star,
    title: 'Premium Fleet',
    description: 'Choose from economy to luxury vehicles',
  },
  {
    icon: CreditCard,
    title: 'Easy Payments',
    description: 'Multiple payment options with transparent pricing',
  },
];

const vehicleTypes = [
  { name: 'Economy', seats: 4, price: '$12', image: '🚗' },
  { name: 'Comfort', seats: 4, price: '$18', image: '🚙' },
  { name: 'Premium', seats: 4, price: '$28', image: '🚘' },
  { name: 'SUV', seats: 6, price: '$35', image: '🚐' },
];

export default function PassengerLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                <Car className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">RideFlow</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Book a Ride
              </Link>
              <Link to="/trips" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                My Trips
              </Link>
              <Link to="/profile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link to="/admin">
                <Button variant="outline" size="sm">Admin</Button>
              </Link>
              <Link to="/search">
                <Button variant="accent" size="sm">Book Now</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link to="/search" className="block py-2 text-sm font-medium text-foreground">
                Book a Ride
              </Link>
              <Link to="/trips" className="block py-2 text-sm font-medium text-foreground">
                My Trips
              </Link>
              <Link to="/profile" className="block py-2 text-sm font-medium text-foreground">
                Profile
              </Link>
              <div className="flex gap-2 pt-2">
                <ThemeToggle />
                <Link to="/admin" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Admin</Button>
                </Link>
                <Link to="/search" className="flex-1">
                  <Button variant="accent" size="sm" className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Modern city ride"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              Your ride,{' '}
              <span className="text-accent">your way</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground max-w-lg"
            >
              Experience seamless travel with our premium ride-booking platform. 
              Safe, reliable, and always on time.
            </motion.p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 glass-card p-6"
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative lg:col-span-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-accent" />
                  <Input
                    placeholder="Pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative lg:col-span-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                  <Input
                    placeholder="Drop location"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-10"
                  />
                </div>
                <Link to="/search">
                  <Button variant="hero" size="lg" className="w-full">
                    <Search className="h-5 w-5 mr-2" />
                    Search Rides
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Choose Your Ride</h2>
            <p className="mt-3 text-muted-foreground">From budget-friendly to luxury options</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vehicleTypes.map((vehicle, index) => (
              <motion.div
                key={vehicle.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="text-5xl mb-4">{vehicle.image}</div>
                <h3 className="text-lg font-semibold text-foreground">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <Users className="inline h-4 w-4 mr-1" />
                  Up to {vehicle.seats} passengers
                </p>
                <p className="text-2xl font-bold text-accent mt-3">
                  {vehicle.price}
                  <span className="text-sm font-normal text-muted-foreground">/trip</span>
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  Select
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Why Choose RideFlow?</h2>
            <p className="mt-3 text-muted-foreground">Experience the difference with our premium features</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">Ready to ride?</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-md mx-auto">
            Book your first trip today and experience the future of transportation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <Button variant="hero" size="xl">
                Book Your Ride
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/profile/kyc">
              <Button variant="glass" size="xl">
                Become a Driver
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                  <Car className="h-5 w-5 text-accent-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">RideFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted ride-booking platform for safe and reliable transportation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/search" className="hover:text-foreground transition-colors">Book a Ride</Link></li>
                <li><Link to="/trips" className="hover:text-foreground transition-colors">My Trips</Link></li>
                <li><Link to="/profile" className="hover:text-foreground transition-colors">Profile</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/support" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="/support" className="hover:text-foreground transition-colors">Safety</Link></li>
                <li><Link to="/support" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Portals</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/admin" className="hover:text-foreground transition-colors">Admin Panel</Link></li>
                <li><Link to="/operations" className="hover:text-foreground transition-colors">Operations</Link></li>
                <li><Link to="/support" className="hover:text-foreground transition-colors">Support Panel</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 RideFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
