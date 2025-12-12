import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Passenger Pages
import PassengerLanding from "./pages/passenger/Landing";
import RideSearch from "./pages/passenger/RideSearch";
import MyTrips from "./pages/passenger/MyTrips";
import Profile from "./pages/passenger/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";

// Operations Pages
import OperationsDashboard from "./pages/operations/Dashboard";

// Support Pages
import SupportDashboard from "./pages/support/Dashboard";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Passenger Routes */}
          <Route path="/" element={<PassengerLanding />} />
          <Route path="/search" element={<RideSearch />} />
          <Route path="/trips" element={<MyTrips />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Operations Routes */}
          <Route path="/operations" element={<OperationsDashboard />} />
          <Route path="/operations/*" element={<OperationsDashboard />} />

          {/* Support Routes */}
          <Route path="/support" element={<SupportDashboard />} />
          <Route path="/support/*" element={<SupportDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
