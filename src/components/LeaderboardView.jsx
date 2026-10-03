import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { formatScore } from '../utils/formatters';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Flame, 
  ShieldCheck, 
  Search, 
  User, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function LeaderboardView() {
  const { leaderboard, currentPlayer } = useGame();
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' | 'TOP_10' | 'MY_POSITION'
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterClick = (mode) => {
    sound.playClick();
    setFilterMode(mode);
  };

  // Find player index
  const playerIndex = leaderboard.findIndex(e => e.isCurrentPlayer);

  // Apply filters
  let displayedRows = [...leaderboard];

  if (filterMode === 'TOP_10') {
    displayedRows = displayedRows.slice(0, 10);
  } else if (filterMode === 'MY_POSITION') {
    const start = Math.max(0, playerIndex - 3);
    const end = Math.min(leaderboard.length, playerIndex + 4);
    displayedRows = displayedRows.slice(start, end);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    displayedRows = displayedRows.filter(e => 
      e.team.toLowerCase().includes(q) || 
      (e.affiliation && e.affiliation.toLowerCase().includes(q))
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner: LIVE RANKINGS */}
      <div className="bg-[#151515] border border-[#303030] p-4 sm:p-5 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#FACC15] font-semibold mb-1">
              <Trophy className="w-4 h-4" />
              <span>OFFICIAL COMPETITION SCOREBOARD // CEC HEIST</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#E5E7EB] uppercase">
              LIVE RANKINGS & TEAMS TELEMETRY
            </h1>
          </div>

          {/* Quick Player Ranking Pod */}
          <div className="bg-[#0A0A0A] p-3 border border-[#FACC15]/30 flex items-center space-x-4">
            <div>
              <div className="text-[10px] text-[#737373]">MY POSITION</div>
              <div className="text-base font-bold text-[#FACC15]">#{currentPlayer.rank} SPECTRE-9</div>
            </div>
            <div className="border-l border-[#262626] pl-4">
              <div className="text-[10px] text-[#737373]">MY SCORE</div>
              <div className="text-base font-bold text-[#E5E7EB]">{formatScore(currentPlayer.score)} PTS</div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-4 pt-4 border-t border-[#262626] flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Filter options */}
          <div className="flex items-center space-x-1">
            {[
              { id: 'ALL', label: 'ALL TEAMS' },
              { id: 'TOP_10', label: 'TOP 10 BRACKET' },
              { id: 'MY_POSITION', label: 'NEAR MY RANK' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => handleFilterClick(f.id)}
                className={`px-3 py-1.5 border transition-colors ${
                  filterMode === f.id
                    ? 'bg-[#FACC15] text-[#0A0A0A] font-bold border-[#FACC15]'
                    : 'bg-[#0A0A0A] text-[#737373] border-[#2A2A2A] hover:text-[#E5E7EB] hover:border-[#3E3E3E]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team callsign or department..."
              className="w-full bg-[#0A0A0A] border border-[#303030] focus:border-[#FACC15] pl-9 pr-3 py-1.5 text-xs text-[#E5E7EB] placeholder-[#525252] outline-none"
            />
          </div>

        </div>
      </div>

      {/* Top 3 High Command Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        {leaderboard.slice(0, 3).map((team, idx) => {
          const podiumOrder = idx === 0 ? '1ST PLACE' : idx === 1 ? '2ND PLACE' : '3RD PLACE';
          const borderStyle = idx === 0 ? 'border-[#FACC15]' : idx === 1 ? 'border-[#9CA3AF]' : 'border-[#B45309]';
          const bgAccent = idx === 0 ? 'bg-[#FACC15]/5' : idx === 1 ? 'bg-[#9CA3AF]/5' : 'bg-[#B45309]/5';

          return (
            <div 
              key={team.team}
              className={`p-4 bg-[#151515] border ${borderStyle} ${bgAccent} relative`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-widest text-[#737373]">{podiumOrder}</span>
                <span className="text-xs font-bold text-[#FACC15]">#{team.rank}</span>
              </div>
              <h3 className="text-base font-bold text-[#E5E7EB] uppercase truncate">{team.team}</h3>
              <p className="text-[11px] text-[#737373] truncate mb-3">{team.affiliation}</p>

              <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2A] text-xs">
                <div>
                  <span className="text-[10px] text-[#737373] block">SOLVES</span>
                  <span className="font-bold text-[#E5E7EB]">{team.solved} OBJECTIVES</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#737373] block">SCORE</span>
                  <span className="text-sm font-bold text-[#FACC15]">{formatScore(team.score)} PTS</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Leaderboard Table */}
      <div className="bg-[#151515] border border-[#303030] overflow-hidden font-mono">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            {/* Table Header */}
            <thead className="bg-[#0A0A0A] border-b border-[#303030] text-[11px] text-[#737373] uppercase tracking-wider select-none">
              <tr>
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">Operator / Team</th>
                <th className="py-3 px-4 text-center w-28">Missions</th>
                <th className="py-3 px-4 text-right w-28">Score</th>
                <th className="py-3 px-4 text-center w-24">Trend</th>
                <th className="py-3 px-4 text-right w-32 hidden sm:table-cell">Last Activity</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#222222]">
              {displayedRows.map((entry) => {
                const isMe = entry.isCurrentPlayer;

                return (
                  <tr
                    key={entry.team}
                    className={`transition-colors ${
                      isMe
                        ? 'bg-[#FACC15]/10 border-l-4 border-l-[#FACC15] text-[#E5E7EB]'
                        : 'hover:bg-[#1A1A1A] text-[#D1D5DB]'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3 px-4 text-center font-bold">
                      <span className={`inline-block px-1.5 py-0.5 ${
                        entry.rank === 1 ? 'bg-[#FACC15] text-black font-extrabold' :
                        entry.rank === 2 ? 'bg-[#9CA3AF] text-black' :
                        entry.rank === 3 ? 'bg-[#B45309] text-white' :
                        isMe ? 'text-[#FACC15]' : 'text-[#737373]'
                      }`}>
                        {entry.rank < 10 ? `0${entry.rank}` : entry.rank}
                      </span>
                    </td>

                    {/* Team */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold text-xs ${isMe ? 'text-[#FACC15]' : 'text-[#E5E7EB]'}`}>
                          {entry.team}
                        </span>
                        {isMe && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-[#FACC15] text-black font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#737373] block">
                        {entry.affiliation}
                      </span>
                    </td>

                    {/* Missions Solved */}
                    <td className="py-3 px-4 text-center font-bold">
                      <span className="text-[#E5E7EB]">{entry.solved}</span>
                      <span className="text-[#525252] text-[10px]"> / 19</span>
                    </td>

                    {/* Score */}
                    <td className="py-3 px-4 text-right font-bold text-sm">
                      <span className={isMe ? 'text-[#FACC15]' : 'text-[#E5E7EB]'}>
                        {formatScore(entry.score)}
                      </span>
                    </td>

                    {/* Trend */}
                    <td className="py-3 px-4 text-center">
                      {entry.change === 'up' && (
                        <span className="inline-flex items-center text-[#22C55E] text-[11px]">
                          <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                          <span>+1</span>
                        </span>
                      )}
                      {entry.change === 'down' && (
                        <span className="inline-flex items-center text-[#EF4444] text-[11px]">
                          <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                          <span>-1</span>
                        </span>
                      )}
                      {entry.change === 'same' && (
                        <span className="inline-flex items-center text-[#737373] text-[11px]">
                          <Minus className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </td>

                    {/* Last Activity */}
                    <td className="py-3 px-4 text-right text-[11px] text-[#737373] hidden sm:table-cell">
                      {entry.lastActivity}
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}
