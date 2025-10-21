import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import { lazy, Suspense, memo } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";

// Lazy load heavy pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const JobTracker = lazy(() => import("./pages/JobTracker"));
const CVCreator = lazy(() => import("./pages/CVCreator"));
const CVList = lazy(() => import("./pages/CVList"));
const InterviewCoach = lazy(() => import("./pages/InterviewCoach"));
const JobPrompts = lazy(() => import("./pages/JobPrompts"));
const Recruiter = lazy(() => import("./pages/Recruiter"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
// const CalendarPage = lazy(() => import("./pages/Calendar")); // TODO: Migrate from volunteer to job events
const Chat = lazy(() => import("./pages/Chat"));
const Admin = lazy(() => import("./pages/Admin"));
const Achievements = lazy(() => import("./pages/Achievements"));
const B2BAnalytics = lazy(() => import("./pages/B2BAnalytics"));
const CreateAlert = lazy(() => import("./pages/CreateAlert"));
const Alerts = lazy(() => import("./pages/Alerts"));

// Loading spinner component - memoized
const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <ErrorBoundary>
            <AuthProvider>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                  {/* Tool pages - PUBLIC (users can explore demo without login) */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/job-tracker" element={<JobTracker />} />
                  <Route path="/cv-creator" element={<CVCreator />} />
                  <Route path="/cvs" element={<CVList />} />
                  <Route path="/interview-coach" element={<InterviewCoach />} />
                  <Route path="/job-prompts" element={<JobPrompts />} />
                  <Route path="/recruiter" element={<Recruiter />} />
                  <Route path="/b2b/analytics" element={<B2BAnalytics />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/alerts/create" element={<CreateAlert />} />
                  <Route path="/alerts/edit/:alertId" element={<CreateAlert />} />
                  <Route path="/feedback" element={<FeedbackPage />} />

                  {/* User pages - keep protected */}
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                  <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />

                  {/* Admin-only route */}
                  <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AuthProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
