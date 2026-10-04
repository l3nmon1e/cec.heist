import React from 'react';
import { useGame } from '../../context/GameContext';
import { Shield, Crosshair } from 'lucide-react';

export default function CrewAvatar({ isMoving = false, className = "" }) {
  const { crewName, currentPlayer } = useGame();

  return (
    <div 
      className={`relative inline-flex items-center space-x-3 transition-all duration-700 ${
        isMoving ? 'translate-x-12 opacity-80 scale-105' : 'translate-x-0 opacity-100'
      } ${className}`}
    >
      {/* Tactical Operative Silhouette / Holo Marker */}
      <div className="relative group select-none">
        {/* Radar Pulse Rings */}
        <div className="absolute -inset-1.5 rounded-full bg-[#C8A96B]/20 animate-ping pointer-events-none" />
        <div className="absolute -inset-0.5 rounded-full bg-[#C8A96B]/30 animate-pulse pointer-events-none" />

        {/* Tactical Holo Emblem */}
        <div className="relative w-11 h-11 bg-[#0C111A] border-2 border-[#C8A96B] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(200,169,107,0.35)] overflow-hidden">
          {/* Subtle Scanlines on Avatar */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,107,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
          
          {/* Stylized Operative Silhouette SVG */}
          <svg className="w-6 h-6 text-[#C8A96B]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a5 5 0 0 0-5 5v1a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5zm0 12c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6z" />
          </svg>

          {/* Idle breathing glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#C8A96B]/20 to-transparent animate-pulse" />
        </div>

        {/* Operative Optical Status LED */}
        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#4FB286] border-2 border-[#070B12] shadow-[0_0_8px_#4FB286]" />
      </div>

      {/* Crew Telemetry Badge */}
      <div className="font-mono text-left select-none">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] animate-ping" />
          <span className="text-[10px] tracking-widest text-[#8D98A8] uppercase font-bold">
            CREW UNIT
          </span>
        </div>
        <div className="text-xs sm:text-sm font-black tracking-wider text-[#F4F5F7] flex items-center space-x-1">
          <span className="text-[#C8A96B]">{crewName || "GHOST-07"}</span>
          <span className="text-[10px] text-[#8D98A8] hidden sm:inline">[{currentPlayer.callsign || "OP-7492"}]</span>
        </div>
      </div>
    </div>
  );
}
