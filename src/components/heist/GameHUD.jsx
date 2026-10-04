import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { formatTimer, formatScore, getAssetUrl } from '../../utils/formatters';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Map, 
  Briefcase, 
  Volume2, 
  VolumeX, 
  Clock, 
  Users, 
  Trophy,
  LogOut,
  Layers,
  AlertTriangle,
  Sliders
} from 'lucide-react';

export default function GameHUD({ onExitHeist, currentStageTitle }) {
  const {
    crewName,
    secondsRemaining,
    lockdownActive,
    lockdownSecondsRemaining,
    escapeComplete,
    totalScore,
    currentPlayer,
    audioEnabled,
    toggleSound,
    inventory,
    setIsFacilityMapOpen,
    setIsInventoryOpen,
    heistMode,
    toggleHeistMode
  } = useGame();

  const isLockdown = lockdownActive && !escapeComplete;

  useEffect(() => {
    if (audioEnabled) {
      sound.startAmbientDrone();
    } else {
      sound.stopAmbientDrone();
    }
  }, [audioEnabled]);

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-500 border-b select-none font-mono ${
      isLockdown 
        ? 'bg-[#180A0A]/95 border-[#B85C5C]/60 shadow-[0_4px_25px_rgba(184,92,92,0.25)]' 
        : 'bg-[#070B12]/95 border-[#263140]'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Left Brand & Heist Status */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div 
              onClick={onExitHeist}
              className="flex items-center space-x-2 cursor-pointer group py-1"
              title="Return to Main Dashboard"
            >
              <img 
                src={getAssetUrl('/images/logo.png')} 
                alt="CEC HEIST" 
                className="h-6 sm:h-8 object-contain group-hover:brightness-110 transition-all"
              />
            </div>

            {/* Heist Status Badge */}
            <div className="hidden md:flex items-center space-x-2 pl-3 border-l border-[#263140]">
              <span className={`w-2 h-2 rounded-full ${
                escapeComplete 
                  ? 'bg-[#4FB286] animate-pulse shadow-[0_0_8px_#4FB286]' 
                  : isLockdown 
                    ? 'bg-[#B85C5C] animate-ping shadow-[0_0_8px_#B85C5C]' 
                    : 'bg-[#C8A96B] animate-pulse'
              }`} />
              <div className="text-[11px] leading-tight">
                <div className="text-[#8D98A8] text-[9px] uppercase tracking-widest font-semibold">HEIST STATUS</div>
                <div className={`font-bold tracking-wider ${
                  escapeComplete 
                    ? 'text-[#4FB286]' 
                    : isLockdown 
                      ? 'text-[#B85C5C] animate-pulse' 
                      : 'text-[#F4F5F7]'
                }`}>
                  {escapeComplete ? 'OPERATION ESCAPED' : (isLockdown ? 'FACILITY LOCKDOWN' : 'ACTIVE INFILTRATION')}
                </div>
              </div>
            </div>
          </div>

          {/* Center Telemetry: CREW / TIME / SCORE */}
          <div className="flex items-center space-x-3 sm:space-x-6 text-xs">
            {/* Crew Identifier */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-[#0C111A] px-2.5 py-1 border border-[#263140]">
              <Users className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="text-[#8D98A8] text-[10px]">CREW:</span>
              <span className="font-bold text-[#F4F5F7] tracking-wider">{crewName || "GHOST-07"}</span>
            </div>

            {/* Competition or Lockdown Timer */}
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 border ${
              isLockdown 
                ? 'bg-[#B85C5C]/15 border-[#B85C5C] text-[#B85C5C] animate-pulse' 
                : 'bg-[#0C111A] border-[#263140] text-[#F4F5F7]'
            }`}>
              <Clock className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="text-[#8D98A8] text-[10px] hidden xs:inline">
                {isLockdown ? 'LOCKDOWN:' : 'TIME:'}
              </span>
              <span className="font-black tracking-widest">
                {isLockdown ? formatTimer(lockdownSecondsRemaining) : formatTimer(secondsRemaining)}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center space-x-1.5 bg-[#0C111A] px-2.5 py-1 border border-[#263140]">
              <Trophy className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="text-[#8D98A8] text-[10px] hidden xs:inline">SCORE:</span>
              <span className="font-bold text-[#4FB286] tracking-wider">
                {formatScore(currentPlayer.score || 0)}
              </span>
            </div>
          </div>

          {/* Right Action Utilities: Mode Toggle, Map, Inventory, Audio, Exit */}
          <div className="flex items-center space-x-2 font-mono">
            {/* Mode Switch: EXPLORATION (Free-Roam) vs COMPETITION (Locked) */}
            <button
              onClick={toggleHeistMode}
              title={heistMode === 'EXPLORATION' ? "Mode: Free-Roam (Click to switch to Competition Locked Mode)" : "Mode: Competition Locked (Click to switch to Dev Free-Roam)"}
              className={`hidden sm:flex items-center space-x-1.5 px-2 sm:px-2.5 py-1.5 text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                heistMode === 'EXPLORATION'
                  ? 'bg-[#C8A96B]/10 border-[#C8A96B] text-[#C8A96B] hover:bg-[#C8A96B]/20'
                  : 'bg-[#4FB286]/10 border-[#4FB286] text-[#4FB286] hover:bg-[#4FB286]/20'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${heistMode === 'EXPLORATION' ? 'bg-[#C8A96B]' : 'bg-[#4FB286] animate-pulse'}`} />
              <span className="hidden lg:inline">{heistMode === 'EXPLORATION' ? 'DEV: FREE-ROAM' : 'COMPETITION'}</span>
              <span className="lg:hidden">{heistMode === 'EXPLORATION' ? 'ROAM' : 'LOCK'}</span>
            </button>

            {/* Facility Map Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsFacilityMapOpen(true);
              }}
              title="Open Facility Map"
              className="hidden sm:flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 bg-[#0C111A] hover:bg-[#121923] border border-[#263140] hover:border-[#C8A96B] text-[11px] text-[#F4F5F7] transition-colors cursor-pointer"
            >
              <Map className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="hidden md:inline">MAP</span>
            </button>

            {/* Inventory Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsInventoryOpen(true);
              }}
              title="Inspect Inventory"
              className="relative flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 bg-[#0C111A] hover:bg-[#121923] border border-[#263140] hover:border-[#C8A96B] text-[11px] text-[#F4F5F7] transition-colors cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="hidden md:inline">GEAR</span>
              {inventory.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C8A96B] text-[#070B12] text-[9px] font-black flex items-center justify-center -mr-1">
                  {inventory.length}
                </span>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={audioEnabled ? "Disable Tactical Audio" : "Enable Tactical Audio"}
              className="p-1.5 bg-[#0C111A] hover:bg-[#121923] border border-[#263140] hover:border-[#C8A96B] text-[#8D98A8] hover:text-[#C8A96B] transition-colors cursor-pointer"
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#C8A96B]" /> : <VolumeX className="w-3.5 h-3.5 text-[#8D98A8]" />}
            </button>

            {/* Return to Main Dashboard / Exit */}
            <button
              onClick={onExitHeist}
              title="Exit Heist View"
              className="flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 bg-[#0C111A] hover:bg-[#263140]/50 border border-[#263140] hover:border-[#EF4444] text-[11px] text-[#EF4444] sm:text-[#8D98A8] hover:text-[#F4F5F7] transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-3.5 h-3.5 text-[#EF4444]" />
              <span className="hidden xs:inline">EXIT</span>
            </button>
          </div>

        </div>
      </div>

      {/* Emergency Lockdown Ribbon if active */}
      {isLockdown && (
        <div className="bg-[#B85C5C] text-[#070B12] px-4 py-1 text-[11px] font-bold text-center tracking-widest uppercase flex items-center justify-center space-x-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>WARNING: DIGITAL ASSET EXFILTRATED // MAXIMUM FACILITY LOCKDOWN ACTIVE // RETREAT TO EGRESS SHAFT</span>
          <AlertTriangle className="w-3.5 h-3.5" />
        </div>
      )}
    </header>
  );
}
