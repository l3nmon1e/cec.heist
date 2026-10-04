import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { X, Shield, Key, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function RegisterLoginModal({ isOpen, onClose, defaultMode = 'register' }) {
  const { setActiveTab, setCrewName } = useGame();
  const [mode, setMode] = useState(defaultMode);
  const [teamName, setTeamName] = useState('');
  const [operatorHandle, setOperatorHandle] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    const callsign = (teamName || operatorHandle || 'GHOST-07').trim().toUpperCase();
    if (setCrewName) {
      setCrewName(callsign);
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      setActiveTab('dashboard');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono select-none">
      {/* Outer Tactical Bulkhead Card */}
      <div className="bg-[#0C1017] border-2 border-[#242F3D] max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(250,204,21,0.1)] relative overflow-hidden">
        
        {/* Top Caution Hazard Stripe Bar */}
        <div 
          className="h-2 w-full border-b border-[#242F3D]"
          style={{
            background: 'repeating-linear-gradient(-45deg, #FACC15, #FACC15 12px, #070B12 12px, #070B12 24px)'
          }}
        />

        {/* Industrial Corner Rivets */}
        <div className="absolute top-3 left-2 w-1.5 h-1.5 rounded-full bg-[#374151] border border-[#111827] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <div className="absolute top-3 right-2 w-1.5 h-1.5 rounded-full bg-[#374151] border border-[#111827] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#374151] border border-[#111827] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#374151] border border-[#111827] shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />

        <div className="p-6 space-y-5">
          {/* Heavy Bulkhead Header */}
          <div className="border-b border-[#1E293B] pb-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-[#FACC15]/10 border border-[#FACC15]/40 rounded-sm">
                  <Shield className="w-4 h-4 text-[#FACC15]" />
                </div>
                <div>
                  <div className="text-[9px] text-[#FACC15] font-bold tracking-[0.25em] uppercase">
                    CLEARANCE: RESTRICTED // SEC-04
                  </div>
                  <h3 className="font-black text-sm text-[#F4F5F7] uppercase tracking-wider">
                    {mode === 'register' ? 'OPERATOR REGISTRATION' : 'CONSOLE AUTHENTICATION'}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="text-[#64748B] hover:text-[#EF4444] hover:bg-[#EF4444]/10 border border-transparent hover:border-[#EF4444]/30 transition-all p-1 cursor-pointer"
                title="Abort / Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Gateway Telemetry */}
            <div className="flex items-center justify-between text-[9px] text-[#606E85] tracking-widest pt-1">
              <span>GATEWAY: 10.240.4.12</span>
              <span className="flex items-center space-x-1.5 text-[#22C55E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
                <span>ONLINE // READY</span>
              </span>
            </div>
          </div>

          {success ? (
            <div className="py-8 text-center space-y-3 bg-[#070B12] border border-[#22C55E]/30 p-4">
              <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto animate-bounce" />
              <h4 className="text-base font-black text-[#F4F5F7] tracking-wider">AUTHENTICATION CONFIRMED</h4>
              <p className="text-xs text-[#8D98A8]">Redirecting operator to Mission Control console...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {mode === 'register' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] text-[#8D98A8] font-bold uppercase tracking-wider">
                      TEAM / SQUAD CALLSIGN
                    </label>
                    <span className="text-[9px] text-[#606E85]">OPTIONAL</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. SPECTRE-9"
                      className="w-full bg-[#070B12] border border-[#242F3D] focus:border-[#FACC15] focus:border-l-4 focus:border-l-[#FACC15] px-3.5 py-2.5 text-[#F4F5F7] placeholder-[#475569] outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] text-[#8D98A8] font-bold uppercase tracking-wider">
                    OPERATOR HANDLE / CALLSIGN
                  </label>
                  <span className={`w-2 h-2 rounded-full ${operatorHandle ? 'bg-[#22C55E] shadow-[0_0_6px_#22C55E]' : 'bg-[#EF4444]/60'}`} />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={operatorHandle}
                    onChange={(e) => setOperatorHandle(e.target.value)}
                    placeholder="e.g. OP-7492 or V4P0R"
                    className="w-full bg-[#070B12] border border-[#242F3D] focus:border-[#FACC15] focus:border-l-4 focus:border-l-[#FACC15] px-3.5 py-2.5 text-[#F4F5F7] placeholder-[#475569] outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] text-[#8D98A8] font-bold uppercase tracking-wider">
                    COLLEGE ID / ACCESS TOKEN
                  </label>
                  <span className={`w-2 h-2 rounded-full ${collegeId ? 'bg-[#22C55E] shadow-[0_0_6px_#22C55E]' : 'bg-[#EF4444]/60'}`} />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={collegeId}
                    onChange={(e) => setCollegeId(e.target.value)}
                    placeholder="4NN22CS..."
                    className="w-full bg-[#070B12] border border-[#242F3D] focus:border-[#FACC15] focus:border-l-4 focus:border-l-[#FACC15] px-3.5 py-2.5 text-[#F4F5F7] placeholder-[#475569] outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="relative group w-full py-3 bg-[#FACC15] hover:bg-[#FFE066] active:translate-y-[1px] text-[#070B12] font-black text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] overflow-hidden"
                >
                  {/* Subtle caution angle sweep accent on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>{mode === 'register' ? 'PROCEED TO SECTOR ACCESS' : 'ENGAGE CONSOLE'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              <div className="text-center pt-2 text-[11px] text-[#64748B] flex items-center justify-center space-x-1.5">
                {mode === 'register' ? (
                  <span>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-[#FACC15] hover:text-[#FFE066] font-bold hover:underline cursor-pointer"
                    >
                      Log In
                    </button>
                  </span>
                ) : (
                  <span>
                    Need an operator profile?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="text-[#FACC15] hover:text-[#FFE066] font-bold hover:underline cursor-pointer"
                    >
                      Register
                    </button>
                  </span>
                )}
              </div>

            </form>
          )}

        </div>

        {/* Bottom Caution Edge Stripe Bar */}
        <div 
          className="h-1.5 w-full border-t border-[#242F3D]"
          style={{
            background: 'repeating-linear-gradient(-45deg, #FACC15, #FACC15 12px, #070B12 12px, #070B12 24px)'
          }}
        />

      </div>
    </div>
  );
}
