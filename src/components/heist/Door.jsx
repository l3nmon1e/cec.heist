import React from 'react';
import { useGame } from '../../context/GameContext';
import { Lock, Unlock, ArrowRight, ShieldCheck, ShieldAlert, Key } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function Door({ 
  name, 
  status = 'LOCKED', // 'LOCKED' | 'AUTHENTICATING' | 'ACCESS_GRANTED' | 'UNLOCKING' | 'OPEN'
  onOpen, 
  nextRoomName = '', 
  className = "",
  subText = null
}) {
  const { heistMode } = useGame();
  const isExploration = heistMode === 'EXPLORATION';
  const isOpen = status === 'OPEN' || status === 'ACCESS_GRANTED' || status === 'UNLOCKING' || isExploration;

  const handleDoorClick = () => {
    if ((isOpen || isExploration) && onOpen) {
      sound.playDoorUnlock();
      onOpen();
    } else {
      sound.playError();
    }
  };

  return (
    <div 
      onClick={handleDoorClick}
      className={`relative bg-[#0C111A] border ${
        isOpen 
          ? 'border-[#4FB286] ring-2 ring-[#4FB286]/40 shadow-[0_0_35px_rgba(79,178,134,0.3)] bg-gradient-to-b from-[#0C1A14] to-[#0C111A] cursor-pointer' 
          : 'border-[#263140] cursor-not-allowed'
      } p-4 sm:p-5 font-mono select-none overflow-hidden transition-all duration-500 rounded-sm ${className}`}
    >
      
      {/* Background Industrial Hatch Texture */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(38,49,64,0.08)_10px,rgba(38,49,64,0.08)_20px)] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isOpen ? 'bg-[#4FB286] animate-pulse shadow-[0_0_8px_#4FB286]' : 'bg-[#B85C5C] shadow-[0_0_8px_#B85C5C]'
          }`} />
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#F4F5F7] uppercase">
            SECTOR EXIT BARRIER // {name}
          </span>
        </div>

        {/* Status Pill */}
        <span className={`text-[10px] px-3 py-0.5 uppercase tracking-wider font-black border rounded-sm ${
          isOpen 
            ? 'bg-[#4FB286] text-[#070B12] border-[#4FB286] animate-pulse' 
            : 'bg-[#B85C5C]/15 border-[#B85C5C]/40 text-[#B85C5C]'
        }`}>
          {isOpen ? 'UNLOCKED // READY' : status}
        </span>
      </div>

      {/* Door Graphic Visual Representation */}
      <div className="relative z-10 my-4 bg-[#070B12] border border-[#263140] h-28 sm:h-32 rounded flex items-center justify-center overflow-hidden">
        {/* Dual sliding blast door panels */}
        <div className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#121923] border-r border-[#263140] transition-transform duration-1000 flex items-center justify-end pr-2 ${
          isOpen ? '-translate-x-[90%]' : 'translate-x-0'
        }`}>
          <div className="w-1.5 h-16 bg-[#263140] rounded-sm" />
        </div>
        <div className={`absolute top-0 bottom-0 right-0 w-1/2 bg-[#121923] border-l border-[#263140] transition-transform duration-1000 flex items-center justify-start pl-2 ${
          isOpen ? 'translate-x-[90%]' : 'translate-x-0'
        }`}>
          <div className="w-1.5 h-16 bg-[#263140] rounded-sm" />
        </div>

        {/* Center Solenoid / Lock Indicator */}
        <div className="relative z-20 flex flex-col items-center space-y-1">
          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors shadow-lg ${
            isOpen 
              ? 'bg-[#4FB286] border-[#4FB286] text-[#070B12] animate-bounce' 
              : 'bg-[#0C111A] border-[#B85C5C] text-[#B85C5C]'
          }`}>
            {isOpen ? <Unlock className="w-6 h-6 stroke-[3]" /> : <Lock className="w-6 h-6" />}
          </div>
          <span className={`text-[10px] tracking-widest font-bold ${isOpen ? 'text-[#4FB286]' : 'text-[#8D98A8]'}`}>
            {isOpen ? 'SOLENOIDS DISENGAGED' : 'HYDRAULICALLY SEALED'}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#263140]/60">
        <div className="text-[11px] text-[#8D98A8]">
          {isOpen ? (
            <span className="text-[#4FB286] flex items-center space-x-1.5 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>PASSAGE CLEAR // CLICK ANYWHERE ON THIS DOOR TO PROCEED</span>
            </span>
          ) : (
            <span className="text-[#8D98A8] flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-[#B85C5C]" />
              <span>{subText || "CLEAR ROOM OBJECTIVE ABOVE TO DISENGAGE DOOR"}</span>
            </span>
          )}
        </div>

        {isOpen && onOpen && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDoorClick();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#4FB286] hover:bg-[#3ea075] text-[#070B12] text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(79,178,134,0.4)] flex items-center justify-center space-x-2 cursor-pointer rounded-sm hover:scale-105"
          >
            <span>ENTER {nextRoomName || 'NEXT ROOM'}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        )}
      </div>
    </div>
  );
}
