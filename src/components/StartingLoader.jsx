import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/formatters';

export default function StartingLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Smooth, rapid loader animation (~2.0 seconds)
    const intervalTime = 20;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const step = Math.floor(Math.random() * 3) + 2; // 2-4% each tick
        return Math.min(100, prev + step);
      });
    }, intervalTime);

    // Click anywhere or press Escape to skip immediately
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // When progress reaches 100%, perform seamless exit
  useEffect(() => {
    if (progress === 100 && !isFinishing) {
      const exitTimer = setTimeout(() => {
        setIsFinishing(true);
        const finishTimer = setTimeout(() => {
          setIsDismissed(true);
          if (onComplete) onComplete();
        }, 500);
        return () => clearTimeout(finishTimer);
      }, 250);

      return () => clearTimeout(exitTimer);
    }
  }, [progress, isFinishing, onComplete]);

  const handleDismiss = () => {
    setIsFinishing(true);
    setTimeout(() => {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 250);
  };

  if (isDismissed) return null;

  return (
    <div 
      onClick={handleDismiss}
      className={`fixed inset-0 z-[9999] bg-[#070B12] flex flex-col items-center justify-center p-6 select-none overflow-hidden transition-all duration-500 ease-out cursor-pointer ${
        isFinishing ? 'opacity-0 scale-105 pointer-events-none filter blur-[2px]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle blueprint grid ambient depth */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />
      
      {/* Central Ambient Golden Aura */}
      <div className="absolute w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-[#C8A96B]/10 blur-[100px] pointer-events-none animate-pulse" />

      {/* Main Animated Logo Showcase */}
      <div className="relative flex flex-col items-center justify-center z-10 max-w-2xl w-full">
        
        {/* Animated Logo Container with Shimmer Light Sheen */}
        <div className="relative overflow-hidden p-3 sm:p-5 flex items-center justify-center">
          
          <img
            src={getAssetUrl('/images/cec_heist_logo.png')}
            alt="CEC HEIST"
            className="w-[300px] sm:w-[460px] md:w-[540px] h-auto object-contain animate-logo-glow drop-shadow-[0_0_25px_rgba(200,169,107,0.4)]"
          />

          {/* Diagonal Laser Shimmer Sheen Beam Gliding Across Metallic Emblem */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-loader-shimmer" />
          </div>
        </div>

        {/* Minimalist Micro Progress Bar */}
        <div className="mt-8 w-44 sm:w-64 flex flex-col items-center space-y-2">
          
          {/* Ultra-thin elegant progress track */}
          <div className="w-full h-[2px] bg-[#1C2633] rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-[#8E784D] via-[#C8A96B] to-[#FACC15] transition-all duration-100 ease-out relative shadow-[0_0_8px_rgba(200,169,107,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Micro numeric indicator */}
          <div className="font-mono text-[10px] text-[#8D98A8] tracking-widest">
            {progress.toString().padStart(3, '0')}%
          </div>
        </div>

      </div>

    </div>
  );
}
