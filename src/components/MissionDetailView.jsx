import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { formatTimer, formatScore, getDifficultyStyle, getStatusStyle } from '../utils/formatters';
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
  Download, 
  Share2, 
  ExternalLink,
  ChevronRight,
  ChevronLeft
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#303030] pb-3 font-mono text-xs">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[#737373] hover:text-[#FACC15] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO MISSION GRID</span>
        </button>

        <div className="flex items-center space-x-2">
          {prevMission && (
            <button
              onClick={() => navigateMission(prevMission)}
              className="flex items-center space-x-1 px-2.5 py-1 bg-[#151515] border border-[#303030] hover:border-[#FACC15] text-[#E5E7EB] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREV: M-{prevMission.number}</span>
            </button>
          )}
          {nextMission && (
            <button
              onClick={() => navigateMission(nextMission)}
              className="flex items-center space-x-1 px-2.5 py-1 bg-[#151515] border border-[#303030] hover:border-[#FACC15] text-[#E5E7EB] transition-colors"
            >
              <span>NEXT: M-{nextMission.number}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Mission Header Banner */}
      <div className="bg-[#151515] border border-[#303030] p-5 font-mono">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center space-x-3 mb-1.5">
              <span className="px-2 py-0.5 bg-[#FACC15] text-black text-xs font-bold tracking-wider">
                MISSION {mission.number}
              </span>
              <span className="text-xs text-[#737373] tracking-widest uppercase">
                {mission.category}
              </span>
              <span className={`text-[10px] px-2 py-0.5 border ${diffStyle.badge}`}>
                {mission.difficulty}
              </span>
              <span className={`text-[10px] px-2 py-0.5 border ${statusStyle.badge}`}>
                {statusStyle.label}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#E5E7EB] uppercase">
              {mission.title}
            </h1>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 bg-[#0A0A0A] p-3 border border-[#262626]">
            <div>
              <div className="text-[10px] text-[#737373]">BASE VALUE</div>
              <div className="text-sm font-bold text-[#FACC15]">
                {formatScore(currentPotentialPoints)} PTS
                {penalty > 0 && <span className="text-[10px] text-[#F87171] ml-1">(-{penalty})</span>}
              </div>
            </div>

            <div className="border-l border-[#262626] pl-4">
              <div className="text-[10px] text-[#737373]">SOLVES</div>
              <div className="text-sm font-bold text-[#E5E7EB]">{mission.solvedCount} TEAMS</div>
            </div>

            <div className="border-l border-[#262626] pl-4">
              <div className="text-[10px] text-[#737373]">EST. DURATION</div>
              <div className="text-sm font-bold text-[#E5E7EB]">{mission.timeEstimate}</div>
            </div>

            <div className="border-l border-[#262626] pl-4">
              <div className="text-[10px] text-[#737373]">SYS TIMER</div>
              <div className="text-sm font-bold text-[#FACC15] flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-[#FACC15]" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Target Coordinates Banner */}
      <div className="bg-[#101010] border border-[#303030] p-4 flex flex-wrap items-center justify-between gap-3 font-mono">
        <div className="flex items-center space-x-3">
          <Target className="w-5 h-5 text-[#FACC15]" />
          <div>
            <span className="text-[10px] text-[#737373] block">TARGET VECTOR SPECIFICATION</span>
            <span className="text-sm font-bold text-[#E5E7EB] tracking-wider select-all">
              {mission.target}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {mission.terminalAvailable && (
            <button
              onClick={() => {
                sound.playClick();
                setShowTerminal(!showTerminal);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono border transition-colors ${
                showTerminal 
                  ? 'bg-[#FACC15] text-black border-[#FACC15] font-bold' 
                  : 'bg-[#151515] text-[#E5E7EB] border-[#303030] hover:border-[#FACC15]'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>{showTerminal ? 'HIDE CONSOLE' : 'ENGAGE CONSOLE'}</span>
            </button>
          )}

          <div className="px-3 py-1.5 bg-[#151515] border border-[#303030] text-[11px] text-[#737373]">
            VPN: 10.24.16.0/24
          </div>
        </div>
      </div>

      {/* Embedded Terminal when enabled */}
      {showTerminal && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#737373]">
            <span className="text-[#FACC15] font-semibold">// LIVE INTERACTION CONTAINER CONSOLE</span>
            <span>DIAGNOSTIC SHELL READY</span>
          </div>
          <Terminal mission={mission} onClose={() => setShowTerminal(false)} />
        </div>
      )}

      {/* Two Column Layout: Brief + Objectives vs Flag + Hints */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Brief & Objectives (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Mission Brief */}
          <div className="bg-[#151515] border border-[#303030] p-5">
            <h3 className="font-mono text-xs font-bold tracking-widest text-[#FACC15] uppercase mb-3 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#FACC15]"></span>
              <span>MISSION BRIEF & TACTICAL OVERVIEW</span>
            </h3>
            
            <p className="font-sans text-sm text-[#D1D5DB] leading-relaxed whitespace-pre-line mb-4">
              {mission.brief}
            </p>

            {/* Required Skills tags */}
            <div className="pt-3 border-t border-[#262626]">
              <span className="text-[10px] font-mono text-[#737373] block mb-2">
                REQUIRED TACTICAL PREREQUISITES:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {mission.requiredSkills?.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-2 py-0.5 bg-[#0A0A0A] border border-[#303030] text-[#E5E7EB]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Operational Objectives Checklist */}
          <div className="bg-[#151515] border border-[#303030] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-xs font-bold tracking-widest text-[#FACC15] uppercase flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#FACC15]"></span>
                <span>OPERATIONAL OBJECTIVES</span>
              </h3>
              <span className="text-[11px] font-mono text-[#737373]">
                {completedObjectives.length} / {mission.objectives.length} ACCOMPLISHED
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {mission.objectives.map((obj, idx) => {
                const isChecked = completedObjectives.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleObjective(idx)}
                    className={`flex items-start space-x-3 p-3 border transition-colors cursor-pointer select-none ${
                      isChecked
                        ? 'bg-[#16A34A]/10 border-[#22C55E]/40 text-[#E5E7EB]'
                        : 'bg-[#101010] border-[#262626] text-[#9CA3AF] hover:border-[#3E3E3E]'
                    }`}
                  >
                    <button className="mt-0.5 shrink-0 text-[#FACC15]">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#22C55E]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#525252]" />
                      )}
                    </button>
                    <div className="flex-1">
                      <span className="text-[11px] text-[#737373] mr-2">STEP 0{idx + 1}.</span>
                      <span className={isChecked ? 'line-through text-[#737373]' : ''}>{obj}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Flag Submission & Hint Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Flag Submission */}
          <FlagSubmission mission={mission} />

          {/* Progressive Hints */}
          <HintPanel mission={mission} />

          {/* Target Artifacts / Staging notes */}
          {mission.terminalFiles && mission.terminalFiles.length > 0 && (
            <div className="bg-[#151515] border border-[#303030] p-4 font-mono text-xs">
              <h4 className="text-[11px] font-bold text-[#737373] uppercase tracking-wider mb-2">
                ATTACHED MISSION ARTIFACTS
              </h4>
              <div className="space-y-1.5">
                {mission.terminalFiles.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-[#0A0A0A] border border-[#262626]">
                    <span className="text-[#E5E7EB]">{f.name}</span>
                    <button
                      onClick={() => {
                        setShowTerminal(true);
                        sound.playClick();
                      }}
                      className="text-[#FACC15] hover:underline text-[10px]"
                    >
                      VIEW IN CONSOLE →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
