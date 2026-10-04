import React from 'react';
import { Activity, ShieldCheck, Database, Server, RefreshCw } from 'lucide-react';

export default function EventStatusBar() {
  return (
    <div className="bg-[#0C111A] border-b border-[#263140] py-2 px-4 text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
        
        {/* Left Status Indicators */}
        <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto text-[11px] text-[#8D98A8]">
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="text-[#C8A96B] font-bold">HEIST TELEMETRY</span>
            <span className="text-[#263140]">/</span>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FB286]"></span>
            <span className="text-[#F4F5F7]">FACILITY SENSORS: ACTIVE</span>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FB286]"></span>
            <span className="text-[#F4F5F7]">SUBNET 10.24.0.0/16</span>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FB286]"></span>
            <span className="text-[#F4F5F7]">FLAG ORACLE SECURE</span>
          </div>

          <div className="hidden md:flex items-center space-x-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96B]"></span>
            <span className="text-[#F4F5F7]">DIGITAL VAULT LOCKED</span>
          </div>
        </div>

        {/* Right Info */}
        <div className="hidden lg:flex items-center space-x-4 text-[11px] text-[#8D98A8]">
          <div className="flex items-center space-x-1.5">
            <Server className="w-3 h-3 text-[#566375]" />
            <span>NODE: CANARA-CENTRAL-01</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <RefreshCw className="w-3 h-3 text-[#566375] animate-spin" style={{ animationDuration: '8s' }} />
            <span>SYNC: 1.0s</span>
          </div>
        </div>

      </div>
    </div>
  );
}
