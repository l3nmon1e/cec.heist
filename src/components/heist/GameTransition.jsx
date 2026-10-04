import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/audio';
import { ShieldCheck, ArrowRight, Lock, Unlock } from 'lucide-react';

export default function GameTransition({ 
  isActive, 
  title = "ACCESS GRANTED", 
  subtitle = "ADVANCING TO NEXT SECTOR", 
  onComplete 
}) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive) return;

    sound.playDoorUnlock();
    const timer = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 900); // 0.9s clean transition

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            if (onCompleteRef.current) onCompleteRef.current();
          }}
          className="fixed inset-0 z-50 bg-[#070B12] flex flex-col items-center justify-center font-mono select-none overflow-hidden cursor-pointer"
        >
          {/* Top & Bottom Cinematic Letterbox Shutters */}
          <motion.div 
            initial={{ height: "0%" }}
            animate={{ height: "15%" }}
            exit={{ height: "0%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 bg-[#000000] border-b border-[#263140] z-20"
          />
          <motion.div 
            initial={{ height: "0%" }}
            animate={{ height: "15%" }}
            exit={{ height: "0%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 right-0 bg-[#000000] border-t border-[#263140] z-20"
          />

          {/* Background Scanline Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,107,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

          {/* Central High-Tech Transit Stamp */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-30 flex flex-col items-center space-y-4 text-center px-4"
          >
            {/* Pulsing Status Icon */}
            <div className="w-16 h-16 rounded-full border-2 border-[#C8A96B] bg-[#0C111A] flex items-center justify-center shadow-[0_0_30px_rgba(200,169,107,0.4)]">
              <Unlock className="w-8 h-8 text-[#C8A96B] animate-pulse" />
            </div>

            {/* Title */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-[#C8A96B] tracking-[0.3em] uppercase">
                SECURITY OVERRIDE COMPLETE
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#F4F5F7] tracking-wider">
                {title}
              </h2>
            </div>

            {/* Subtitle & Progress Bar */}
            <div className="space-y-2 w-64 max-w-full">
              <div className="text-xs text-[#8D98A8] tracking-widest uppercase">
                {subtitle}
              </div>
              {/* High-speed transit loader bar */}
              <div className="w-full h-1 bg-[#121923] border border-[#263140] overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="h-full bg-[#C8A96B] shadow-[0_0_10px_#C8A96B]"
                />
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
