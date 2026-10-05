import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { getTeamCurrentSector } from './adminHelpers';
import { TeamDrawer } from './TeamDrawer';
import { Search, ChevronRight, FileSpreadsheet, ArrowUpDown } from 'lucide-react';

export const TeamTable = () => {
  const { leaderboard } = useGame();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | ACTIVE | DISCONNECTED | FLAGGED
  const [sortBy, setSortBy] = useState('SCORE'); // SCORE | PROGRESS | ACTIVITY
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Filter and sort teams
  const filteredTeams = leaderboard.filter(t => {
    const isDisq = !!t.isDisqualified;
    const isDisconnected = t.lastActivity?.includes('h'); // heuristic

    const matchesSearch = 
      t.team.toLowerCase().includes(search.toLowerCase()) ||
      (t.affiliation && t.affiliation.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = 
      statusFilter === 'ALL' ||
      (statusFilter === 'ACTIVE' && !isDisq && !isDisconnected) ||
      (statusFilter === 'DISCONNECTED' && isDisconnected) ||
      (statusFilter === 'FLAGGED' && isDisq);

    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'SCORE') return (b.score || 0) - (a.score || 0);
    if (sortBy === 'PROGRESS') return (b.solved || 0) - (a.solved || 0);
    if (sortBy === 'ACTIVITY') return (a.lastActivity || '').localeCompare(b.lastActivity || '');
    return 0;
  });

  const handleExportCSV = () => {
    const headers = ["Rank", "Team", "Current Sector", "Solved", "Score", "Status", "Last Activity"];
    const rows = leaderboard.map(t => [
      t.rank || 1,
      `"${t.team}"`,
      `"${getTeamCurrentSector(t)}"`,
      t.solved || 0,
      t.score || 0,
      t.isDisqualified ? "FLAGGED" : "ACTIVE",
      `"${t.lastActivity || '2m ago'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CEC_HEIST_TEAMS_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Controls Bar: Search, Filters & Export */}
      <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-4 flex flex-col md:flex-row gap-3 justify-between items-center shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8994A4]" />
          <input
            type="text"
            placeholder="Search teams by name or affiliation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111923] border border-[#202B38] focus:border-[#C8A96B] rounded pl-8 pr-3 py-1.5 text-xs text-[#F4F5F7] placeholder-[#8994A4] focus:outline-none transition-colors"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111923] border border-[#202B38] text-[#8994A4] focus:text-[#F4F5F7] rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#C8A96B]"
          >
            <option value="ALL">All Crews</option>
            <option value="ACTIVE">Active</option>
            <option value="DISCONNECTED">Disconnected</option>
            <option value="FLAGGED">Flagged / Sanctioned</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#111923] border border-[#202B38] text-[#8994A4] focus:text-[#F4F5F7] rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#C8A96B]"
          >
            <option value="SCORE">Sort: Highest Score</option>
            <option value="PROGRESS">Sort: Most Solved</option>
            <option value="ACTIVITY">Sort: Last Activity</option>
          </select>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded bg-[#111923] border border-[#202B38] hover:border-[#C8A96B] text-[#C8A96B] font-semibold text-xs transition-colors flex items-center gap-1.5"
            title="Download Teams CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Clean Teams Table */}
      <div className="bg-[#0D131D] border border-[#202B38] rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#202B38] bg-[#111923]/50 text-[10px] text-[#8994A4] uppercase tracking-wider">
                <th className="py-3 px-4">Team</th>
                <th className="py-3 px-4">Current Sector</th>
                <th className="py-3 px-4">Progress</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202B38]/60 text-xs">
              {filteredTeams.map((team, idx) => {
                const currentSector = getTeamCurrentSector(team);
                const isDisq = !!team.isDisqualified;
                const isDisconnected = team.lastActivity?.includes('h');

                return (
                  <tr
                    key={team.id || team.team || idx}
                    onClick={() => setSelectedTeam(team)}
                    className="hover:bg-[#111923] cursor-pointer transition-colors"
                  >
                    {/* Team Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#F4F5F7]">{team.team}</span>
                        {team.isCurrentPlayer && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#8994A4] mt-0.5 truncate max-w-[200px]">
                        {team.affiliation || 'Independent'}
                      </div>
                    </td>

                    {/* Current Sector */}
                    <td className="py-3 px-4 text-[#8994A4]">
                      {currentSector}
                    </td>

                    {/* Progress */}
                    <td className="py-3 px-4 text-[#F4F5F7]">
                      {team.solved || 0} / 20
                    </td>

                    {/* Score */}
                    <td className="py-3 px-4 font-bold text-[#C8A96B]">
                      {team.score || 0} PTS
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      {isDisq ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#D96C6C]/10 text-[#D96C6C] border border-[#D96C6C]/30">
                          SANCTIONED
                        </span>
                      ) : isDisconnected ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#8994A4]/10 text-[#8994A4] border border-[#8994A4]/30">
                          DISCONNECTED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#4DBB91]/10 text-[#4DBB91] border border-[#4DBB91]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4DBB91]" />
                          ACTIVE
                        </span>
                      )}
                    </td>

                    {/* Last Activity */}
                    <td className="py-3 px-4 text-[#8994A4] text-[11px]">
                      {team.lastActivity || '2m ago'}
                    </td>

                    {/* Chevron */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTeam(team);
                        }}
                        className="text-[#8994A4] hover:text-[#C8A96B] p-1 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredTeams.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#8994A4]">
                    No teams match search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Drawer */}
      {selectedTeam && (
        <TeamDrawer
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onUpdated={() => {
            const updated = leaderboard.find(t => (t.id || t.team) === (selectedTeam.id || selectedTeam.team));
            if (updated) setSelectedTeam(updated);
          }}
        />
      )}
    </div>
  );
};

export default TeamTable;
