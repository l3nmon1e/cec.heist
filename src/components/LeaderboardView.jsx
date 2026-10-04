import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Award, Search, Users } from 'lucide-react';

export default function LeaderboardView() {
  const { leaderboard, currentPlayer } = useGame();
  const [searchQuery, setSearchQuery] = useState('');

  // Total teams count aligned with platform telemetry
  const totalTeamsCount = Math.max(85, leaderboard.length);

  // Filtered leaderboard
  const displayedRows = searchQuery.trim()
    ? leaderboard.filter(e => 
        e.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.affiliation && e.affiliation.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : leaderboard;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 font-mono pb-16">
      
      {/* Top Header Section perfectly matched to CEC HEIST gold & dark aesthetic */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-2 pb-2">
        
        {/* Left: Titles & Tagline */}
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8A96B] uppercase">
            <span className="w-6 h-[2px] bg-[#C8A96B]" />
            <span>RANKING SYSTEM</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F4F5F7] uppercase">
            LEADERBOARD
          </h1>
          
          <p className="text-xs text-[#8D98A8] tracking-wider uppercase pt-0.5">
            TOP HACKERS // LIVE RANKINGS
          </p>
        </div>

        {/* Right: Minimalist TOTAL TEAMS Pod & Inline Search */}
        <div className="flex items-center space-x-3 self-start sm:self-auto">
          
          {/* Subtle inline search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#566375] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crew..."
              className="bg-[#0C111A] border border-[#263140] focus:border-[#C8A96B] pl-8 pr-3 py-2.5 text-xs text-[#F4F5F7] placeholder-[#566375] outline-none rounded-lg transition-colors w-36 sm:w-52 font-mono"
            />
          </div>

          {/* Clean TOTAL TEAMS Box */}
          <div className="bg-[#0C111A] border border-[#263140] px-5 py-2 min-w-[110px] text-right rounded-lg">
            <span className="text-[10px] text-[#8D98A8] block tracking-wider uppercase font-semibold">
              TOTAL TEAMS
            </span>
            <span className="text-2xl font-bold text-[#C8A96B] leading-none block mt-1">
              {totalTeamsCount}
            </span>
          </div>

        </div>

      </div>

      {/* Main Minimalist Leaderboard Table */}
      <div className="w-full border-t border-b border-[#263140]">
        
        {/* Table Header Row */}
        <div className="grid grid-cols-12 py-3 px-3 sm:px-5 text-xs font-bold text-[#C8A96B] tracking-wider uppercase border-b border-[#263140]">
          <div className="col-span-2 sm:col-span-1">
            RANK
          </div>
          <div className="col-span-8 sm:col-span-9">
            TEAM
          </div>
          <div className="col-span-2 text-right">
            SCORE
          </div>
        </div>

        {/* Table Body Rows */}
        <div className="divide-y divide-[#1C2633]">
          {displayedRows.map((entry) => {
            const isCurrent = entry.isCurrentPlayer;
            const rank = entry.rank;

            return (
              <div
                key={rank}
                className={`grid grid-cols-12 items-center py-4 px-3 sm:px-5 transition-colors ${
                  isCurrent 
                    ? 'bg-[#C8A96B]/10 border-l-2 border-l-[#C8A96B] hover:bg-[#C8A96B]/15' 
                    : 'hover:bg-[#121923]/60'
                }`}
              >
                
                {/* 1. RANK COLUMN */}
                <div className="col-span-2 sm:col-span-1 flex items-center">
                  {rank === 1 ? (
                    <Trophy className="w-5 h-5 text-[#C8A96B] drop-shadow-[0_0_8px_rgba(200,169,107,0.5)]" />
                  ) : rank === 2 ? (
                    <Award className="w-5 h-5 text-[#E5D0A0]" />
                  ) : rank === 3 ? (
                    <Award className="w-5 h-5 text-[#8E784D]" />
                  ) : (
                    <span className="text-xs sm:text-sm text-[#8D98A8] font-mono">
                      #{rank}
                    </span>
                  )}
                </div>

                {/* 2. TEAM COLUMN */}
                <div className="col-span-8 sm:col-span-9 flex items-center space-x-3 sm:space-x-4">
                  {/* Square TE Badge in matching theme */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded bg-[#121923] border text-[10px] font-bold flex items-center justify-center shrink-0 select-none ${
                    isCurrent 
                      ? 'border-[#C8A96B] text-[#C8A96B]' 
                      : 'border-[#263140] text-[#8D98A8]'
                  }`}>
                    TE
                  </div>

                  {/* Team Name */}
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className={`text-sm sm:text-base font-bold tracking-wide truncate ${
                      isCurrent ? 'text-[#C8A96B]' : 'text-[#F4F5F7]'
                    }`}>
                      {entry.team}
                    </span>

                    {/* Current User Operative Marker */}
                    {isCurrent && (
                      <span className="flex items-center space-x-1.5 ml-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4FB286] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4FB286]" />
                        </span>
                        <span className="text-[9px] font-mono font-bold text-[#4FB286] uppercase border border-[#4FB286]/30 bg-[#4FB286]/10 px-1.5 py-0.2 rounded hidden sm:inline-block">
                          YOU
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. SCORE COLUMN */}
                <div className="col-span-2 text-right">
                  <span className={`text-base sm:text-lg font-bold ${
                    isCurrent ? 'text-[#C8A96B]' : 'text-[#F4F5F7]'
                  }`}>
                    {entry.score}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
