import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { HelpCircle, Lock, Unlock, AlertOctagon } from 'lucide-react';
import { sound } from '../utils/audio';

export default function HintPanel({ mission }) {
  const { unlockedHints, unlockHint } = useGame();
  const [confirmUnlockId, setConfirmUnlockId] = useState(null);

  const hintsList = mission.hints || [];
  const currentUnlocked = unlockedHints[mission.id] || [];

  const handleRequisitionClick = (hint) => {
    sound.playClick();
    setConfirmUnlockId(hint.id);
  };

  const confirmRequisition = (hint) => {
    unlockHint(mission.id, hint.id, hint.penalty);
    setConfirmUnlockId(null);
  };

  if (hintsList.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#151515] border border-[#303030] p-4 font-mono">
      <div className="flex items-center justify-between mb-3 border-b border-[#303030] pb-2">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-[#FACC15]" />
          <h4 className="text-xs font-bold tracking-widest text-[#E5E7EB] uppercase">
            INTEL DECLASSIFICATION / HINTS
          </h4>
        </div>
        <span className="text-[11px] text-[#737373]">
          ACTIVE PENALTIES APPLY
        </span>
      </div>

      <div className="space-y-2.5">
        {hintsList.map((hint, idx) => {
          const isUnlocked = currentUnlocked.includes(hint.id);
          const isConfirming = confirmUnlockId === hint.id;

          return (
            <div 
              key={hint.id}
              className={`p-3 border transition-colors ${
                isUnlocked 
                  ? 'bg-[#1A1A1A] border-[#FACC15]/40 text-[#E5E7EB]' 
                  : 'bg-[#101010] border-[#303030] text-[#737373]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  {isUnlocked ? (
                    <Unlock className="w-3.5 h-3.5 text-[#FACC15]" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-[#737373]" />
                  )}
                  <span className="font-bold text-xs text-[#E5E7EB]">
                    HINT 0{hint.id}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-[#F87171]">
                  -{hint.penalty} PTS PENALTY
                </span>
              </div>

              {isUnlocked ? (
                <p className="text-xs text-[#E5E7EB] font-sans mt-2 leading-relaxed bg-[#0A0A0A] p-2.5 border border-[#303030]">
                  {hint.text}
                </p>
              ) : isConfirming ? (
                <div className="mt-2 p-2.5 bg-[#0A0A0A] border border-[#F87171]/50 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs text-[#F87171]">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>CONFIRM INTEL REQUISITION: DEDUCT {hint.penalty} POINTS?</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => confirmRequisition(hint)}
                      className="px-3 py-1 bg-[#EF4444] text-white text-[11px] font-bold tracking-wider hover:bg-[#DC2626]"
                    >
                      CONFIRM (-{hint.penalty} PTS)
                    </button>
                    <button
                      onClick={() => setConfirmUnlockId(null)}
                      className="px-3 py-1 bg-[#1F1F1F] text-[#737373] hover:text-[#E5E7EB] text-[11px] border border-[#303030]"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mt-2 pt-1">
                  <span className="text-[11px] text-[#525252]">Encrypted operational guidance</span>
                  <button
                    onClick={() => handleRequisitionClick(hint)}
                    className="px-2.5 py-1 bg-[#1F1F1F] hover:bg-[#262626] border border-[#303030] hover:border-[#FACC15] text-[11px] text-[#E5E7EB] transition-colors"
                  >
                    REQUISITION INTEL →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
