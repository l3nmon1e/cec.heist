import React from 'react';
import { useGame } from '../context/GameContext';
import { Map, Terminal, Trophy, Users, Key, Clock } from 'lucide-react';
import { sound } from '../utils/audio';
import { formatTimer, formatScore } from '../utils/formatters';

export default function MobileNavigation() {
  const { activeTab, setActiveTab, currentPlayer, secondsRemaining } = useGame();

  const handleTab = (tab) => {
    sound.playClick();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 max-w-md mx-auto select-none">
      {/* Floating rectangular command dock */}
      <div className="bg-[#0C111A]/95 backdrop-blur-xl border border-[#263140] hover:border-[#C8A96B]/40 shadow-[0_8px_32px_rgba(0,0,0,0.8)] px-2 py-1.5 font-mono">
        
        {/* Top Micro Telemetry Strip on Mobile */}
        <div className="flex items-center justify-between px-2 pb-1 mb-1 border-b border-[#1C2633] text-[9px] text-[#8D98A8]">
          <div className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FB286] animate-ping" />
            <span>CREW: <strong className="text-[#F4F5F7]">{currentPlayer.callsign}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#C8A96B] font-bold">{formatScore(currentPlayer.score)} PTS</span>
            <span>•</span>
            <span className="text-[#D6A85F]">{formatTimer(secondsRemaining)}</span>
          </div>
        </div>

        {/* 4 Primary Navigation Dock Buttons */}
        <div className="grid grid-cols-4 gap-1">
          {/* 1. FACILITY */}
          <button
            onClick={() => handleTab('missions')}
            className={`flex flex-col items-center justify-center py-1.5 text-[10px] tracking-wider transition-all cursor-pointer ${
              activeTab === 'missions'
                ? 'text-[#C8A96B] bg-[#121923] border border-[#C8A96B]/50'
                : 'text-[#8D98A8] hover:text-[#F4F5F7]'
            }`}
          >
            <Map className="w-4 h-4 mb-0.5" />
            <span className="font-bold">FACILITY</span>
          </button>

          {/* 2. MISSIONS */}
          <button
            onClick={() => handleTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1.5 text-[10px] tracking-wider transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-[#C8A96B] bg-[#121923] border border-[#C8A96B]/50'
                : 'text-[#8D98A8] hover:text-[#F4F5F7]'
            }`}
          >
            <Terminal className="w-4 h-4 mb-0.5" />
            <span className="font-bold">HEIST</span>
          </button>

          {/* 3. SCORE */}
          <button
            onClick={() => handleTab('leaderboard')}
            className={`flex flex-col items-center justify-center py-1.5 text-[10px] tracking-wider transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'text-[#C8A96B] bg-[#121923] border border-[#C8A96B]/50'
                : 'text-[#8D98A8] hover:text-[#F4F5F7]'
            }`}
          >
            <Trophy className="w-4 h-4 mb-0.5" />
            <span className="font-bold">SCORE</span>
          </button>

          {/* 4. CREW */}
          <button
            onClick={() => handleTab('profile')}
            className={`flex flex-col items-center justify-center py-1.5 text-[10px] tracking-wider transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'text-[#C8A96B] bg-[#121923] border border-[#C8A96B]/50'
                : 'text-[#8D98A8] hover:text-[#F4F5F7]'
            }`}
          >
            <Users className="w-4 h-4 mb-0.5" />
            <span className="font-bold">CREW</span>
          </button>
        </div>

      </div>
    </div>
  );
}
