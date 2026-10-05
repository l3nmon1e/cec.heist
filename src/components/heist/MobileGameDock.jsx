import React from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { 
  Map, 
  Briefcase, 
  Volume2, 
  VolumeX, 
  LogOut 
} from 'lucide-react';

export default function MobileGameDock({ 
  onOpenMap, 
  onExitHeist 
}) {
  const { inventory, audioEnabled, toggleSound, setIsInventoryOpen } = useGame();

  const handleAction = (cb) => {
    sound.playClick();
    if (cb) cb();
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070B12]/95 border-t border-[#263140] backdrop-blur-md font-mono select-none pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4 h-14 items-stretch divide-x divide-[#263140]">
        
        {/* 1. MAP */}
        <button
          onClick={() => handleAction(onOpenMap)}
          className="flex flex-col items-center justify-center space-y-0.5 text-[#8D98A8] active:text-[#C8A96B] active:bg-[#121923] transition-colors min-h-[44px] cursor-pointer"
        >
          <Map className="w-4 h-4 text-[#C8A96B]" />
          <span className="text-[10px] font-bold tracking-wider uppercase">MAP</span>
        </button>

        {/* 2. GEAR */}
        <button
          onClick={() => handleAction(() => setIsInventoryOpen(true))}
          className="relative flex flex-col items-center justify-center space-y-0.5 text-[#8D98A8] active:text-[#C8A96B] active:bg-[#121923] transition-colors min-h-[44px] cursor-pointer"
        >
          <Briefcase className="w-4 h-4 text-[#C8A96B]" />
          <span className="text-[10px] font-bold tracking-wider uppercase">GEAR</span>
          {inventory.length > 0 && (
            <span className="absolute top-1.5 right-6 w-3.5 h-3.5 rounded-full bg-[#C8A96B] text-[#070B12] text-[8px] font-black flex items-center justify-center">
              {inventory.length}
            </span>
          )}
        </button>

        {/* 3. SOUND */}
        <button
          onClick={() => handleAction(toggleSound)}
          className="flex flex-col items-center justify-center space-y-0.5 text-[#8D98A8] active:text-[#C8A96B] active:bg-[#121923] transition-colors min-h-[44px] cursor-pointer"
        >
          {audioEnabled ? <Volume2 className="w-4 h-4 text-[#C8A96B]" /> : <VolumeX className="w-4 h-4 text-[#8D98A8]" />}
          <span className="text-[10px] font-bold tracking-wider uppercase">SOUND</span>
        </button>

        {/* 4. EXIT */}
        <button
          onClick={() => handleAction(onExitHeist)}
          className="flex flex-col items-center justify-center space-y-0.5 text-[#8D98A8] active:text-[#EF4444] active:bg-[#121923] transition-colors min-h-[44px] cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-[#EF4444]" />
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#EF4444]">EXIT</span>
        </button>

      </div>
    </div>
  );
}
