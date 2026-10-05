import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/audio';
import { getAssetUrl } from '../../utils/formatters';
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Disc, 
  Sparkles, 
  ArrowRight, 
  Trophy,
  FastForward,
  AlertTriangle
} from 'lucide-react';

export default function VaultUnlockingSequence({ 
  isActive, 
  onComplete,
  onSkip 
}) {
  // Phase 0: Standby, 1: Dials Aligning, 2: Hydraulic Bolts Retracting, 3: Door Opening & Asset Reveal, 4: Alarm Trip
  const [phase, setPhase] = useState(1);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive) {
      setPhase(1);
      return;
    }

    // Step 1: Start rotary mechanism sound
    sound.playVaultMechanisms();

    // Step 2: Hydraulic Bolts Retracting (at 1.1s)
    const timer1 = setTimeout(() => {
      setPhase(2);
      sound.playDoorUnlock();
    }, 1100);

    // Step 3: Vault Door Opens & Asset Revealed (at 2.3s)
    const timer2 = setTimeout(() => {
      setPhase(3);
      sound.playItemAcquired();
    }, 2300);

    // Step 4: Lockdown Sirens Trip (at 3.6s)
    const timer3 = setTimeout(() => {
      setPhase(4);
      sound.playLockdown();
    }, 3600);

    // Step 5: Complete Sequence & Enter Escape Route (at 5.0s)
    const timer4 = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#070B12] text-[#F4F5F7] font-mono select-none overflow-hidden flex flex-col items-center justify-center">
        
        {/* Cinematic Letterbox Shutters */}
        <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 bg-[#000000] border-b border-[#263140] z-30 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center space-x-2 text-xs text-[#C8A96B] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
            <span>SUB-LEVEL 4 // MASTER VAULT BREACH PROTOCOL</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              if (onCompleteRef.current) onCompleteRef.current();
            }}
            className="flex items-center space-x-1.5 px-3 py-1 bg-[#0C111A] hover:bg-[#121923] border border-[#263140] hover:border-[#C8A96B] text-xs text-[#8D98A8] hover:text-[#F4F5F7] transition-all cursor-pointer rounded-xs"
          >
            <span>SKIP CUTSCENE</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-[#000000] border-t border-[#263140] z-30 flex items-center justify-between px-4 sm:px-8 text-xs text-[#8D98A8]">
          <span>SECTOR-OMEGA BLAST MATRIX</span>
          <span className="text-[#C8A96B] font-bold">
            {phase === 1 && "CALIBRATING CIPHER DIALS..."}
            {phase === 2 && "RETRACTING HYDRAULIC PINS..."}
            {phase === 3 && "DISENGAGING TITANIUM FLANGE..."}
            {phase === 4 && "⚠ FACILITY LOCKDOWN ENGAGED"}
          </span>
          <span className="hidden sm:inline">AUTOPILOT: ESCAPE VECTOR</span>
        </div>

        {/* Flashing Red Emergency Strobe Overlay (Triggered in Phase 4) */}
        {phase === 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="absolute inset-0 bg-[#B85C5C] mix-blend-color-dodge pointer-events-none z-20"
          />
        )}

        {/* Blueprint & Vignette Overlays */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-transparent to-[#070B12] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(7,11,18,0.9)_100%)] pointer-events-none z-10" />

        {/* Background Chamber Artwork */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 pointer-events-none transition-transform duration-1000"
          style={{ backgroundImage: `url('${getAssetUrl('/assets/heist/vault/vault_entrance.jpg')}')` }}
        />

        {/* ======================================================== */}
        {/* CENTRAL CINEMATIC VAULT MECHANISM (Procedural 3D CSS / SVG) */}
        {/* ======================================================== */}
        <div className="relative z-20 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] flex items-center justify-center [perspective:1200px]">
          
          {/* Inner Vault Sanctum (Revealed behind the opening doors) */}
          <div className="absolute inset-8 rounded-full bg-[#05080E] border-4 border-[#C8A96B]/50 flex flex-col items-center justify-center shadow-[inset_0_0_60px_rgba(200,169,107,0.4)] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,107,0.3)_0%,transparent_70%)] animate-pulse" />
            
            {/* The Master Asset Hologram / Podium */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={phase >= 3 ? { scale: 1, opacity: 1, y: [0, -6, 0] } : { scale: 0, opacity: 0 }}
              transition={phase >= 3 ? { y: { duration: 2, repeat: Infinity, ease: "easeInOut" } } : {}}
              className="relative z-10 flex flex-col items-center text-center p-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C8A96B]/20 border-2 border-[#C8A96B] flex items-center justify-center text-[#C8A96B] shadow-[0_0_40px_rgba(200,169,107,0.7)] mb-2">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
              </div>

              <div className="text-[10px] text-[#C8A96B] tracking-[0.25em] font-black uppercase">
                ASSET SECURED
              </div>
              <div className="text-xs sm:text-sm font-black text-[#F4F5F7] tracking-wider uppercase">
                CEC SOVEREIGN KERNEL
              </div>
            </motion.div>
          </div>

          {/* Outer Heavy Steel Vault Door Frame with Radial Locking Pin Slots */}
          <div className="absolute inset-0 rounded-full border-8 border-[#263140] bg-[#0C111A]/90 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex items-center justify-center">
            
            {/* 8 Radial Hydraulic Locking Pins */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
              <motion.div
                key={angle}
                initial={{ height: "42px", opacity: 1 }}
                animate={phase >= 2 ? { height: "12px", opacity: 0.4 } : { height: "42px", opacity: 1 }}
                transition={{ duration: 0.7, delay: index * 0.05, ease: "easeInOut" }}
                style={{ transform: `rotate(${angle}deg) translateY(-50%)`, transformOrigin: "center center" }}
                className="absolute w-5 sm:w-7 bg-gradient-to-r from-[#8D98A8] via-[#F4F5F7] to-[#8D98A8] border border-[#070B12] rounded-xs shadow-[0_0_10px_rgba(200,169,107,0.4)]"
              />
            ))}

            {/* Pneumatic Vent Smoke Effect (when pins retract) */}
            {phase === 2 && (
              <motion.div 
                initial={{ opacity: 0.8, scale: 0.9 }}
                animate={{ opacity: 0, scale: 1.3 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-full border-4 border-cyan-400/40 blur-md pointer-events-none"
              />
            )}
          </div>

          {/* Massive Circular Vault Door (Swings open along 3D Y-Axis in Phase 3) */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={phase >= 3 ? { rotateY: -85, x: -60, opacity: 0.2 } : { rotateY: 0, x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left center" }}
            className="absolute inset-2 rounded-full bg-[#121923] border-4 border-[#C8A96B] shadow-[0_0_40px_rgba(0,0,0,0.95)] flex items-center justify-center overflow-hidden z-20"
          >
            {/* Brushed Metal Texture Fill */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: `url('${getAssetUrl('/assets/heist/textures/brushed_metal.jpg')}')` }}
            />

            {/* Concentric Mechanical Vault Rings */}
            <motion.div 
              animate={phase === 1 ? { rotate: [0, 180, -90, 360] } : { rotate: 360 }}
              transition={phase === 1 ? { duration: 1.1, ease: "easeInOut" } : { duration: 0.3 }}
              className="relative w-44 h-44 sm:w-60 sm:h-60 rounded-full border-4 border-dashed border-[#8D98A8]/60 flex items-center justify-center"
            >
              {/* Central Precision Rotary Locking Wheel */}
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-[#0C111A] border-4 border-[#C8A96B] shadow-[0_0_20px_rgba(200,169,107,0.4)] flex items-center justify-center relative">
                <Disc className="w-12 h-12 sm:w-16 sm:h-16 text-[#C8A96B] animate-spin" style={{ animationDuration: '6s' }} />

                {/* Spokes of the Vault Steering Wheel */}
                <div className="absolute w-full h-1 bg-[#C8A96B]" />
                <div className="absolute h-full w-1 bg-[#C8A96B]" />
                <div className="absolute w-full h-1 bg-[#C8A96B] rotate-45" />
                <div className="absolute w-full h-1 bg-[#C8A96B] -rotate-45" />
              </div>
            </motion.div>

            {/* Status LED on Door */}
            <div className="absolute bottom-6 flex items-center space-x-2 bg-[#070B12]/90 px-3 py-1 border border-[#263140] text-[10px]">
              <span className={`w-2 h-2 rounded-full ${phase >= 2 ? 'bg-[#4FB286]' : 'bg-[#C8A96B] animate-ping'}`} />
              <span className="font-bold text-[#F4F5F7]">
                {phase >= 2 ? "INTERLOCK: DISENGAGED" : "INTERLOCK: ACTIVE"}
              </span>
            </div>
          </motion.div>

        </div>

        {/* Dynamic Telemetry Status Box (Below Vault) */}
        <div className="relative z-20 mt-8 max-w-md w-full px-4 text-center space-y-2">
          {phase < 4 ? (
            <div className="bg-[#0C111A]/90 border border-[#263140] p-4 shadow-xl backdrop-blur-md space-y-1">
              <div className="text-[10px] text-[#C8A96B] font-black uppercase tracking-widest flex items-center justify-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
                <span>PHASE {phase} / 4 — MECHANICAL DISENGAGEMENT</span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-[#F4F5F7] tracking-wider uppercase">
                {phase === 1 && "ALGORITHMIC COMBINATION CONFIRMED"}
                {phase === 2 && "PRESSURE EQUALIZATION // RETRACTING BOLTS"}
                {phase === 3 && "VAULT OPEN // SECURING MASTER CRYPTOGRAPHIC ASSET"}
              </h2>
            </div>
          ) : (
            /* Phase 4: Emergency Lockdown Notification */
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#180A0A]/95 border-2 border-[#B85C5C] p-4 shadow-[0_0_30px_rgba(184,92,92,0.4)] backdrop-blur-md space-y-2 text-center"
            >
              <div className="flex items-center justify-center space-x-2 text-[#B85C5C] font-black text-xs tracking-widest uppercase">
                <AlertTriangle className="w-4 h-4 animate-ping" />
                <span>CRITICAL ALARM // MAXIMUM FACILITY LOCKDOWN</span>
                <AlertTriangle className="w-4 h-4 animate-ping" />
              </div>
              <div className="text-sm sm:text-base font-black text-[#F4F5F7] tracking-wider uppercase">
                ASSET RETRIEVED — EVACUATE TO EMERGENCY EGRESS SHAFT!
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </AnimatePresence>
  );
}
