import React from 'react';
import { X, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

export default function PrivacyTermsModal({ isOpen, onClose, mode = 'privacy' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 font-mono select-none">
      <div className="bg-[#151515] border border-[#303030] max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[80vh] flex flex-col">
        
        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3 shrink-0">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[#FACC15]" />
            <h3 className="font-bold text-sm text-[#E5E7EB] uppercase tracking-wider">
              {mode === 'privacy' ? 'DATA PRIVACY & TELEMETRY POLICY' : 'EVENT TERMS & CONDITIONS'}
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

        <div className="overflow-y-auto space-y-3 pr-2 text-xs font-sans text-[#A3A3A3] leading-relaxed flex-1">
          {mode === 'privacy' ? (
            <>
              <p>
                <strong>1. Telemetry Collection:</strong> CEC HEIST scoring systems log flag submission attempts, time deltas, and IP connection records exclusively for integrity verification and leaderboard calculation.
              </p>
              <p>
                <strong>2. Credential Security:</strong> Student IDs and handles are stored securely on local isolated scoring databases and are never shared with external advertisers or commercial tracking third-parties.
              </p>
              <p>
                <strong>3. Audit Logs:</strong> Console command inputs and packet captures in simulated environments are retained for 30 days post-competition for write-up assessments.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Ethical Engagement:</strong> Participants agree to confine all offensive security testing strictly to designated target IP subnets (10.24.0.0/16).
              </p>
              <p>
                <strong>2. Fair Play:</strong> Flag sharing between distinct squads is grounds for immediate disqualification.
              </p>
              <p>
                <strong>3. Campus Code of Conduct:</strong> All collegiate disciplinary guidelines apply to on-campus attendees at Canara Engineering College.
              </p>
            </>
          )}
        </div>

        <div className="shrink-0 pt-2 border-t border-[#262626] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1F1F1F] hover:bg-[#262626] text-[#E5E7EB] text-xs font-semibold"
          >
            ACKNOWLEDGE
          </button>
        </div>

      </div>
    </div>
  );
}
