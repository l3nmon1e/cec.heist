import React from 'react';
import { useGame } from '../context/GameContext';
import { getDifficultyStyle, getStatusStyle, formatScore } from '../utils/formatters';
import { ShieldAlert, CheckCircle2, Lock, Terminal as TerminalIcon, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

export default function MissionCard({ mission }) {
  const { openMissionDetail } = useGame();
  const diffStyle = getDifficultyStyle(mission.difficulty);
  const statusStyle = getStatusStyle(mission.status);
  const isSolved = mission.status === 'SOLVED';
  const isLocked = mission.status === 'LOCKED';

  const handleClick = () => {
    if (isLocked) {
      sound.playError();
      return;
    }
    openMissionDetail(mission.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col justify-between p-4 bg-[#151515] border transition-all duration-150 select-none ${
        isLocked
          ? 'border-[#262626] opacity-60 cursor-not-allowed'
          : isSolved
          ? 'border-[#22C55E]/30 hover:border-[#22C55E] cursor-pointer'
          : 'border-[#303030] hover:border-[#FACC15] cursor-pointer hover:bg-[#181818]'
      }`}
    >
      {/* Top Bar: Mission ID & Status Indicator */}
      <div>
        <div className="flex items-center justify-between font-mono mb-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[#FACC15] font-bold text-xs tracking-wider">
              MISSION {mission.number}
            </span>
            <span className="text-[#303030]">/</span>
            <span className="text-[10px] text-[#737373] tracking-widest uppercase">
              {mission.category}
            </span>
          </div>

          <span className={`text-[10px] font-mono px-2 py-0.5 border ${statusStyle.badge}`}>
            {statusStyle.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-mono text-sm font-bold text-[#E5E7EB] group-hover:text-[#FACC15] transition-colors tracking-tight leading-snug line-clamp-1 mb-2">
          {mission.title}
        </h3>

        {/* Brief excerpt */}
        <p className="font-sans text-xs text-[#737373] line-clamp-2 leading-relaxed mb-3">
          {mission.brief}
        </p>
      </div>

      {/* Footer / Telemetry metadata */}
      <div className="pt-3 border-t border-[#262626] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2.5">
          {/* Difficulty pill */}
          <span className={`text-[10px] px-1.5 py-0.5 border font-semibold ${diffStyle.badge}`}>
            {mission.difficulty}
          </span>

          {/* Solves count */}
          <span className="text-[11px] text-[#737373]">
            {mission.solvedCount} SOLVES
          </span>
        </div>

        {/* Points & Engage button */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#FACC15] tracking-wide text-xs">
            {formatScore(mission.points)} PTS
          </span>

          {isSolved ? (
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          ) : isLocked ? (
            <Lock className="w-3.5 h-3.5 text-[#525252]" />
          ) : (
            <div className="w-6 h-6 bg-[#1F1F1F] border border-[#303030] group-hover:border-[#FACC15] flex items-center justify-center text-[#E5E7EB] group-hover:text-[#FACC15] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      {/* Subtle corner mechanical bracket */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-[#FACC15] transition-colors" />
    </div>
  );
}
