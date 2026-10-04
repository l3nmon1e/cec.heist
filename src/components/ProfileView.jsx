import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { formatScore, getAssetUrl } from '../utils/formatters';
import { 
  User, 
  Shield, 
  Trophy, 
  Target, 
  CheckCircle, 
  Clock, 
  Activity, 
  Layers, 
  HardDrive, 
  Eye, 
  RotateCcw,
  Key,
  Calendar,
  Terminal as TerminalIcon,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function ProfileView() {
  const { 
    currentPlayer, 
    missions, 
    submissions, 
    resetAllProgress,
    setSelectedMissionId,
    setActiveTab
  } = useGame();

  const [activeEvidenceModal, setActiveEvidenceModal] = useState(null);

  const solvedMissions = missions.filter(m => m.status === 'SOLVED');

  const handleInspectMission = (mId) => {
    sound.playClick();
    setSelectedMissionId(mId);
    setActiveTab('missions');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Operator Dossier */}
      <div className="bg-[#151515] border border-[#303030] p-4 sm:p-5 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2A2A2A] gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#0A0A0A] border border-[#FACC15] flex items-center justify-center">
              <User className="w-6 h-6 text-[#FACC15]" />
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-[#FACC15] font-bold">OPERATOR PROFILE</span>
                <span className="text-[#737373]">/</span>
                <span className="text-[#22C55E]">STATUS: ACTIVE ENGAGEMENT</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#E5E7EB] uppercase">
                {currentPlayer.id} // {currentPlayer.callsign}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs px-2.5 py-1 bg-[#1F1F1F] border border-[#303030] text-[#737373]">
              CLEARANCE: <span className="text-[#FACC15] font-bold">{currentPlayer.securityClearance}</span>
            </span>
          </div>
        </div>

        {/* Tactical Key Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
          
          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A]">
            <span className="text-[10px] text-[#737373] block">CALLSIGN TEAM</span>
            <span className="text-sm font-bold text-[#E5E7EB]">{currentPlayer.callsign}</span>
          </div>

          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A]">
            <span className="text-[10px] text-[#737373] block">CURRENT RANK</span>
            <span className="text-sm font-bold text-[#FACC15]">#{currentPlayer.rank}</span>
          </div>

          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A]">
            <span className="text-[10px] text-[#737373] block">TOTAL SCORE</span>
            <span className="text-sm font-bold text-[#FACC15]">{formatScore(currentPlayer.score)} PTS</span>
          </div>

          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A]">
            <span className="text-[10px] text-[#737373] block">OBJECTIVES SECURED</span>
            <span className="text-sm font-bold text-[#E5E7EB]">{solvedMissions.length} / {missions.length}</span>
          </div>

          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A]">
            <span className="text-[10px] text-[#737373] block">CAPTURE ACCURACY</span>
            <span className="text-sm font-bold text-[#22C55E]">{currentPlayer.accuracy}</span>
          </div>

          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A]">
            <span className="text-[10px] text-[#737373] block">TIME IN FIELD</span>
            <span className="text-sm font-bold text-[#E5E7EB]">{currentPlayer.timePlayed}</span>
          </div>

        </div>
      </div>

      {/* Two Column Layout: Category Mastery & Physical Facility Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Category Breakdown & Mission History (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Category Completion Breakdown */}
          <div className="bg-[#151515] border border-[#303030] p-5 font-mono">
            <h3 className="text-xs font-bold tracking-widest text-[#FACC15] uppercase mb-4 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#FACC15]" />
              <span>DISCIPLINE PENETRATION METRICS</span>
            </h3>

            <div className="space-y-3">
              {[
                { cat: 'WEB', name: 'Web Exploitation', total: 4 },
                { cat: 'CRYPTO', name: 'Cryptography', total: 3 },
                { cat: 'FORENSICS', name: 'Digital Forensics', total: 3 },
                { cat: 'REVERSE ENGINEERING', name: 'Reverse Engineering', total: 3 },
                { cat: 'OSINT', name: 'Open Source Intelligence', total: 3 },
                { cat: 'NETWORK', name: 'Network Analysis', total: 3 }
              ].map(item => {
                const solvedInCat = missions.filter(m => m.category === item.cat && m.status === 'SOLVED').length;
                const percent = Math.round((solvedInCat / item.total) * 100);

                return (
                  <div key={item.cat} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#E5E7EB]">{item.name}</span>
                      <span className="text-[#737373]">
                        {solvedInCat} / {item.total} <span className="text-[#FACC15]">({percent}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#0A0A0A] border border-[#262626] overflow-hidden">
                      <div
                        className="h-full bg-[#FACC15] transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mission History Log */}
          <div className="bg-[#151515] border border-[#303030] p-5 font-mono">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2A2A2A]">
              <h3 className="text-xs font-bold tracking-widest text-[#FACC15] uppercase flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                <span>MISSION HISTORY // RECENT ARTIFACT CAPTURES</span>
              </h3>
              <span className="text-[11px] text-[#737373]">
                {submissions.length} EVENTS LOGGED
              </span>
            </div>

            {submissions.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#737373]">
                No flags submitted yet. Engage targets in the Mission Grid to register activity.
              </div>
            ) : (
              <div className="space-y-2">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className={`p-3 border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition-colors ${
                      sub.status === 'VALID'
                        ? 'bg-[#0A0A0A] border-[#22C55E]/30 text-[#E5E7EB]'
                        : 'bg-[#0A0A0A] border-[#EF4444]/30 text-[#9CA3AF]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-0.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 ${
                          sub.status === 'VALID' ? 'bg-[#22C55E]/20 text-[#4ADE80]' : 'bg-[#EF4444]/20 text-[#F87171]'
                        }`}>
                          {sub.status}
                        </span>
                        <span className="font-bold text-xs">{sub.title}</span>
                      </div>
                      <span className="text-[10px] text-[#737373]">TIMESTAMP: {sub.timestamp} IST</span>
                    </div>

                    <div className="flex items-center space-x-3 sm:justify-end">
                      {sub.points > 0 && (
                        <span className="text-xs font-bold text-[#FACC15]">+{sub.points} PTS</span>
                      )}
                      <button
                        onClick={() => handleInspectMission(sub.missionId)}
                        className="text-[10px] text-[#737373] hover:text-[#FACC15] underline decoration-dotted"
                      >
                        RE-INSPECT →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Physical Facility Evidence & Investigation Board (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Tactical Investigation Board Preview */}
          <div className="bg-[#151515] border border-[#303030] p-5 font-mono">
            <h3 className="text-xs font-bold tracking-widest text-[#FACC15] uppercase mb-3 flex items-center space-x-2">
              <Eye className="w-4 h-4 text-[#FACC15]" />
              <span>INCIDENT EVIDENCE BOARD</span>
            </h3>

            <div 
              onClick={() => setActiveEvidenceModal('investigation_board')}
              className="relative aspect-video bg-[#0A0A0A] border border-[#303030] cursor-pointer group overflow-hidden"
            >
              <img
                src={getAssetUrl('/images/investigation_board.jpg')}
                alt="Tactical Investigation Board"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#0A0A0A]/10 transition-colors" />
              <div className="absolute bottom-2 left-2 right-2 p-2 bg-[#0A0A0A]/90 border border-[#303030] flex items-center justify-between text-xs">
                <span className="text-[#E5E7EB] font-bold text-[11px]">BENJANAPADAVU SECTOR BOARD</span>
                <span className="text-[#FACC15] text-[10px]">ENLARGE INTEL [↗]</span>
              </div>
            </div>

            <p className="text-xs text-[#737373] font-sans mt-3 leading-relaxed">
              Forensic evidence board compiled by campus security team. Cross-correlate yellow evidence markers (#01, #08, #14) with corresponding mission briefs.
            </p>
          </div>

          {/* Analysis Workbench & Restricted Corridor Photo Dossiers */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            
            <div 
              onClick={() => setActiveEvidenceModal('forensics')}
              className="bg-[#151515] border border-[#303030] p-2.5 cursor-pointer group hover:border-[#FACC15] transition-colors"
            >
              <div className="aspect-video bg-[#0A0A0A] border border-[#262626] overflow-hidden mb-2">
                <img
                  src={getAssetUrl('/images/forensics.jpg')}
                  alt="Forensic Rig"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-[10px] font-bold text-[#E5E7EB] block truncate">
                BENCH: J-LINK RIG
              </span>
              <span className="text-[9px] text-[#737373]">FIRMWARE / REVERSE</span>
            </div>

            <div 
              onClick={() => setActiveEvidenceModal('corridor')}
              className="bg-[#151515] border border-[#303030] p-2.5 cursor-pointer group hover:border-[#FACC15] transition-colors"
            >
              <div className="aspect-video bg-[#0A0A0A] border border-[#262626] overflow-hidden mb-2">
                <img
                  src={getAssetUrl('/images/corridor.jpg')}
                  alt="Restricted Corridor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-[10px] font-bold text-[#E5E7EB] block truncate">
                CORRIDOR 3B-2
              </span>
              <span className="text-[9px] text-[#737373]">AIRLOCK BLAST ACCESS</span>
            </div>

          </div>

          {/* Reset / Diagnostic Controls */}
          <div className="bg-[#151515] border border-[#303030] p-4 font-mono">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-[#E5E7EB] font-bold block">OPERATIONAL RESET</span>
                <span className="text-[10px] text-[#737373]">Purge local cache and restart simulation state</span>
              </div>
              <button
                onClick={() => {
                  if (window.confirm("WARNING: Reset all mission progress, solved states, and score for this terminal?")) {
                    resetAllProgress();
                  }
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#0A0A0A] hover:bg-[#1F1F1F] border border-[#303030] hover:border-[#EF4444] text-[#F87171] text-[11px] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>PURGE STATE</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Enlarged Evidence Modal */}
      {activeEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-[#303030] max-w-4xl w-full p-4 font-mono space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#303030]">
              <span className="text-xs font-bold text-[#FACC15]">
                TACTICAL EVIDENCE DOSSIER // {activeEvidenceModal.toUpperCase()}
              </span>
              <button
                onClick={() => setActiveEvidenceModal(null)}
                className="p-1 hover:text-[#EF4444] text-[#737373]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-hidden border border-[#303030] bg-black">
              <img
                src={getAssetUrl(`/images/${activeEvidenceModal}.jpg`)}
                alt="Enlarged Evidence"
                className="w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#737373] pt-1">
              <span>SECURITY CLASSIFICATION: CEC-RESTRICTED-EYES-ONLY</span>
              <button
                onClick={() => setActiveEvidenceModal(null)}
                className="px-3 py-1 bg-[#1F1F1F] text-[#E5E7EB] border border-[#303030]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
