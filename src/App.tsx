import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import JobTracker from "./pages/JobTracker";
import CVCreator from "./pages/CVCreator";
import InterviewCoach from "./pages/InterviewCoach";
import Profile from "./pages/Profile";
import CalendarPage from "./pages/Calendar";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import Achievements from "./pages/Achievements";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/job-tracker" element={<JobTracker />} />
                <Route path="/cv-creator" element={<CVCreator />} />
                <Route path="/interview-coach" element={<InterviewCoach />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/achievements" element={<Achievements />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
