import React from 'react';
import { useGame } from '../context/GameContext';
import { Crosshair, User, Terminal, Shield, Key } from 'lucide-react';
import { sound } from '../utils/audio';
import { getAssetUrl } from '../utils/formatters';

export default function Navbar({ onOpenLogin, onOpenFaq }) {
  const { 
    activeTab, 
    setActiveTab, 
    currentPlayer, 
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
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070B12]/95 backdrop-blur-md border-b border-[#263140]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Official CEC HEIST Brand Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none py-1 group" 
            onClick={() => handleNav('home')}
          >
            <img 
              src={getAssetUrl('/images/logo.png')} 
              alt="CEC HEIST - Digital Heist" 
              className="h-8 sm:h-9 object-contain group-hover:brightness-110 transition-all"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 font-mono text-xs tracking-wider">
            
            {/* HOME */}
            <button
              onClick={() => handleNav('home')}
              className={`relative py-1 transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'text-[#C8A96B] font-bold'
                  : 'text-[#8D98A8] hover:text-[#F4F5F7]'
              }`}
            >
              <span>HOME</span>
              {activeTab === 'home' && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#C8A96B]" />
              )}
            </button>

            {/* DASHBOARD */}
            <button
              onClick={() => handleNav('dashboard')}
              className={`relative py-1 transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'text-[#C8A96B] font-bold'
                  : 'text-[#8D98A8] hover:text-[#F4F5F7]'
              }`}
            >
              <span>DASHBOARD</span>
              {activeTab === 'dashboard' && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#C8A96B]" />
              )}
            </button>

            {/* FACILITY & MISSIONS */}
            <button
              onClick={() => handleNav('missions')}
              className={`relative py-1 transition-colors cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'missions'
                  ? 'text-[#C8A96B] font-bold'
                  : 'text-[#8D98A8] hover:text-[#F4F5F7]'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>FACILITY MISSIONS</span>
              {activeTab === 'missions' && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#C8A96B]" />
              )}
            </button>

            {/* LEADERBOARD */}
            <button
              onClick={() => handleNav('leaderboard')}
              className={`relative py-1 transition-colors cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'text-[#C8A96B] font-bold'
                  : 'text-[#8D98A8] hover:text-[#F4F5F7]'
              }`}
            >
              <span>LEADERBOARD</span>
              {activeTab === 'leaderboard' && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#C8A96B]" />
              )}
            </button>

            {/* RULES */}
            <button
              onClick={() => handleNav('rules')}
              className={`relative py-1 transition-colors cursor-pointer ${
                activeTab === 'rules'
                  ? 'text-[#C8A96B] font-bold'
                  : 'text-[#8D98A8] hover:text-[#F4F5F7]'
              }`}
            >
              <span>RULES</span>
              {activeTab === 'rules' && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#C8A96B]" />
              )}
            </button>

            {/* FAQ */}
            <button
              onClick={onOpenFaq}
              className="text-[#8D98A8] hover:text-[#F4F5F7] transition-colors cursor-pointer"
            >
              <span>FAQ</span>
            </button>

          </nav>

          {/* Right Side: LOGIN & Console Pod */}
          <div className="flex items-center space-x-3 font-mono">

            {/* Tactical Console direct trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsTerminalModalOpen(true);
              }}
              title="Open Shell Terminal"
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 bg-[#0C111A] border border-[#263140] text-[11px] text-[#8D98A8] hover:text-[#F4F5F7] hover:border-[#C8A96B] transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>TERMINAL</span>
            </button>

            {/* LOGIN Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenLogin();
              }}
              className="px-3.5 py-1.5 bg-transparent border border-[#263140] hover:border-[#C8A96B] text-[#F4F5F7] hover:text-[#C8A96B] text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            >
              CREW LOGIN
            </button>

            {/* Profile avatar / quick badge */}
            <button
              onClick={() => handleNav('profile')}
              title={`Logged in as ${currentPlayer.id} (${currentPlayer.callsign})`}
              className="w-8 h-8 bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] flex items-center justify-center text-[#C8A96B] transition-colors cursor-pointer"
            >
              <User className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
