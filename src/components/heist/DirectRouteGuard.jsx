import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { HEIST_STAGES_CONFIG } from '../../data/heistGameData';
import { sound } from '../../utils/audio';
import { ShieldAlert, Lock, ArrowLeft, Target } from 'lucide-react';

export default function DirectRouteGuard({ stageId, children }) {
  const navigate = useNavigate();
  const { isRoomUnlocked, unlockedRooms } = useGame();

  const isUnlocked = isRoomUnlocked(stageId);

  if (!isUnlocked) {
    const currentStage = HEIST_STAGES_CONFIG.find(s => s.id === stageId) || {};
    const requiredStage = HEIST_STAGES_CONFIG.find(s => s.id === currentStage.requiredStageId) || { shortName: "PREVIOUS SECTOR" };
    
    // Find the latest unlocked stage to redirect the player to
    const latestUnlockedId = unlockedRooms[unlockedRooms.length - 1] || 'recon';
    const latestUnlockedStage = HEIST_STAGES_CONFIG.find(s => s.id === latestUnlockedId) || HEIST_STAGES_CONFIG[1];

    return (
      <div className="relative min-h-[70vh] flex items-center justify-center p-4 sm:p-8 font-mono select-none">
        <div className="max-w-md w-full bg-[#0C111A] border-2 border-[#B85C5C] p-6 sm:p-8 shadow-[0_0_30px_rgba(184,92,92,0.25)] text-center space-y-6">
          
          <div className="w-16 h-16 rounded-full bg-[#B85C5C]/15 border-2 border-[#B85C5C] text-[#B85C5C] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(184,92,92,0.3)] animate-pulse">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-[#B85C5C] tracking-[0.25em] uppercase">
              SECURITY CLEARANCE RESTRICTED
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#F4F5F7] tracking-wider uppercase">
              {currentStage.shortName || "SECTOR"} ACCESS DENIED
            </h2>
            <p className="text-xs text-[#8D98A8] font-sans leading-relaxed">
              This digital sector is guarded by active security interlocks. You must complete preceding sector objectives to disengage the blast seals.
            </p>
          </div>

          <div className="bg-[#070B12] p-3 border border-[#263140] text-xs space-y-1">
            <div className="text-[#8D98A8]">REQUIRED CLEARANCE:</div>
            <div className="font-bold text-[#C8A96B] tracking-wider uppercase">
              {requiredStage.title || requiredStage.shortName}
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              navigate(latestUnlockedStage.route || '/heist/recon');
            }}
            className="w-full px-5 py-3 bg-[#C8A96B] hover:bg-[#E5D0A0] text-[#070B12] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
          >
            <Target className="w-4 h-4" />
            <span>RETURN TO CURRENT OBJECTIVE ({latestUnlockedStage.shortName})</span>
          </button>

        </div>
      </div>
    );
  }

  return children;
}
