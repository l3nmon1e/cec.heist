import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { formatTimer, formatScore, getDifficultyStyle, getStatusStyle, getAssetUrl } from '../utils/formatters';
import FlagSubmission from './FlagSubmission';
import HintPanel from './HintPanel';
import Terminal from './Terminal';
import { 
  ArrowLeft, 
  Terminal as TerminalIcon, 
  Server, 
  Clock, 
  Target, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  FileText, 
  Share2, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Key,
  Cpu,
  Layers,
  FileCode,
  Download
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function MissionDetailView({ mission, onBack }) {
  const { missions, setSelectedMissionId, secondsRemaining, unlockedHints } = useGame();
  const [showTerminal, setShowTerminal] = useState(mission.terminalAvailable || false);
  const [completedObjectives, setCompletedObjectives] = useState(() => {
    return mission.status === 'SOLVED' ? [0, 1, 2, 3] : [];
  });

  const diffStyle = getDifficultyStyle(mission.difficulty);
  const statusStyle = getStatusStyle(mission.status);

  // Toggle objective checkbox
  const toggleObjective = (index) => {
    sound.playClick();
    setCompletedObjectives(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Navigate to prev / next mission
  const currentIndex = missions.findIndex(m => m.id === mission.id);
  const prevMission = currentIndex > 0 ? missions[currentIndex - 1] : null;
  const nextMission = currentIndex < missions.length - 1 ? missions[currentIndex + 1] : null;

  const navigateMission = (targetMission) => {
    if (!targetMission) return;
    sound.playClick();
    setSelectedMissionId(targetMission.id);
  };

  // Deduct hints penalty calculation
  const hintsUsed = unlockedHints[mission.id] || [];
  const penalty = hintsUsed.reduce((sum, hId) => {
    const hintObj = mission.hints?.find(h => h.id === hId);
    return sum + (hintObj ? hintObj.penalty : 0);
  }, 0);
  const currentPotentialPoints = Math.max(10, mission.points - penalty);

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Quick Mission Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#263140] pb-3 font-mono text-xs">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[#8D98A8] hover:text-[#C8A96B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO FACILITY MAP</span>
        </button>

        <div className="flex items-center space-x-2">
          {prevMission && (
            <button
              onClick={() => navigateMission(prevMission)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] text-[#F4F5F7] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREV: M-{prevMission.number}</span>
            </button>
          )}
          {nextMission && (
            <button
              onClick={() => navigateMission(nextMission)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] text-[#F4F5F7] transition-colors cursor-pointer"
            >
              <span>NEXT: M-{nextMission.number}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Mission Header Dossier Banner */}
      <div className="bg-[#0C111A] border border-[#263140] p-5 sm:p-6 font-mono shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-1 bg-[#C8A96B]" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-[#121923] border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] font-bold">
                MISSION {mission.number}
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-medium border ${diffStyle.badge}`}>
                SECURITY LEVEL: {mission.difficulty}
              </span>
              <span className="px-2 py-0.5 bg-[#121923] border border-[#263140] text-[#8D98A8] text-[10px]">
                SECTOR: {mission.category}
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-bold border ${statusStyle.badge}`}>
                {statusStyle.label}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#F4F5F7] uppercase">
              {mission.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8D98A8]">
              <span className="flex items-center space-x-1.5">
                <Target className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>TARGET: <strong className="text-[#F4F5F7]">{mission.target || 'LOCAL NODE'}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8D98A8]" />
                <span>EST: {mission.timeEstimate || '30 MIN'}</span>
              </span>
            </div>
          </div>

          {/* Reward & Solves Card */}
          <div className="flex items-center gap-4 bg-[#070B12] p-4 border border-[#263140] shrink-0 self-start lg:self-auto">
            <div>
              <span className="text-[10px] text-[#566375] block uppercase">BOUNTY REWARD</span>
              <span className="text-xl font-bold text-[#C8A96B]">
                +{formatScore(currentPotentialPoints)} PTS
              </span>
              {penalty > 0 && (
                <span className="text-[10px] text-[#B85C5C] block">
                  (-{penalty} pts hint deductions)
                </span>
              )}
            </div>

            <div className="border-l border-[#263140] pl-4">
              <span className="text-[10px] text-[#566375] block uppercase">CREW SOLVES</span>
              <span className="text-xl font-bold text-[#F4F5F7]">
                {mission.solvedCount || 0}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Two Column Layout: Brief + Intel on Left, Flag + Hints + Terminal on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Briefing, Objectives, Intel Files (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Mission Briefing Dossier */}
          <div className="bg-[#0C111A] border border-[#263140] p-5 sm:p-6 space-y-4">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#C8A96B] font-bold border-b border-[#263140] pb-2.5 uppercase">
              <FileText className="w-4 h-4" />
              <span>CLASSIFIED MISSION BRIEF</span>
            </div>

            <p className="text-sm text-[#F4F5F7] leading-relaxed font-sans">
              {mission.brief}
            </p>

            {/* Target Directives / Objectives */}
            {mission.objectives && mission.objectives.length > 0 && (
              <div className="pt-3 border-t border-[#1C2633] space-y-2.5 font-mono">
                <span className="text-xs font-bold text-[#8D98A8] block">
                  OPERATIONAL OBJECTIVES:
                </span>
                <div className="space-y-2">
                  {mission.objectives.map((obj, idx) => {
                    const isChecked = completedObjectives.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleObjective(idx)}
                        className="flex items-start space-x-2.5 text-xs text-[#8D98A8] hover:text-[#F4F5F7] cursor-pointer transition-colors"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#C8A96B] shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-[#566375] shrink-0 mt-0.5" />
                        )}
                        <span className={isChecked ? 'line-through text-[#566375]' : ''}>
                          {obj}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Required Tradecraft & Skills */}
            {mission.requiredSkills && (
              <div className="pt-3 border-t border-[#1C2633] font-mono">
                <span className="text-[10px] text-[#566375] block uppercase mb-1.5">
                  REQUISITE TRADECRAFT:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {mission.requiredSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#121923] border border-[#263140] text-[11px] text-[#8D98A8]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Intelligence Files & Recon Evidence */}
          {mission.terminalFiles && mission.terminalFiles.length > 0 && (
            <div className="bg-[#0C111A] border border-[#263140] p-5 sm:p-6 space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-[#263140] pb-2.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#F4F5F7]">
                  <FileCode className="w-4 h-4 text-[#C8A96B]" />
                  <span>TARGET INTELLIGENCE ASSETS</span>
                </div>
                <span className="text-[10px] text-[#8D98A8]">
                  {mission.terminalFiles.length} FILES STAGED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {mission.terminalFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#121923] border border-[#263140] flex items-center justify-between hover:border-[#C8A96B]/50 transition-colors"
                  >
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <FileText className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                      <span className="text-xs text-[#F4F5F7] truncate font-mono">
                        {file.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8D98A8] shrink-0">
                      IN SHELL
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrated Interactive Tactical Shell */}
          <div className="bg-[#0C111A] border border-[#263140] overflow-hidden">
            <div className="bg-[#121923] border-b border-[#263140] px-4 py-2.5 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center space-x-2 text-[#C8A96B]">
                <TerminalIcon className="w-4 h-4" />
                <span className="font-bold">INTEGRATED TACTICAL TERMINAL // LIVE VPN TUNNEL</span>
              </div>
              <button
                onClick={() => setShowTerminal(!showTerminal)}
                className="text-[11px] text-[#8D98A8] hover:text-[#F4F5F7] transition-colors cursor-pointer"
              >
                {showTerminal ? '[ COLLAPSE SHELL ]' : '[ EXPAND SHELL ]'}
              </button>
            </div>

            {showTerminal && (
              <div className="p-3 sm:p-4 bg-[#070B12]">
                <Terminal mission={mission} isModal={false} />
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Flag Oracle & Declassified Intel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Flag Verification Oracle */}
          <FlagSubmission mission={mission} />

          {/* Intel Requisition (Hints) */}
          <HintPanel mission={mission} />

          {/* Security Protocols Notice */}
          <div className="p-4 bg-[#121923] border border-[#263140] font-mono text-xs space-y-2">
            <div className="flex items-center space-x-1.5 text-[#C8A96B] font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>RULES OF ENGAGEMENT // HEIST PROTOCOL</span>
            </div>
            <p className="text-[11px] text-[#8D98A8] leading-relaxed font-sans">
              Attacks against out-of-scope infrastructure or fellow crews are prohibited. Flag tokens follow standard format <code className="text-[#C8A96B]">CEC&#123;...&#125;</code> and unlock progress towards Digital Vault clearance.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
