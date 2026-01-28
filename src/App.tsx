import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle redirect from 404.html
const RedirectHandler = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we have a stored redirect path from 404.html
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      // Navigate to the stored path
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);
  
  return null;
};

// Component to handle language switching based on route
const LanguageRoute = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const path = location.pathname;
    const lang = path.startsWith("/en") ? "en" : "pt";
    
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
    }
  }, [location.pathname, i18n]);

  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/jonatasporto">
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<LanguageRoute />} />
          <Route path="/en" element={<LanguageRoute />} />
          <Route path="/en/*" element={<LanguageRoute />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
