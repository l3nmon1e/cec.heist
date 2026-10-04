import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import Navbar from './components/Navbar';
import HomePageView from './components/HomePageView';
import DashboardView from './components/DashboardView';
import MissionsView from './components/MissionsView';
import LeaderboardView from './components/LeaderboardView';
import RulesView from './components/RulesView';
import ProfileView from './components/ProfileView';
import MobileNavigation from './components/MobileNavigation';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import RegisterLoginModal from './components/RegisterLoginModal';
import FaqModal from './components/FaqModal';
import ContactModal from './components/ContactModal';
import PrivacyTermsModal from './components/PrivacyTermsModal';
import StartingLoader from './components/StartingLoader';

// Video-Game-Like Heist Experience Components
import GameShell from './components/heist/GameShell';
import HeistEntrance from './components/heist/rooms/HeistEntrance';
import ReconRoom from './components/heist/rooms/ReconRoom';
import InitialAccessRoom from './components/heist/rooms/InitialAccessRoom';
import InfiltrationRoom from './components/heist/rooms/InfiltrationRoom';
import NetworkRoom from './components/heist/rooms/NetworkRoom';
import SecurityRoom from './components/heist/rooms/SecurityRoom';
import CoreRoom from './components/heist/rooms/CoreRoom';
import VaultRoom from './components/heist/rooms/VaultRoom';
import EscapeRoom from './components/heist/rooms/EscapeRoom';

// Standard CTF Portal Wrapper
function PortalLayout({ onOpenRegister, onOpenLogin, onOpenFaq, onOpenContact, onOpenLegal, isHeroReady, children }) {
  return (
    <div className="min-h-screen bg-[#070B12] text-[#F4F5F7] flex flex-col font-sans relative selection:bg-[#C8A96B] selection:text-[#070B12]">
      {/* Subtle Background Blueprint Grid Pattern */}
      <div className="fixed inset-0 bg-blueprint-grid opacity-35 pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar onOpenLogin={onOpenLogin} onOpenFaq={onOpenFaq} />

      {/* Main View Port - padded on mobile to account for fixed bottom navigation */}
      <main className="flex-1 w-full z-10 pb-16 md:pb-0">
        {children}
      </main>

      {/* Bottom Command Dock on Mobile for Standard CTF Portal */}
      <MobileNavigation />

      {/* Minimal Industrial Footer */}
      <Footer 
        onOpenContact={onOpenContact} 
        onOpenPrivacy={onOpenLegal} 
      />
    </div>
  );
}

function MainAppRoutes() {
  const location = useLocation();
  const { isTerminalModalOpen, setIsTerminalModalOpen, selectedMission, setActiveTab } = useGame();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalMode, setLegalMode] = useState('privacy');

  // Synchronize activeTab with current route
  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.startsWith('/heist')) setActiveTab('heist');
    else if (path === '/dashboard') setActiveTab('dashboard');
    else if (path === '/missions') setActiveTab('missions');
    else if (path === '/leaderboard') setActiveTab('leaderboard');
    else if (path === '/rules') setActiveTab('rules');
    else if (path === '/profile') setActiveTab('profile');
  }, [location.pathname, setActiveTab]);

  const openRegister = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openLegal = (type) => {
    setLegalMode(type);
    setIsLegalModalOpen(true);
  };

  return (
    <>
      {/* Starting Animated Fullscreen Loader */}
      {isLoading && (
        <StartingLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Standalone Tactical Terminal Modal */}
      {isTerminalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Terminal 
            mission={selectedMission} 
            isModal={true} 
            onClose={() => setIsTerminalModalOpen(false)} 
          />
        </div>
      )}

      {/* Common Modals */}
      <RegisterLoginModal 
        key={authMode}
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultMode={authMode} 
      />

      <FaqModal 
        isOpen={isFaqModalOpen} 
        onClose={() => setIsFaqModalOpen(false)} 
      />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      <PrivacyTermsModal 
        isOpen={isLegalModalOpen} 
        onClose={() => setIsLegalModalOpen(false)} 
        mode={legalMode} 
      />

      <Routes>
        {/* ==================================================== */}
        {/* 1. VIDEO-GAME DIGITAL HEIST WORLD ROUTES */}
        {/* ==================================================== */}
        <Route path="/heist" element={<GameShell />}>
          <Route index element={<HeistEntrance />} />
          <Route path="recon" element={<ReconRoom />} />
          <Route path="initial-access" element={<InitialAccessRoom />} />
          <Route path="infiltration" element={<InfiltrationRoom />} />
          <Route path="network" element={<NetworkRoom />} />
          <Route path="security" element={<SecurityRoom />} />
          <Route path="core" element={<CoreRoom />} />
          <Route path="vault" element={<VaultRoom />} />
          <Route path="escape" element={<EscapeRoom />} />
        </Route>

        {/* ==================================================== */}
        {/* 2. STANDARD CTF PORTAL VIEWS */}
        {/* ==================================================== */}
        <Route 
          path="/" 
          element={
            <PortalLayout
              onOpenRegister={openRegister}
              onOpenLogin={openLogin}
              onOpenFaq={() => setIsFaqModalOpen(true)}
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLegal={openLegal}
              isHeroReady={!isLoading}
            >
              <HomePageView 
                onOpenRegister={openRegister} 
                onOpenFaq={() => setIsFaqModalOpen(true)} 
                isHeroReady={!isLoading}
              />
            </PortalLayout>
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            <PortalLayout
              onOpenRegister={openRegister}
              onOpenLogin={openLogin}
              onOpenFaq={() => setIsFaqModalOpen(true)}
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLegal={openLegal}
              isHeroReady={!isLoading}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <DashboardView />
              </div>
            </PortalLayout>
          } 
        />

        <Route 
          path="/missions" 
          element={
            <PortalLayout
              onOpenRegister={openRegister}
              onOpenLogin={openLogin}
              onOpenFaq={() => setIsFaqModalOpen(true)}
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLegal={openLegal}
              isHeroReady={!isLoading}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <MissionsView />
              </div>
            </PortalLayout>
          } 
        />

        <Route 
          path="/leaderboard" 
          element={
            <PortalLayout
              onOpenRegister={openRegister}
              onOpenLogin={openLogin}
              onOpenFaq={() => setIsFaqModalOpen(true)}
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLegal={openLegal}
              isHeroReady={!isLoading}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <LeaderboardView />
              </div>
            </PortalLayout>
          } 
        />

        <Route 
          path="/rules" 
          element={
            <PortalLayout
              onOpenRegister={openRegister}
              onOpenLogin={openLogin}
              onOpenFaq={() => setIsFaqModalOpen(true)}
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLegal={openLegal}
              isHeroReady={!isLoading}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <RulesView />
              </div>
            </PortalLayout>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <PortalLayout
              onOpenRegister={openRegister}
              onOpenLogin={openLogin}
              onOpenFaq={() => setIsFaqModalOpen(true)}
              onOpenContact={() => setIsContactModalOpen(true)}
              onOpenLegal={openLegal}
              isHeroReady={!isLoading}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <ProfileView />
              </div>
            </PortalLayout>
          } 
        />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  const base = import.meta.env.BASE_URL || '/';

  return (
    <BrowserRouter basename={base}>
      <GameProvider>
        <MainAppRoutes />
      </GameProvider>
    </BrowserRouter>
  );
}
