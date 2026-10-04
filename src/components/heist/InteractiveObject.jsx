import React from 'react';
import { 
  Terminal, 
  Camera, 
  DoorClosed, 
  DoorOpen, 
  Fingerprint, 
  Search, 
  Server, 
  Eye, 
  Cpu, 
  Lock, 
  Unlock, 
  Disc,
  Layers,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { sound } from '../../utils/audio';

const ICON_MAP = {
  Terminal,
  Camera,
  DoorClosed,
  DoorOpen,
  Fingerprint,
  Search,
  Server,
  Eye,
  Cpu,
  Lock,
  Unlock,
  Disc,
  Layers,
  ShieldCheck
};

export default function InteractiveObject({ 
  object, 
  isCompleted = false, 
  onInteract,
  className = "" 
}) {
  const IconComponent = ICON_MAP[object.icon] || Terminal;

  const handleClick = () => {
    sound.playClick();
    if (onInteract) onInteract(object);
  };

  return (
    <div 
      onClick={handleClick}
      className={`group relative bg-[#0C111A]/90 hover:bg-[#121923] border ${
        isCompleted 
          ? 'border-[#4FB286]/50 shadow-[0_0_15px_rgba(79,178,134,0.12)]' 
          : 'border-[#263140] hover:border-[#C8A96B]'
      } p-3 sm:p-4 transition-all duration-200 cursor-pointer select-none ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Top Header Badge & Radar Ping */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${
            isCompleted 
              ? 'bg-[#4FB286]/10 border-[#4FB286]/40 text-[#4FB286]' 
              : 'bg-[#070B12] border-[#263140] text-[#C8A96B] group-hover:border-[#C8A96B]'
          }`}>
            <IconComponent className="w-4 h-4" />
          </div>

          <span className="text-[10px] font-mono tracking-widest text-[#8D98A8] uppercase">
            {object.badge || "OBJECT"}
          </span>
        </div>

        {/* Status Pill */}
        <span className={`text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider font-semibold border ${
          isCompleted 
            ? 'bg-[#4FB286]/15 border-[#4FB286]/30 text-[#4FB286]' 
            : 'bg-[#C8A96B]/10 border-[#C8A96B]/30 text-[#C8A96B]'
        }`}>
          {isCompleted ? 'BYPASSED' : (object.status || 'ACTIVE')}
        </span>
      </div>

      {/* Name */}
      <h4 className="text-xs sm:text-sm font-bold text-[#F4F5F7] group-hover:text-[#C8A96B] transition-colors mb-1 font-mono tracking-wide">
        {object.name}
      </h4>

      {/* Description */}
      <p className="text-[11px] text-[#8D98A8] leading-relaxed mb-3 line-clamp-2">
        {object.description}
      </p>

      {/* Action Button Strip */}
      <div className="flex items-center justify-between pt-2 border-t border-[#263140]/60 text-xs font-mono">
        <span className="text-[10px] text-[#8D98A8] group-hover:text-[#F4F5F7] transition-colors">
          {isCompleted ? 'INSPECT DATA' : 'CLICK TO INTERACT'}
        </span>
        <div className="flex items-center space-x-1 text-[#C8A96B] group-hover:translate-x-1 transition-transform">
          <span className="font-bold text-[11px]">{object.actionLabel || 'ACCESS'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
