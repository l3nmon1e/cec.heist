import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { X, Shield, Key, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function RegisterLoginModal({ isOpen, onClose, defaultMode = 'register' }) {
  const { setActiveTab } = useGame();
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
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      setActiveTab('dashboard');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 font-mono select-none">
      <div className="bg-[#151515] border border-[#303030] max-w-md w-full p-6 space-y-5 shadow-2xl relative">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[#FACC15]" />
            <h3 className="font-bold text-sm text-[#E5E7EB] uppercase tracking-wider">
              {mode === 'register' ? 'OPERATOR REGISTRATION' : 'CONSOLE AUTHENTICATION'}
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-[#737373] hover:text-[#EF4444] transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#22C55E] mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-[#E5E7EB]">AUTHENTICATION CONFIRMED</h4>
            <p className="text-xs text-[#737373]">Redirecting operator to Mission Control console...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {mode === 'register' && (
              <div>
                <label className="text-[11px] text-[#737373] block mb-1 uppercase tracking-wider">
                  TEAM / SQUAD CALLSIGN
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. SPECTRE-9"
                  className="w-full bg-[#0A0A0A] border border-[#303030] focus:border-[#FACC15] px-3 py-2 text-[#E5E7EB] placeholder-[#525252] outline-none"
                />
              </div>
            )}

            <div>
              <label className="text-[11px] text-[#737373] block mb-1 uppercase tracking-wider">
                OPERATOR HANDLE / CALLSIGN
              </label>
              <input
                type="text"
                required
                value={operatorHandle}
                onChange={(e) => setOperatorHandle(e.target.value)}
                placeholder="e.g. OP-7492 or V4P0R"
                className="w-full bg-[#0A0A0A] border border-[#303030] focus:border-[#FACC15] px-3 py-2 text-[#E5E7EB] placeholder-[#525252] outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-[#737373] block mb-1 uppercase tracking-wider">
                COLLEGE ID / ACCESS TOKEN
              </label>
              <input
                type="password"
                required
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                placeholder="4NN22CS..."
                className="w-full bg-[#0A0A0A] border border-[#303030] focus:border-[#FACC15] px-3 py-2 text-[#E5E7EB] placeholder-[#525252] outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#FACC15] hover:bg-[#EAB308] text-black font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>{mode === 'register' ? 'PROCEED TO SECTOR ACCESS' : 'ENGAGE CONSOLE'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center pt-2 text-[11px] text-[#737373]">
              {mode === 'register' ? (
                <span>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#FACC15] hover:underline"
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
                    className="text-[#FACC15] hover:underline"
                  >
                    Register
                  </button>
                </span>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
