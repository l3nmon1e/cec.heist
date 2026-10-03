import React from 'react';
import { useGame } from '../context/GameContext';
import { Home, Terminal, Trophy, User, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

export default function MobileNavigation() {
  const { activeTab, setActiveTab } = useGame();

  const handleTab = (tab) => {
    sound.playClick();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#303030] px-2 py-1 select-none">
      <div className="grid grid-cols-5 gap-1">
        
        <button
          onClick={() => handleTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 font-mono text-[10px] tracking-wider transition-colors ${
            activeTab === 'home'
              ? 'text-[#FACC15] bg-[#1A1A1A] border-t-2 border-[#FACC15]'
              : 'text-[#737373] hover:text-[#E5E7EB]'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>HOME</span>
        </button>

        <button
          onClick={() => handleTab('missions')}
          className={`flex flex-col items-center justify-center py-1.5 font-mono text-[10px] tracking-wider transition-colors ${
            activeTab === 'missions'
              ? 'text-[#FACC15] bg-[#1A1A1A] border-t-2 border-[#FACC15]'
              : 'text-[#737373] hover:text-[#E5E7EB]'
          }`}
        >
          <Terminal className="w-4 h-4 mb-0.5" />
          <span>MISSIONS</span>
        </button>

        <button
          onClick={() => handleTab('leaderboard')}
          className={`flex flex-col items-center justify-center py-1.5 font-mono text-[10px] tracking-wider transition-colors ${
            activeTab === 'leaderboard'
              ? 'text-[#FACC15] bg-[#1A1A1A] border-t-2 border-[#FACC15]'
              : 'text-[#737373] hover:text-[#E5E7EB]'
          }`}
        >
          <Trophy className="w-4 h-4 mb-0.5" />
          <span>RANK</span>
        </button>

        <button
          onClick={() => handleTab('profile')}
          className={`flex flex-col items-center justify-center py-1.5 font-mono text-[10px] tracking-wider transition-colors ${
            activeTab === 'profile'
              ? 'text-[#FACC15] bg-[#1A1A1A] border-t-2 border-[#FACC15]'
              : 'text-[#737373] hover:text-[#E5E7EB]'
          }`}
        >
          <User className="w-4 h-4 mb-0.5" />
          <span>PROFILE</span>
        </button>

        <button
          onClick={() => handleTab('rules')}
          className={`flex flex-col items-center justify-center py-1.5 font-mono text-[10px] tracking-wider transition-colors ${
            activeTab === 'rules'
              ? 'text-[#FACC15] bg-[#1A1A1A] border-t-2 border-[#FACC15]'
              : 'text-[#737373] hover:text-[#E5E7EB]'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>RULES</span>
        </button>

      </div>
    </div>
  );
}
