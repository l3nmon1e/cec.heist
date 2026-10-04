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
    <div className="bg-[#0C111A] border border-[#263140] p-4 sm:p-5 font-mono">
      <div className="flex items-center justify-between mb-3 border-b border-[#263140] pb-2.5">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-[#C8A96B]" />
          <h4 className="text-xs font-bold tracking-widest text-[#F4F5F7] uppercase">
            INTEL DECLASSIFICATION / HINTS
          </h4>
        </div>
        <span className="text-[11px] text-[#8D98A8]">
          ACTIVE PENALTIES APPLY
        </span>
      </div>

      <div className="space-y-2.5">
        {hintsList.map((hint) => {
          const isUnlocked = currentUnlocked.includes(hint.id);
          const isConfirming = confirmUnlockId === hint.id;

          return (
            <div 
              key={hint.id}
              className={`p-3.5 border transition-colors ${
                isUnlocked 
                  ? 'bg-[#121923] border-[#C8A96B]/50 text-[#F4F5F7]' 
                  : 'bg-[#070B12] border-[#263140] text-[#8D98A8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  {isUnlocked ? (
                    <Unlock className="w-3.5 h-3.5 text-[#C8A96B]" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-[#566375]" />
                  )}
                  <span className="font-bold text-xs text-[#F4F5F7]">
                    INTEL CLUE 0{hint.id}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-[#B85C5C] font-semibold">
                  -{hint.penalty} PTS PENALTY
                </span>
              </div>

              {isUnlocked ? (
                <p className="text-xs text-[#F4F5F7] font-sans mt-2.5 leading-relaxed bg-[#070B12] p-3 border border-[#263140]">
                  {hint.text}
                </p>
              ) : isConfirming ? (
                <div className="mt-2.5 p-3 bg-[#070B12] border border-[#B85C5C]/50 space-y-2.5">
                  <div className="flex items-center space-x-1.5 text-xs text-[#B85C5C]">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>CONFIRM INTEL REQUISITION: DEDUCT {hint.penalty} POINTS?</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => confirmRequisition(hint)}
                      className="px-3.5 py-1.5 bg-[#B85C5C] text-white text-[11px] font-bold tracking-wider hover:bg-[#A34E4E] transition-colors cursor-pointer"
                    >
                      CONFIRM (-{hint.penalty} PTS)
                    </button>
                    <button
                      onClick={() => setConfirmUnlockId(null)}
                      className="px-3.5 py-1.5 bg-[#121923] text-[#8D98A8] hover:text-[#F4F5F7] text-[11px] border border-[#263140] transition-colors cursor-pointer"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mt-2 pt-1 text-xs">
                  <span className="text-[11px] text-[#566375]">Encrypted operational guidance</span>
                  <button
                    onClick={() => handleRequisitionClick(hint)}
                    className="px-3 py-1 bg-[#121923] hover:bg-[#16202D] border border-[#263140] hover:border-[#C8A96B] text-[11px] text-[#F4F5F7] transition-colors cursor-pointer"
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
