import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Zap,
  Lock,
  Unlock,
  Key,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../../utils/audio';

export default function RoomGuideBar({
  isCompleted = false,
  primaryMission = null,
  primaryObjectName = "Primary Terminal",
  nextRoomName = "Next Sector",
  onProceedNext,
  onOpenPrimaryMission
}) {
  const [showTips, setShowTips] = useState(false);

  const handleProceed = () => {
    sound.playDoorUnlock();
    if (onProceedNext) onProceedNext();
  };

  const handleOpenMission = () => {
    sound.playClick();
    if (onOpenPrimaryMission) onOpenPrimaryMission();
  };

  return (
    <div className="w-full font-mono select-none space-y-3">
      {/* 1. PRIMARY STATE BANNER */}
      {isCompleted ? (
        /* SOLVED STATE: Unmissable High-Contrast Advancement Banner */
        <div className="relative bg-gradient-to-r from-[#0C1A14] via-[#0F241C] to-[#0C1A14] border-2 border-[#4FB286] p-4 sm:p-5 shadow-[0_0_30px_rgba(79,178,134,0.3)] animate-fade-in rounded-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center space-x-3.5 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#4FB286]/20 border-2 border-[#4FB286] flex items-center justify-center shrink-0 shadow-[0_0_15px_#4FB286]">
                <ShieldCheck className="w-6 h-6 text-[#4FB286] animate-bounce" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 justify-center md:justify-start">
                  <span className="px-2 py-0.5 bg-[#4FB286] text-[#070B12] font-black text-[10px] uppercase tracking-widest rounded-sm">
                    SECTOR CLEARED
                  </span>
                  <span className="text-[11px] text-[#4FB286] font-bold">
                    SECURITY BARRIER DISENGAGED
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#F4F5F7] tracking-wide uppercase">
                  GATE IS UNLOCKED! READY TO ADVANCE
                </h3>
                <p className="text-xs text-[#8D98A8] font-sans">
                  The primary objective is completed. Click below or inspect the unlocked door to proceed.
                </p>
              </div>
            </div>

            {/* Big Unmissable Proceed Button */}
            <button
              type="button"
              onClick={handleProceed}
              className="w-full md:w-auto px-6 py-3.5 bg-[#4FB286] hover:bg-[#3ea075] text-[#070B12] text-xs sm:text-sm font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(79,178,134,0.5)] hover:scale-105 active:scale-95 flex items-center justify-center space-x-2.5 cursor-pointer rounded-sm"
            >
              <span>PROCEED TO {nextRoomName}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

          </div>
        </div>
      ) : (
        /* IN PROGRESS STATE: Clear 3-Step Guided Roadmap for Students */
        <div className="bg-[#0C111A] border border-[#263140] p-3.5 sm:p-4 rounded-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            
            {/* Guide Step Tracker */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 text-xs">
              
              {/* Step 1 */}
              <div className="bg-[#070B12] border border-[#C8A96B]/40 p-2.5 flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded-full bg-[#C8A96B]/20 text-[#C8A96B] font-bold text-xs flex items-center justify-center shrink-0 border border-[#C8A96B]/50">
                  1
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-[#C8A96B] font-bold uppercase">STEP 1: INFILTRATE</div>
                  <div className="text-[11px] text-[#F4F5F7] truncate font-sans">Open primary challenge</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#070B12] border border-[#263140] p-2.5 flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded-full bg-[#121923] text-[#8D98A8] font-bold text-xs flex items-center justify-center shrink-0 border border-[#263140]">
                  2
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-[#8D98A8] font-bold uppercase">STEP 2: CAPTURE FLAG</div>
                  <div className="text-[11px] text-[#8D98A8] truncate font-sans">Find flag & submit</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#070B12] border border-[#263140] p-2.5 flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded-full bg-[#121923] text-[#8D98A8] font-bold text-xs flex items-center justify-center shrink-0 border border-[#263140]">
                  3
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-[#8D98A8] font-bold uppercase">STEP 3: ADVANCE</div>
                  <div className="text-[11px] text-[#8D98A8] truncate font-sans">Exit gate unlocks</div>
                </div>
              </div>

            </div>

            {/* Quick Launch Button */}
            {primaryMission && onOpenPrimaryMission && (
              <button
                type="button"
                onClick={handleOpenMission}
                className="px-4 py-2.5 bg-[#C8A96B] hover:bg-[#E5D0A0] text-[#070B12] text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer shadow-[0_0_12px_rgba(200,169,107,0.2)] rounded-sm"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>START CHALLENGE: {primaryMission.number || "01"}</span>
              </button>
            )}

          </div>

          {/* Collapsible Beginner Helper Accordion */}
          <div className="mt-2.5 pt-2 border-t border-[#1C2633] flex items-center justify-between text-[11px]">
            <div className="text-[#8D98A8] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>
                First year student? Click <strong className="text-[#F4F5F7]">{primaryObjectName}</strong> below to begin.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowTips(!showTips)}
              className="text-[#C8A96B] hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>{showTips ? "Hide Guide" : "How does this work?"}</span>
              {showTips ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showTips && (
            <div className="mt-3 p-3 bg-[#070B12] border border-[#263140] text-xs text-[#8D98A8] font-sans space-y-2 leading-relaxed">
              <p>
                <strong className="text-[#C8A96B] font-mono">1. What is the goal?</strong> In each sector room, there is a primary challenge you must solve to unlock the exit door and move to the next sector.
              </p>
              <p>
                <strong className="text-[#C8A96B] font-mono">2. How to submit the flag?</strong> Inside the challenge window, use the briefing, terminal, or hints to find the secret text starting with <code className="text-[#4FB286] font-mono">CEC&#123;...&#125;</code>. Paste it into the <em>Flag Verification Oracle</em> and submit.
              </p>
              <p>
                <strong className="text-[#4FB286] font-mono">3. What next?</strong> As soon as your flag is accepted, this banner will turn green and the exit door will unlock! Click the green button to enter the next sector.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
