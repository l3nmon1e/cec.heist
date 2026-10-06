import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useGame } from '../../../context/GameContext';
import CrewAvatar from '../CrewAvatar';
import CautionMarquee from '../../CautionMarquee';
import { sound } from '../../../utils/audio';
import { getAssetUrl } from '../../../utils/formatters';
import { 
  ShieldAlert, 
  ArrowRight, 
  Terminal, 
  Camera, 
  Lock, 
  Unlock, 
  Radio, 
  CheckCircle2 
} from 'lucide-react';

export default function HeistEntrance() {
  const navigate = useNavigate();
  const { onAdvanceRoom } = useOutletContext() || {};
  const { crewName, isRoomCompleted } = useGame();
  const [isEntering, setIsEntering] = useState(false);

  const handleEnterFacility = () => {
    sound.playDoorUnlock();
    setIsEntering(true);
    setTimeout(() => {
      if (onAdvanceRoom) {
        onAdvanceRoom('/heist/recon', 'SECTOR-ALPHA (RECON)');
      } else {
        navigate('/heist/recon');
      }
    }, 600);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between select-none">
      
      {/* 1. FACILITY HERO & ACCESS CHECKPOINT */}
      <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden border-b border-[#263140]">
        
        {/* Cinematic Underground Facility Wide Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-100 hover:scale-[1.02]"
          style={{ backgroundImage: `url('${getAssetUrl('/assets/heist/facility/facility_wide.jpg')}')` }}
        />

        {/* Tactical Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-[#070B12]/80 to-[#070B12]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B12] via-transparent to-[#070B12]" />
        
        {/* Blueprint Vector Grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

        {/* Content Enclave */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-7">
          
          {/* Top Classification Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0C111A]/90 border border-[#C8A96B]/40 text-[#C8A96B] font-mono text-xs uppercase tracking-[0.25em] shadow-[0_0_15px_rgba(200,169,107,0.15)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>CEC DIGITAL FACILITY // CANARA SITE-DELTA</span>
          </div>

          {/* Main Title & Restraint Aesthetics */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F4F5F7] tracking-wider uppercase font-mono drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              CEC DIGITAL HEIST
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#8D98A8] max-w-2xl mx-auto font-sans leading-relaxed">
              CEC's digital infrastructure has been compromised. The master cryptographic asset has been locked inside the high-security Digital Vault. Infiltrate the facility, bypass each security sector, obtain the asset, and exfiltrate before lockdown.
            </p>
          </div>

          {/* Telemetry Status Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto font-mono text-xs">
            <div className="bg-[#0C111A]/90 border border-[#263140] p-2.5">
              <div className="text-[10px] text-[#8D98A8] uppercase">ACCESS LEVEL</div>
              <div className="font-bold text-[#B85C5C] tracking-wider">RESTRICTED</div>
            </div>
            <div className="bg-[#0C111A]/90 border border-[#263140] p-2.5">
              <div className="text-[10px] text-[#8D98A8] uppercase">HEIST STATUS</div>
              <div className="font-bold text-[#4FB286] tracking-wider">ACTIVE</div>
            </div>
            <div className="bg-[#0C111A]/90 border border-[#263140] p-2.5">
              <div className="text-[10px] text-[#8D98A8] uppercase">SECTORS</div>
              <div className="font-bold text-[#C8A96B] tracking-wider">9 ROOMS</div>
            </div>
            <div className="bg-[#0C111A]/90 border border-[#263140] p-2.5">
              <div className="text-[10px] text-[#8D98A8] uppercase">ASSIGNED CREW</div>
              <div className="font-bold text-[#F4F5F7] tracking-wider">{crewName || "SPECTRE-9"}</div>
            </div>
          </div>

          {/* Crew Avatar at Entrance */}
          <div className="py-2 flex items-center justify-center">
            <CrewAvatar isMoving={isEntering} />
          </div>

          {/* Primary Action Button: ENTER FACILITY */}
          <div>
            <button
              onClick={handleEnterFacility}
              disabled={isEntering}
              className="group relative inline-flex items-center space-x-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#C8A96B] hover:bg-[#E5D0A0] text-[#070B12] font-mono text-sm sm:text-base font-black tracking-[0.2em] uppercase transition-all shadow-[0_0_25px_rgba(200,169,107,0.35)] hover:shadow-[0_0_35px_rgba(200,169,107,0.5)] cursor-pointer"
            >
              <span>{isEntering ? 'BREACHING PERIMETER...' : 'ENTER FACILITY'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* 2. CAUTION MARQUEE DIRECTLY BELOW HERO (Requirement 42) */}
      <CautionMarquee />

      {/* 3. TACTICAL MISSION PROTOCOL OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full font-mono">
        <div className="bg-[#0C111A] border border-[#263140] p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#263140] pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
              <span className="text-xs font-bold text-[#F4F5F7] tracking-widest uppercase">
                OPERATION BRIEFING // INGRESS VECTOR
              </span>
            </div>
            <span className="text-[11px] text-[#8D98A8]">CEC-SITE-04</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#8D98A8]">
            <div className="space-y-1.5 bg-[#070B12] p-3.5 border border-[#263140]">
              <div className="font-mono text-xs font-bold text-[#C8A96B]">01 // PHYSICAL INGRESS</div>
              <p>Rooms are not abstract challenge lists. You are physically advancing through real digital infrastructure.</p>
            </div>
            <div className="space-y-1.5 bg-[#070B12] p-3.5 border border-[#263140]">
              <div className="font-mono text-xs font-bold text-[#C8A96B]">02 // INTERACTIVE HACKING</div>
              <p>Inspect terminals, optical cameras, and industrial PLCs in the world to expose system vulnerabilities.</p>
            </div>
            <div className="space-y-1.5 bg-[#070B12] p-3.5 border border-[#263140]">
              <div className="font-mono text-xs font-bold text-[#C8A96B]">03 // ESCAPE & LOCKDOWN</div>
              <p>Cracking the vault triggers emergency sirens. Extract the asset and reach the surface before the lockdown concludes.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
