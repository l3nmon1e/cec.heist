import React from 'react';
import { useGame } from '../../context/GameContext';
import { Target, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ObjectivePanel({ 
  objective, 
  description, 
  isCompleted = false, 
  onNextRoom = null,
  nextRoomName = null,
  className = "" 
}) {
  const { heistMode } = useGame();
  const isExploration = heistMode === 'EXPLORATION';
  const canAdvance = isCompleted || isExploration;
  return (
    <div className={`relative bg-[#0C111A]/90 backdrop-blur-md border ${
      isCompleted ? 'border-[#4FB286]/50 shadow-[0_0_20px_rgba(79,178,134,0.15)]' : 'border-[#263140]'
    } p-3 sm:p-4 font-mono transition-all duration-300 ${className}`}>
      
      {/* Top Status Header */}
      <div className="flex items-center justify-between gap-2 mb-1.5 select-none">
        <div className="flex items-center space-x-2">
          {isCompleted ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-[#4FB286] animate-pulse" />
          ) : (
            <Target className="w-3.5 h-3.5 text-[#C8A96B] animate-spin-slow" />
          )}
          <span className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase ${
            isCompleted ? 'text-[#4FB286]' : 'text-[#C8A96B]'
          }`}>
            {isCompleted ? 'OBJECTIVE COMPLETE' : 'CURRENT OBJECTIVE'}
          </span>
        </div>

        <span className={`text-[9px] px-2 py-0.5 uppercase tracking-wider font-semibold border ${
          isCompleted 
            ? 'bg-[#4FB286]/15 border-[#4FB286]/40 text-[#4FB286]' 
            : 'bg-[#C8A96B]/10 border-[#C8A96B]/30 text-[#C8A96B]'
        }`}>
          {isCompleted ? 'ACCESS GRANTED' : 'OPERATION ACTIVE'}
        </span>
      </div>

      {/* Main Objective Title */}
      <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#F4F5F7] tracking-wide mb-1">
        {objective}
      </h3>

      {/* Supporting Text / Instructions */}
      {description && (
        <p className="text-[11px] sm:text-xs text-[#8D98A8] font-sans leading-relaxed">
          {description}
        </p>
      )}

      {/* Action to proceed */}
      {canAdvance && onNextRoom && (
        <div className="mt-3 pt-2.5 border-t border-[#263140]/60 flex items-center justify-between">
          <span className="text-[10px] text-[#4FB286]">
            {isCompleted ? 'DOOR PROTOCOL UNLOCKED' : 'EXPLORATION ACCESS CLEAR'}
          </span>
          <button
            onClick={onNextRoom}
            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#C8A96B] hover:bg-[#E5D0A0] text-[#070B12] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
          >
            <span>ADVANCE TO {nextRoomName || 'NEXT ROOM'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
