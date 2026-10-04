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
  Layers
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function DashboardView() {
  const { 
    currentPlayer, 
    secondsRemaining, 
    missions, 
    openMissionDetail, 
    activities, 
    setActiveTab, 
    setIsTerminalModalOpen 
  } = useGame();

  // Find the featured current mission (Mission 08: The Locked Terminal, or next available)
  const currentMission = missions.find(m => m.id === 'mission-08') || missions.find(m => m.status === 'AVAILABLE') || missions[0];
  const diffStyle = getDifficultyStyle(currentMission.difficulty);
  const statusStyle = getStatusStyle(currentMission.status);

  // Solved breakdown
  const solvedCount = missions.filter(m => m.status === 'SOLVED').length;
  const totalMissions = missions.length;

  const handleEnterMission = () => {
    sound.playClick();
    openMissionDetail(currentMission.id);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. TOP AREA: MISSION CONTROL COMPACT DATA BLOCKS */}
      <div className="bg-[#151515] border border-[#303030] p-4 sm:p-5 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2A2A2A] gap-2">
          <div>
            <div className="flex items-center space-x-2 text-[#FACC15] text-xs font-bold tracking-widest">
              <span className="w-2 h-2 bg-[#FACC15] animate-pulse"></span>
              <span>MISSION CONTROL // OPERATION CEC HEIST</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#E5E7EB] uppercase">
              THE SYSTEM IS LIVE. SELECT YOUR NEXT TARGET.
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 bg-[#16A34A]/10 text-[#4ADE80] border border-[#22C55E]/40 font-bold flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
              <span>EVENT STATUS: ONLINE</span>
            </span>
          </div>
        </div>

        {/* 5 Compact Data Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4">
          
          {/* Block 1: Event Status */}
          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A]">
            <div className="text-[10px] text-[#737373] tracking-widest uppercase mb-1">
              NETWORK LINK
            </div>
            <div className="flex items-center space-x-1.5">
              <Wifi className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm font-bold text-[#E5E7EB]">ONLINE</span>
            </div>
            <div className="text-[10px] text-[#737373] mt-1">SUBNET: 10.24.0.0/16</div>
          </div>

          {/* Block 2: Remaining Time */}
          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A]">
            <div className="text-[10px] text-[#737373] tracking-widest uppercase mb-1">
              REMAINING TIME
            </div>
            <div className="flex items-center space-x-1.5 text-[#FACC15]">
              <Clock className="w-4 h-4 text-[#FACC15]" />
              <span className="text-sm sm:text-base font-bold tracking-wider">
                {formatTimer(secondsRemaining)}
              </span>
            </div>
            <div className="text-[10px] text-[#737373] mt-1">WINDOW: 04:00:00</div>
          </div>

          {/* Block 3: Current Rank */}
          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A]">
            <div className="text-[10px] text-[#737373] tracking-widest uppercase mb-1">
              CURRENT RANK
            </div>
            <div className="flex items-center space-x-1.5">
              <Trophy className="w-4 h-4 text-[#FACC15]" />
              <span className="text-sm sm:text-base font-bold text-[#FACC15]">
                #{currentPlayer.rank}
              </span>
            </div>
            <div className="text-[10px] text-[#737373] mt-1">OF 84 OPERATORS</div>
          </div>

          {/* Block 4: Score */}
          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A]">
            <div className="text-[10px] text-[#737373] tracking-widest uppercase mb-1">
              TOTAL SCORE
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm sm:text-base font-bold text-[#E5E7EB]">
                {formatScore(currentPlayer.score)}
              </span>
              <span className="text-[10px] text-[#FACC15] font-semibold">PTS</span>
            </div>
            <div className="text-[10px] text-[#737373] mt-1">ACCURACY: {currentPlayer.accuracy}</div>
          </div>

          {/* Block 5: Missions Solved */}
          <div className="bg-[#0A0A0A] p-3 border border-[#2A2A2A] col-span-2 sm:col-span-1">
            <div className="text-[10px] text-[#737373] tracking-widest uppercase mb-1">
              MISSIONS SOLVED
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm sm:text-base font-bold text-[#E5E7EB]">
                {solvedCount} / {totalMissions}
              </span>
            </div>
            <div className="text-[10px] text-[#737373] mt-1">
              {Math.round((solvedCount / totalMissions) * 100)}% PENETRATION
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN DASHBOARD: LARGE FEATURED CURRENT MISSION WITH REALISTIC FACILITY BACKDROP */}
      <div className="relative bg-[#151515] border border-[#303030] overflow-hidden">
        {/* Subtle realistic facility photograph background overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('${getAssetUrl('/images/facility.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/90 to-transparent pointer-events-none" />

        <div className="relative p-6 sm:p-8 font-mono">
          <div className="flex items-center space-x-2 text-xs text-[#FACC15] font-bold tracking-widest uppercase mb-2">
            <Target className="w-4 h-4 text-[#FACC15]" />
            <span>PRIMARY DIRECTIVE // CURRENT MISSION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 8 cols: Mission details */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-[#0A0A0A] border border-[#303030] text-[#737373]">
                    TARGET IDENTIFIER: M-{currentMission.number}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-[#0A0A0A] border border-[#303030] text-[#E5E7EB]">
                    CATEGORY: {currentMission.category}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 border ${diffStyle.badge}`}>
                    DIFFICULTY: {currentMission.difficulty}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 border ${statusStyle.badge}`}>
                    {statusStyle.label}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E5E7EB] tracking-wide uppercase">
                  {currentMission.title}
                </h2>
              </div>

              <p className="font-sans text-sm text-[#9CA3AF] max-w-2xl leading-relaxed">
                {currentMission.brief}
              </p>

              {/* Skills tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-[#737373]">REQUIRED CAPABILITIES:</span>
                {currentMission.requiredSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 bg-[#0A0A0A] border border-[#2E2E2E] text-[#D1D5DB]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 4 cols: Big Action & Metrics Card */}
            <div className="lg:col-span-4 bg-[#0A0A0A]/90 border border-[#303030] p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#737373] block">TARGET VALUE</span>
                  <span className="text-xl font-bold text-[#FACC15]">{currentMission.points} PTS</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] block">TIME ESTIMATE</span>
                  <span className="text-base font-bold text-[#E5E7EB]">{currentMission.timeEstimate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] block">SOLVES VERIFIED</span>
                  <span className="text-base font-bold text-[#E5E7EB]">{currentMission.solvedCount} TEAMS</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#737373] block">ACCESS VECTOR</span>
                  <span className="text-xs font-bold text-[#22C55E]">PORT 2222 READY</span>
                </div>
              </div>

              <button
                onClick={handleEnterMission}
                className="w-full py-3 px-4 bg-[#FACC15] hover:bg-[#EAB308] text-[#0A0A0A] font-bold text-xs tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg"
              >
                <span>ENTER MISSION →</span>
              </button>

              <div className="text-center">
                <span className="text-[10px] text-[#737373]">
                  TARGET HOST: {currentMission.target}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. TACTICAL SECTOR RADAR & QUICK ATTACK VECTORS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Attack Vectors Grid */}
        <div className="lg:col-span-2 bg-[#151515] border border-[#303030] p-5 font-mono">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2A2A2A]">
            <div className="flex items-center space-x-2 text-xs">
              <Layers className="w-4 h-4 text-[#FACC15]" />
              <h3 className="font-bold text-[#E5E7EB] uppercase tracking-wider">
                COMPETITION VECTORS & DISCIPLINE COVERAGE
              </h3>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('missions');
              }}
              className="text-xs text-[#FACC15] hover:underline flex items-center space-x-1"
            >
              <span>VIEW ALL MISSIONS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { cat: 'WEB', name: 'Web Exploitation', count: 4, icon: Globe },
              { cat: 'CRYPTO', name: 'Cryptography', count: 3, icon: Lock },
              { cat: 'FORENSICS', name: 'Digital Forensics', count: 3, icon: FileSearch },
              { cat: 'REVERSE ENGINEERING', name: 'Reverse Engineering', count: 3, icon: Binary },
              { cat: 'OSINT', name: 'Open Source Intel', count: 3, icon: Target },
              { cat: 'NETWORK', name: 'Network Analysis', count: 3, icon: Cpu }
            ].map(item => {
              const Icon = item.icon;
              const catMissions = missions.filter(m => m.category === item.cat);
              const catSolved = catMissions.filter(m => m.status === 'SOLVED').length;
              const percent = Math.round((catSolved / catMissions.length) * 100);

              return (
                <div
                  key={item.cat}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('missions');
                  }}
                  className="bg-[#0A0A0A] border border-[#2E2E2E] hover:border-[#FACC15] p-3.5 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-[#737373] group-hover:text-[#FACC15] transition-colors" />
                    <span className="text-[11px] font-bold text-[#FACC15]">
                      {catSolved}/{catMissions.length}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-[#E5E7EB] mb-2 truncate">
                    {item.name}
                  </div>

                  {/* Micro progress bar */}
                  <div className="h-1.5 w-full bg-[#1F1F1F] border border-[#303030] overflow-hidden">
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

        {/* Right 1 Col: Live Competition Telemetry Activity Feed */}
        <div className="bg-[#151515] border border-[#303030] p-5 font-mono">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2A2A2A]">
            <div className="flex items-center space-x-2 text-xs">
              <Activity className="w-4 h-4 text-[#FACC15]" />
              <h3 className="font-bold text-[#E5E7EB] uppercase tracking-wider">
                LIVE TELEMETRY
              </h3>
            </div>
            <span className="text-[10px] text-[#22C55E] flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
              <span>FEED LIVE</span>
            </span>
          </div>

          <div className="space-y-2.5 max-h-[310px] overflow-y-auto pr-1">
            {activities.map((act) => (
              <div 
                key={act.id}
                className="bg-[#0A0A0A] border border-[#262626] p-2.5 text-xs transition-colors hover:border-[#383838]"
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-[#737373]">{act.timestamp}</span>
                  <span className={`font-semibold ${
                    act.event === 'FIRST_BLOOD' ? 'text-[#F87171]' :
                    act.event === 'FLAG_CAPTURED' ? 'text-[#4ADE80]' : 'text-[#FACC15]'
                  }`}>
                    {act.event}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#E5E7EB] font-bold text-[11px] truncate max-w-[170px]">
                    {act.team}
                  </span>
                  {act.points && (
                    <span className="text-[#FACC15] font-bold text-[11px]">
                      +{act.points} PTS
                    </span>
                  )}
                  {act.penalty && (
                    <span className="text-[#F87171] font-bold text-[11px]">
                      {act.penalty} PTS
                    </span>
                  )}
                </div>

                <div className="text-[10px] text-[#737373] truncate mt-0.5">
                  {act.mission}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. TACTICAL INVESTIGATION BOARD PREVIEW BANNER */}
      <div className="bg-[#151515] border border-[#303030] p-4 sm:p-5 font-mono flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#0A0A0A] border border-[#303030] overflow-hidden shrink-0 hidden sm:block">
            <img 
              src={getAssetUrl('/images/investigation_board.jpg')} 
              alt="Investigation Board" 
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
          <div>
            <div className="text-xs text-[#FACC15] font-bold">CASE FILE: INCIDENT RECONSTRUCTION</div>
            <div className="text-sm font-bold text-[#E5E7EB]">CANARA CYBER LABS // EVIDENCE BOARD READY</div>
            <p className="text-xs text-[#737373] font-sans mt-0.5">
              Review physical network topology schematics, RF intercepts, and server room schematics in your profile dossier.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('profile');
          }}
          className="px-4 py-2 bg-[#1F1F1F] hover:bg-[#282828] border border-[#303030] hover:border-[#FACC15] text-xs font-bold text-[#E5E7EB] shrink-0 transition-colors"
        >
          VIEW OPERATOR DOSSIER →
        </button>
      </div>

    </div>
  );
}
