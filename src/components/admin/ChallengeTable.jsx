import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { getMissionSector, SECTORS_LIST } from './adminHelpers';
import { ChallengeDrawer } from './ChallengeDrawer';
import { Search, ChevronRight, Check, Lock, Unlock } from 'lucide-react';

export const ChallengeTable = ({ initialSectorFilter = 'ALL' }) => {
  const { missions } = useGame();
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState(initialSectorFilter);
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedMission, setSelectedMission] = useState(null);

  // Filter missions
  const filteredMissions = missions.filter(m => {
    const sec = getMissionSector(m.id, m.category);

    const matchesSearch = 
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase()) ||
      sec.sector.toLowerCase().includes(search.toLowerCase());

    const matchesSector = 
      sectorFilter === 'ALL' || 
      (sec?.sectorShort && sec.sectorShort.toLowerCase() === sectorFilter.toLowerCase()) ||
      (sec?.sector && sec.sector.toLowerCase().includes(sectorFilter.toLowerCase()));

    const matchesDifficulty = 
      difficultyFilter === 'ALL' || 
      m.difficulty === difficultyFilter;

    const matchesStatus = 
      statusFilter === 'ALL' || 
      m.status === statusFilter;

    return matchesSearch && matchesSector && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Controls Bar: Search & Filters */}
      <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-4 flex flex-col md:flex-row gap-3 justify-between items-center shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8994A4]" />
          <input
            type="text"
            placeholder="Search challenges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111923] border border-[#202B38] focus:border-[#C8A96B] rounded pl-8 pr-3 py-1.5 text-xs text-[#F4F5F7] placeholder-[#8994A4] focus:outline-none transition-colors"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Sector Filter */}
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="bg-[#111923] border border-[#202B38] text-[#8994A4] focus:text-[#F4F5F7] rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#C8A96B]"
          >
            <option value="ALL">All Sectors</option>
            {SECTORS_LIST.map(s => (
              <option key={s.id} value={s.shortName}>{s.shortName}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-[#111923] border border-[#202B38] text-[#8994A4] focus:text-[#F4F5F7] rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#C8A96B]"
          >
            <option value="ALL">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111923] border border-[#202B38] text-[#8994A4] focus:text-[#F4F5F7] rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#C8A96B]"
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">Active</option>
            <option value="LOCKED">Locked</option>
            <option value="SOLVED">Solved</option>
          </select>
        </div>
      </div>

      {/* Clean Challenges Table */}
      <div className="bg-[#0D131D] border border-[#202B38] rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#202B38] bg-[#111923]/50 text-[10px] text-[#8994A4] uppercase tracking-wider">
                <th className="py-3 px-4">Challenge</th>
                <th className="py-3 px-4">Sector</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Solved</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202B38]/60 text-xs">
              {filteredMissions.map((m) => {
                const sec = getMissionSector(m.id, m.category);
                const isLocked = m.status === 'LOCKED';
                const isSolved = m.status === 'SOLVED';

                return (
                  <tr
                    key={m.id}
                    onClick={() => setSelectedMission(m)}
                    className="hover:bg-[#111923] cursor-pointer transition-colors"
                  >
                    {/* Challenge title */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#F4F5F7]">{m.title}</div>
                      <div className="text-[10px] text-[#8994A4] mt-0.5">#{m.number} • {m.points} PTS</div>
                    </td>

                    {/* Sector */}
                    <td className="py-3 px-4 text-[#8994A4]">
                      {sec?.sectorShort || sec?.sector || 'General'}
                    </td>

                    {/* Difficulty */}
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${
                        m.difficulty === 'EASY' ? 'text-[#4DBB91]' :
                        m.difficulty === 'MEDIUM' ? 'text-[#D6AA55]' :
                        'text-[#D96C6C]'
                      }`}>
                        {m.difficulty}
                      </span>
                    </td>

                    {/* Solved */}
                    <td className="py-3 px-4 text-[#F4F5F7]">
                      {m.solvedCount || 0} / 24
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                        isLocked
                          ? 'bg-[#D96C6C]/10 text-[#D96C6C] border border-[#D96C6C]/30'
                          : isSolved
                          ? 'bg-[#4DBB91]/10 text-[#4DBB91] border border-[#4DBB91]/30'
                          : 'bg-[#4DBB91]/10 text-[#4DBB91] border border-[#4DBB91]/30'
                      }`}>
                        {isLocked ? (
                          <>
                            <Lock className="w-2.5 h-2.5" />
                            <span>LOCKED</span>
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4DBB91]" />
                            <span>ACTIVE</span>
                          </>
                        )}
                      </span>
                    </td>

                    {/* Open drawer chevron */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMission(m);
                        }}
                        className="text-[#8994A4] hover:text-[#C8A96B] p-1 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredMissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8994A4]">
                    No challenges matching selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Drawer */}
      {selectedMission && (
        <ChallengeDrawer
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          onUpdated={() => {
            // Keep current modal refreshed
            const updated = missions.find(m => m.id === selectedMission.id);
            if (updated) setSelectedMission(updated);
          }}
        />
      )}
    </div>
  );
};

export default ChallengeTable;
