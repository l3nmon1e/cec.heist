import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Key, CheckCircle, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function FlagSubmission({ mission }) {
  const { submitFlag } = useGame();
  const [flagInput, setFlagInput] = useState('');
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!flagInput.trim()) return;

    sound.playClick();
    setIsSubmitting(true);
    setStatus(null);

    // Realistic cryptographic verification delay (450ms)
    setTimeout(() => {
      const res = submitFlag(mission.id, flagInput);
      setIsSubmitting(false);
      if (res.success) {
        setStatus({ type: 'success', message: res.message });
      } else {
        setStatus({ type: 'error', message: res.message });
      }
    }, 450);
  };

  const isSolved = mission.status === 'SOLVED';

  return (
    <div className="bg-[#0C111A] border border-[#263140] p-4 sm:p-5 font-mono">
      <div className="flex items-center justify-between mb-3 border-b border-[#263140] pb-2.5">
        <div className="flex items-center space-x-2">
          <Key className="w-4 h-4 text-[#C8A96B]" />
          <h4 className="text-xs font-bold tracking-widest text-[#F4F5F7] uppercase">
            FLAG VERIFICATION ORACLE
          </h4>
        </div>
        <span className="text-[11px] text-[#8D98A8]">
          FORMAT: <span className="text-[#C8A96B]">CEC&#123;...&#125;</span>
        </span>
      </div>

      {isSolved ? (
        <div className="p-3.5 bg-[#4FB286]/10 border border-[#4FB286]/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <CheckCircle className="w-5 h-5 text-[#4FB286]" />
            <div>
              <p className="text-xs font-bold text-[#4FB286]">CLEARANCE GRANTED // OBJECTIVE SECURED</p>
              <p className="text-[11px] text-[#8D98A8]">Cryptographic token authenticated and logged in facility ledger.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-[#4FB286]/20 text-[#4FB286] text-xs font-bold">
            COMPLETED
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              placeholder="CEC{enter_captured_flag_string}"
              disabled={isSubmitting}
              spellCheck={false}
              autoComplete="off"
              className="w-full bg-[#070B12] border border-[#263140] focus:border-[#C8A96B] px-3.5 py-2.5 text-xs text-[#F4F5F7] placeholder-[#566375] outline-none font-mono tracking-wider transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <p className="text-[10px] text-[#8D98A8]">
              Rate limit: 5 attempts/min. Case-sensitive token.
            </p>

            <button
              type="submit"
              disabled={isSubmitting || !flagInput.trim()}
              className="flex items-center space-x-2 px-5 py-2 bg-[#C8A96B] hover:bg-[#D6A85F] text-[#070B12] font-bold text-xs tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>VERIFYING HASH...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SUBMIT FLAG</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Response feedback box */}
      {status && (
        <div
          className={`mt-3 p-2.5 text-xs flex items-center space-x-2 border ${
            status.type === 'success'
              ? 'bg-[#4FB286]/10 border-[#4FB286]/50 text-[#4FB286]'
              : 'bg-[#B85C5C]/10 border-[#B85C5C]/50 text-[#B85C5C]'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-[#4FB286]" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 text-[#B85C5C]" />
          )}
          <span className="font-mono text-[11px] leading-tight">{status.message}</span>
        </div>
      )}
    </div>
  );
}
