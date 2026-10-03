import React from 'react';
import { useGame } from '../context/GameContext';
import { Crosshair, User, Terminal, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({ onOpenLogin, onOpenFaq }) {
  const { 
    activeTab, 
    setActiveTab, 
    currentPlayer, 
    audioEnabled, 
    toggleSound,
    setIsTerminalModalOpen
  } = useGame();

  const handleNav = (tab) => {
    sound.playClick();
    setActiveTab(tab);
    if (tab === 'home' || tab === 'about') {
      if (tab === 'about') {
        const el = document.getElementById('about-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Official CEC HEIST Logo */}
          <div 
            className="flex items-center cursor-pointer select-none py-1" 
            onClick={() => handleNav('home')}
          >
            <img 
              src="/images/logo.png" 
              alt="CEC HEIST - Cyber Security Challenge" 
              className="h-8 sm:h-9 md:h-10 max-w-[200px] sm:max-w-none object-contain hover:brightness-110 transition-all"
            />
          </div>

          {/* Desktop Navigation Links as in Mockup: HOME, ABOUT, CHALLENGES, LEADERBOARD, RULES, FAQ */}
          <nav className="hidden md:flex items-center space-x-7 font-mono text-xs tracking-wider">
            
            {/* HOME */}
            <button
              onClick={() => handleNav('home')}
              className={`relative py-1 transition-colors ${
                activeTab === 'home'
                  ? 'text-[#FACC15] font-bold'
                  : 'text-[#A3A3A3] hover:text-[#E5E7EB]'
              }`}
            >
              <span>HOME</span>
              {activeTab === 'home' && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#FACC15]" />
              )}
            </button>

            {/* ABOUT */}
            <button
              onClick={() => handleNav('about')}
              className="text-[#A3A3A3] hover:text-[#E5E7EB] transition-colors"
            >
              <span>ABOUT</span>
            </button>

            {/* CHALLENGES */}
            <button
              onClick={() => handleNav('missions')}
              className={`relative py-1 transition-colors ${
                activeTab === 'missions'
                  ? 'text-[#FACC15] font-bold'
                  : 'text-[#A3A3A3] hover:text-[#E5E7EB]'
              }`}
            >
              <span>CHALLENGES</span>
              {activeTab === 'missions' && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#FACC15]" />
              )}
            </button>

            {/* LEADERBOARD */}
            <button
              onClick={() => handleNav('leaderboard')}
              className={`relative py-1 transition-colors ${
                activeTab === 'leaderboard'
                  ? 'text-[#FACC15] font-bold'
                  : 'text-[#A3A3A3] hover:text-[#E5E7EB]'
              }`}
            >
              <span>LEADERBOARD</span>
              {activeTab === 'leaderboard' && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#FACC15]" />
              )}
            </button>

            {/* RULES */}
            <button
              onClick={() => handleNav('rules')}
              className={`relative py-1 transition-colors ${
                activeTab === 'rules'
                  ? 'text-[#FACC15] font-bold'
                  : 'text-[#A3A3A3] hover:text-[#E5E7EB]'
              }`}
            >
              <span>RULES</span>
              {activeTab === 'rules' && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#FACC15]" />
              )}
            </button>

            {/* FAQ */}
            <button
              onClick={onOpenFaq}
              className="text-[#A3A3A3] hover:text-[#E5E7EB] transition-colors cursor-pointer"
            >
              <span>FAQ</span>
            </button>

          </nav>

          {/* Right Side: Sound Toggle & LOGIN / Console Pod */}
          <div className="flex items-center space-x-3 font-mono">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={audioEnabled ? "Audio: Active" : "Audio: Muted"}
              className="p-1.5 text-[#737373] hover:text-[#FACC15] transition-colors"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-[#FACC15]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Tactical Console direct trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsTerminalModalOpen(true);
              }}
              title="Open Shell Terminal"
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 bg-[#151515] border border-[#303030] text-[11px] text-[#A3A3A3] hover:text-[#E5E7EB] hover:border-[#FACC15] transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>TERMINAL</span>
            </button>

            {/* LOGIN Button as shown in mockup */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenLogin();
              }}
              className="px-4 py-1.5 bg-transparent border border-[#404040] hover:border-[#FACC15] text-[#E5E7EB] hover:text-[#FACC15] text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            >
              LOGIN
            </button>

            {/* Profile avatar / quick badge */}
            <button
              onClick={() => handleNav('profile')}
              title={`Logged in as ${currentPlayer.id} (${currentPlayer.callsign})`}
              className="w-8 h-8 bg-[#151515] border border-[#303030] hover:border-[#FACC15] flex items-center justify-center text-[#FACC15] transition-colors cursor-pointer"
            >
              <User className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
