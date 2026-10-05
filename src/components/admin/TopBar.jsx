import React from 'react';
import { formatTimer } from '../../utils/formatters';
import { User, Volume2, VolumeX } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const TopBar = ({ activeTabName = "OVERVIEW" }) => {
  const { secondsRemaining, isGamePaused, audioEnabled, toggleSound } = useGame();

  return (
    <header className="h-14 bg-[#0D131D] border-b border-[#202B38] px-6 flex items-center justify-between shrink-0 select-none">
      {/* Left breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="text-[#8994A4]">CEC HEIST</span>
        <span className="text-[#8994A4]/40">/</span>
        <span className="text-[#8994A4]">ADMIN CENTER</span>
        <span className="text-[#8994A4]/40">/</span>
        <span className="text-[#F4F5F7] font-semibold uppercase">{activeTabName}</span>
      </div>

      {/* Right status */}
      <div className="flex items-center gap-5 font-mono text-xs">
        {/* Contest State */}
        <div className="flex items-center gap-2">
          {isGamePaused ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#D6AA55]" />
              <span className="text-[#D6AA55] font-semibold">CONTEST PAUSED</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#4DBB91] animate-pulse" />
              <span className="text-[#4DBB91] font-semibold">CONTEST RUNNING</span>
            </>
          )}
        </div>

        {/* Live Timer */}
        <div className="px-2.5 py-1 rounded bg-[#111923] border border-[#202B38] text-[#F4F5F7] font-bold tracking-wider">
          {formatTimer(secondsRemaining)}
        </div>

        {/* Audio feedback toggle */}
        <button
          onClick={toggleSound}
          className="text-[#8994A4] hover:text-[#F4F5F7] transition-colors p-1"
          title={audioEnabled ? "Mute admin sound effects" : "Enable sound effects"}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4 text-[#C8A96B]" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Admin profile pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#202B38]">
          <div className="w-7 h-7 rounded bg-[#111923] border border-[#202B38] flex items-center justify-center text-[#C8A96B]">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-[#F4F5F7] text-xs hidden sm:inline-block">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
