import React from 'react';
import { useGame } from '../context/GameContext';
import { formatScore } from '../utils/formatters';
import { HEIST_STAGES } from '../data/heistStages';
import { 
  User, 
  Shield, 
  Trophy, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw,
  Layers,
  Lock,
  Unlock,
  Activity
} from 'lucide-react';
import { sound } from '../utils/audio';

/**
 * Minimal & User-Friendly Operator Profile View
 * Centered on the core CEC HEIST narrative:
 * 1. Operator & Crew Identity
 * 2. Key Heist Performance Metrics (Rank, Score, Vault Clearance, Accuracy)
 * 3. Heist Stage Progression (Recon -> Access -> Infiltration -> Network -> Security -> Vault)
 * 4. Recent Objective Breaches / Activity
 */
export default function ProfileView() {
  const { 
    currentPlayer, 
    missions, 
    submissions, 
    resetAllProgress,
    setSelectedMissionId,
    setActiveTab
  } = useGame();

  const solvedMissions = missions.filter(m => m.status === 'SOLVED');
  const totalMissionsCount = missions.length || 1;
  const progressPercent = Math.round((solvedMissions.length / totalMissionsCount) * 100);

  const handleInspectMission = (mId) => {
    sound.playClick();
    setSelectedMissionId(mId);
    setActiveTab('missions');
  };

  const handleContinueHeist = () => {
    sound.playClick();
    setActiveTab('missions');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 font-sans">
      
      {/* 1. OPERATOR DOSSIER CARD */}
      <div className="bg-[#0C111A] border border-[#263140] rounded-xl p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center space-x-4">
            {/* Operator Avatar */}
            <div className="w-14 h-14 rounded-lg bg-[#121923] border border-[#C8A96B]/30 flex items-center justify-center text-[#C8A96B] shrink-0">
              <User className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center space-x-2 text-xs mb-1">
                <span className="flex items-center space-x-1.5 text-[#4FB286] font-mono text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#4FB286] animate-pulse" />
                  <span>ACTIVE OPERATIVE</span>
                </span>
                <span className="text-[#263140]">•</span>
                <span className="text-[#8D98A8] font-mono text-[11px]">{currentPlayer.id}</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4F5F7]">
                {currentPlayer.callsign}
              </h1>
              
              <p className="text-xs text-[#8D98A8] mt-0.5">
                {currentPlayer.affiliation} <span className="text-[#566375]">— Clearance:</span> <span className="text-[#C8A96B] font-mono font-medium">{currentPlayer.securityClearance}</span>
              </p>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center sm:self-center">
            <button
              onClick={handleContinueHeist}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#C8A96B] hover:bg-[#E5D0A0] text-[#070B12] font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 rounded-lg transition-all shadow-md cursor-pointer group"
            >
              <span>RESUME HEIST</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>
      </div>

      {/* 2. CORE HEIST METRICS (Minimal 4-Card Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Metric 1: Current Rank */}
        <div className="bg-[#0C111A] border border-[#263140] rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-[#8D98A8] mb-2">
            <span className="text-xs uppercase tracking-wider font-mono">Current Rank</span>
            <Trophy className="w-4 h-4 text-[#C8A96B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#F4F5F7]">
            #{currentPlayer.rank}
          </div>
          <div className="text-[11px] text-[#8D98A8] mt-1 font-sans">
            In competition leaderboard
          </div>
        </div>

        {/* Metric 2: Total Loot / Score */}
        <div className="bg-[#0C111A] border border-[#263140] rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-[#8D98A8] mb-2">
            <span className="text-xs uppercase tracking-wider font-mono">Loot Acquired</span>
            <Shield className="w-4 h-4 text-[#C8A96B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#C8A96B]">
            {formatScore(currentPlayer.score)} <span className="text-xs font-normal text-[#8D98A8]">PTS</span>
          </div>
          <div className="text-[11px] text-[#8D98A8] mt-1 font-sans">
            Accumulated challenge bounty
          </div>
        </div>

        {/* Metric 3: Objectives Breached */}
        <div className="bg-[#0C111A] border border-[#263140] rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-[#8D98A8] mb-2">
            <span className="text-xs uppercase tracking-wider font-mono">Vault Infiltration</span>
            <span className="text-xs font-mono font-bold text-[#F4F5F7]">{progressPercent}%</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#F4F5F7]">
            {solvedMissions.length} <span className="text-sm font-normal text-[#8D98A8]">/ {missions.length}</span>
          </div>
          {/* Subtle Progress Bar */}
          <div className="w-full bg-[#121923] h-1.5 rounded-full mt-2 overflow-hidden border border-[#263140]">
            <div 
              className="bg-[#C8A96B] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Infiltration Accuracy */}
        <div className="bg-[#0C111A] border border-[#263140] rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-[#8D98A8] mb-2">
            <span className="text-xs uppercase tracking-wider font-mono">Accuracy</span>
            <Target className="w-4 h-4 text-[#4FB286]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#4FB286]">
            {currentPlayer.accuracy}
          </div>
          <div className="text-[11px] text-[#8D98A8] mt-1 font-sans">
            Flag submission precision
          </div>
        </div>

      </div>

      {/* 3. TWO CLEAN SECTIONS: HEIST STAGE PROGRESSION & RECENT BREACHES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Heist Stage Progression (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0C111A] border border-[#263140] rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#263140] mb-4">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#C8A96B]" />
                <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#F4F5F7]">
                  Heist Progression
                </h2>
              </div>
              <span className="text-[11px] text-[#8D98A8] font-mono">
                {HEIST_STAGES.filter(stage => {
                  const sMissions = stage.missionIds.map(id => missions.find(m => m.id === id)).filter(Boolean);
                  return sMissions.length > 0 && sMissions.every(m => m.status === 'SOLVED');
                }).length} / {HEIST_STAGES.length} STAGES CLEARED
              </span>
            </div>

            {/* Stages Stack */}
            <div className="space-y-2.5">
              {HEIST_STAGES.map((stage) => {
                const stageMissions = stage.missionIds.map(id => missions.find(m => m.id === id)).filter(Boolean);
                const solvedCount = stageMissions.filter(m => m.status === 'SOLVED').length;
                const totalCount = stageMissions.length;
                const isCleared = solvedCount === totalCount && totalCount > 0;
                const isStarted = solvedCount > 0 && !isCleared;

                return (
                  <div 
                    key={stage.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isCleared 
                        ? 'bg-[#121923] border-[#C8A96B]/30' 
                        : isStarted
                        ? 'bg-[#121923]/60 border-[#263140]'
                        : 'bg-[#070B12]/40 border-[#1C2633]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center space-x-2">
                        {isCleared ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96B] shrink-0" />
                        ) : isStarted ? (
                          <Unlock className="w-3.5 h-3.5 text-[#E5D0A0] shrink-0" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-[#566375] shrink-0" />
                        )}
                        <span className={`font-mono font-medium ${isCleared ? 'text-[#F4F5F7]' : isStarted ? 'text-[#E5D0A0]' : 'text-[#8D98A8]'}`}>
                          {stage.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#8D98A8]">
                        {solvedCount} / {totalCount}
                      </span>
                    </div>

                    {/* Stage Mini Bar */}
                    <div className="w-full bg-[#070B12] h-1 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${isCleared ? 'bg-[#C8A96B]' : 'bg-[#C8A96B]/50'}`}
                        style={{ width: `${totalCount > 0 ? (solvedCount / totalCount) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Solved Objectives & Submission History (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#0C111A] border border-[#263140] rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#263140] mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#C8A96B]" />
                <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#F4F5F7]">
                  Secured Objectives
                </h2>
              </div>
              <span className="text-[11px] text-[#8D98A8] font-mono">
                {submissions.filter(s => s.status === 'VALID').length} FLAGS CAPTURED
              </span>
            </div>

            {submissions.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-lg bg-[#121923]/40 border border-dashed border-[#263140]">
                <Target className="w-8 h-8 text-[#566375] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#F4F5F7]">No objectives breached yet</p>
                <p className="text-xs text-[#8D98A8] mt-1 max-w-sm mx-auto">
                  Access the heist mission grid to crack terminals, bypass authentication, and capture loot flags.
                </p>
                <button
                  onClick={handleContinueHeist}
                  className="mt-4 px-4 py-2 bg-[#121923] hover:bg-[#16202D] text-[#C8A96B] border border-[#C8A96B]/30 hover:border-[#C8A96B] rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Open Mission Grid →
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {submissions.map((sub) => {
                  const isValid = sub.status === 'VALID';
                  return (
                    <div
                      key={sub.id}
                      className="p-3 bg-[#121923] hover:bg-[#16202D] border border-[#263140] rounded-lg flex items-center justify-between gap-3 text-xs transition-colors"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                          isValid ? 'bg-[#4FB286]/10 text-[#4FB286]' : 'bg-[#B85C5C]/10 text-[#B85C5C]'
                        }`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        
                        <div className="min-w-0">
                          <div className="font-semibold text-[#F4F5F7] truncate">
                            {sub.title}
                          </div>
                          <div className="text-[11px] text-[#8D98A8] font-mono">
                            {sub.timestamp} IST • {isValid ? 'SUCCESSFUL BREACH' : 'FAILED ATTEMPT'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        {sub.points > 0 && (
                          <span className="text-xs font-bold font-mono text-[#C8A96B]">
                            +{sub.points} PTS
                          </span>
                        )}
                        <button
                          onClick={() => handleInspectMission(sub.missionId)}
                          className="text-[11px] text-[#8D98A8] hover:text-[#C8A96B] px-2 py-1 rounded bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B]/40 transition-colors cursor-pointer"
                        >
                          View →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 4. MINIMAL UTILITY / RESET FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#566375] px-1 pt-2 gap-3">
        <span>
          Operative Session: <span className="font-mono text-[#8D98A8]">{currentPlayer.id}</span> // Gateway: <span className="font-mono text-[#8D98A8]">{currentPlayer.assignedGateway}</span>
        </span>

        <button
          onClick={() => {
            if (window.confirm("WARNING: Are you sure you want to reset all mission progress, solved states, and score on this terminal?")) {
              resetAllProgress();
            }
          }}
          className="flex items-center space-x-1.5 text-[#8D98A8] hover:text-[#B85C5C] text-[11px] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Simulation State</span>
        </button>
      </div>

    </div>
  );
}
