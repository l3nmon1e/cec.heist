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
  ChevronRight,
  ArrowRight,
  Sparkles
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
  isPrimary = false,
  onInteract,
  className = "" 
}) {
  const isDoor = object.type === 'door';
  const IconComponent = isDoor 
    ? (isCompleted ? DoorOpen : DoorClosed) 
    : (ICON_MAP[object.icon] || Terminal);

  const handleClick = () => {
    sound.playClick();
    if (onInteract) onInteract(object);
  };

  // Determine styling based on object type & completion
  const cardBorderClass = isDoor
    ? (isCompleted
        ? 'border-[#4FB286] ring-2 ring-[#4FB286]/50 shadow-[0_0_25px_rgba(79,178,134,0.25)] bg-[#0C1A14]'
        : 'border-[#263140] hover:border-[#B85C5C]/60 bg-[#0C111A]/90')
    : isCompleted
      ? 'border-[#4FB286]/50 shadow-[0_0_15px_rgba(79,178,134,0.12)] bg-[#0C111A]/90'
      : isPrimary
        ? 'border-[#C8A96B] ring-1 ring-[#C8A96B]/40 shadow-[0_0_20px_rgba(200,169,107,0.15)] bg-[#101622] hover:bg-[#141C2B]'
        : 'border-[#263140] hover:border-[#C8A96B] bg-[#0C111A]/90 hover:bg-[#121923]';

  return (
    <div 
      onClick={handleClick}
      className={`group relative border p-4 transition-all duration-300 cursor-pointer select-none rounded-sm ${cardBorderClass} ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Top Header Badge & Status Pill */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${
            isDoor && isCompleted
              ? 'bg-[#4FB286]/20 border-[#4FB286] text-[#4FB286]'
              : isCompleted 
                ? 'bg-[#4FB286]/10 border-[#4FB286]/40 text-[#4FB286]' 
                : isPrimary
                  ? 'bg-[#C8A96B]/20 border-[#C8A96B] text-[#C8A96B]'
                  : 'bg-[#070B12] border-[#263140] text-[#C8A96B] group-hover:border-[#C8A96B]'
          }`}>
            <IconComponent className="w-4 h-4" />
          </div>

          <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
            {isDoor ? (
              isCompleted ? (
                <span className="text-[#4FB286] flex items-center space-x-1">
                  <Unlock className="w-3 h-3" />
                  <span>EXIT GATE (OPEN)</span>
                </span>
              ) : (
                <span className="text-[#8D98A8] flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-[#B85C5C]" />
                  <span>EXIT GATE (LOCKED)</span>
                </span>
              )
            ) : isPrimary ? (
              <span className="text-[#C8A96B] flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>MAIN CHALLENGE</span>
              </span>
            ) : (
              <span className="text-[#8D98A8]">{object.badge || "BONUS INTEL"}</span>
            )}
          </span>
        </div>

        {/* Status Pill */}
        <span className={`text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider font-bold border rounded-sm ${
          isDoor && isCompleted
            ? 'bg-[#4FB286] text-[#070B12] border-[#4FB286] animate-pulse'
            : isDoor && !isCompleted
              ? 'bg-[#B85C5C]/15 border-[#B85C5C]/40 text-[#B85C5C]'
              : isCompleted 
                ? 'bg-[#4FB286]/15 border-[#4FB286]/30 text-[#4FB286]' 
                : isPrimary
                  ? 'bg-[#C8A96B] text-[#070B12] border-[#C8A96B] font-black animate-pulse'
                  : 'bg-[#C8A96B]/10 border-[#C8A96B]/30 text-[#C8A96B]'
        }`}>
          {isDoor ? (
            isCompleted ? 'READY // PASSAGE OPEN' : 'SEALED'
          ) : isCompleted ? (
            'SOLVED'
          ) : isPrimary ? (
            'START HERE'
          ) : (
            'OPTIONAL'
          )}
        </span>
      </div>

      {/* Name */}
      <h4 className={`text-xs sm:text-sm font-bold transition-colors mb-1.5 font-mono tracking-wide ${
        isDoor && isCompleted ? 'text-[#4FB286]' : 'text-[#F4F5F7] group-hover:text-[#C8A96B]'
      }`}>
        {object.name}
      </h4>

      {/* Description */}
      <p className="text-[11px] text-[#8D98A8] leading-relaxed mb-3 line-clamp-2 font-sans">
        {isDoor && isCompleted 
          ? "Barrier disengaged. Click here to advance directly to the next sector." 
          : isDoor && !isCompleted
            ? "Hydraulically sealed gate. Solve the primary challenge in this room to unlock."
            : object.description}
      </p>

      {/* Action Button Strip */}
      <div className={`flex items-center justify-between pt-2.5 border-t text-xs font-mono ${
        isDoor && isCompleted ? 'border-[#4FB286]/40' : 'border-[#263140]/60'
      }`}>
        <span className={`text-[10px] ${
          isDoor && isCompleted ? 'text-[#4FB286] font-bold' : 'text-[#8D98A8] group-hover:text-[#F4F5F7]'
        }`}>
          {isDoor ? (
            isCompleted ? 'CLICK TO ADVANCE' : 'SOLVE TO UNLOCK'
          ) : isCompleted ? (
            'REVIEW INTEL'
          ) : (
            'INTERACTIVE'
          )}
        </span>

        {isDoor && isCompleted ? (
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-[#4FB286] text-[#070B12] font-black text-[11px] tracking-wider rounded-sm shadow-sm group-hover:scale-105 transition-transform">
            <span>ENTER NEXT ROOM</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        ) : (
          <div className={`flex items-center space-x-1 transition-transform group-hover:translate-x-1 ${
            isPrimary && !isCompleted ? 'text-[#C8A96B] font-bold' : 'text-[#C8A96B]'
          }`}>
            <span className="font-bold text-[11px]">
              {isDoor 
                ? (isCompleted ? 'ENTER ROOM' : 'LOCKED') 
                : isCompleted 
                  ? 'VIEW BRIEFING' 
                  : (object.actionLabel || 'HACK NOW')}
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}
