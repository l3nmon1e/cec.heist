import React, { useState } from 'react';
import { RULES_DATA } from '../data/rules';
import { BookOpen, ChevronDown, ChevronUp, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function RulesView() {
  const [openIds, setOpenIds] = useState(['rules-event', 'rules-scoring', 'rules-flag']);

  const toggleAccordion = (id) => {
    sound.playClick();
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    sound.playClick();
    setOpenIds(RULES_DATA.map(r => r.id));
  };

  const collapseAll = () => {
    sound.playClick();
    setOpenIds([]);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Rules & Operational Protocol */}
      <div className="bg-[#151515] border border-[#303030] p-4 sm:p-5 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#FACC15] font-semibold mb-1">
              <BookOpen className="w-4 h-4" />
              <span>RULES OF ENGAGEMENT // PROTOCOL STANDARDS</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#E5E7EB] uppercase">
              OPERATIONAL DIRECTIVES & EVENT PARAMETERS
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={expandAll}
              className="px-2.5 py-1 bg-[#0A0A0A] border border-[#303030] hover:border-[#FACC15] text-[#E5E7EB] transition-colors"
            >
              EXPAND ALL
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1 bg-[#0A0A0A] border border-[#303030] hover:border-[#FACC15] text-[#737373] hover:text-[#E5E7EB] transition-colors"
            >
              COLLAPSE ALL
            </button>
          </div>
        </div>

        <p className="text-xs text-[#737373] font-sans mt-3">
          Compliance with these rules is monitored continuously by the automated competition arbiter and CEC network intrusion sentinels.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3 font-mono">
        {RULES_DATA.map((rule, idx) => {
          const isOpen = openIds.includes(rule.id);

          return (
            <div
              key={rule.id}
              className="bg-[#151515] border border-[#303030] transition-colors"
            >
              <button
                onClick={() => toggleAccordion(rule.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-[#1A1A1A] transition-colors select-none"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-[#FACC15]">
                    0{idx + 1}.
                  </span>
                  <div>
                    <span className="text-[10px] text-[#737373] tracking-wider uppercase block">
                      {rule.category}
                    </span>
                    <span className="text-sm font-bold text-[#E5E7EB] tracking-wide">
                      {rule.title}
                    </span>
                  </div>
                </div>

                <div className="text-[#737373] p-1">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#FACC15]" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="p-4 pt-1 border-t border-[#262626] bg-[#0E0E0E]">
                  <ul className="space-y-2.5 font-sans text-xs text-[#D1D5DB] leading-relaxed">
                    {rule.content.map((point, i) => (
                      <li key={i} className="flex items-start space-x-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prohibited Warning Box */}
      <div className="bg-[#160B0B] border border-[#EF4444]/40 p-4 font-mono text-xs flex items-start space-x-3 text-[#F87171]">
        <ShieldAlert className="w-5 h-5 shrink-0 text-[#EF4444] mt-0.5" />
        <div>
          <span className="font-bold text-sm block text-[#FCA5A5] mb-1">
            CRITICAL ADMONITION // ARBITER POLICY
          </span>
          <p className="font-sans leading-relaxed text-[#FCA5A5]/90">
            Attacking platform infrastructure (10.24.0.1, CTF engine, scoreboard database), spoofing competitor IP ranges, or physical hardware tampering on campus workstations will trigger immediate disqualification and academic reporting.
          </p>
        </div>
      </div>

    </div>
  );
}
