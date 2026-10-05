import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { Shield, Key, ArrowRight, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-[#070B12] text-[#F4F5F7] font-mono flex items-center justify-center p-4 selection:bg-[#C8A96B] selection:text-[#070B12]">
      <div className="relative max-w-sm w-full bg-[#0D131D] border border-[#202B38] rounded-md p-6 sm:p-7 shadow-xl space-y-6">
        
        {/* Header Icon */}
        <div className="w-12 h-12 rounded-full bg-[#111923] border border-[#202B38] text-[#C8A96B] flex items-center justify-center mx-auto">
          <Shield className="w-5 h-5" />
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="text-[10px] text-[#C8A96B] font-bold tracking-widest uppercase">
            RESTRICTED ACCESS
          </div>
          <h1 className="text-lg font-bold text-[#F4F5F7] tracking-wider uppercase">
            CEC HEIST ADMIN
          </h1>
          <p className="text-xs text-[#8994A4] font-sans">
            Please enter your administrator passkey to access competition controls.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-[#8994A4] uppercase tracking-wider block">
              Admin Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Passkey"
                autoFocus
                className={`w-full bg-[#111923] border ${
                  error ? 'border-[#D96C6C] text-[#D96C6C]' : 'border-[#202B38] focus:border-[#C8A96B] text-[#F4F5F7]'
                } px-3 py-2 text-xs font-mono tracking-wider focus:outline-none transition-colors pr-9 rounded`}
              />
              <Key className="w-3.5 h-3.5 text-[#8994A4] absolute right-3 top-2.5" />
            </div>
            {error && (
              <p className="text-[10px] text-[#D96C6C] pt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>Invalid passkey (Attempt #{attempts})</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#C8A96B] hover:bg-[#d8bb7d] text-[#070B12] font-bold uppercase tracking-wider text-xs font-mono flex items-center justify-center gap-2 rounded transition-colors"
          >
            <span>AUTHENTICATE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Helper Note */}
        <div className="border-t border-[#202B38] pt-3 text-center text-[10px] text-[#8994A4]">
          <span>Default Key: </span>
          <code className="text-[#C8A96B] font-bold bg-[#111923] px-1.5 py-0.5 rounded border border-[#202B38]">
            admin2026
          </code>
        </div>

      </div>
    </div>
  );
}

export default AdminGuard;
