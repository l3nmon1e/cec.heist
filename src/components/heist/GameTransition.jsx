import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/audio';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Terminal, 
  CheckCircle2, 
  Radio, 
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';

export default function GameTransition({ 
  isActive, 
  title = "ACCESS GRANTED", 
  subtitle = "ADVANCING TO NEXT SECTOR", 
  onComplete 
}) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const [telemetryStep, setTelemetryStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setTelemetryStep(0);
      return;
    }

    sound.playDoorUnlock();
    sound.playAccessGranted();

    const t1 = setTimeout(() => setTelemetryStep(1), 300);
    const t2 = setTimeout(() => setTelemetryStep(2), 700);
    const t3 = setTimeout(() => setTelemetryStep(3), 1100);

    // Transition duration ~1.7s for rich cinematic feedback, clickable anytime to skip
    const timer = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(timer);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            if (onCompleteRef.current) onCompleteRef.current();
          }}
          className="fixed inset-0 z-50 bg-[#05080E] text-[#F4F5F7] flex flex-col items-center justify-center font-mono select-none overflow-hidden cursor-pointer"
        >
          {/* Top & Bottom Cinematic Anamorphic Letterbox Shutters */}
          <motion.div 
            initial={{ height: "0%" }}
            animate={{ height: "14%" }}
            exit={{ height: "0%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 bg-[#000000] border-b border-[#263140] z-30 flex items-center justify-between px-6"
          >
            <div className="flex items-center space-x-2 text-[10px] text-[#4FB286] font-bold tracking-[0.25em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#4FB286] animate-ping" />
              <span>CEC DIGITAL HEIST // DIRECT ACCESS CLEARANCE</span>
            </div>
            <div className="text-[10px] text-[#8D98A8] tracking-widest uppercase hidden sm:block">
              SECURITY PROTOCOL OVERRIDE // 0x7F9B
            </div>
          </motion.div>

          <motion.div 
            initial={{ height: "0%" }}
            animate={{ height: "14%" }}
            exit={{ height: "0%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 right-0 bg-[#000000] border-t border-[#263140] z-30 flex items-center justify-between px-6"
          >
            <div className="text-[10px] text-[#8D98A8] tracking-widest">
              STATUS: <span className="text-[#4FB286] font-bold">ALL BULKHEADS UNLOCKED</span>
            </div>
            <div className="text-[10px] text-[#C8A96B] font-bold tracking-widest uppercase flex items-center space-x-1">
              <span>TAP ANYWHERE TO SKIP</span>
              <ArrowRight className="w-3 h-3 animate-pulse" />
            </div>
          </motion.div>

          {/* High-Tech Background Blueprint Vector Grid & Scanlines */}
          <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,178,134,0.15)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(79,178,134,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

          {/* Sweeping Laser Radar Line */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4FB286]/80 to-transparent shadow-[0_0_20px_#4FB286] pointer-events-none z-10"
          />

          {/* Central High-Tech Transit Enclave */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.05, opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex flex-col items-center space-y-6 text-center px-4 max-w-xl w-full"
          >
            {/* Concentric Rotating Hologram Lock Rings */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              
              {/* Outer Dashed Rotating Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#4FB286]/40"
              />

              {/* Middle Counter-Rotating Geared Ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-dotted border-[#C8A96B]/50"
              />

              {/* Glowing Pulsing Core */}
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#0C111A] border-2 border-[#4FB286] shadow-[0_0_40px_rgba(79,178,134,0.5)] flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.6, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Unlock className="w-9 h-9 sm:w-10 sm:h-10 text-[#4FB286] drop-shadow-[0_0_12px_rgba(79,178,134,0.8)]" />
                </motion.div>
                
                {/* Expanding Ping Waves */}
                <div className="absolute inset-0 rounded-full border border-[#4FB286] animate-ping opacity-60 pointer-events-none" />
              </div>

              {/* 4 Corner Crosshairs */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#4FB286]" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#4FB286]" />
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 h-4 w-0.5 bg-[#4FB286]" />
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 h-4 w-0.5 bg-[#4FB286]" />
            </div>

            {/* Glowing Access Granted Title */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#4FB286]/10 border border-[#4FB286]/40 rounded-full text-[11px] font-bold text-[#4FB286] tracking-[0.25em] uppercase shadow-[0_0_15px_rgba(79,178,134,0.2)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4FB286]" />
                <span>SECURITY CLEARANCE VERIFIED</span>
              </div>

              <motion.h1 
                initial={{ letterSpacing: "0.15em", filter: "blur(4px)" }}
                animate={{ letterSpacing: "0.25em", filter: "blur(0px)" }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F4F5F7] tracking-[0.25em] uppercase font-mono drop-shadow-[0_0_25px_rgba(79,178,134,0.6)]"
              >
                {title}
              </motion.h1>

              <div className="text-xs sm:text-sm text-[#8D98A8] tracking-widest uppercase">
                {subtitle}
              </div>
            </div>

            {/* Terminal Live Telemetry Stream */}
            <div className="bg-[#0C111A]/95 border border-[#263140] p-3 sm:p-4 rounded-xs w-full max-w-md text-left text-[11px] space-y-1 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#263140] pb-1.5 mb-1.5 text-[#8D98A8]">
                <span className="flex items-center space-x-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#4FB286]" />
                  <span>INTERLOCK OVERRIDE DAEMON</span>
                </span>
                <span className="text-[#4FB286] font-bold">100% OK</span>
              </div>

              <div className="space-y-1 text-[#8D98A8] font-mono">
                <div className="flex items-center justify-between">
                  <span>&gt; AUTHENTICATING OPERATIVE...</span>
                  <span className="text-[#4FB286] font-bold">SUCCESS</span>
                </div>
                {telemetryStep >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between text-[#8D98A8]">
                    <span>&gt; DISENGAGING PNEUMATIC LATCHES...</span>
                    <span className="text-[#4FB286] font-bold">DISENGAGED</span>
                  </motion.div>
                )}
                {telemetryStep >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between text-[#8D98A8]">
                    <span>&gt; SYNCHRONIZING SECTOR TELEMETRY...</span>
                    <span className="text-[#4FB286] font-bold">ENGAGED</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* High-Velocity Speed Loader Bar */}
            <div className="w-full max-w-md space-y-2">
              <div className="w-full h-1.5 bg-[#0C111A] border border-[#263140] overflow-hidden rounded-full p-0.5">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[#C8A96B] via-[#4FB286] to-[#34D399] rounded-full shadow-[0_0_15px_#4FB286]"
                />
              </div>

              {/* Sound Equalizer Simulation */}
              <div className="flex items-center justify-center space-x-1 pt-1">
                {[12, 24, 16, 28, 20, 32, 18, 26, 14, 22].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, height, 6, height * 0.7, 4] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }}
                    className="w-1 bg-[#4FB286]/70 rounded-full"
                  />
                ))}
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
