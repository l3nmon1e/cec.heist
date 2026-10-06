import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { AlertTriangle, Trash2, X, Siren } from 'lucide-react';

export const DangerZone = () => {
  const { 
    resetAllProgress, 
    triggerLockdown, 
    haltLockdown,
    lockdownActive 
  } = useGame();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const [isLockdownConfirmOpen, setIsLockdownConfirmOpen] = useState(false);

  const handleExecuteReset = (e) => {
    e.preventDefault();
    if (confirmInput.trim().toUpperCase() !== 'RESET') return;
    resetAllProgress();
    setIsResetModalOpen(false);
    setConfirmInput('');
    window.location.reload();
  };

  return (
    <div className="bg-[#0D131D] border border-[#D96C6C]/40 rounded-md p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#D96C6C]" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D96C6C]">
            Danger Zone
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#8994A4]">
          Destructive operations require explicit confirmation
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-mono text-xs">
        {/* Reset Competition Progress */}
        <div className="p-3.5 rounded bg-[#111923] border border-[#202B38] flex flex-col justify-between gap-3">
          <div>
            <div className="font-bold text-[#F4F5F7]">Reset Competition State</div>
            <div className="text-[11px] text-[#8994A4] mt-1">
              Clears all flag submissions, hints, inventory, and resets sector progress back to start.
            </div>
          </div>
          <div>
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="px-3 py-1.5 bg-[#D96C6C]/10 border border-[#D96C6C]/40 hover:bg-[#D96C6C]/20 text-[#D96C6C] rounded text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>RESET COMPETITION</span>
            </button>
          </div>
        </div>

        {/* Facility Emergency Lockdown */}
        <div className="p-3.5 rounded bg-[#111923] border border-[#202B38] flex flex-col justify-between gap-3">
          <div>
            <div className="font-bold text-[#F4F5F7]">Facility Emergency Lockdown</div>
            <div className="text-[11px] text-[#8994A4] mt-1">
              Triggers or halts the 5-minute red emergency alarm sequence across all client screens.
            </div>
          </div>
          <div>
            <button
              onClick={() => setIsLockdownConfirmOpen(true)}
              className="px-3 py-1.5 bg-[#D6AA55]/10 border border-[#D6AA55]/40 hover:bg-[#D6AA55]/20 text-[#D6AA55] rounded text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Siren className="w-3.5 h-3.5" />
              <span>{lockdownActive ? 'HALT EMERGENCY LOCKDOWN' : 'TRIGGER EMERGENCY LOCKDOWN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D131D] border border-[#D96C6C] rounded-md max-w-md w-full p-6 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#202B38]">
              <div className="flex items-center gap-2 text-[#D96C6C] font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>CONFIRM COMPETITION RESET</span>
              </div>
              <button onClick={() => setIsResetModalOpen(false)} className="text-[#8994A4] hover:text-[#F4F5F7]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleExecuteReset} className="mt-4 space-y-4">
              <p className="text-[#8994A4] leading-relaxed">
                This action is <strong className="text-[#D96C6C]">irreversible</strong>. It wipes all stored solves, unlocked hints, and sector completions for this session.
              </p>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F4F5F7] mb-1.5">
                  Type <span className="text-[#D96C6C] font-bold">RESET</span> to proceed:
                </label>
                <input
                  type="text"
                  required
                  placeholder="RESET"
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                  className="w-full bg-[#111923] border border-[#202B38] focus:border-[#D96C6C] rounded px-3 py-2 text-[#F4F5F7] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(false)}
                  className="px-4 py-2 rounded bg-[#111923] border border-[#202B38] text-[#8994A4] hover:text-[#F4F5F7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={confirmInput.trim().toUpperCase() !== 'RESET'}
                  className="px-4 py-2 rounded bg-[#D96C6C] text-[#070B12] font-bold hover:bg-[#e27c7c] disabled:opacity-40 transition-colors"
                >
                  EXECUTE RESET
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lockdown Confirmation Modal */}
      {isLockdownConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D131D] border border-[#D6AA55] rounded-md max-w-sm w-full p-5 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
              <div className="flex items-center gap-2 text-[#D6AA55] font-bold">
                <Siren className="w-4 h-4" />
                <span>FACILITY LOCKDOWN</span>
              </div>
              <button onClick={() => setIsLockdownConfirmOpen(false)} className="text-[#8994A4] hover:text-[#F4F5F7]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-3 text-[#8994A4] leading-relaxed">
              {lockdownActive
                ? "Disengage emergency lockdown and restore regular lighting and ambient status?"
                : "Initiate emergency 5-minute countdown sirens and red alert across all active contestant terminals?"}
            </p>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsLockdownConfirmOpen(false)}
                className="px-3.5 py-1.5 rounded bg-[#111923] border border-[#202B38] text-[#8994A4] hover:text-[#F4F5F7]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (lockdownActive) {
                    haltLockdown();
                  } else {
                    triggerLockdown();
                  }
                  setIsLockdownConfirmOpen(false);
                }}
                className="px-4 py-1.5 rounded bg-[#D6AA55] text-[#070B12] font-bold hover:bg-[#e4b865] transition-colors"
              >
                {lockdownActive ? "Halt Alert" : "Confirm Trigger"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DangerZone;
