import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Award, Search } from 'lucide-react';

export default function LeaderboardView() {
  const { leaderboard, currentPlayer } = useGame();
  const [searchQuery, setSearchQuery] = useState('');

  // Total teams count (as shown in reference mockup)
  const totalTeamsCount = Math.max(85, leaderboard.length);

  // Filtered leaderboard
  const displayedRows = searchQuery.trim()
    ? leaderboard.filter(e => e.team.toLowerCase().includes(searchQuery.toLowerCase()))
    : leaderboard;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 font-mono pb-16">
      
      {/* Top Header Section matching user reference mockup */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-2 pb-2">
        
        {/* Left: Titles & Tagline */}
        <div className="space-y-1">
          <div className="text-xs font-bold tracking-widest text-[#EF4444] uppercase">
            RANKING SYSTEM
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F4F5F7] uppercase">
            LEADERBOARD
          </h1>
          <p className="text-xs text-[#71717A] tracking-wider uppercase pt-0.5">
            TOP HACKERS // LIVE RANKINGS
          </p>
        </div>

        {/* Right: Minimalist TOTAL TEAMS Pod */}
        <div className="flex items-center space-x-3 self-start sm:self-auto">
          
          {/* Subtle inline search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#52525B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team..."
              className="bg-[#0C111A] border border-[#263140] focus:border-[#EF4444] pl-8 pr-3 py-2 text-xs text-[#F4F5F7] placeholder-[#52525B] outline-none rounded-none transition-colors w-36 sm:w-48"
            />
          </div>

          <div className="bg-[#0C111A] border border-[#263140] px-5 py-2.5 min-w-[100px] text-right">
            <span className="text-[10px] text-[#71717A] block tracking-wider uppercase font-semibold">
              TOTAL TEAMS
            </span>
            <span className="text-2xl font-bold text-[#F4F5F7] leading-none block mt-1">
              {totalTeamsCount}
            </span>
          </div>

        </div>

      </div>

      {/* Main Minimalist Leaderboard Table */}
      <div className="w-full border-t border-b border-[#263140]/80">
        
        {/* Table Header Row */}
        <div className="grid grid-cols-12 py-3 px-2 sm:px-4 text-xs font-bold text-[#EF4444] tracking-wider uppercase border-b border-[#263140]/60">
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
        <div className="divide-y divide-[#1A2230]/60">
          {displayedRows.map((entry) => {
            const isCurrent = entry.isCurrentPlayer;
            const rank = entry.rank;

            return (
              <div
                key={rank}
                className={`grid grid-cols-12 items-center py-4 px-2 sm:px-4 transition-colors ${
                  isCurrent 
                    ? 'bg-[#141B26]/80 hover:bg-[#18212F]' 
                    : 'hover:bg-[#0C111A]/60'
                }`}
              >
                
                {/* 1. RANK COLUMN */}
                <div className="col-span-2 sm:col-span-1 flex items-center">
                  {rank === 1 ? (
                    <Trophy className="w-5 h-5 text-[#EAB308]" />
                  ) : rank === 2 ? (
                    <Award className="w-5 h-5 text-[#9CA3AF]" />
                  ) : rank === 3 ? (
                    <Award className="w-5 h-5 text-[#D97706]" />
                  ) : (
                    <span className="text-xs sm:text-sm text-[#71717A] font-mono">
                      #{rank}
                    </span>
                  )}
                </div>

                {/* 2. TEAM COLUMN */}
                <div className="col-span-8 sm:col-span-9 flex items-center space-x-3 sm:space-x-4">
                  {/* Square TE Badge */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-[#101622] border border-[#263140] text-[10px] font-bold text-[#71717A] flex items-center justify-center shrink-0 select-none">
                    TE
                  </div>

                  {/* Team Name */}
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className={`text-sm sm:text-base font-bold tracking-wide truncate ${
                      isCurrent ? 'text-[#F4F5F7]' : 'text-[#D4D4D8]'
                    }`}>
                      {entry.team}
                    </span>

                    {/* Live target indicator for current user's team */}
                    {isCurrent && (
                      <span className="relative flex h-2.5 w-2.5 shrink-0 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF4444]" />
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. SCORE COLUMN */}
                <div className="col-span-2 text-right">
                  <span className="text-base sm:text-lg font-bold text-[#F4F5F7]">
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
