import React from 'react';
import { X, Mail, MapPin, Globe, MessageSquare } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 font-mono select-none">
      <div className="bg-[#151515] border border-[#303030] max-w-lg w-full p-6 space-y-5 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
          <h3 className="font-bold text-sm text-[#FACC15] uppercase tracking-wider">
            MISSION CONTROL // OPS DESK CONTACT
          </h3>
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

        <div className="space-y-4 text-xs">
          
          <div className="flex items-start space-x-3 p-3 bg-[#0A0A0A] border border-[#262626]">
            <MapPin className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#E5E7EB] block">CAMPUS LOCATION</span>
              <span className="text-[#9CA3AF]">
                Canara Engineering College<br />
                Benjanapadavu, Bantwal Taluk, Mangaluru, Karnataka 574219
              </span>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-[#0A0A0A] border border-[#262626]">
            <Mail className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#E5E7EB] block">DIRECT COMM LINK</span>
              <a 
                href="mailto:heist-support@canaraengineering.in" 
                className="text-[#FACC15] hover:underline"
              >
                heist-support@canaraengineering.in
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-[#0A0A0A] border border-[#262626]">
            <MessageSquare className="w-4 h-4 text-[#FACC15] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#E5E7EB] block">DISCORD OPS SERVER</span>
              <a 
                href="https://discord.gg/cec-heist-2026" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#FACC15] hover:underline"
              >
                discord.gg/cec-heist-2026 (#help-desk)
              </a>
            </div>
          </div>

        </div>

        <div className="pt-2 border-t border-[#262626] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1F1F1F] hover:bg-[#262626] text-[#E5E7EB] text-xs font-semibold"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
}
