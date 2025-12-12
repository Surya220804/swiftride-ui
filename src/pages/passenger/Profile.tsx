import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  CreditCard,
  Bell,
  Settings,
  ArrowLeft,
  Car,
  Upload,
  Check,
  AlertCircle,
  FileText,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');

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
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="glass-card p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-4xl">
                  👤
                </div>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-accent text-accent-foreground">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-foreground">Alex Thompson</h1>
                <p className="text-muted-foreground">alex.thompson@email.com</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                  <Badge variant="success">
                    <Check className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge variant="muted">Member since Dec 2023</Badge>
                </div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="kyc">KYC Documents</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="glass-card p-6 space-y-6">
                <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Thompson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" defaultValue="alex.thompson@email.com" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Default Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="address" defaultValue="123 Main Street, City, State 12345" className="pl-10" />
                    </div>
                  </div>
                </div>
                <Button variant="accent">Save Changes</Button>
              </div>
            </TabsContent>

            {/* KYC Tab */}
            <TabsContent value="kyc">
              <div className="space-y-4">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Identity Verification</h2>
                    <Badge variant="warning">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Upload your documents to verify your identity and unlock all features.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* ID Document */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-accent transition-colors cursor-pointer"
                    >
                      <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      <h3 className="font-medium text-foreground mb-1">Government ID</h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        Passport, Driver's License, or National ID
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </motion.div>

                    {/* Selfie */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-accent transition-colors cursor-pointer"
                    >
                      <Camera className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      <h3 className="font-medium text-foreground mb-1">Selfie with ID</h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        Take a photo holding your ID document
                      </p>
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Uploaded Documents */}
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-foreground mb-4">Uploaded Documents</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-accent" />
                        <div>
                          <p className="font-medium text-foreground">Driver's License</p>
                          <p className="text-xs text-muted-foreground">Uploaded on Dec 10, 2024</p>
                        </div>
                      </div>
                      <Badge variant="success">
                        <Check className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Payment Methods</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-primary rounded flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/26</p>
                      </div>
                    </div>
                    <Badge variant="success">Default</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <div className="glass-card p-6 space-y-6">
                <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { id: 'ride-updates', label: 'Ride Updates', description: 'Get notified about your ride status' },
                    { id: 'promotions', label: 'Promotions & Offers', description: 'Receive special deals and discounts' },
                    { id: 'newsletter', label: 'Newsletter', description: 'Weekly updates and news' },
                    { id: 'sms', label: 'SMS Notifications', description: 'Receive text messages for important updates' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch defaultChecked={item.id === 'ride-updates' || item.id === 'sms'} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="space-y-4">
                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Change Password</p>
                        <p className="text-sm text-muted-foreground">Update your account password</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold text-foreground text-destructive mb-4">Danger Zone</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Delete Account</p>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                    </div>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
