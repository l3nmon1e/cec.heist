import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import CrewAvatar from './CrewAvatar';
import DirectRouteGuard from './DirectRouteGuard';
import { sound } from '../../utils/audio';
import { getAssetUrl } from '../../utils/formatters';
import { 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Terminal, 
  ShieldAlert, 
  Sparkles 
} from 'lucide-react';

export default function HeistRoomLayout({
  roomNumber = 1,
  roomId = 'recon',
  roomTitle = 'RECONNAISSANCE',
  bgImage = '/assets/heist/facility/facility_wide.jpg',
  objectiveTitle = 'Find the first access point.',
  objectiveDescription = 'Locate the information hidden inside the surveillance system.',
  objectName = 'SURVEILLANCE TERMINAL',
  objectDescription = 'Access the compromised surveillance workstation.',
  objectIcon: ObjectIcon = Terminal,
  actionButtonText = 'INVESTIGATE',
  completedStatusText = 'ACCESS GRANTED',
  nextRoute = '/heist/initial-access',
  nextRoomName = 'INITIAL ACCESS',
  missionId = 'mission-14',
  customCenterpiece = null,
  customSuccessAction = null,
  monitoringBadge = 'PERIMETER SENSORS ONLINE',
  isLockdown = false,
  lockdownTimerText = null,
  isFinalRoom = false,
  finalSuccessContent = null
}) {
  const navigate = useNavigate();
  const { onAdvanceRoom } = useOutletContext() || {};
  const { 
    openInGameMission, 
    isRoomCompleted, 
    missions,
    crewName 
  } = useGame();

  const [isMoving, setIsMoving] = useState(false);

  // Check if mission or room is solved
  const isCompleted = isRoomCompleted(roomId);
  const primaryMission = missions.find(m => m.id === missionId);
  const isMissionSolved = primaryMission?.status === 'SOLVED' || isCompleted;

  const handlePrimaryAction = () => {
    sound.playClick();
    if (missionId) {
      openInGameMission(missionId);
    }
  };

  const handleProceedNext = () => {
    if (customSuccessAction) {
      customSuccessAction();
      return;
    }

    if (!nextRoute) return;

    setIsMoving(true);
    sound.playDoorUnlock();

    setTimeout(() => {
      if (onAdvanceRoom) {
        onAdvanceRoom(nextRoute, nextRoomName || 'NEXT SECTOR');
      } else {
        navigate(nextRoute);
      }
    }, 450);
  };

  const roomNumberFormatted = String(roomNumber).padStart(2, '0');

  return (
    <DirectRouteGuard stageId={roomId}>
      <div className="w-full flex-1 flex flex-col justify-between py-3 sm:py-5 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-4 sm:space-y-5 font-mono select-none">
        
        {/* 1. ROOM TITLE */}
        <div className="flex items-center justify-between border-b border-[#263140]/60 pb-2">
          <div className="space-y-0.5">
            <div className="text-[11px] sm:text-xs text-[#8D98A8] tracking-[0.25em] font-bold uppercase">
              ROOM {roomNumberFormatted}
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#F4F5F7] tracking-wider uppercase">
              {roomTitle}
            </h1>
          </div>

          {/* Discreet Room State Pill */}
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${isMissionSolved ? 'bg-[#4FB286]' : isLockdown ? 'bg-[#B85C5C] animate-ping' : 'bg-[#C8A96B] animate-pulse'}`} />
            <span className="text-[10px] sm:text-xs tracking-widest text-[#8D98A8] uppercase font-bold">
              {isMissionSolved ? 'CLEARED' : isLockdown ? 'LOCKDOWN' : 'ACTIVE'}
            </span>
          </div>
        </div>

        {/* 2. LARGE GAME ENVIRONMENT (70–80% visual focus) */}
        <div className={`relative min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] bg-[#0A0E17] border ${
          isMissionSolved ? 'border-[#4FB286]/40' : isLockdown ? 'border-[#B85C5C]/50' : 'border-[#263140]'
        } overflow-hidden flex flex-col justify-between p-4 sm:p-6 shadow-2xl transition-colors duration-500 rounded-sm`}>
          
          {/* Photographic Room Environment Asset */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-100 transition-transform duration-1000 pointer-events-none"
            style={{ backgroundImage: `url('${getAssetUrl(bgImage)}')` }}
          />

          {/* Controlled Cinematic Lighting & Blueprint Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-[#070B12]/60 to-[#070B12]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

          {/* Top Environment HUD: Crew Presence & Monitoring Status */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            <CrewAvatar isMoving={isMoving} />

            {/* Environmental Monitoring Beacon */}
            {isLockdown ? (
              <div className="flex items-center space-x-2 bg-[#180A0A]/95 border border-[#B85C5C] px-3 py-1.5 text-xs text-[#B85C5C] shadow-[0_0_15px_rgba(184,92,92,0.3)]">
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                <span className="font-bold tracking-wider">{lockdownTimerText || 'LOCKDOWN IMMINENT'}</span>
              </div>
            ) : (
              <div className="font-mono text-[10px] sm:text-xs bg-[#070B12]/90 border border-[#263140] px-3 py-1 text-[#8D98A8]">
                MONITORING: <span className={isMissionSolved ? 'text-[#4FB286] font-bold' : 'text-[#C8A96B]'}>{isMissionSolved ? 'SECTOR SECURED' : monitoringBadge}</span>
              </div>
            )}
          </div>

          {/* CENTER OF ENVIRONMENT: THE INTERACTIVE OBJECT OR CUSTOM VIEWPORT */}
          <div className="relative z-10 my-auto py-6 sm:py-8 flex flex-col items-center justify-center text-center">
            {customCenterpiece ? (
              customCenterpiece
            ) : isMissionSolved ? (
              /* Minimal, Cinematic Access Granted Centerpiece */
              <div className="relative bg-[#070B12]/95 border-2 border-[#4FB286] p-6 sm:p-8 max-w-md w-full shadow-[0_0_45px_rgba(79,178,134,0.25)] backdrop-blur-md overflow-hidden rounded-xs animate-in fade-in zoom-in-95 duration-300 group">
                
                {/* Subtle Digital Scanline Sweep */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(79,178,134,0.04)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4FB286]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Pulsing Hologram Emblem */}
                <div className="relative w-14 h-14 rounded-full bg-[#0C111A] border-2 border-[#4FB286] flex items-center justify-center text-[#4FB286] mx-auto mb-3 shadow-[0_0_25px_rgba(79,178,134,0.4)]">
                  <Unlock className="w-7 h-7 drop-shadow-[0_0_8px_#4FB286]" />
                  <div className="absolute -inset-1 rounded-full border border-[#4FB286]/50 animate-ping opacity-75 pointer-events-none" />
                </div>
                
                {/* Status Badges */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 bg-[#4FB286]/15 border border-[#4FB286]/40 text-[10px] text-[#4FB286] font-black tracking-[0.25em] uppercase mb-2">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>OBJECTIVE COMPLETE</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black text-[#F4F5F7] tracking-[0.15em] uppercase mb-1 font-mono drop-shadow-[0_0_15px_rgba(79,178,134,0.5)]">
                  {completedStatusText || "ACCESS GRANTED"}
                </h3>

                <p className="text-xs text-[#8D98A8] font-sans mb-6">
                  Security perimeter disengaged. Bulkhead interlock unsealed.
                </p>

                {nextRoute ? (
                  <button
                    onClick={handleProceedNext}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-[#4FB286] to-[#34D399] hover:from-[#5fc597] hover:to-[#4ade80] text-[#070B12] font-black uppercase tracking-[0.15em] text-sm font-mono flex items-center justify-center space-x-2 transition-all shadow-[0_0_25px_rgba(79,178,134,0.4)] hover:shadow-[0_0_35px_rgba(79,178,134,0.6)] active:scale-95 cursor-pointer rounded-xs"
                  >
                    <span>ENTER NEXT ROOM</span>
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                  </button>
                ) : isFinalRoom && finalSuccessContent ? (
                  finalSuccessContent
                ) : null}
              </div>
            ) : (
              /* One Primary Interactive Object */
              <div className="bg-[#070B12]/90 border border-[#263140] hover:border-[#C8A96B]/60 p-6 sm:p-8 max-w-md w-full shadow-2xl backdrop-blur-md transition-all duration-300 group">
                <div className="w-12 h-12 rounded-full bg-[#0C111A] border border-[#263140] group-hover:border-[#C8A96B] flex items-center justify-center text-[#C8A96B] mx-auto mb-3 transition-colors">
                  <ObjectIcon className="w-6 h-6 animate-pulse" />
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#F4F5F7] tracking-wider uppercase mb-1.5 font-mono">
                  {objectName}
                </h3>

                <p className="text-xs text-[#8D98A8] font-sans mb-6 leading-relaxed">
                  {objectDescription}
                </p>

                <button
                  onClick={handlePrimaryAction}
                  className="w-full py-3 px-6 bg-[#C8A96B] hover:bg-[#d6b779] text-[#070B12] font-black uppercase tracking-wider text-sm font-mono flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(200,169,107,0.25)] hover:shadow-[0_0_30px_rgba(200,169,107,0.4)] active:scale-95 cursor-pointer"
                >
                  <span>{actionButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Bottom Environmental Baseline Hint */}
          <div className="relative z-10 flex items-center justify-between text-[10px] text-[#8D98A8] font-mono border-t border-[#263140]/40 pt-2">
            <span className="flex items-center space-x-1.5">
              {isMissionSolved ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-[#4FB286]" />
                  <span className="text-[#4FB286] font-bold">PHYSICAL LOCKS DISENGAGED</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span>PERIMETER LOCK ENGAGED</span>
                </>
              )}
            </span>
            <span>SEC-{roomNumberFormatted} // CANARA DIGITAL FACILITY</span>
          </div>

        </div>

        {/* 3. CURRENT OBJECTIVE BAR */}
        <div className="bg-[#0C111A] border border-[#263140] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="text-[10px] text-[#C8A96B] font-bold uppercase tracking-widest flex items-center space-x-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isMissionSolved ? 'bg-[#4FB286]' : 'bg-[#C8A96B]'}`} />
              <span>CURRENT OBJECTIVE</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-[#F4F5F7] tracking-wide">
              {objectiveTitle}
            </div>
            <div className="text-xs text-[#8D98A8] font-sans">
              {objectiveDescription}
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0">
            {isMissionSolved ? (
              nextRoute ? (
                <button
                  onClick={handleProceedNext}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#4FB286] hover:bg-[#5fc597] text-[#070B12] font-black uppercase tracking-wider text-xs sm:text-sm font-mono flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(79,178,134,0.3)] active:scale-95"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : null
            ) : (
              <button
                onClick={handlePrimaryAction}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#C8A96B] hover:bg-[#d6b779] text-[#070B12] font-black uppercase tracking-wider text-xs sm:text-sm font-mono flex items-center justify-center space-x-2 transition-all shadow-[0_0_15px_rgba(200,169,107,0.2)] active:scale-95"
              >
                <span>{actionButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 4. MINIMAL PROGRESS INDICATOR */}
        <div className="py-2 text-center font-mono text-xs tracking-widest text-[#8D98A8] select-none">
          <span className="text-[#C8A96B] font-bold">{roomNumberFormatted}</span> / 08
        </div>

      </div>
    </DirectRouteGuard>
  );
}
