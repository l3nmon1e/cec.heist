import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { ShieldAlert, Key, Lock, ArrowRight, AlertTriangle } from 'lucide-react';

const VALID_PASSKEYS = ['admin2026', 'CEC_HEIST_ADMIN', 'heistadmin', 'cec2026'];

export function AdminGuard({ onAuthenticated }) {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanKey = passkey.trim();

    if (VALID_PASSKEYS.includes(cleanKey.toLowerCase()) || cleanKey === 'admin2026') {
      sound.playAccessGranted();
      try {
        sessionStorage.setItem('CEC_ADMIN_AUTH', 'true');
      } catch {}
      onAuthenticated();
    } else {
      sound.playError();
      setError(true);
      setAttempts(prev => prev + 1);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#05080E] text-[#F4F5F7] font-mono flex items-center justify-center p-4 selection:bg-[#B85C5C] selection:text-[#F4F5F7]">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(184,92,92,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-md w-full bg-[#0C111A] border-2 border-[#263140] p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header Icon */}
        <div className="w-16 h-16 rounded-full bg-[#180A0A] border-2 border-[#B85C5C] text-[#B85C5C] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(184,92,92,0.35)] animate-pulse">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="text-[10px] text-[#B85C5C] font-black tracking-[0.25em] uppercase">
            RESTRICTED ACCESS // LEVEL-00 ROOT
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#F4F5F7] tracking-wider uppercase">
            CEC HEIST ADMIN PORTAL
          </h1>
          <p className="text-xs text-[#8D98A8] font-sans">
            Authorized personnel only. Passkey verification required to access live command switchboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] text-[#8D98A8] uppercase tracking-wider block">
              ENTER MASTER ADMIN PASSKEY
            </label>
            <div className="relative">
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Passkey: admin2026"
                autoFocus
                className={`w-full bg-[#070B12] border ${
                  error ? 'border-[#B85C5C] text-[#B85C5C]' : 'border-[#263140] focus:border-[#C8A96B] text-[#F4F5F7]'
                } px-4 py-3 text-sm font-mono tracking-widest focus:outline-none transition-colors pr-10`}
              />
              <Key className="w-4 h-4 text-[#8D98A8] absolute right-3 top-3.5" />
            </div>
            {error && (
              <p className="text-[10px] text-[#B85C5C] pt-1 flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>INVALID PASSKEY. ACCESS DENIED (ATTEMPT #{attempts})</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#B85C5C] hover:bg-[#c96b6b] text-[#070B12] font-black uppercase tracking-wider text-xs font-mono flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(184,92,92,0.3)] active:scale-95 cursor-pointer"
          >
            <span>AUTHENTICATE & ENTER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Helper Note for Local Dev */}
        <div className="border-t border-[#263140]/60 pt-4 text-center text-[10px] text-[#8D98A8]">
          <span>Default Key: </span>
          <code className="text-[#C8A96B] font-bold bg-[#070B12] px-1.5 py-0.5 border border-[#263140]">
            admin2026
          </code>
        </div>

      </div>
    </div>
  );
}

export default AdminGuard;
