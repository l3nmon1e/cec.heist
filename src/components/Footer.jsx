import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';

export default function Footer({ onOpenContact, onOpenPrivacy }) {
  const { setActiveTab } = useGame();

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222222] font-mono text-xs select-none relative pb-16 md:pb-0">
      
      {/* Bottom Bar: Copyright, Credit & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#737373] text-[11px]">
          
          {/* Copyright */}
          <div>
            © 2025 CEC HEIST. All rights reserved.
          </div>

          {/* Credit Line: Powered by Appvertex */}
          <div className="flex items-center space-x-1.5 text-[#8D98A8]">
            <span className="tracking-wide">Powered by</span>
            <a
              href="https://appvertex.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FACC15] hover:text-[#EAB308] font-bold tracking-wider hover:underline transition-colors cursor-pointer"
            >
              Appvertex
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-3 text-[#737373]">
            <button 
              onClick={() => {
                sound.playClick();
                onOpenPrivacy?.('privacy');
              }}
              className="hover:text-[#FACC15] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-[#303030]">|</span>
            <button 
              onClick={() => {
                sound.playClick();
                onOpenPrivacy?.('terms');
              }}
              className="hover:text-[#FACC15] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="text-[#303030]">|</span>
            <button 
              onClick={() => {
                sound.playClick();
                onOpenContact?.();
              }}
              className="hover:text-[#FACC15] transition-colors cursor-pointer"
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
