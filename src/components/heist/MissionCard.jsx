import React from 'react';
import { getDifficultyStyle, getStatusStyle, formatScore, getAssetUrl } from '../../utils/formatters';
import { 
  Terminal, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  ArrowRight, 
  Crosshair, 
  Clock, 
  Users, 
  FileText,
  ShieldAlert,
  Cpu,
  Key
} from 'lucide-react';
import { sound } from '../../utils/audio';

export default function MissionCard({ mission, onSelect, stageName, hasImage = false, customImage = null }) {
  const diffStyle = getDifficultyStyle(mission.difficulty);
  const statStyle = getStatusStyle(mission.status);
  const isSolved = mission.status === 'SOLVED';
  const isLocked = mission.status === 'LOCKED';

  const handleClick = () => {
    sound.playClick();
    onSelect(mission.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative bg-[#0C111A] border transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden ${
        isSolved
          ? 'border-[#C8A96B]/30 hover:border-[#C8A96B]'
          : isLocked
          ? 'border-[#1C2633] opacity-60'
          : 'border-[#263140] hover:border-[#C8A96B]/60 hover:-translate-y-0.5 shadow-lg'
      }`}
    >
      {/* Top Status Border Accent */}
      <div 
        className={`h-[2px] w-full transition-all duration-300 ${
          isSolved ? 'bg-[#C8A96B]' : isLocked ? 'bg-transparent' : 'bg-transparent group-hover:bg-[#C8A96B]/50'
        }`} 
      />

      {/* Optional Cinematic Image Thumbnail for select anchor missions */}
      {hasImage && customImage && (
        <div className="relative aspect-[16/9] w-full bg-[#070B12] overflow-hidden border-b border-[#263140]">
          <img
            src={getAssetUrl(customImage)}
            alt={mission.title}
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C111A] via-transparent to-black/40" />
          
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#070B12]/90 border border-[#263140] text-[9px] font-mono text-[#8D98A8]">
            TARGET: {mission.target || 'LOCAL CONSOLE'}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Classification and Metadata Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] tracking-widest text-[#C8A96B] uppercase font-semibold">
              MISSION {mission.number} {stageName ? `// ${stageName}` : ''}
            </span>

            <span className={`px-2 py-0.5 text-[10px] font-mono font-medium border ${diffStyle.badge}`}>
              {mission.difficulty}
            </span>
          </div>

          <h3 className="font-mono text-sm sm:text-base font-bold text-[#F4F5F7] group-hover:text-[#C8A96B] transition-colors tracking-wide uppercase line-clamp-1">
            {mission.title}
          </h3>

          <p className="text-xs text-[#8D98A8] font-sans line-clamp-2 leading-relaxed">
            {mission.brief}
          </p>
        </div>

        {/* Technical Target Specs Bar */}
        <div className="pt-3 border-t border-[#1C2633] grid grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="space-y-0.5">
            <span className="text-[10px] text-[#566375] block">CLASSIFICATION</span>
            <span className="text-[#8D98A8] font-medium">{mission.category}</span>
          </div>

          <div className="space-y-0.5 text-right">
            <span className="text-[10px] text-[#566375] block">BOUNTY REWARD</span>
            <span className="text-[#C8A96B] font-bold">+{formatScore(mission.points)} PTS</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="bg-[#121923] border-t border-[#263140] px-4 py-2.5 sm:px-5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2">
          {isSolved ? (
            <div className="flex items-center space-x-1.5 text-[#C8A96B]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">CLEARED</span>
            </div>
          ) : isLocked ? (
            <div className="flex items-center space-x-1.5 text-[#566375]">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-[10px]">RESTRICTED</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 text-[#D6A85F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85F] animate-pulse" />
              <span className="text-[10px]">ACTIVE TARGET</span>
            </div>
          )}
        </div>

        <button 
          className={`flex items-center space-x-1 text-[11px] font-bold transition-colors cursor-pointer ${
            isSolved
              ? 'text-[#C8A96B] group-hover:underline'
              : isLocked
              ? 'text-[#566375]'
              : 'text-[#F4F5F7] group-hover:text-[#C8A96B]'
          }`}
        >
          <span>{isSolved ? 'DOSSIER' : isLocked ? 'LOCKED' : 'INFILTRATE'}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
