import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PlantyNavbar from '@/components/PlantyNavbar';
import { PlantyFooter } from '@/components/landing';
import { AccessibilityBar } from '@/components/AccessibilityBar';

type PlantyPageLayoutProps = {
  children: React.ReactNode;
  showAccessibility?: boolean;
  showFooter?: boolean;
};

const PlantyPageLayout = ({
  children,
  showAccessibility = true,
  showFooter = true
}: PlantyPageLayoutProps) => {
  const location = useLocation();

  // Scroll to top when route changes (like FOMO Jobs PageLayout)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background w-full max-w-[100vw] overflow-x-hidden">
      <PlantyNavbar />

      {/* Main content with padding for fixed navbar */}
      <main className="pt-16">
        {children}
      </main>

      {showFooter && <PlantyFooter />}

      {/* Fixed accessibility bar at bottom */}
      {showAccessibility && (
        <div className="pb-16">
          <AccessibilityBar />
        </div>
      )}
    </div>
  );
};

export default PlantyPageLayout;
