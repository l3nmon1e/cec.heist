import React from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { 
  Building2, 
  Target, 
  Map, 
  Trophy,
  LogOut
} from 'lucide-react';

export default function MobileGameDock({ 
  onOpenFacility, 
  onOpenMissions, 
  onOpenMap, 
  onOpenScore,
  onExitHeist 
}) {
  const { inventory, currentPlayer } = useGame();

  const handleAction = (cb) => {
    sound.playClick();
    if (cb) cb();
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070B12]/95 border-t border-[#263140] backdrop-blur-md font-mono select-none pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-14 items-stretch divide-x divide-[#263140]">
        
        {/* 1. FACILITY */}
        <button
          onClick={() => handleAction(onOpenFacility)}
          className="flex flex-col items-center justify-center space-y-0.5 text-[#8D98A8] active:text-[#C8A96B] active:bg-[#121923] transition-colors min-h-[44px] cursor-pointer"
        >
          <Building2 className="w-4 h-4 text-[#C8A96B]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">FACILITY</span>
        </button>

        {/* 2. MISSIONS */}
        <button
          onClick={() => handleAction(onOpenMissions)}
          className="flex flex-col items-center justify-center space-y-0.5 text-[#8D98A8] active:text-[#C8A96B] active:bg-[#121923] transition-colors min-h-[44px] cursor-pointer"
        >
          <Target className="w-4 h-4 text-[#C8A96B]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">MISSIONS</span>
        </button>

        {/* 3. MAP */}
        <button
          onClick={() => handleAction(onOpenMap)}
          className="flex flex-col items-center justify-center space-y-0.5 text-[#8D98A8] active:text-[#C8A96B] active:bg-[#121923] transition-colors min-h-[44px] cursor-pointer"
        >
          <Map className="w-4 h-4 text-[#C8A96B]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">MAP</span>
        </button>

        {/* 4. SCORE */}
        <button
          onClick={() => handleAction(onOpenScore)}
          className="flex flex-col items-center justify-center space-y-0.5 text-[#8D98A8] active:text-[#C8A96B] active:bg-[#121923] transition-colors min-h-[44px] cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-[#C8A96B]" />
          <span className="text-[9px] font-bold tracking-wider uppercase">SCORE</span>
        </button>

        {/* 5. EXIT HEIST */}
        <button
          onClick={() => handleAction(onExitHeist)}
          className="flex flex-col items-center justify-center space-y-0.5 text-[#EF4444] active:bg-[#121923] transition-colors min-h-[44px] cursor-pointer group"
        >
          <LogOut className="w-4 h-4 text-[#EF4444] group-active:scale-110 transition-transform" />
          <span className="text-[9px] font-bold tracking-wider uppercase">EXIT</span>
        </button>

      </div>
    </div>
  );
}
