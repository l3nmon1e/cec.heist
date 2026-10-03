import React from 'react';
import { Activity, ShieldCheck, Database, Server, RefreshCw } from 'lucide-react';

export default function EventStatusBar() {
  return (
    <div className="bg-[#111111] border-b border-[#303030] py-1.5 px-4 text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
        
        {/* Left Status Indicators */}
        <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto text-[11px] text-[#737373]">
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="text-[#FACC15] font-semibold">SYSTEM STATUS</span>
            <span className="text-[#303030]">/</span>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
            <span className="text-[#E5E7EB]">PLATFORM ONLINE</span>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
            <span className="text-[#E5E7EB]">CLUSTER 10.24.0.0/16</span>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
            <span className="text-[#E5E7EB]">FLAG ORACLE VALIDATED</span>
          </div>

          <div className="hidden md:flex items-center space-x-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
            <span className="text-[#E5E7EB]">LEADERBOARD LIVE</span>
          </div>
        </div>

        {/* Right Info */}
        <div className="hidden lg:flex items-center space-x-4 text-[11px] text-[#737373]">
          <div className="flex items-center space-x-1.5">
            <Server className="w-3 h-3 text-[#737373]" />
            <span>GATEWAY: BENGALURU-SEC-01</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <RefreshCw className="w-3 h-3 text-[#737373] animate-spin" style={{ animationDuration: '8s' }} />
            <span>SYNC: 1.2s</span>
          </div>
        </div>

      </div>
    </div>
  );
}
