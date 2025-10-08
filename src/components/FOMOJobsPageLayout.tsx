import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import { FOMOJobsFooter } from '@/components/landing';
import { AccessibilityBar } from '@/components/AccessibilityBar';

type FOMOJobsPageLayoutProps = {
  children: React.ReactNode;
  showAccessibility?: boolean;
  showFooter?: boolean;
};

const FOMOJobsPageLayout = ({
  children,
  showAccessibility = true,
  showFooter = true
}: FOMOJobsPageLayoutProps) => {
  const location = useLocation();

  // Scroll to top when route changes (like FOMO Jobs PageLayout)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background w-full max-w-[100vw] overflow-x-hidden">
      <FOMOJobsNavbar />

      {/* Main content with padding for fixed navbar */}
      <main className="pt-16">
        {children}
      </main>

      {showFooter && <FOMOJobsFooter />}

      {/* Fixed accessibility bar at bottom */}
      {showAccessibility && (
        <div className="pb-16">
          <AccessibilityBar />
        </div>
      )}
    </div>
  );
};

export default FOMOJobsPageLayout;
