import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SplashScreen } from './components/splash/SplashScreen';
import { OnboardingScreen } from './components/onboarding/OnboardingScreen';
import { AuthScreen } from './components/auth/AuthScreen';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { EventsPage } from './components/events/EventsPage';
import { LostFoundPage } from './components/lostfound/LostFoundPage';
import { CafeteriaPage } from './components/cafeteria/CafeteriaPage';
import { NavigationPage } from './components/navigation/NavigationPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('campus_onboarding_complete');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('campus_onboarding_complete', 'true');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onComplete={handleSplashComplete} />
      ) : showOnboarding ? (
        <OnboardingScreen key="onboarding" onComplete={handleOnboardingComplete} />
      ) : !user ? (
        <AuthScreen key="auth" />
      ) : (
        <Router key="main">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/lost-found" element={<LostFoundPage />} />
              <Route path="/cafeteria" element={<CafeteriaPage />} />
              <Route path="/navigation" element={<NavigationPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;