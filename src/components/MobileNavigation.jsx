import React from 'react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import { formatTimer, formatScore } from '../utils/formatters';

/**
 * Custom Vault Mechanical Icons (Concept 2: Bank Vault Mechanism & Champagne Gold Brass)
 */

// 1. Multi-ring rotary vault combination dial (FACILITY / SECTOR MAP)
function VaultDialIcon({ active, className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vaultDialGold" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2D1" />
          <stop offset="40%" stopColor="#E5D0A0" />
          <stop offset="80%" stopColor="#C8A96B" />
          <stop offset="100%" stopColor="#8E784D" />
        </linearGradient>
      </defs>
      {/* Outer Dial Calibrated Bezel */}
      <circle 
        cx="12" 
        cy="12" 
        r="9.5" 
        stroke={active ? "#C8A96B" : "#3B4758"} 
        strokeWidth="1.5" 
      />
      {/* Precision Degree Ticks around the ring */}
      <line x1="12" y1="2.5" x2="12" y2="5" stroke={active ? "#FFF2D1" : "#8D98A8"} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="21.5" y1="12" x2="19" y2="12" stroke={active ? "#C8A96B" : "#4B5565"} strokeWidth="1.5" />
      <line x1="12" y1="21.5" x2="12" y2="19" stroke={active ? "#C8A96B" : "#4B5565"} strokeWidth="1.5" />
      <line x1="2.5" y1="12" x2="5" y2="12" stroke={active ? "#C8A96B" : "#4B5565"} strokeWidth="1.5" />
      <line x1="18.7" y1="5.3" x2="17" y2="7" stroke={active ? "#C8A96B" : "#4B5565"} strokeWidth="1.2" />
      <line x1="5.3" y1="18.7" x2="7" y2="17" stroke={active ? "#C8A96B" : "#4B5565"} strokeWidth="1.2" />
      <line x1="18.7" y1="18.7" x2="17" y2="17" stroke={active ? "#C8A96B" : "#4B5565"} strokeWidth="1.2" />
      <line x1="5.3" y1="5.3" x2="7" y2="7" stroke={active ? "#C8A96B" : "#4B5565"} strokeWidth="1.2" />
      
      {/* Knurled Rotary Knob */}
      <circle 
        cx="12" 
        cy="12" 
        r="5.5" 
        fill={active ? "url(#vaultDialGold)" : "#16202D"} 
        stroke={active ? "#FFF2D1" : "#6B7787"} 
        strokeWidth="1.2" 
      />
      {/* Pointer Notch */}
      <polygon 
        points="12,7 13.5,9.5 10.5,9.5" 
        fill={active ? "#070B12" : "#8D98A8"} 
      />
      {/* Spindle Core */}
      <circle 
        cx="12" 
        cy="12" 
        r="2" 
        fill={active ? "#070B12" : "#263140"} 
        stroke={active ? "#C8A96B" : "#8D98A8"} 
        strokeWidth="0.8" 
      />
    </svg>
  );
}

// 2. Heavy 3-spoke vault blast door locking wheel (HEIST / MISSIONS)
function VaultWheelIcon({ active, className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vaultWheelGold" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2D1" />
          <stop offset="50%" stopColor="#C8A96B" />
          <stop offset="100%" stopColor="#8E784D" />
        </linearGradient>
      </defs>
      {/* Heavy Wheel Rim */}
      <circle 
        cx="12" 
        cy="12" 
        r="8" 
        stroke={active ? "url(#vaultWheelGold)" : "#3B4758"} 
        strokeWidth="2" 
      />
      
      {/* 3 Heavy Spokes & Grip Handles (0°, 120°, 240°) */}
      {/* Top Handle */}
      <line x1="12" y1="12" x2="12" y2="2" stroke={active ? "#FFF2D1" : "#6B7787"} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="2" r="1.5" fill={active ? "#FFF2D1" : "#6B7787"} />
      
      {/* Bottom Right Handle (120°) */}
      <line x1="12" y1="12" x2="20.66" y2="17" stroke={active ? "#C8A96B" : "#6B7787"} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="20.66" cy="17" r="1.5" fill={active ? "#C8A96B" : "#6B7787"} />

      {/* Bottom Left Handle (240°) */}
      <line x1="12" y1="12" x2="3.34" y2="17" stroke={active ? "#C8A96B" : "#6B7787"} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="3.34" cy="17" r="1.5" fill={active ? "#C8A96B" : "#6B7787"} />

      {/* Center Locking Hub */}
      <circle 
        cx="12" 
        cy="12" 
        r="4.2" 
        fill={active ? "url(#vaultWheelGold)" : "#16202D"} 
        stroke={active ? "#FFF2D1" : "#8D98A8"} 
        strokeWidth="1.2" 
      />
      {/* Vault Keyway Slot */}
      <rect 
        x="11.25" 
        y="10.25" 
        width="1.5" 
        height="3.5" 
        rx="0.5" 
        fill={active ? "#070B12" : "#8D98A8"} 
      />
    </svg>
  );
}

