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
    <div className="bg-[#151515] border border-[#303030] p-4 font-mono">
      <div className="flex items-center justify-between mb-3 border-b border-[#303030] pb-2">
        <div className="flex items-center space-x-2">
          <Key className="w-4 h-4 text-[#FACC15]" />
          <h4 className="text-xs font-bold tracking-widest text-[#E5E7EB] uppercase">
            FLAG VERIFICATION ORACLE
          </h4>
        </div>
        <span className="text-[11px] text-[#737373]">
          FORMAT: <span className="text-[#FACC15]">CEC&#123;...&#125;</span>
        </span>
      </div>

      {isSolved ? (
        <div className="p-3 bg-[#16A34A]/10 border border-[#22C55E]/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <CheckCircle className="w-5 h-5 text-[#22C55E]" />
            <div>
              <p className="text-xs font-bold text-[#4ADE80]">CLEARANCE GRANTED // OBJECTIVE SECURED</p>
              <p className="text-[11px] text-[#737373]">Token verified and logged in blockchain oracle ledger.</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-[#22C55E]/20 text-[#4ADE80] text-xs font-semibold">
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
              className="w-full bg-[#0A0A0A] border border-[#303030] focus:border-[#FACC15] px-3.5 py-2.5 text-xs text-[#E5E7EB] placeholder-[#525252] outline-none font-mono tracking-wider transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-[10px] text-[#737373]">
              Rate limit: 5 attempts/min. Case-sensitive token.
            </p>

            <button
              type="submit"
              disabled={isSubmitting || !flagInput.trim()}
              className="flex items-center space-x-2 px-5 py-2 bg-[#FACC15] hover:bg-[#EAB308] text-[#0A0A0A] font-bold text-xs tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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
              ? 'bg-[#16A34A]/10 border-[#22C55E]/50 text-[#4ADE80]'
              : 'bg-[#EF4444]/10 border-[#EF4444]/50 text-[#F87171]'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-[#22C55E]" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 text-[#EF4444]" />
          )}
          <span className="font-mono text-[11px] leading-tight">{status.message}</span>
        </div>
      )}
    </div>
  );
}
