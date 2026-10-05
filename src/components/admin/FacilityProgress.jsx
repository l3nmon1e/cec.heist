import React from 'react';
import { SECTORS_LIST } from './adminHelpers';
import { useGame } from '../../context/GameContext';
import { Check, Lock, Unlock, ChevronRight } from 'lucide-react';

export const FacilityProgress = ({ onSelectSectorFilter }) => {
  const { 
    unlockedRooms, 
    completedRooms, 
    missions,
    unlockRoom,
    completeRoom
  } = useGame();

  // Helper to get challenge counts per sector
  const getSectorProgress = (sectorId) => {
    // Determine which missions correspond to this sector
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

  return (
    <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#202B38]">
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F5F7]">
            Facility Progression
          </h3>
          <p className="text-[11px] font-mono text-[#8994A4] mt-0.5">
            Real-time status of all 8 digital heist security rings
          </p>
        </div>
      </div>

      {/* Clean 8-Sector Grid / Row list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {SECTORS_LIST.map((sector, index) => {
          const { total, solved, status } = getSectorProgress(sector.id);

          return (
            <div
              key={sector.id}
              className={`p-3 rounded border transition-all ${
                status === 'CLEARED'
                  ? 'bg-[#111923] border-[#4DBB91]/40'
                  : status === 'ACTIVE'
                  ? 'bg-[#111923] border-[#D6AA55]/50'
                  : 'bg-[#0A0E17] border-[#202B38] opacity-75'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#8994A4]">
                  {sector.number} {sector.name}
                </span>

                {status === 'CLEARED' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#4DBB91]">
                    <Check className="w-3 h-3" /> CLEARED
                  </span>
                )}
                {status === 'ACTIVE' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#D6AA55]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6AA55] animate-pulse" />
                    ACTIVE
                  </span>
                )}
                {status === 'LOCKED' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#8994A4]">
                    <Lock className="w-3 h-3 text-[#8994A4]" /> LOCKED
                  </span>
                )}
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs font-mono">
                <span className="text-[#8994A4]">Progress</span>
                <span className="font-semibold text-[#F4F5F7]">
                  {solved} / {total} challenges
                </span>
              </div>

              {/* Minimal Progress Bar */}
              <div className="w-full bg-[#202B38] h-1 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    status === 'CLEARED' ? 'bg-[#4DBB91]' : 'bg-[#D6AA55]'
                  }`}
                  style={{ width: `${Math.min(100, Math.round((solved / total) * 100))}%` }}
                />
              </div>

              {/* Quick Admin Override action (unlock toggle) */}
              <div className="mt-2.5 pt-2 border-t border-[#202B38]/50 flex items-center justify-between text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => onSelectSectorFilter?.(sector.shortName)}
                  className="text-[#8994A4] hover:text-[#C8A96B] transition-colors flex items-center gap-0.5"
                >
                  <span>View Challenges</span>
                  <ChevronRight className="w-3 h-3" />
                </button>

                {status === 'LOCKED' ? (
                  <button
                    type="button"
                    onClick={() => unlockRoom(sector.id)}
                    className="text-[#D6AA55] hover:underline"
                    title="Force unlock this sector"
                  >
                    Force Unlock
                  </button>
                ) : status === 'ACTIVE' ? (
                  <button
                    type="button"
                    onClick={() => completeRoom(sector.id)}
                    className="text-[#4DBB91] hover:underline"
                    title="Mark sector cleared"
                  >
                    Force Clear
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacilityProgress;
