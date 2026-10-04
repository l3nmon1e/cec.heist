import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Navbar from './components/Navbar';
import EventStatusBar from './components/EventStatusBar';
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

function AppContent() {
  const { activeTab, setActiveTab, isTerminalModalOpen, setIsTerminalModalOpen, selectedMission } = useGame();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalMode, setLegalMode] = useState('privacy');

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
    <div className="min-h-screen bg-[#070B12] text-[#F4F5F7] flex flex-col font-sans relative selection:bg-[#C8A96B] selection:text-[#070B12]">
      
      {/* Subtle Background Blueprint Grid Pattern */}
      <div className="fixed inset-0 bg-blueprint-grid opacity-35 pointer-events-none z-0" />

      {/* Navigation matching reference mockup */}
      <Navbar onOpenLogin={openLogin} onOpenFaq={() => setIsFaqModalOpen(true)} />
      
      {/* Show live system status bar when on dashboard/missions/leaderboard */}
      {activeTab !== 'home' && <EventStatusBar />}

      {/* Main View Port */}
      {activeTab === 'home' ? (
        <main className="flex-1 w-full z-10">
          <HomePageView 
            onOpenRegister={openRegister} 
            onOpenFaq={() => setIsFaqModalOpen(true)} 
          />
        </main>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'missions' && <MissionsView />}
          {activeTab === 'leaderboard' && <LeaderboardView />}
          {activeTab === 'rules' && <RulesView />}
          {activeTab === 'profile' && <ProfileView />}
        </main>
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

      {/* Modals */}
      <RegisterLoginModal 
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

      {/* Bottom Command Dock on Mobile */}
      <MobileNavigation />

      {/* Minimal Industrial Footer matching mockup */}
      <Footer 
        onOpenContact={() => setIsContactModalOpen(true)} 
        onOpenPrivacy={openLegal} 
      />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
