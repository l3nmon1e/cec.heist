import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { formatScore } from '../utils/formatters';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  Shield, 
  CheckCircle2, 
  Key,
  Users,
  Award,
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

  // Top 3 Podium
  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* Top Banner: LIVE RANKINGS */}
      <div className="bg-[#0C111A] border border-[#263140] p-5 sm:p-7 shadow-2xl relative overflow-hidden font-mono">
        <div className="absolute top-0 left-0 w-24 h-1 bg-[#C8A96B]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1C2633]">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#C8A96B] font-bold tracking-widest mb-1.5 uppercase">
              <Trophy className="w-4 h-4 text-[#C8A96B]" />
              <span>OFFICIAL SCOREBOARD // CEC HEIST</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#F4F5F7] uppercase">
              HEIST CREWS LEADERBOARD & TELEMETRY
            </h1>
            <p className="text-xs text-[#8D98A8] font-sans mt-0.5">
              Cryptographically verified scores & real-time sector penetration rankings
            </p>
          </div>

          {/* Quick Player Ranking Pod */}
          <div className="bg-[#070B12] p-3.5 border border-[#C8A96B]/30 flex items-center space-x-4">
            <div>
              <div className="text-[10px] text-[#8D98A8]">MY POSITION</div>
              <div className="text-base font-bold text-[#C8A96B]">#{currentPlayer.rank} {currentPlayer.callsign}</div>
            </div>
            <div className="border-l border-[#263140] pl-4">
              <div className="text-[10px] text-[#8D98A8]">MY SCORE</div>
              <div className="text-base font-bold text-[#F4F5F7]">{formatScore(currentPlayer.score)} PTS</div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Filter options */}
          <div className="flex items-center space-x-1.5">
            {[
              { id: 'ALL', label: 'ALL CREWS' },
              { id: 'TOP_10', label: 'TOP 10 BRACKET' },
              { id: 'MY_POSITION', label: 'NEAR MY CREW' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => handleFilterClick(f.id)}
                className={`px-3 py-1.5 border text-xs font-bold transition-colors cursor-pointer ${
                  filterMode === f.id
                    ? 'bg-[#C8A96B] text-[#070B12] border-[#C8A96B]'
                    : 'bg-[#121923] text-[#8D98A8] border-[#263140] hover:text-[#F4F5F7]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#566375] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crew or affiliation..."
              className="w-full bg-[#070B12] border border-[#263140] focus:border-[#C8A96B] pl-8 pr-3 py-1.5 text-xs text-[#F4F5F7] placeholder-[#566375] outline-none font-mono transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Top 3 Crews Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono">
        {topThree.map((crew, idx) => {
          const isGold = idx === 0;
          const isSilver = idx === 1;
          const isBronze = idx === 2;

          return (
            <div 
              key={crew.rank}
              className={`p-5 border relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 shadow-xl ${
                isGold 
                  ? 'bg-[#121923] border-[#C8A96B] ring-1 ring-[#C8A96B]/30' 
                  : isSilver
                  ? 'bg-[#0C111A] border-[#8D98A8]/40'
                  : 'bg-[#0C111A] border-[#8E784D]/40'
              }`}
            >
              <div className={`h-1 w-full absolute top-0 left-0 ${
                isGold ? 'bg-[#C8A96B]' : isSilver ? 'bg-[#8D98A8]' : 'bg-[#8E784D]'
              }`} />

              <div className="flex items-center justify-between mb-3">
                <span className={`text-2xl font-bold ${
                  isGold ? 'text-[#C8A96B]' : isSilver ? 'text-[#F4F5F7]' : 'text-[#D6A85F]'
                }`}>
                  0{crew.rank}
                </span>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold ${
                  isGold 
                    ? 'border-[#C8A96B] text-[#C8A96B] bg-[#C8A96B]/10' 
                    : isSilver 
                    ? 'border-[#8D98A8] text-[#8D98A8] bg-[#8D98A8]/10' 
                    : 'border-[#8E784D] text-[#8E784D] bg-[#8E784D]/10'
                }`}>
                  <Trophy className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#F4F5F7] tracking-wider truncate">
                  {crew.team}
                </h3>
                <p className="text-[11px] text-[#8D98A8] truncate font-sans">
                  {crew.affiliation}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1C2633] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#566375] block">SCORE</span>
                  <span className={`font-bold ${isGold ? 'text-[#C8A96B]' : 'text-[#F4F5F7]'}`}>
                    {formatScore(crew.score)} PTS
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#566375] block">SOLVES</span>
                  <span className="font-bold text-[#F4F5F7]">{crew.solved}/19</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Table: Professional Clean Industrial Layout */}
      <div className="bg-[#0C111A] border border-[#263140] overflow-hidden shadow-2xl font-mono">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#121923] border-b border-[#263140] text-[#8D98A8] uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 font-bold">RANK</th>
                <th className="py-3.5 px-4 font-bold">HEIST CREW</th>
                <th className="py-3.5 px-4 font-bold">SECTOR PENETRATION</th>
                <th className="py-3.5 px-4 font-bold">LAST BREACH</th>
                <th className="py-3.5 px-4 font-bold text-right">TOTAL SCORE</th>
                <th className="py-3.5 px-4 font-bold text-center">TREND</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2633]">
              {displayedRows.map((entry) => {
                const isCurrent = entry.isCurrentPlayer;
                const isTop3 = entry.rank <= 3;

                return (
                  <tr
                    key={entry.rank}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-[#C8A96B]/10 border-l-2 border-l-[#C8A96B] hover:bg-[#C8A96B]/15'
                        : isTop3
                        ? 'bg-[#121923]/40 hover:bg-[#121923]'
                        : 'hover:bg-[#121923]/60'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold ${
                          entry.rank === 1 ? 'text-[#C8A96B]' :
                          entry.rank === 2 ? 'text-[#E5D0A0]' :
                          entry.rank === 3 ? 'text-[#D6A85F]' :
                          isCurrent ? 'text-[#C8A96B]' : 'text-[#8D98A8]'
                        }`}>
                          #{entry.rank < 10 ? `0${entry.rank}` : entry.rank}
                        </span>
                      </div>
                    </td>

                    {/* Crew Name */}
                    <td className="py-3.5 px-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${isCurrent ? 'text-[#C8A96B]' : 'text-[#F4F5F7]'}`}>
                            {entry.team}
                          </span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 bg-[#C8A96B] text-[#070B12] text-[9px] font-bold">
                              YOUR CREW
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#566375] font-sans">
                          {entry.affiliation}
                        </span>
                      </div>
                    </td>

                    {/* Progress Bar */}
                    <td className="py-3.5 px-4">
                      <div className="w-36 space-y-1">
                        <div className="flex justify-between text-[10px] text-[#8D98A8]">
                          <span>{entry.solved} SOLVES</span>
                          <span>{Math.round((entry.solved / 19) * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#070B12] border border-[#263140] overflow-hidden">
                          <div
                            className={`h-full ${entry.rank <= 3 ? 'bg-[#C8A96B]' : 'bg-[#8D98A8]'}`}
                            style={{ width: `${(entry.solved / 19) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Last Solved */}
                    <td className="py-3.5 px-4 text-[#8D98A8] text-[11px]">
                      {entry.lastSolved || '14:28:11'}
                    </td>

                    {/* Score */}
                    <td className="py-3.5 px-4 text-right">
                      <span className={`font-bold text-sm ${isCurrent ? 'text-[#C8A96B]' : 'text-[#F4F5F7]'}`}>
                        {formatScore(entry.score)}
                      </span>
                    </td>

                    {/* Movement */}
                    <td className="py-3.5 px-4 text-center">
                      {entry.movement > 0 ? (
                        <span className="inline-flex items-center text-[#4FB286] text-[11px] font-bold">
                          <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                          +{entry.movement}
                        </span>
                      ) : entry.movement < 0 ? (
                        <span className="inline-flex items-center text-[#B85C5C] text-[11px] font-bold">
                          <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                          {entry.movement}
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[#566375] text-[11px]">
                          <Minus className="w-3.5 h-3.5" />
                        </span>
                      )}
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
