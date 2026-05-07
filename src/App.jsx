import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import GeneralDentistry from './pages/services/GeneralDentistry';
import CosmeticDentistry from './pages/services/CosmeticDentistry';
import RestorativeDentistry from './pages/services/RestorativeDentistry';
import Orthodontics from './pages/services/Orthodontics';
import Financing from './pages/Financing';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPost';
import NewPatients from './pages/NewPatients';
import Contact from './pages/Contact';
import ServiceAreas from './pages/ServiceAreas';
import ImperialValley from './pages/service-areas/ImperialValley';
import Southbrook from './pages/service-areas/Southbrook';
import ColonialHills from './pages/service-areas/ColonialHills';
import GreenRidgeNorth from './pages/service-areas/GreenRidgeNorth';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/general" element={<GeneralDentistry />} />
        <Route path="/services/cosmetic" element={<CosmeticDentistry />} />
        <Route path="/services/restorative" element={<RestorativeDentistry />} />
        <Route path="/services/orthodontics" element={<Orthodontics />} />
        <Route path="/financing" element={<Financing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/new-patients" element={<NewPatients />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/service-areas/imperial-valley" element={<ImperialValley />} />
        <Route path="/service-areas/southbrook" element={<Southbrook />} />
        <Route path="/service-areas/colonial-hills" element={<ColonialHills />} />
        <Route path="/service-areas/green-ridge-north" element={<GreenRidgeNorth />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App