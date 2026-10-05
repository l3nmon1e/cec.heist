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
  Sliders,
  Lock,
  Unlock
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
        ? 'bg-[#180A0A]/95 border-[#B85C5C]/60 shadow-[0_2px_15px_rgba(184,92,92,0.25)]' 
        : 'bg-[#070B12]/95 border-[#263140]'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-13 gap-2">
          
          {/* Left: Brand & Current Stage */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div 
              onClick={onExitHeist}
              className="flex items-center space-x-2 cursor-pointer group py-1"
              title="Return to Main Dashboard"
            >
              <img 
                src={getAssetUrl('/images/logo.png')} 
                alt="CEC HEIST" 
                className="h-5 sm:h-6 object-contain group-hover:brightness-110 transition-all"
              />
              <span className="font-black text-xs sm:text-sm tracking-wider text-[#F4F5F7] hidden sm:inline">
                CEC HEIST
              </span>
            </div>

            {/* Current Stage Badge */}
            {currentStageTitle && (
              <div className="flex items-center space-x-1.5 pl-3 border-l border-[#263140] text-xs">
                <span className="text-[#8D98A8] text-[10px] hidden md:inline">CURRENT STAGE:</span>
                <span className="font-bold text-[#C8A96B] tracking-wider uppercase text-[11px] sm:text-xs">
                  {currentStageTitle}
                </span>
              </div>
            )}
          </div>

          {/* Center: CREW • TIMER • SCORE */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-xs">
            {/* Crew Identifier */}
            <div className="hidden md:flex items-center space-x-1 text-[#8D98A8]">
              <span className="text-[10px]">CREW:</span>
              <span className="font-bold text-[#F4F5F7] tracking-wider">{crewName || "GHOST-07"}</span>
            </div>

            {/* Timer */}
            <div className={`flex items-center space-x-1 font-bold ${
              isLockdown ? 'text-[#B85C5C] animate-pulse' : 'text-[#F4F5F7]'
            }`}>
              <Clock className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="text-[10px] text-[#8D98A8] hidden sm:inline">
                {isLockdown ? 'LOCKDOWN:' : 'TIMER:'}
              </span>
              <span className="tracking-widest">
                {isLockdown ? formatTimer(lockdownSecondsRemaining) : formatTimer(secondsRemaining)}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center space-x-1">
              <Trophy className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="text-[10px] text-[#8D98A8] hidden sm:inline">SCORE:</span>
              <span className="font-bold text-[#4FB286] tracking-wider">
                {formatScore(currentPlayer.score || 0)}
              </span>
            </div>
          </div>

          {/* Right Action Utilities: UNLOCK ALL, MAP, GEAR, SOUND, EXIT */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 text-xs font-mono">
            {/* Unlock All Rooms Toggle (Dev/Testing Mode) */}
            <button
              onClick={toggleHeistMode}
              title={heistMode === 'EXPLORATION' ? "Lock Rooms (Enforce Strict Progression)" : "Unlock All Rooms (Free Roam Mode)"}
              className={`flex items-center space-x-1 px-2 py-1 text-[11px] font-mono transition-all cursor-pointer rounded-xs border ${
                heistMode === 'EXPLORATION'
                  ? 'bg-[#C8A96B]/20 border-[#C8A96B] text-[#C8A96B] shadow-[0_0_10px_rgba(200,169,107,0.3)]'
                  : 'bg-[#0C111A] hover:bg-[#121923] border-[#263140] hover:border-[#C8A96B] text-[#8D98A8] hover:text-[#F4F5F7]'
              }`}
            >
              {heistMode === 'EXPLORATION' ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span className="font-bold">UNLOCKED</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#8D98A8]" />
                  <span className="hidden sm:inline">UNLOCK ALL</span>
                  <span className="sm:hidden">UNLOCK</span>
                </>
              )}
            </button>

            {/* Facility Map Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsFacilityMapOpen(true);
              }}
              title="Open Facility Map"
              className="flex items-center space-x-1 px-2 py-1 bg-[#0C111A] hover:bg-[#121923] border border-[#263140] hover:border-[#C8A96B] text-[11px] text-[#F4F5F7] transition-colors cursor-pointer rounded-xs"
            >
              <Map className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>MAP</span>
            </button>

            {/* Inventory Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                setIsInventoryOpen(true);
              }}
              title="Inspect Inventory"
              className="relative flex items-center space-x-1 px-2 py-1 bg-[#0C111A] hover:bg-[#121923] border border-[#263140] hover:border-[#C8A96B] text-[11px] text-[#F4F5F7] transition-colors cursor-pointer rounded-xs"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span className="hidden sm:inline">GEAR</span>
              {inventory.length > 0 && (
                <span className="w-3.5 h-3.5 rounded-full bg-[#C8A96B] text-[#070B12] text-[9px] font-black flex items-center justify-center">
                  {inventory.length}
                </span>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={audioEnabled ? "Disable Sound" : "Enable Sound"}
              className="p-1.5 bg-[#0C111A] hover:bg-[#121923] border border-[#263140] hover:border-[#C8A96B] text-[#8D98A8] hover:text-[#C8A96B] transition-colors cursor-pointer rounded-xs"
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#C8A96B]" /> : <VolumeX className="w-3.5 h-3.5 text-[#8D98A8]" />}
            </button>

            {/* Exit */}
            <button
              onClick={onExitHeist}
              title="Exit Heist"
              className="flex items-center space-x-1 px-2 py-1 bg-[#0C111A] hover:bg-[#263140]/60 border border-[#263140] hover:border-[#B85C5C] text-[11px] text-[#8D98A8] hover:text-[#B85C5C] transition-colors cursor-pointer rounded-xs ml-1"
            >
              <LogOut className="w-3.5 h-3.5" />
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
