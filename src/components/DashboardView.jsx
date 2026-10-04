import React from 'react';
import { useGame } from '../context/GameContext';
import { formatTimer, formatScore, getDifficultyStyle, getStatusStyle, getAssetUrl } from '../utils/formatters';
import { 
  Terminal, 
  Clock, 
  Trophy, 
  Target, 
  ShieldCheck, 
  Flame, 
  ArrowRight, 
  Radio, 
  Activity, 
  ChevronRight,
  Wifi,
  Cpu,
  Lock,
  Globe,
  FileSearch,
  Binary,
  Layers,
  Users,
  Key,
  Shield,
  Eye
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function DashboardView() {
  const { 
    currentPlayer, 
    secondsRemaining, 
    missions, 
    setSelectedMissionId, 
    activities, 
    setActiveTab, 
    setIsTerminalModalOpen 
  } = useGame();

  // Find the current priority objective mission (e.g. Mission 08 or next available)
  const currentMission = missions.find(m => m.id === 'mission-08') || missions.find(m => m.status === 'AVAILABLE') || missions[0];
  const diffStyle = getDifficultyStyle(currentMission.difficulty);
  const statusStyle = getStatusStyle(currentMission.status);

  // Solved breakdown
  const solvedCount = missions.filter(m => m.status === 'SOLVED').length;
  const totalMissions = missions.length;
  const progressPercent = Math.round((solvedCount / totalMissions) * 100);

  const handleEnterMission = (mId) => {
    sound.playClick();
    setSelectedMissionId(mId || currentMission.id);
    setActiveTab('missions');
  };

  return (
    <div className="space-y-7 font-sans pb-16">
      
      {/* 1. TOP CREW STATUS & HEIST PROGRESSION BANNER */}
      <div className="bg-[#0C111A] border border-[#263140] p-5 sm:p-7 shadow-2xl relative overflow-hidden font-mono">
        <div className="absolute top-0 left-0 w-24 h-1 bg-[#C8A96B]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#1C2633]">
          <div>
            <div className="flex items-center space-x-2 text-[#C8A96B] text-xs font-bold tracking-widest mb-1.5 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
              <span>HEIST CREW COMMAND // OPERATION CEC HEIST</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#F4F5F7] uppercase">
              CREW: {currentPlayer.callsign || 'SPECTRE-9'} // STATUS: INFILTRATION ACTIVE
            </h1>
            <p className="text-xs text-[#8D98A8] font-sans mt-0.5">
              Target Infrastructure: Canara Engineering College Cyber Labs • Digital Vault Sector Delta
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="px-3 py-1.5 bg-[#4FB286]/10 text-[#4FB286] border border-[#4FB286]/30 font-bold flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FB286] animate-ping" />
              <span>HEIST STATUS: LIVE</span>
            </span>
          </div>
        </div>

        {/* 4 Core Crew Telemetry Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          
          {/* Card 1: Heist Progress Bar */}
          <div className="bg-[#121923] p-4 border border-[#263140] space-y-2">
            <div className="flex justify-between items-center text-[10px] text-[#8D98A8] uppercase tracking-wider">
              <span>HEIST PROGRESS</span>
              <span className="text-[#C8A96B] font-bold text-xs">{progressPercent}%</span>
            </div>
            <div className="h-2 w-full bg-[#070B12] border border-[#263140] overflow-hidden">
              <div 
                className="h-full bg-[#C8A96B] transition-all duration-700" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
            <div className="text-[10px] text-[#566375]">
              {solvedCount} OF {totalMissions} OBJECTIVES CLEARED
            </div>
          </div>

          {/* Card 2: Crew Rank */}
          <div className="bg-[#121923] p-4 border border-[#263140] space-y-1">
            <div className="text-[10px] text-[#8D98A8] uppercase tracking-wider">
              CURRENT RANK
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#F4F5F7] flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-[#C8A96B]" />
              <span>#{currentPlayer.rank < 10 ? `0${currentPlayer.rank}` : currentPlayer.rank}</span>
            </div>
            <div className="text-[10px] text-[#4FB286]">▲ TOP 5% OF HEIST CREWS</div>
          </div>

          {/* Card 3: Total Bounties */}
          <div className="bg-[#121923] p-4 border border-[#263140] space-y-1">
            <div className="text-[10px] text-[#8D98A8] uppercase tracking-wider">
              TOTAL BOUNTY SCORE
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#C8A96B]">
              {formatScore(currentPlayer.score)} PTS
            </div>
            <div className="text-[10px] text-[#8D98A8]">ACCURACY: {currentPlayer.accuracy}</div>
          </div>

          {/* Card 4: Operation Window */}
          <div className="bg-[#121923] p-4 border border-[#263140] space-y-1">
            <div className="text-[10px] text-[#8D98A8] uppercase tracking-wider">
              TIME REMAINING
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#F4F5F7] tracking-wider flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#D6A85F]" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>
            <div className="text-[10px] text-[#566375]">EXFILTRATION CUTOFF: 04:00:00</div>
          </div>

        </div>
      </div>

      {/* 2. PRIMARY DIRECTIVE: CURRENT MISSION FEATURE */}
      <div className="relative bg-[#0C111A] border border-[#263140] overflow-hidden shadow-2xl">
        {/* Subtle realistic facility photograph background overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('${getAssetUrl('/assets/heist/facility/secure_corridor.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C111A] via-[#0C111A]/90 to-transparent pointer-events-none" />

        <div className="relative p-6 sm:p-8 font-mono">
          <div className="flex items-center space-x-2 text-xs text-[#C8A96B] font-bold tracking-widest uppercase mb-2">
            <Target className="w-4 h-4 text-[#C8A96B]" />
            <span>PRIMARY DIRECTIVE // CURRENT OPERATIONAL TARGET</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-[#121923] border border-[#C8A96B]/40 text-[#C8A96B] text-[10px] font-bold">
                  MISSION {currentMission.number}
                </span>
                <span className="px-2 py-0.5 bg-[#121923] border border-[#263140] text-[#8D98A8] text-[10px]">
                  SECTOR: {currentMission.category}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-medium border ${diffStyle.badge}`}>
                  LEVEL: {currentMission.difficulty}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-[#F4F5F7] uppercase">
                {currentMission.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#8D98A8] font-sans leading-relaxed max-w-2xl">
                {currentMission.brief}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-[#8D98A8]">
                <span>TARGET: <strong className="text-[#F4F5F7]">{currentMission.target || '10.24.16.42:2222'}</strong></span>
                <span>•</span>
                <span>ESTIMATE: {currentMission.timeEstimate}</span>
                <span>•</span>
                <span className="text-[#C8A96B] font-bold">REWARD: +{formatScore(currentMission.points)} PTS</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => handleEnterMission(currentMission.id)}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#C8A96B] hover:bg-[#D6A85F] text-[#070B12] font-bold text-xs tracking-widest transition-all cursor-pointer shadow-lg"
              >
                <span>BEGIN INFILTRATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('missions')}
                className="w-full flex items-center justify-center space-x-2 px-6 py-2.5 bg-[#121923] hover:bg-[#16202D] border border-[#263140] text-[#F4F5F7] text-xs transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>OPEN FACILITY BLUEPRINT MAP</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. SURVEILLANCE & LIVE TELEMETRY FEED (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: CCTV Surveillance Wall Preview (7 cols) */}
        <div className="lg:col-span-7 bg-[#0C111A] border border-[#263140] p-5 sm:p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-[#263140]">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-[#C8A96B]" />
              <h3 className="text-xs font-bold text-[#F4F5F7] tracking-wider uppercase">
                SURVEILLANCE INTERCEPT FEED // CCTV MONITORING WALL
              </h3>
            </div>
            <span className="text-[10px] text-[#4FB286] flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4FB286] animate-ping" />
              <span>TAP ACTIVE</span>
            </span>
          </div>

          <div className="relative aspect-video bg-[#070B12] border border-[#263140] overflow-hidden group">
            <img 
              src={getAssetUrl('/assets/heist/surveillance/cctv_wall.jpg')} 
              alt="CCTV Surveillance Wall" 
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-[#070B12]/20 pointer-events-none" />
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#070B12]/90 border border-[#263140] text-[10px] text-[#C8A96B]">
              CAM-FEED: SECTOR-04 CORRIDORS & AIRLOCK GATES
            </div>
          </div>

          <p className="text-xs text-[#8D98A8] font-sans leading-relaxed">
            Real-time optical tap into the facility security operations center. Monitor movement across the outer perimeter, subterranean data corridors, and the central digital vault perimeter.
          </p>
        </div>

        {/* Right: Real-time Telemetry Solves Feed (5 cols) */}
        <div className="lg:col-span-5 bg-[#0C111A] border border-[#263140] p-5 sm:p-6 space-y-4 font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-[#263140]">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-[#C8A96B]" />
              <h3 className="text-xs font-bold text-[#F4F5F7] tracking-wider uppercase">
                LIVE HEIST TELEMETRY FEED
              </h3>
            </div>
            <span className="text-[10px] text-[#8D98A8]">ALL CREWS</span>
          </div>

          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
            {activities.map((act) => (
              <div 
                key={act.id} 
                className="p-2.5 bg-[#121923] border border-[#1C2633] flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5 overflow-hidden pr-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#F4F5F7] text-[11px] truncate">{act.team}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 border ${
                      act.event === 'FLAG_CAPTURED' || act.event === 'FLAG_SOLVED'
                        ? 'text-[#4FB286] border-[#4FB286]/30 bg-[#4FB286]/10' 
                        : act.event === 'FIRST_BLOOD'
                        ? 'text-[#C8A96B] border-[#C8A96B]/30 bg-[#C8A96B]/10 font-bold'
                        : 'text-[#D6A85F] border-[#D6A85F]/30 bg-[#D6A85F]/10'
                    }`}>
                      {act.event === 'FLAG_CAPTURED' || act.event === 'FLAG_SOLVED' ? 'BREACHED' : act.event === 'FIRST_BLOOD' ? 'FIRST BLOOD' : 'INTEL'}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#8D98A8] truncate">
                    {act.mission}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`font-bold text-xs ${act.penalty ? 'text-[#B85C5C]' : 'text-[#C8A96B]'}`}>
                    {act.penalty ? `${act.penalty} PTS` : `+${act.points} PTS`}
                  </span>
                  <span className="text-[9px] text-[#566375] block">{act.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
