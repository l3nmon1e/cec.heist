import React, { useState } from 'react';
import { X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { sound } from '../utils/audio';

const FAQ_ITEMS = [
  {
    q: "What is CEC HEIST?",
    a: "CEC HEIST is an intensive, hands-on cybersecurity competition and CTF event hosted at Canara Engineering College, Mangalore. Participants assume the role of security operators attempting to breach virtual security perimeters, solve forensic puzzles, break cryptographic ciphers, and unlock the final vault."
  },
  {
    q: "Who is eligible to participate?",
    a: "Students from engineering and technical institutions across all departments (CSE, ISE, AIML, ECE, CCE, etc.) with an interest in cybersecurity, networking, coding, and problem-solving are welcome."
  },
  {
    q: "What is the team composition?",
    a: "Teams can consist of 1 to 4 members. Inter-college and inter-departmental teams are allowed."
  },
  {
    q: "What challenges domains are included?",
    a: "The competition spans 6 primary vectors: Web Exploitation, Cryptography, Digital Forensics, Reverse Engineering, Open-Source Intelligence (OSINT), and Network Analysis."
  },
  {
    q: "What equipment do participants need?",
    a: "A laptop with a standard modern web browser and preferably a Linux distribution (or WSL/VM) equipped with common security utilities (Wireshark, Python 3, curl, Ghidra, CyberChef, etc.)."
  },
  {
    q: "Is there any registration fee?",
    a: "Details regarding registration tiers, student concessions, and sponsored prizes will be announced along with the official schedule."
  }
];

export default function FaqModal({ isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 font-mono select-none">
      <div className="bg-[#151515] border border-[#303030] max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[85vh] flex flex-col">
        
        <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3 shrink-0">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-[#FACC15]" />
            <h3 className="font-bold text-sm text-[#E5E7EB] uppercase tracking-wider">
              FREQUENTLY ASKED QUESTIONS // FAQ
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

        <div className="overflow-y-auto space-y-3 pr-2 text-xs flex-1">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border border-[#262626] bg-[#0A0A0A]">
                <button
                  onClick={() => {
                    sound.playClick();
                    setOpenIndex(isOpen ? -1 : idx);
                  }}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#141414] transition-colors"
                >
                  <span className="font-bold text-[#E5E7EB]">{item.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#FACC15]" /> : <ChevronDown className="w-4 h-4 text-[#737373]" />}
                </button>
                {isOpen && (
                  <div className="p-3.5 pt-1 border-t border-[#1F1F1F] font-sans text-xs text-[#9CA3AF] leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="shrink-0 pt-2 border-t border-[#262626] flex justify-end">
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
