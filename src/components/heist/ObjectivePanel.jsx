import React from 'react';
import { useGame } from '../../context/GameContext';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function ObjectivePanel({ 
  objective, 
  description, 
  isCompleted = false, 
  onNextRoom = null,
  nextRoomName = null,
  className = "",
  challengesSolved = null,
  totalChallenges = null
}) {
  const { heistMode } = useGame();
  const isExploration = heistMode === 'EXPLORATION';
  const canAdvance = isCompleted || isExploration;

  const handleAdvance = () => {
    sound.playDoorUnlock();
    if (onNextRoom) onNextRoom();
  };

  return (
    <div className={`relative bg-[#0C111A]/95 backdrop-blur-md border ${
      isCompleted 
        ? 'border-[#4FB286] shadow-[0_0_30px_rgba(79,178,134,0.25)] ring-1 ring-[#4FB286]/40' 
        : 'border-[#263140]'
    } p-4 sm:p-5 font-mono transition-all duration-300 rounded-sm ${className}`}>
      
      {/* Top Status Header */}
      <div className="flex items-center justify-between gap-2 mb-2 select-none">
        <div className="flex items-center space-x-2">
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-[#4FB286] animate-bounce" />
          ) : (
            <Target className="w-4 h-4 text-[#C8A96B] animate-spin-slow" />
          )}
          <span className={`text-[11px] sm:text-xs font-bold tracking-widest uppercase ${
            isCompleted ? 'text-[#4FB286]' : 'text-[#C8A96B]'
          }`}>
            {isCompleted ? 'SECTOR OBJECTIVES COMPLETE' : 'CURRENT SECTOR OBJECTIVES'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {totalChallenges != null && (
            <span className={`text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold border rounded-sm ${
              challengesSolved >= totalChallenges 
                ? 'bg-[#4FB286]/20 border-[#4FB286] text-[#4FB286]' 
                : 'bg-[#C8A96B]/15 border-[#C8A96B]/40 text-[#C8A96B]'
            }`}>
              CHALLENGES: {challengesSolved}/{totalChallenges}
            </span>
          )}
          <span className={`text-[10px] px-2.5 py-0.5 uppercase tracking-wider font-bold border rounded-sm ${
            isCompleted 
              ? 'bg-[#4FB286] text-[#070B12] border-[#4FB286]' 
              : 'bg-[#C8A96B]/10 border-[#C8A96B]/40 text-[#C8A96B]'
          }`}>
            {isCompleted ? 'ACCESS GRANTED' : 'OPERATION ACTIVE'}
          </span>
        </div>
      </div>

      {/* Main Objective Title */}
      <h3 className="text-sm sm:text-base md:text-lg font-black text-[#F4F5F7] tracking-wide mb-1.5">
        {objective}
      </h3>

      {/* Supporting Text / Instructions */}
      {description && (
        <p className="text-xs text-[#8D98A8] font-sans leading-relaxed">
          {description}
        </p>
      )}

      {/* 2-Challenge Sector Rule Notice when incomplete */}
      {!isCompleted && totalChallenges > 1 && (
        <div className="mt-2.5 pt-2 border-t border-[#263140]/60 flex items-center space-x-2 text-[11px] text-[#C8A96B]">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Both sector challenges ({challengesSolved}/{totalChallenges}) must be solved to disengage the exit blast gate.</span>
        </div>
      )}

      {/* Action to proceed: Highlighted for easy discovery */}
      {canAdvance && onNextRoom && (
        <div className="mt-4 pt-3 border-t border-[#4FB286]/30 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#4FB286]/10 p-3 rounded-sm">
          <div className="flex items-center space-x-2 text-[#4FB286] text-xs font-bold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>DOOR PROTOCOL DISENGAGED // PASSAGE READY</span>
          </div>

          <button
            type="button"
            onClick={handleAdvance}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#4FB286] hover:bg-[#3ea075] text-[#070B12] text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(79,178,134,0.4)] hover:scale-105 active:scale-95 cursor-pointer rounded-sm"
          >
            <span>ADVANCE TO {nextRoomName || 'NEXT ROOM'}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}
    </div>
  );
}
