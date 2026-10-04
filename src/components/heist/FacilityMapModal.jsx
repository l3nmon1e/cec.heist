import React from 'react';
import { useGame } from '../../context/GameContext';
import { HEIST_STAGES_CONFIG } from '../../data/heistGameData';
import { sound } from '../../utils/audio';
import { getAssetUrl } from '../../utils/formatters';
import { 
  X, 
  Map, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  ArrowRight, 
  Shield, 
  Layers,
  Crosshair
} from 'lucide-react';

export default function FacilityMapModal({ currentStageId, onNavigateRoom, onClose }) {
  const { isRoomUnlocked, isRoomCompleted } = useGame();

  return (
    <div className="fixed inset-0 z-50 bg-[#070B12]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Blueprint Container */}
      <div className="relative w-full max-w-4xl bg-[#0C111A] border-2 border-[#263140] shadow-2xl overflow-hidden my-auto font-mono flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-[#121923] border-b border-[#263140] px-4 py-3 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8A96B] animate-pulse" />
            <span className="text-xs font-bold text-[#F4F5F7] tracking-widest uppercase">
              TACTICAL FACILITY SCHEMATIC // SECTOR BLUEPRINT
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 hover:bg-[#263140] text-[#8D98A8] hover:text-[#F4F5F7] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Blueprint Visual & Stage List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Blueprint Telemetry Banner */}
          <div className="relative bg-[#070B12] border border-[#263140] p-4 flex flex-wrap items-center justify-between gap-3 text-xs overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
              style={{ backgroundImage: `url('${getAssetUrl('/assets/heist/backgrounds/technical_blueprint.jpg')}')` }}
            />
            <div className="relative z-10 space-y-1">
              <div className="text-[10px] text-[#C8A96B] font-bold uppercase tracking-wider">
                CANARA CYBER INFRASTRUCTURE
              </div>
              <div className="text-sm font-bold text-[#F4F5F7]">
                SITE-DELTA SUBTERRANEAN COMPLEX
              </div>
            </div>
            <div className="relative z-10 flex items-center space-x-4 text-[11px] text-[#8D98A8]">
              <div>CLEARANCE: <span className="text-[#C8A96B] font-bold">LEVEL-4 OMNI</span></div>
              <div>STAGES: <span className="text-[#F4F5F7] font-bold">9 SECTORS</span></div>
            </div>
          </div>

          {/* Sector Progression Map Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {HEIST_STAGES_CONFIG.map((stage, idx) => {
              const unlocked = isRoomUnlocked(stage.id);
              const completed = isRoomCompleted(stage.id);
              const isCurrent = currentStageId === stage.id;

              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    if (unlocked && onNavigateRoom) {
                      sound.playClick();
                      onNavigateRoom(stage.route);
                      onClose();
                    } else {
                      sound.playError();
                    }
                  }}
                  className={`relative p-3.5 border transition-all select-none ${
                    isCurrent
                      ? 'bg-[#121923] border-[#C8A96B] shadow-[0_0_15px_rgba(200,169,107,0.2)]'
                      : completed
                        ? 'bg-[#0C111A] border-[#4FB286]/50 hover:border-[#4FB286] cursor-pointer'
                        : unlocked
                          ? 'bg-[#0C111A] border-[#263140] hover:border-[#C8A96B] cursor-pointer'
                          : 'bg-[#070B12]/80 border-[#1C2633] opacity-60 cursor-not-allowed'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-[#8D98A8] font-bold uppercase">
                      SECTOR 0{idx}
                    </span>

                    {completed ? (
                      <span className="flex items-center space-x-1 text-[10px] text-[#4FB286] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>CLEARED</span>
                      </span>
                    ) : isCurrent ? (
                      <span className="flex items-center space-x-1 text-[10px] text-[#C8A96B] font-bold">
                        <Crosshair className="w-3.5 h-3.5 animate-spin-slow" />
                        <span>CURRENT</span>
                      </span>
                    ) : unlocked ? (
                      <span className="flex items-center space-x-1 text-[10px] text-[#8D98A8] font-bold">
                        <Unlock className="w-3.5 h-3.5 text-[#C8A96B]" />
                        <span>AVAILABLE</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-[10px] text-[#566375] font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        <span>LOCKED</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-xs sm:text-sm font-bold text-[#F4F5F7] mb-1 truncate">
                    {stage.shortName}
                  </h4>

                  {/* Subtitle */}
                  <p className="text-[11px] text-[#8D98A8] truncate mb-2">
                    {stage.sector}
                  </p>

                  {/* Bottom Action */}
                  <div className="pt-2 border-t border-[#263140]/60 flex items-center justify-between text-[10px]">
                    <span className="text-[#8D98A8]">
                      {unlocked ? 'CLICK TO ENTER' : 'SECURITY RESTRICTED'}
                    </span>
                    {unlocked && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#C8A96B]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#121923] border-t border-[#263140] px-4 py-3 sm:px-6 flex items-center justify-between text-xs">
          <span className="text-[#8D98A8]">
            Progress through each room sequentially to unlock deeper sectors.
          </span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] text-[#F4F5F7] font-semibold transition-colors cursor-pointer"
          >
            CLOSE BLUEPRINT
          </button>
        </div>

      </div>
    </div>
  );
}
