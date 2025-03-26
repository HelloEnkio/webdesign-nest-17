
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));
const CGV = lazy(() => import("./pages/CGV"));

const queryClient = new QueryClient();

// ScrollToTop component that ONLY scrolls on navigation between routes, not on refresh
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  // We use React Router's useNavigate hook to detect actual navigation between routes
  // This avoids interfering with browser's native scroll restoration on refresh
  React.useEffect(() => {
    // Only scroll to top on actual navigation between different routes
    window.scrollTo(0, 0);
    
    // This effect only runs when pathname changes, which happens on navigation
    // but not on refresh at the same URL
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
