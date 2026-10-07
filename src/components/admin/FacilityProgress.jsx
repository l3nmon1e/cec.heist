import React from 'react';
import { SECTORS_LIST } from './adminHelpers';
import { useGame } from '../../context/GameContext';
import { Check, Lock, ChevronRight } from 'lucide-react';

export const FacilityProgress = ({ onSelectSectorFilter }) => {
  const { 
    unlockedRooms, 
    completedRooms, 
    missions
  } = useGame();

  // Helper to get challenge counts per sector
  const getSectorProgress = (sectorId) => {
    const sectorMissions = missions.filter(m => {
      if (sectorId === 'recon') return m.id === 'mission-14' || m.id === 'mission-15';
      if (sectorId === 'initial-access') return m.id === 'mission-01' || m.id === 'mission-04';
      if (sectorId === 'infiltration') return m.id === 'mission-02' || m.id === 'mission-05';
      if (sectorId === 'network') return m.id === 'mission-03' || m.id === 'mission-07' || m.id === 'mission-18';
      if (sectorId === 'security') return m.id === 'mission-06' || m.id === 'mission-08';
      if (sectorId === 'core') return m.id === 'mission-09' || m.id === 'mission-10' || m.id === 'mission-19';
      if (sectorId === 'vault') return m.id === 'mission-11' || m.id === 'mission-12' || m.id === 'mission-13' || m.id === 'mission-20';
      if (sectorId === 'escape') return m.id === 'mission-16' || m.id === 'mission-17';
      return false;
    });

    const total = sectorMissions.length || 2;
    const solved = sectorMissions.filter(m => m.status === 'SOLVED').length;

    const isCleared = completedRooms?.includes(sectorId) || (solved >= total && total > 0);
    const isUnlocked = unlockedRooms?.includes(sectorId) || sectorId === 'recon';

    let status = 'LOCKED';
    if (isCleared) {
      status = 'CLEARED';
    } else if (isUnlocked) {
      status = 'ACTIVE';
    }

    return { total, solved, status };
  };

  const clearedCount = SECTORS_LIST.filter(s => getSectorProgress(s.id).status === 'CLEARED').length;
  const progressPercent = Math.round((clearedCount / SECTORS_LIST.length) * 100);

  return (
    <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-4 shadow-sm">
      {/* Header with quick stats */}
      <div className="flex items-center justify-between pb-3 border-b border-[#202B38]/70">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F5F7]">
            Sector Pipeline
          </h3>
          <span className="text-[11px] font-mono text-[#8994A4]">
            {clearedCount} of {SECTORS_LIST.length} Sectors Cleared ({progressPercent}%)
          </span>
        </div>

        {/* Global Progress Bar */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-32 bg-[#1A2332] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#4DBB91] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] font-mono font-bold text-[#4DBB91]">{progressPercent}%</span>
        </div>
      </div>

      {/* Sleek Horizontal Sector Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-3">
        {SECTORS_LIST.map((sector) => {
          const { total, solved, status } = getSectorProgress(sector.id);

          return (
            <button
              key={sector.id}
              type="button"
              onClick={() => onSelectSectorFilter?.(sector.shortName)}
              title={`Click to view ${sector.name} challenges`}
              className={`p-2.5 rounded border text-left transition-all cursor-pointer group flex flex-col justify-between ${
                status === 'CLEARED'
                  ? 'bg-[#111923] border-[#4DBB91]/40 hover:border-[#4DBB91]'
                  : status === 'ACTIVE'
                  ? 'bg-[#161F2E] border-[#D6AA55]/50 hover:border-[#D6AA55]'
                  : 'bg-[#0A0E17] border-[#202B38]/60 hover:border-[#202B38] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-mono font-bold text-[#8994A4] group-hover:text-[#F4F5F7] transition-colors">
                  {sector.number}
                </span>

                {status === 'CLEARED' && (
                  <span className="flex items-center text-[#4DBB91]" title="Cleared">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </span>
                )}
                {status === 'ACTIVE' && (
                  <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#D6AA55]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6AA55] animate-pulse" />
                    LIVE
                  </span>
                )}
                {status === 'LOCKED' && (
                  <span className="flex items-center text-[#586475]" title="Locked">
                    <Lock className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>

              <div className="mt-1.5">
                <div className="text-[11px] font-mono font-bold text-[#F4F5F7] truncate">
                  {sector.name}
                </div>
                <div className="text-[10px] font-mono text-[#8994A4] mt-0.5">
                  {solved}/{total} solved
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FacilityProgress;
