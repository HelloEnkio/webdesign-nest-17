
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));
const CGV = lazy(() => import("./pages/CGV"));

const queryClient = new QueryClient();

// ScrollToTop component to ensure navigation between different routes starts at the top
// but refreshes preserve scroll position
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Only scroll to top when navigating between routes, not on refresh
    const isNavigatingBetweenRoutes = sessionStorage.getItem('isNavigating') === 'true';
    
    if (isNavigatingBetweenRoutes) {
      window.scrollTo(0, 0);
      sessionStorage.removeItem('isNavigating');
    }
    
    // Set up navigation tracking for future navigations
    const handleLinkClick = () => {
      sessionStorage.setItem('isNavigating', 'true');
    };
    
    // Add event listeners to all anchor links that navigate between pages
    document.querySelectorAll('a:not([href^="#"])').forEach(anchor => {
      anchor.addEventListener('click', handleLinkClick);
    });
    
    return () => {
      document.querySelectorAll('a:not([href^="#"])').forEach(anchor => {
        anchor.removeEventListener('click', handleLinkClick);
      });
    };
  }, [pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-teal-950"></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/cgv" element={<CGV />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