// 3. Vault reserve gold bullion ingot (SCORE / BOUNTY / LEADERBOARD)
function VaultBullionIcon({ active, className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vaultBullionTop" x1="5" y1="6" x2="19" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF7E6" />
          <stop offset="45%" stopColor="#E5D0A0" />
          <stop offset="100%" stopColor="#C8A96B" />
        </linearGradient>
        <linearGradient id="vaultBullionSide" x1="0" y1="10" x2="24" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8A96B" />
          <stop offset="100%" stopColor="#7A5E2E" />
        </linearGradient>
      </defs>
      {/* Lower Bar Tier */}
      <path 
        d="M2.5 17.5L5 13.5H19L21.5 17.5V19.5L19 21H5L2.5 19.5V17.5Z" 
        fill={active ? "#5C4620" : "#121923"} 
        stroke={active ? "#8E784D" : "#323E4F"} 
        strokeWidth="1" 
      />
      
      {/* Primary Gold Bullion Ingot (Trapezoidal 3D Bevel) */}
      <path 
        d="M3.5 15L5.5 10H18.5L20.5 15L18 17H6L3.5 15Z" 
        fill={active ? "url(#vaultBullionSide)" : "#16202D"} 
        stroke={active ? "#E5D0A0" : "#4B5565"} 
        strokeWidth="1.2" 
      />
      {/* Ingot Polished Top Face */}
      <polygon 
        points="5.5,10 7.5,6.5 16.5,6.5 18.5,10" 
        fill={active ? "url(#vaultBullionTop)" : "#222F3E"} 
        stroke={active ? "#FFF7E6" : "#6B7787"} 
        strokeWidth="1.2" 
      />
      {/* Fine Engraved Hallmark Stamp */}
      <line 
        x1="9.5" 
        y1="8.2" 
        x2="14.5" 
        y2="8.2" 
        stroke={active ? "#5C4620" : "#8D98A8"} 
        strokeWidth="1.2" 
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="13.2" 
        r="1.2" 
        fill={active ? "#FFF7E6" : "#8D98A8"} 
      />
    </svg>
  );
}

