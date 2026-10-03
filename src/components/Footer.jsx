import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';

export default function Footer({ onOpenContact, onOpenPrivacy }) {
  const { setActiveTab } = useGame();

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222222] font-mono text-xs select-none relative">
      
      {/* Bottom Bar: Copyright & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#737373] text-[11px]">
          
          <div>
            © 2025 CEC HEIST. All rights reserved.
          </div>

          <div className="flex items-center space-x-3 text-[#737373]">
            <button 
              onClick={() => {
                sound.playClick();
                onOpenPrivacy?.('privacy');
              }}
              className="hover:text-[#FACC15] transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-[#303030]">|</span>
            <button 
              onClick={() => {
                sound.playClick();
                onOpenPrivacy?.('terms');
              }}
              className="hover:text-[#FACC15] transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-[#303030]">|</span>
            <button 
              onClick={() => {
                sound.playClick();
                onOpenContact?.();
              }}
              className="hover:text-[#FACC15] transition-colors"
            >
              Contact
            </button>
          </div>

        </div>
      </div>

      {/* Very Bottom Hazard Warning Stripe Bar as in Mockup */}
      <div className="h-3 w-full hazard-stripe opacity-90" />
    </footer>
  );
}
