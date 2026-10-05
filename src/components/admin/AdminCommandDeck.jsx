import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { HEIST_STAGES_CONFIG } from '../../data/heistGameData';
import { sound } from '../../utils/audio';
import { formatTimer } from '../../utils/formatters';
import { 
  Play, 
  Pause, 
  Clock, 
  ShieldAlert, 
  Radio, 
  Lock, 
  Unlock, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2,
  Send,
  Zap,
  Layers
} from 'lucide-react';

export function AdminCommandDeck() {
  const {
    secondsRemaining,
    overrideTimer,
    isGamePaused,
    setIsGamePaused,
    lockdownActive,
    lockdownSecondsRemaining,
    triggerLockdown,
    heistMode,
    toggleHeistMode,
    broadcastMessage,
    setGlobalBroadcast,
    resetAllProgress,
    unlockedRooms,
    unlockRoom,
    isRoomCompleted,
    missions
  } = useGame();

  const [announcementInput, setAnnouncementInput] = useState(broadcastMessage || '');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setGlobalBroadcast(announcementInput.trim());
  };

  const handleClearBroadcast = () => {
    sound.playClick();
    setAnnouncementInput('');
    setGlobalBroadcast('');
  };

  const handleAdjustTimer = (secondsDelta) => {
    sound.playClick();
    overrideTimer(secondsRemaining + secondsDelta);
  };

  return (
    <div className="space-y-6 font-mono text-[#F4F5F7]">
      
      {/* 1. TOP TELEMETRY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#0C111A] border border-[#263140] p-4 space-y-1">
          <span className="text-[10px] text-[#8D98A8] uppercase tracking-wider block">HEIST STATUS</span>
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isGamePaused ? 'bg-[#D6A85F]' : 'bg-[#4FB286] animate-pulse'}`} />
            <span className="text-sm sm:text-base font-black tracking-wider text-[#F4F5F7]">
              {isGamePaused ? 'PAUSED' : 'LIVE RUNNING'}
            </span>
          </div>
        </div>

        <div className="bg-[#0C111A] border border-[#263140] p-4 space-y-1">
          <span className="text-[10px] text-[#8D98A8] uppercase tracking-wider block">COUNTDOWN TIMER</span>
          <div className="text-sm sm:text-base font-black tracking-wider text-[#C8A96B]">
            {formatTimer(secondsRemaining)}
          </div>
        </div>

        <div className="bg-[#0C111A] border border-[#263140] p-4 space-y-1">
          <span className="text-[10px] text-[#8D98A8] uppercase tracking-wider block">FACILITY LOCKDOWN</span>
          <div className={`text-sm sm:text-base font-black tracking-wider ${lockdownActive ? 'text-[#B85C5C] animate-pulse' : 'text-[#4FB286]'}`}>
            {lockdownActive ? `ACTIVE (${formatTimer(lockdownSecondsRemaining)})` : 'DISENGAGED'}
          </div>
        </div>

        <div className="bg-[#0C111A] border border-[#263140] p-4 space-y-1">
          <span className="text-[10px] text-[#8D98A8] uppercase tracking-wider block">PROGRESSION MODE</span>
          <div className="text-sm sm:text-base font-black tracking-wider text-[#F4F5F7]">
            {heistMode === 'EXPLORATION' ? 'FREE ROAM (UNLOCKED)' : 'STRICT COMPETITION'}
          </div>
        </div>
      </div>

      {/* 2. MASTER TIMER & EMERGENCY SWITCHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Game State & Timer Switchboard */}
        <div className="bg-[#0C111A] border border-[#263140] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#263140] pb-2">
            <span className="text-xs font-bold text-[#C8A96B] uppercase tracking-wider flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>TIME & EXECUTION CONTROL</span>
            </span>
            <span className="text-[10px] text-[#8D98A8]">0xSYS-EXEC</span>
          </div>

          {/* Pause / Resume Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                sound.playClick();
                setIsGamePaused(!isGamePaused);
              }}
              className={`flex-1 py-2.5 px-4 font-black uppercase text-xs tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                isGamePaused 
                  ? 'bg-[#4FB286] hover:bg-[#5fc597] text-[#070B12]' 
                  : 'bg-[#D6A85F] hover:bg-[#e4be78] text-[#070B12]'
              }`}
            >
              {isGamePaused ? (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>RESUME COMPETITION</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>PAUSE COMPETITION</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                toggleHeistMode();
              }}
              className={`flex-1 py-2.5 px-4 font-black uppercase text-xs tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer border ${
                heistMode === 'EXPLORATION'
                  ? 'bg-[#C8A96B]/20 border-[#C8A96B] text-[#C8A96B]'
                  : 'bg-[#121923] hover:bg-[#263140] border-[#263140] text-[#8D98A8]'
              }`}
            >
              {heistMode === 'EXPLORATION' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{heistMode === 'EXPLORATION' ? 'ALL ROOMS UNLOCKED' : 'STRICT SECTOR LOCKS'}</span>
            </button>
          </div>

          {/* Timer Adjusters */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] text-[#8D98A8] uppercase">QUICK TIMER ADJUSTMENTS</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                onClick={() => handleAdjustTimer(900)}
                className="py-1.5 px-2 bg-[#121923] hover:bg-[#263140] border border-[#263140] text-[#F4F5F7] transition-colors cursor-pointer"
              >
                +15 MIN
              </button>
              <button
                onClick={() => handleAdjustTimer(1800)}
                className="py-1.5 px-2 bg-[#121923] hover:bg-[#263140] border border-[#263140] text-[#F4F5F7] transition-colors cursor-pointer"
              >
                +30 MIN
              </button>
              <button
                onClick={() => handleAdjustTimer(-600)}
                className="py-1.5 px-2 bg-[#121923] hover:bg-[#263140] border border-[#263140] text-[#B85C5C] transition-colors cursor-pointer"
              >
                -10 MIN
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  overrideTimer(10800);
                }}
                className="py-1.5 px-2 bg-[#121923] hover:bg-[#263140] border border-[#263140] text-[#C8A96B] transition-colors cursor-pointer"
              >
                SET 3 HRS
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Lockdown Controller */}
        <div className="bg-[#0C111A] border border-[#263140] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#263140] pb-2">
            <span className="text-xs font-bold text-[#B85C5C] uppercase tracking-wider flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4" />
              <span>FACILITY LOCKDOWN INTERLOCKS</span>
            </span>
            <span className="text-[10px] text-[#8D98A8]">0xALARM-TRIGGER</span>
          </div>

          <p className="text-xs text-[#8D98A8] font-sans leading-relaxed">
            Triggering the emergency lockdown immediately activates facility sirens, forces the emergency exfiltration countdown, and alerts all competing crews.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                sound.playLockdown();
                triggerLockdown();
              }}
              className="w-full py-3 px-4 bg-[#B85C5C] hover:bg-[#c96b6b] text-[#070B12] font-black uppercase text-xs tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(184,92,92,0.3)] transition-all cursor-pointer active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 animate-ping" />
              <span>MANUALLY TRIGGER MAXIMUM LOCKDOWN SIRENS</span>
            </button>
          </div>
        </div>

      </div>

      {/* 3. GLOBAL BROADCAST BANNER CONTROLLER */}
      <div className="bg-[#0C111A] border border-[#263140] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#263140] pb-2">
          <span className="text-xs font-bold text-[#C8A96B] uppercase tracking-wider flex items-center space-x-2">
            <Radio className="w-4 h-4" />
            <span>LIVE SYSTEM ANNOUNCEMENT BROADCAST</span>
          </span>
          {broadcastMessage && (
            <span className="text-[10px] text-[#4FB286] font-bold animate-pulse">● BROADCAST ACTIVE ON ALL CLIENTS</span>
          )}
        </div>

        <form onSubmit={handleBroadcastSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={announcementInput}
              onChange={(e) => setAnnouncementInput(e.target.value)}
              placeholder="e.g.: 'Notice: Sector 4 Modbus challenge hint has been released! 30 mins remaining!'"
              className="w-full bg-[#070B12] border border-[#263140] focus:border-[#C8A96B] p-3 text-xs sm:text-sm text-[#F4F5F7] tracking-wider focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#C8A96B] hover:bg-[#d6b779] text-[#070B12] font-black uppercase text-xs tracking-wider flex items-center space-x-2 cursor-pointer transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SEND BROADCAST BANNER</span>
            </button>

            {broadcastMessage && (
              <button
                type="button"
                onClick={handleClearBroadcast}
                className="py-2.5 px-4 bg-[#121923] hover:bg-[#263140] border border-[#263140] text-[#B85C5C] text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                CLEAR ACTIVE BANNER
              </button>
            )}
          </div>
        </form>

        {/* Live Preview */}
        {broadcastMessage && (
          <div className="bg-[#121923] border border-[#C8A96B]/50 p-3 flex items-center space-x-3 text-xs">
            <span className="text-[#C8A96B] font-bold text-[10px] uppercase shrink-0">PREVIEW:</span>
            <span className="text-[#F4F5F7] truncate">{broadcastMessage}</span>
          </div>
        )}
      </div>

      {/* 4. SECTOR MATRIX (ONE-CLICK ROOM OVERRIDES) */}
      <div className="bg-[#0C111A] border border-[#263140] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#263140] pb-2">
          <span className="text-xs font-bold text-[#C8A96B] uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4" />
            <span>SECTOR ACCESS MATRIX (8 PHYSICAL ROOMS)</span>
          </span>
          <span className="text-[10px] text-[#8D98A8]">CLICK SECTOR TO TOGGLE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {HEIST_STAGES_CONFIG.slice(1).map((stage, idx) => {
            const isCompleted = isRoomCompleted(stage.id);
            const isUnlocked = heistMode === 'EXPLORATION' || unlockedRooms.includes(stage.id) || idx === 0;

            return (
              <div
                key={stage.id}
                onClick={() => {
                  sound.playClick();
                  unlockRoom(stage.id);
                }}
                className={`p-3.5 border transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-[#070B12] border-[#4FB286]/50 hover:border-[#4FB286]'
                    : isUnlocked
                      ? 'bg-[#070B12] border-[#C8A96B]/50 hover:border-[#C8A96B]'
                      : 'bg-[#070B12]/80 border-[#263140] opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-[#8D98A8] font-bold uppercase">ROOM 0{idx + 1}</span>
                  <span className={`text-[10px] font-bold ${isCompleted ? 'text-[#4FB286]' : isUnlocked ? 'text-[#C8A96B]' : 'text-[#8D98A8]'}`}>
                    {isCompleted ? 'CLEARED' : isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
                <div className="font-bold text-[#F4F5F7] tracking-wider truncate mb-1">
                  {stage.title}
                </div>
                <div className="text-[10px] text-[#8D98A8] truncate">
                  Key: {stage.primaryMissionId}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. DANGER ZONE / FACTORY RESET */}
      <div className="bg-[#180A0A]/60 border border-[#B85C5C]/40 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-[#B85C5C] uppercase tracking-wider mb-1 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>FACTORY RESET & WIPE COMPETITION STATE</span>
          </div>
          <p className="text-xs text-[#8D98A8] font-sans">
            Wipes all flag submissions, resets room clearance to Room 01, and resets the timer.
          </p>
        </div>

        <div>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-5 py-2.5 bg-[#180A0A] hover:bg-[#B85C5C] border border-[#B85C5C] text-[#B85C5C] hover:text-[#070B12] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              FACTORY RESET
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  resetAllProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 bg-[#B85C5C] text-[#070B12] text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                CONFIRM WIPE
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-2 bg-[#121923] text-[#8D98A8] text-xs uppercase"
              >
                CANCEL
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default AdminCommandDeck;