// 4. Classified brass operative security keycard (CREW / OPERATIVE DOSSIER)
function VaultKeycardIcon({ active, className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vaultKeycardGold" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF7E6" />
          <stop offset="35%" stopColor="#E5D0A0" />
          <stop offset="75%" stopColor="#C8A96B" />
          <stop offset="100%" stopColor="#8E784D" />
        </linearGradient>
      </defs>
      {/* Heavy Metal Keycard Body with Chamfered Corner */}
      <path 
        d="M4 6.5C4 5.12 5.12 4 6.5 4H15.5L20 8.5V17.5C20 18.88 18.88 20 17.5 20H6.5C5.12 20 4 18.88 4 17.5V6.5Z" 
        fill={active ? "url(#vaultKeycardGold)" : "#16202D"} 
        stroke={active ? "#FFF7E6" : "#3B4758"} 
        strokeWidth="1.4" 
      />
      {/* Top Lanyard Clearance Slot */}
      <rect 
        x="9" 
        y="5.5" 
        width="6" 
        height="1.5" 
        rx="0.75" 
        fill={active ? "#070B12" : "#263140"} 
      />
      {/* Smartcard Security Chip */}
      <rect 
        x="6.75" 
        y="10" 
        width="5.5" 
        height="5" 
        rx="0.8" 
        fill={active ? "#070B12" : "#263140"} 
        stroke={active ? "#7A5E2E" : "#8D98A8"} 
        strokeWidth="1" 
      />
      {/* Microchip Contact Pattern */}
      <line x1="6.75" y1="12.5" x2="12.25" y2="12.5" stroke={active ? "#C8A96B" : "#8D98A8"} strokeWidth="0.8" />
      <line x1="9.5" y1="10" x2="9.5" y2="15" stroke={active ? "#C8A96B" : "#8D98A8"} strokeWidth="0.8" />
      {/* Magnetic Stripe Data Lines on Right */}
      <line x1="14.5" y1="11" x2="17.5" y2="11" stroke={active ? "#5C4620" : "#6B7787"} strokeWidth="1" strokeLinecap="round" />
      <line x1="14.5" y1="13.5" x2="17.5" y2="13.5" stroke={active ? "#5C4620" : "#6B7787"} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Mobile Navigation: The Bank Vault Mechanism
 * Heavy Metallurgy & Champagne Gold Brass Console
 */
export default function MobileNavigation() {
  const { activeTab, setActiveTab, currentPlayer, secondsRemaining } = useGame();

  const handleTab = (tab) => {
    sound.playClick();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { 
      id: 'missions', 
      label: 'FACILITY', 
      code: 'ROTARY DIAL',
      icon: VaultDialIcon,
    },
    { 
      id: 'dashboard', 
      label: 'HEIST', 
      code: 'LOCK WHEEL',
      icon: VaultWheelIcon,
    },
    { 
      id: 'leaderboard', 
      label: 'SCORE', 
      code: 'RESERVE',
      icon: VaultBullionIcon,
    },
    { 
      id: 'profile', 
      label: 'CREW', 
      code: 'KEYCARD',
      icon: VaultKeycardIcon,
    },
  ];

  return (
    <nav 
      aria-label="Vault Console Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 bg-[#0A0F18]/95 backdrop-blur-2xl border-t border-[#263140] select-none shadow-[0_-8px_30px_rgba(0,0,0,0.85)]"
    >
      {/* Top Precision Brass Inlaid Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A96B]/50 to-transparent pointer-events-none" />

      {/* 4 Compact Engraved Vault Mechanical Navigation Buttons */}
      <div className="grid grid-cols-4 px-1 pt-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] font-mono">
        {navItems.map(({ id, label, icon: IconComponent }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => handleTab(id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-0.5 transition-all cursor-pointer group active:scale-95 border-r border-[#1C2633] last:border-r-0 ${
                isActive 
                  ? 'bg-gradient-to-b from-[#C8A96B]/15 via-[#C8A96B]/5 to-transparent' 
                  : 'hover:bg-[#121923]/40'
              }`}
            >
              {/* Active Vault Tumbler Lock Indicator (Engraved Slot with Brass Glow) */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-gradient-to-r from-[#C8A96B] via-[#FFF2D1] to-[#C8A96B] rounded-full shadow-[0_0_8px_rgba(200,169,107,0.85)]" />
              )}

              {/* Custom Mechanical Vault Icon Container */}
              <div 
                className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#070B12] border border-[#C8A96B]/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_0_8px_rgba(200,169,107,0.2)]'
                    : 'bg-transparent'
                }`}
              >
                <IconComponent active={isActive} className="w-5 h-5 transition-transform" />
              </div>

              {/* Compact Navigation Label */}
              <span 
                className={`mt-0.5 text-[8.5px] tracking-wider uppercase transition-colors leading-tight ${
                  isActive
                    ? 'text-[#E5D0A0] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                    : 'text-[#6B7787] group-hover:text-[#8D98A8] font-medium'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
