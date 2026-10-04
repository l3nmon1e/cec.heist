import React, { useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/formatters';

export default function StartingLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Cinematic, smooth pacing (~3.4 - 3.8 seconds)
    const intervalTime = 32;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Smooth, natural progress with organic variance
        let step = 1;
        if (prev < 40) {
          step = Math.random() > 0.4 ? 1 : 2;
        } else if (prev < 75) {
          step = 1;
        } else if (prev < 90) {
          step = Math.random() > 0.3 ? 1 : 0; // brief tactical delay
        } else {
          step = 1;
        }
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

  // When progress reaches 100%, hold briefly then perform seamless exit
  useEffect(() => {
    if (progress === 100 && !isFinishing) {
      const exitTimer = setTimeout(() => {
        setIsFinishing(true);
        const finishTimer = setTimeout(() => {
          setIsDismissed(true);
          if (onComplete) onComplete();
        }, 650);
        return () => clearTimeout(finishTimer);
      }, 450);

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
        
        {/* Pure Transparent Logo with Alpha-Contour Glow */}
        <div className="relative flex items-center justify-center select-none">
          <img
            src={getAssetUrl('/images/cec_heist_logo.png')}
            alt="CEC HEIST"
            className="w-[280px] sm:w-[440px] md:w-[520px] h-auto object-contain animate-logo-glow pointer-events-none"
          />
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
