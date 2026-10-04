import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { formatScore } from '../utils/formatters';
import { HEIST_STAGES } from '../data/heistStages';
import { 
  Trophy, 
  Shield, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw,
  Layers,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function ProfileView() {
  const navigate = useNavigate();
  const { 
    currentPlayer, 
    missions, 
    submissions, 
    resetAllProgress,
    setSelectedMissionId,
    setActiveTab
  } = useGame();

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const solvedMissions = missions.filter(m => m.status === 'SOLVED');
  const totalMissionsCount = missions.length || 1;
  const progressPercent = Math.round((solvedMissions.length / totalMissionsCount) * 100);

  const handleInspectMission = (mId) => {
    sound.playClick();
    setSelectedMissionId(mId);
    setActiveTab('missions');
    navigate('/missions');
  };

  const handleContinueHeist = () => {
    sound.playClick();
    setActiveTab('missions');
    navigate('/missions');
  };

  const handleReset = () => {
    sound.playClick();
    resetAllProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 sm:space-y-12 font-mono pb-20 select-none">
      
      {/* 1. TOP TYPOGRAPHIC DOSSIER HEADER (Linear Style) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2 pb-2">
        
        <div className="space-y-2">
          {/* Classification Label */}
          <div className="flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8A96B] uppercase">
            <span className="w-6 h-[2px] bg-[#C8A96B]" />
            <span>OPERATIVE DOSSIER // {currentPlayer.id}</span>
          </div>

          {/* Large Callsign */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#F4F5F7] uppercase">
            {currentPlayer.callsign}
          </h1>

          {/* Metadata Ribbon */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#8D98A8] pt-1">
            <span className="flex items-center space-x-1.5 text-[#4FB286] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#4FB286] animate-pulse" />
              <span>ACTIVE OPERATIVE</span>
            </span>
            <span className="text-[#263140]">•</span>
            <span>{currentPlayer.affiliation}</span>
            <span className="text-[#263140]">•</span>
            <span>CLEARANCE: <strong className="text-[#C8A96B]">{currentPlayer.securityClearance}</strong></span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 self-start md:self-end">
          <button
            onClick={handleContinueHeist}
            className="px-6 py-3 bg-[#C8A96B] hover:bg-[#E5D0A0] text-[#070B12] font-bold text-xs tracking-wider uppercase flex items-center space-x-2 transition-all shadow-lg hover:shadow-[#C8A96B]/20 cursor-pointer"
          >
            <span>RESUME HEIST</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 2. BORDERLESS CORE PERFORMANCE METRICS STRIP */}
      <div className="border-t border-b border-[#263140] py-6 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Stat 1: Current Rank */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold tracking-wider text-[#8D98A8] uppercase flex items-center space-x-2">
              <Trophy className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>CURRENT RANK</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#F4F5F7]">
              #{currentPlayer.rank}
            </div>
            <div className="text-[11px] text-[#566375]">
              Worldwide CTF standing
            </div>
          </div>

          {/* Stat 2: Loot Acquired */}
          <div className="space-y-1 lg:border-l lg:border-[#263140] lg:pl-8">
            <div className="text-[11px] font-bold tracking-wider text-[#8D98A8] uppercase flex items-center space-x-2">
              <Shield className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>LOOT ACQUIRED</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#C8A96B]">
              {formatScore(currentPlayer.score)} <span className="text-sm font-normal text-[#8D98A8]">PTS</span>
            </div>
            <div className="text-[11px] text-[#566375]">
              Accumulated bounty
            </div>
          </div>

          {/* Stat 3: Vault Solves */}
          <div className="space-y-1 sm:border-l sm:border-[#263140] sm:pl-8">
            <div className="text-[11px] font-bold tracking-wider text-[#8D98A8] uppercase flex items-center justify-between">
              <span>VAULT INFILTRATION</span>
              <span className="text-[#C8A96B] font-bold">{progressPercent}%</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#F4F5F7]">
              {solvedMissions.length} <span className="text-sm font-normal text-[#8D98A8]">/ {missions.length}</span>
            </div>
            {/* Micro Progress Bar */}
            <div className="w-full bg-[#121923] h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-gradient-to-r from-[#8E784D] via-[#C8A96B] to-[#FACC15] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stat 4: Precision */}
          <div className="space-y-1 lg:border-l lg:border-[#263140] lg:pl-8">
            <div className="text-[11px] font-bold tracking-wider text-[#8D98A8] uppercase flex items-center space-x-2">
              <Target className="w-3.5 h-3.5 text-[#4FB286]" />
              <span>ACCURACY</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#4FB286]">
              {currentPlayer.accuracy}
            </div>
            <div className="text-[11px] text-[#566375]">
              Submission precision
            </div>
          </div>

        </div>
      </div>

      {/* 3. HORIZONTAL STAGE PROGRESSION PIPELINE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-[#8D98A8] uppercase tracking-wider">
          <div className="flex items-center space-x-2 text-[#C8A96B]">
            <Layers className="w-4 h-4" />
            <span>HEIST SECTOR PIPELINE</span>
          </div>
          <span className="text-[#566375]">
            {HEIST_STAGES.filter(stage => {
              const sMissions = stage.missionIds.map(id => missions.find(m => m.id === id)).filter(Boolean);
              return sMissions.length > 0 && sMissions.every(m => m.status === 'SOLVED');
            }).length} / {HEIST_STAGES.length} SECTORS CLEARED
          </span>
        </div>

        {/* 8-Stage Pipeline Grid (4x2 layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 pt-1">
          {HEIST_STAGES.map((stage, idx) => {
            const stageMissions = stage.missionIds.map(id => missions.find(m => m.id === id)).filter(Boolean);
            const stageSolved = stageMissions.filter(m => m.status === 'SOLVED').length;
            const isCompleted = stageMissions.length > 0 && stageSolved === stageMissions.length;
            const pct = stageMissions.length ? Math.round((stageSolved / stageMissions.length) * 100) : 0;

            return (
              <div 
                key={stage.id}
                className="bg-[#0C111A] border border-[#263140] p-3.5 rounded-lg space-y-2 hover:border-[#C8A96B]/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#566375] font-bold">0{idx + 1}</span>
                  <span className={`text-[10px] font-bold ${isCompleted ? 'text-[#4FB286]' : 'text-[#C8A96B]'}`}>
                    {stageSolved}/{stageMissions.length}
                  </span>
                </div>

                <div className="text-xs font-bold text-[#F4F5F7] tracking-wider truncate uppercase">
                  {stage.name}
                </div>

                {/* Micro Progress Track */}
                <div className="w-full bg-[#121923] h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      isCompleted ? 'bg-[#4FB286]' : 'bg-[#C8A96B]'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BORDERLESS ACTIVITY LEDGER (Secured Objectives) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold tracking-wider uppercase text-[#8D98A8] border-b border-[#263140] pb-3">
          <div className="flex items-center space-x-2 text-[#C8A96B]">
            <CheckCircle2 className="w-4 h-4 text-[#4FB286]" />
            <span>SECURED OBJECTIVES</span>
          </div>
          <span className="text-[#566375]">
            {solvedMissions.length} OBJECTIVES UNLOCKED
          </span>
        </div>

        {/* Clean Ledger Rows */}
        <div className="divide-y divide-[#1C2633]">
          {solvedMissions.map((mission) => (
            <div
              key={mission.id}
              onClick={() => handleInspectMission(mission.id)}
              className="py-3.5 sm:py-4 px-2 sm:px-3 flex items-center justify-between hover:bg-[#121923]/60 transition-colors group cursor-pointer"
            >
              
              {/* Left: Status Icon & Title */}
              <div className="flex items-center space-x-3.5 truncate">
                <CheckCircle2 className="w-4 h-4 text-[#4FB286] shrink-0" />
                
                <div className="truncate">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs sm:text-sm font-bold text-[#F4F5F7] group-hover:text-[#C8A96B] transition-colors truncate">
                      {mission.title}
                    </span>
                    <span className="text-[10px] text-[#8D98A8] border border-[#263140] bg-[#121923] px-2 py-0.5 rounded hidden sm:inline-block">
                      {mission.category}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#566375] pt-0.5">
                    {mission.number} • VERIFIED BREACH
                  </div>
                </div>
              </div>

              {/* Right: Bounty Points & Inspect Arrow */}
              <div className="flex items-center space-x-4 shrink-0">
                <span className="text-xs sm:text-sm font-bold text-[#C8A96B]">
                  +{mission.points} PTS
                </span>
                <span className="text-[#566375] group-hover:text-[#F4F5F7] group-hover:translate-x-0.5 transition-all text-xs flex items-center space-x-1">
                  <span className="hidden sm:inline">INSPECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 5. MINIMAL RESET SIMULATION FOOTER */}
      <div className="pt-6 border-t border-[#1C2633] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#566375]">
        <div>
          CEC HEIST // OPERATIONAL SIMULATION ENGINE v2.4
        </div>

        <div>
          {showResetConfirm ? (
            <div className="flex items-center space-x-3 bg-[#121923] border border-[#B85C5C]/50 px-3 py-1.5 rounded-lg">
              <span className="text-[#B85C5C] text-[11px] font-bold">RESET ALL SOLVES?</span>
              <button
                onClick={handleReset}
                className="px-2.5 py-1 bg-[#B85C5C] text-white text-[11px] font-bold rounded hover:bg-red-700 transition-colors cursor-pointer"
              >
                YES, RESET
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-2 py-1 text-[#8D98A8] hover:text-[#F4F5F7] text-[11px] cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-[#566375] hover:text-[#B85C5C] flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET PROGRESS</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
