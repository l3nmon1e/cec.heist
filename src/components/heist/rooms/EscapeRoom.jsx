import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useGame } from '../../../context/GameContext';
import { HEIST_STAGES_CONFIG } from '../../../data/heistGameData';
import ObjectivePanel from '../ObjectivePanel';
import CrewAvatar from '../CrewAvatar';
import InteractiveObject from '../InteractiveObject';
import Door from '../Door';
import DirectRouteGuard from '../DirectRouteGuard';
import { sound } from '../../../utils/audio';
import { formatTimer, formatScore, getAssetUrl } from '../../../utils/formatters';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Trophy, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function EscapeRoom() {
  const navigate = useNavigate();
  const { 
    openInGameMission, 
    missions, 
    lockdownSecondsRemaining, 
    escapeComplete, 
    triggerEscapeComplete,
    crewName,
    currentPlayer,
    resetAllProgress
  } = useGame();

  const stage = HEIST_STAGES_CONFIG.find(s => s.id === 'escape');
  const [isEscapedState, setIsEscapedState] = useState(escapeComplete);

  const primaryMission = missions.find(m => m.id === stage.primaryMissionId);
  const isMissionSolved = primaryMission?.status === 'SOLVED' || escapeComplete;

  const handleInteract = (obj) => {
    if (obj.type === 'door') {
      if (isMissionSolved) {
        handleFinalEscape();
      } else {
        sound.playError();
      }
      return;
    }

    if (obj.missionId) {
      openInGameMission(obj.missionId);
    }
  };

  const handleFinalEscape = () => {
    sound.playSuccess();
    triggerEscapeComplete();
    setIsEscapedState(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <DirectRouteGuard stageId="escape">
      <div className="w-full flex-1 flex flex-col justify-between py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 font-mono select-none">
        
        {/* Top Emergency Lockdown Banner */}
        <div className="bg-[#180A0A] border-2 border-[#B85C5C] p-4 text-[#F4F5F7] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_0_30px_rgba(184,92,92,0.3)]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#B85C5C]/20 border border-[#B85C5C] flex items-center justify-center text-[#B85C5C] shrink-0 animate-ping">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-[#B85C5C] font-black tracking-widest uppercase">
                CRITICAL WARNING // MAXIMUM FACILITY LOCKDOWN
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#F4F5F7] tracking-wider uppercase">
                EMERGENCY EXFILTRATION IN PROGRESS
              </h2>
            </div>
          </div>

          <div className="bg-[#070B12] px-4 py-2 border border-[#B85C5C] flex items-center space-x-3 text-sm">
            <span className="text-[#8D98A8] text-xs">LOCKDOWN TIMER:</span>
            <span className="text-[#B85C5C] font-black tracking-widest text-base sm:text-lg animate-pulse">
              {formatTimer(lockdownSecondsRemaining)}
            </span>
          </div>
        </div>

        {/* Environmental Panoramic Viewport (Corridors Under Lockdown) */}
        <div className="relative min-h-[380px] sm:min-h-[440px] bg-[#120808] border-2 border-[#B85C5C]/50 overflow-hidden flex flex-col justify-between p-4 sm:p-6 shadow-2xl">
          {/* Photographic Corridor Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-color-dodge filter hue-rotate-[320deg] scale-100 hover:scale-[1.01] transition-transform duration-700 pointer-events-none"
            style={{ backgroundImage: `url('${getAssetUrl(stage.bgImage)}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-transparent to-[#180A0A]/80 pointer-events-none" />
          
          {/* Emergency Strobe Glow */}
          <div className="absolute inset-0 bg-[#B85C5C]/10 animate-pulse pointer-events-none" />

          {/* Top In-World Floating HUD */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <CrewAvatar isMoving={isEscapedState} />

            <div className="text-xs bg-[#070B12]/90 border border-[#B85C5C] px-3 py-1 text-[#B85C5C] font-bold animate-pulse">
              HYDRAULIC STATUS: {isMissionSolved ? "BYPASS ENGAGED (OPEN)" : "BULKHEADS SEALED"}
            </div>
          </div>

          {/* Mid World Escape Graphic */}
          <div className="relative z-10 my-4 text-center">
            <div className="inline-block bg-[#070B12]/95 border border-[#B85C5C] p-4 sm:p-6 max-w-lg backdrop-blur-md">
              <Flame className="w-8 h-8 text-[#B85C5C] mx-auto mb-2 animate-bounce" />
              <div className="text-xs font-bold text-[#F4F5F7] tracking-wider uppercase mb-1">
                SECTOR-EXFIL // SURFACE EGRESS SHAFT
              </div>
              <p className="text-[11px] text-[#8D98A8] font-sans">
                "The emergency exit has been locked. Restore the facility's exit hydraulic system before lockdown reaches maximum security."
              </p>
            </div>
          </div>

          {/* Bottom Objective Panel */}
          <div className="relative z-10">
            <ObjectivePanel
              objective={stage.objective}
              description={stage.objectiveDescription}
              isCompleted={isMissionSolved}
              onNextRoom={handleFinalEscape}
              nextRoomName="SURFACE EXFIL"
            />
          </div>
        </div>

        {/* Interactive In-World Objects & Exit Blast Door */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stage.interactiveObjects.map((obj) => (
            <InteractiveObject
              key={obj.id}
              object={obj}
              isCompleted={isMissionSolved}
              onInteract={handleInteract}
            />
          ))}
        </div>

        {/* Final Blast Gate Door Component */}
        <Door
          name={stage.doorName}
          status={isMissionSolved ? 'OPEN' : 'LOCKED'}
          onOpen={handleFinalEscape}
          nextRoomName="SURFACE EXFIL"
        />

        {/* ==================================================== */}
        {/* 23. FINAL VICTORY CINEMATIC COMPLETION SCREEN */}
        {/* ==================================================== */}
        {isEscapedState && (
          <div className="fixed inset-0 z-50 bg-[#070B12]/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-xl w-full bg-[#0C111A] border-2 border-[#C8A96B] p-6 sm:p-8 text-center space-y-6 shadow-[0_0_50px_rgba(200,169,107,0.35)] my-auto">
              
              {/* Gold Trophy Emblem */}
              <div className="w-20 h-20 rounded-full bg-[#C8A96B]/20 border-2 border-[#C8A96B] text-[#C8A96B] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(200,169,107,0.4)] animate-bounce">
                <Trophy className="w-10 h-10" />
              </div>

              {/* Title & Victory Lore */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#C8A96B] tracking-[0.3em] uppercase">
                  OPERATION DEBRIEFING // CLEAN EXTRACTION
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-[#F4F5F7] tracking-wider uppercase">
                  HEIST COMPLETE
                </h1>
                <p className="text-xs sm:text-sm text-[#8D98A8] font-sans max-w-md mx-auto leading-relaxed">
                  The facility's master cryptographic asset has been successfully secured and extracted. Your heist crew vanished with zero detection.
                </p>
              </div>

              {/* Stats Summary Grid (Requirement 23) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-left bg-[#070B12] p-4 border border-[#263140]">
                <div>
                  <span className="text-[10px] text-[#8D98A8] uppercase block">ASSET</span>
                  <span className="font-bold text-[#4FB286]">SECURED</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8D98A8] uppercase block">CREW</span>
                  <span className="font-bold text-[#C8A96B]">{crewName || "SPECTRE-9"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8D98A8] uppercase block">STATUS</span>
                  <span className="font-bold text-[#4FB286]">ESCAPED</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8D98A8] uppercase block">MISSIONS SOLVED</span>
                  <span className="font-bold text-[#F4F5F7]">{currentPlayer.solvedCount} / {missions.length}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8D98A8] uppercase block">FINAL SCORE</span>
                  <span className="font-bold text-[#C8A96B]">{formatScore(currentPlayer.score)} PTS</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8D98A8] uppercase block">GLOBAL RANK</span>
                  <span className="font-bold text-[#F4F5F7]">#{currentPlayer.rank}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => navigate('/leaderboard')}
                  className="flex-1 px-5 py-3 bg-[#C8A96B] hover:bg-[#E5D0A0] text-[#070B12] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                >
                  <Trophy className="w-4 h-4" />
                  <span>VIEW LEADERBOARD</span>
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="px-5 py-3 bg-[#121923] hover:bg-[#263140] border border-[#263140] text-[#F4F5F7] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  EXIT TO HUB
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </DirectRouteGuard>
  );
}
