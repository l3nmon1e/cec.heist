import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Users, 
  Trophy, 
  Plus, 
  Minus, 
  Download, 
  UserX, 
  UserCheck, 
  Search, 
  CheckCircle, 
  AlertCircle,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  X
} from 'lucide-react';

export const AdminTeams = () => {
  const { leaderboard, adjustTeamScore, toggleDisqualifyTeam, crewName, submissions } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [customScoreModal, setCustomScoreModal] = useState(null);
  const [customDelta, setCustomDelta] = useState(100);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredTeams = leaderboard.filter(t => 
    t.team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.rank?.toString().includes(searchTerm)
  );

  const handleExportCSV = () => {
    const headers = ["Rank", "Team Name", "Score (PTS)", "Missions Solved", "Status", "Escaped"];
    const rows = leaderboard.map(t => [
      t.rank,
      `"${t.team}"`,
      t.score,
      t.solved,
      t.isDisqualified ? "DISQUALIFIED" : "ACTIVE",
      t.escaped ? "YES" : "NO"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CEC_HEIST_LEADERBOARD_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("Scoreboard CSV exported successfully.");
  };

  const handleExportJSON = () => {
    const dump = {
      timestamp: new Date().toISOString(),
      teams: leaderboard,
      submissions: submissions
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dump, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `CEC_HEIST_AUDIT_DUMP_${Date.now()}.json`);
    dlAnchorElem.click();
    dlAnchorElem.remove();
    showNotification("Tournament state JSON archive downloaded.");
  };

  const handleCustomScoreSubmit = (e) => {
    e.preventDefault();
    if (!customScoreModal) return;
    const delta = Number(customDelta);
    adjustTeamScore(customScoreModal.id || customScoreModal.team, delta);
    showNotification(`Adjusted ${customScoreModal.team} score by ${delta > 0 ? `+${delta}` : delta} PTS`);
    setCustomScoreModal(null);
  };

  const activeTeamsCount = leaderboard.filter(t => !t.isDisqualified).length;
  const disqualifiedCount = leaderboard.filter(t => t.isDisqualified).length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Notification */}
      {notification && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0b101b] border border-cyan-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Enrolled Crews</p>
            <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">{leaderboard.length}</p>
          </div>
          <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b101b] border border-emerald-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Active Standing</p>
            <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{activeTeamsCount}</p>
          </div>
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-400">
            <Trophy className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b101b] border border-rose-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Disqualified</p>
            <p className="text-2xl font-bold font-mono text-rose-400 mt-1">{disqualifiedCount}</p>
          </div>
          <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded text-rose-400">
            <UserX className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b101b] border border-amber-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Leading Score</p>
            <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{leaderboard[0]?.score || 0} PTS</p>
          </div>
          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Action / Search / Export Bar */}
      <div className="bg-[#0b101b] border border-white/10 p-4 rounded-lg flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams by name or rank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#05070e] border border-white/15 focus:border-cyan-500/50 rounded pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-400 rounded text-xs font-mono flex items-center gap-2 transition-colors font-bold"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export Scoreboard (CSV)
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 bg-purple-500/15 border border-purple-500/30 hover:bg-purple-500/25 text-purple-300 rounded text-xs font-mono flex items-center gap-2 transition-colors font-bold"
          >
            <FileCode className="w-4 h-4" />
            Full State JSON
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#0b101b] border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Crew Identity</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Solves</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Quick Adjust Points</th>
                <th className="py-3 px-4 text-right">Sanctions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {filteredTeams.map((t, index) => {
                const isDisq = !!t.isDisqualified;
                const isCurrent = t.isCurrentPlayer;

                return (
                  <tr 
                    key={t.id || index} 
                    className={`transition-colors ${
                      isDisq ? 'bg-rose-950/10 opacity-60' : 
                      isCurrent ? 'bg-cyan-950/20 hover:bg-cyan-950/30' : 
                      'hover:bg-white/[0.02]'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs ${
                        t.rank === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                        t.rank === 2 ? 'bg-gray-400/20 text-gray-300 border border-gray-400/40' :
                        t.rank === 3 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/40' :
                        'text-gray-500'
                      }`}>
                        #{t.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{t.team}</span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            HOST NODE (YOU)
                          </span>
                        )}
                        {t.escaped && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            ESCAPED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-amber-400 font-bold text-sm">
                        {t.score} <span className="text-[10px] text-gray-500">PTS</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-cyan-300">
                      {t.solved} <span className="text-[10px] text-gray-500">solved</span>
                    </td>
                    <td className="py-3 px-4">
                      {isDisq ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          <AlertCircle className="w-3 h-3" />
                          DISQUALIFIED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle className="w-3 h-3" />
                          ACTIVE
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => adjustTeamScore(t.id || t.team, 50)}
                          className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold transition-colors"
                          title="Award +50 Bonus Points"
                        >
                          +50
                        </button>
                        <button
                          onClick={() => adjustTeamScore(t.id || t.team, 100)}
                          className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold transition-colors"
                          title="Award +100 Bonus Points"
                        >
                          +100
                        </button>
                        <button
                          onClick={() => adjustTeamScore(t.id || t.team, -50)}
                          className="px-2 py-1 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 rounded text-[10px] font-bold transition-colors"
                          title="Apply -50 Penalty"
                        >
                          -50
                        </button>
                        <button
                          onClick={() => setCustomScoreModal(t)}
                          className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 rounded text-[10px] font-bold transition-colors"
                          title="Custom Delta"
                        >
                          Custom...
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          toggleDisqualifyTeam(t.id || t.team);
                          showNotification(`${t.team} ${isDisq ? 'reinstated to active tournament' : 'disqualified from tournament'}.`);
                        }}
                        className={`px-3 py-1 rounded text-[11px] font-mono font-bold flex items-center gap-1.5 ml-auto transition-colors ${
                          isDisq 
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30' 
                            : 'bg-rose-500/20 border border-rose-500/40 text-rose-400 hover:bg-rose-500/30'
                        }`}
                      >
                        {isDisq ? (
                          <>
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Reinstate</span>
                          </>
                        ) : (
                          <>
                            <UserX className="w-3.5 h-3.5" />
                            <span>Disqualify</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredTeams.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 font-mono text-xs">
                    No teams matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Score Adjustment Modal */}
      {customScoreModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b101b] border border-cyan-500/40 rounded-lg max-w-sm w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="font-bold font-mono text-sm text-white">Manual Score Delta</h3>
              <button 
                onClick={() => setCustomScoreModal(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCustomScoreSubmit} className="space-y-4 font-mono text-xs">
              <p className="text-gray-300">
                Adjust points for <span className="font-bold text-cyan-400">{customScoreModal.team}</span> (Current: {customScoreModal.score} PTS):
              </p>

              <div>
                <label className="block text-gray-400 mb-1 text-[11px] uppercase tracking-wider">
                  Delta (positive to add, negative to deduct)
                </label>
                <input
                  type="number"
                  step="5"
                  required
                  value={customDelta}
                  onChange={(e) => setCustomDelta(e.target.value)}
                  className="w-full bg-[#05070e] border border-cyan-500/30 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  placeholder="+100 or -50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCustomScoreModal(null)}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded text-gray-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-500 text-black font-bold rounded hover:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                >
                  Apply Delta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
