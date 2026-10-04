import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { HEIST_STAGES_CONFIG } from '../../data/heistGameData';
import { CheckCircle2, Lock, ChevronRight, Play } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function SectorStepper() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isRoomCompleted, heistMode } = useGame();
  const isExploration = heistMode === 'EXPLORATION';

  // Stages 1 through 8 (excluding entrance for cleaner compact display, or include all)
  const stages = HEIST_STAGES_CONFIG.filter(s => s.id !== 'entrance');
  const currentIndex = stages.findIndex(s => s.route === location.pathname);

  // If on entrance page, show surface state
  const isEntrance = location.pathname === '/heist';

  return (
    <div className="w-full bg-[#070B12]/95 border-b border-[#263140] select-none font-mono py-2 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        
        {/* Mobile View: Compact Current Stage Indicator */}
        <div className="flex md:hidden items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[#C8A96B] font-bold text-[11px] uppercase tracking-wider">
              {isEntrance ? "SURFACE CHECKPOINT" : `SECTOR 0${currentIndex + 1} OF 0${stages.length}`}
            </span>
            <span className="text-[#8D98A8]">/</span>
            <span className="font-bold text-[#F4F5F7] truncate max-w-[150px]">
              {isEntrance ? "ENTRANCE" : stages[currentIndex]?.shortName}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-[10px]">
            {isEntrance ? (
              <span className="text-[#C8A96B] font-semibold">STAGE 0</span>
            ) : isRoomCompleted(stages[currentIndex]?.id) ? (
              <span className="text-[#4FB286] font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>CLEARED</span>
              </span>
            ) : (
              <span className="text-[#C8A96B] font-bold flex items-center space-x-1">
                <Play className="w-3 h-3 fill-current" />
                <span>IN PROGRESS</span>
              </span>
            )}
          </div>
        </div>

        {/* Desktop / Tablet Stepper Track */}
        <div className="hidden md:flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
          {stages.map((stg, idx) => {
            const isCurrent = location.pathname === stg.route;
            const isCompleted = isRoomCompleted(stg.id);
            const isUnlocked = isCompleted || isCurrent || isExploration || (idx > 0 && isRoomCompleted(stages[idx - 1].id));

            return (
              <React.Fragment key={stg.id}>
                {idx > 0 && (
                  <ChevronRight className={`w-3 h-3 shrink-0 ${
                    isCompleted ? 'text-[#4FB286]' : isCurrent ? 'text-[#C8A96B]' : 'text-[#263140]'
                  }`} />
                )}

                <button
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => {
                    if (isUnlocked && !isCurrent) {
                      sound.playClick();
                      navigate(stg.route);
                    }
                  }}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 text-[11px] rounded transition-all whitespace-nowrap ${
                    isCurrent
                      ? 'bg-[#C8A96B]/20 border border-[#C8A96B] text-[#F4F5F7] font-bold shadow-[0_0_12px_rgba(200,169,107,0.25)]'
                      : isCompleted
                        ? 'bg-[#4FB286]/10 border border-[#4FB286]/40 text-[#4FB286] hover:bg-[#4FB286]/20 cursor-pointer font-semibold'
                        : isUnlocked
                          ? 'bg-[#0C111A] border border-[#263140] text-[#8D98A8] hover:text-[#F4F5F7] cursor-pointer'
                          : 'bg-[#070B12] border border-[#1A2230] text-[#505D70] cursor-not-allowed opacity-60'
                  }`}
                  title={`${stg.shortName} (${stg.sector})`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-[#4FB286] shrink-0" />
                  ) : isCurrent ? (
                    <Play className="w-2.5 h-2.5 text-[#C8A96B] fill-current shrink-0 animate-pulse" />
                  ) : (
                    <Lock className="w-2.5 h-2.5 text-[#505D70] shrink-0" />
                  )}
                  <span className="tracking-wider">
                    {idx + 1}. {stg.shortName}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Right side helper tag */}
        <div className="hidden lg:flex items-center space-x-2 text-[10px] text-[#8D98A8]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#4FB286]" />
          <span>Cleared</span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#C8A96B] ml-2" />
          <span>Current</span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#354354] ml-2" />
          <span>Locked</span>
        </div>

      </div>
    </div>
  );
}
