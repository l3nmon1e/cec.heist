import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { Crosshair, User, Terminal, Shield, Key, Sparkles, Building2, Menu, X, BookOpen, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import { getAssetUrl } from '../utils/formatters';

export default function Navbar({ onOpenLogin, onOpenFaq }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    activeTab, 
    setActiveTab, 
    currentPlayer, 
    setIsTerminalModalOpen
  } = useGame();

  const handleNav = (tab, routePath = null) => {
    sound.playClick();
    setMobileMenuOpen(false);
    setActiveTab(tab);
    if (routePath) {
      navigate(routePath);
    } else {
      if (tab === 'home') navigate('/');
      else if (tab === 'dashboard') navigate('/dashboard');
      else if (tab === 'missions') navigate('/heist');
      else if (tab === 'leaderboard') navigate('/leaderboard');
      else if (tab === 'rules') navigate('/rules');
      else if (tab === 'profile') navigate('/profile');
    }

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

            {/* DIGITAL HEIST (THE MAIN GAMEPLAY EXPERIENCE) */}
            <button
              onClick={() => handleNav('heist', '/heist')}
              className="relative py-1.5 px-3 bg-[#C8A96B]/15 hover:bg-[#C8A96B]/25 border border-[#C8A96B]/50 hover:border-[#C8A96B] transition-all cursor-pointer flex items-center space-x-1.5 shadow-[0_0_15px_rgba(200,169,107,0.2)] rounded-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] animate-ping" />
              <span className="text-[#C8A96B] font-black tracking-widest">DIGITAL HEIST</span>
              <span className="text-[9px] bg-[#C8A96B] text-[#070B12] px-1 py-0.2 font-black uppercase rounded-sm">GAME</span>
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
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-[#0C111A] border border-[#263140] text-[11px] text-[#8D98A8] hover:text-[#F4F5F7] hover:border-[#C8A96B] transition-colors cursor-pointer rounded-lg shadow-sm"
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
              className="px-3.5 py-1.5 bg-transparent border border-[#263140] hover:border-[#C8A96B] text-[#F4F5F7] hover:text-[#C8A96B] text-xs font-semibold tracking-wider transition-colors cursor-pointer rounded-lg shadow-sm"
            >
              CREW LOGIN
            </button>

            {/* Profile avatar / quick badge */}
            <button
              onClick={() => handleNav('profile')}
              title={`Logged in as ${currentPlayer.id} (${currentPlayer.callsign})`}
              className="w-8 h-8 bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] flex items-center justify-center text-[#C8A96B] transition-colors cursor-pointer rounded-lg shadow-sm"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden w-8 h-8 bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] flex items-center justify-center text-[#F4F5F7] hover:text-[#C8A96B] transition-colors cursor-pointer rounded-lg shadow-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#263140] bg-[#070B12]/98 backdrop-blur-xl px-4 py-4 space-y-2 font-mono text-xs shadow-2xl">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
              activeTab === 'home' ? 'bg-[#C8A96B]/15 text-[#C8A96B] font-bold' : 'text-[#8D98A8] hover:text-[#F4F5F7]'
            }`}
          >
            <span>HOME HQ</span>
          </button>

          <button
            onClick={() => handleNav('heist', '/heist')}
            className="w-full text-left px-3 py-2 rounded flex items-center justify-between bg-[#C8A96B]/15 border border-[#C8A96B]/40 text-[#C8A96B] font-bold"
          >
            <span>DIGITAL HEIST (GAME)</span>
            <span className="text-[9px] bg-[#C8A96B] text-[#070B12] px-1.5 py-0.5 font-black uppercase rounded">ACTIVE</span>
          </button>

          <button
            onClick={() => handleNav('dashboard')}
            className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
              activeTab === 'dashboard' ? 'bg-[#C8A96B]/15 text-[#C8A96B] font-bold' : 'text-[#8D98A8] hover:text-[#F4F5F7]'
            }`}
          >
            <span>DASHBOARD</span>
          </button>

          <button
            onClick={() => handleNav('leaderboard')}
            className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
              activeTab === 'leaderboard' ? 'bg-[#C8A96B]/15 text-[#C8A96B] font-bold' : 'text-[#8D98A8] hover:text-[#F4F5F7]'
            }`}
          >
            <span>LEADERBOARD</span>
          </button>

          <button
            onClick={() => handleNav('rules')}
            className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
              activeTab === 'rules' ? 'bg-[#C8A96B]/15 text-[#C8A96B] font-bold' : 'text-[#8D98A8] hover:text-[#F4F5F7]'
            }`}
          >
            <span>RULES & DIRECTIVES</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(false);
              onOpenFaq?.();
            }}
            className="w-full text-left px-3 py-2 rounded flex items-center justify-between text-[#8D98A8] hover:text-[#F4F5F7]"
          >
            <span>HEIST FAQ</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(false);
              setIsTerminalModalOpen(true);
            }}
            className="w-full text-left px-3 py-2 rounded flex items-center space-x-2 text-[#8D98A8] hover:text-[#F4F5F7]"
          >
            <Terminal className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>OPERATIONAL TERMINAL</span>
          </button>

          <div className="pt-2 border-t border-[#1C2633] flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
                onOpenLogin?.();
              }}
              className="flex-1 py-2 text-center bg-[#C8A96B] text-[#070B12] font-bold rounded"
            >
              CREW LOGIN
            </button>
            <button
              onClick={() => handleNav('profile')}
              className="px-4 py-2 border border-[#263140] text-[#8D98A8] rounded"
            >
              PROFILE
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
