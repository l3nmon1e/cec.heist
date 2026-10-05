import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  ShieldAlert, 
  Clock, 
  Search, 
  Terminal, 
  AlertTriangle,
  RotateCcw,
  Radio
} from 'lucide-react';

export const AdminLiveLogs = () => {
  const { submissions, activities, clearSubmissions, crewName } = useGame();
  const [filterType, setFilterType] = useState('ALL'); // ALL, VALID, INVALID
  const [searchTerm, setSearchTerm] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filtered submissions
  const filteredSubmissions = submissions.filter(s => {
    const matchesType = 
      filterType === 'ALL' ||
      (filterType === 'VALID' && s.status === 'VALID') ||
      (filterType === 'INVALID' && s.status === 'INVALID');

    const matchesSearch = 
      s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.timestamp?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.missionId?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  const validCount = submissions.filter(s => s.status === 'VALID').length;
  const invalidCount = submissions.filter(s => s.status === 'INVALID').length;
  const totalSubmissions = submissions.length;
  const failureRate = totalSubmissions > 0 ? Math.round((invalidCount / totalSubmissions) * 100) : 0;

  // Brute-force detection heuristic: more than 5 invalid attempts in the last 15 attempts
  const recentSubmissions = submissions.slice(0, 15);
  const recentFails = recentSubmissions.filter(s => s.status === 'INVALID').length;
  const isHighSuspicion = recentFails >= 5;

  return (
    <div className="space-y-6">
      {/* Real-time Status & Anti-Cheat Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0b101b] border border-cyan-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Total Submissions</p>
            <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">{totalSubmissions}</p>
          </div>
          <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b101b] border border-emerald-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Valid Flag Solves</p>
            <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{validCount}</p>
          </div>
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b101b] border border-rose-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Rejected Attempts</p>
            <p className="text-2xl font-bold font-mono text-rose-400 mt-1">{invalidCount}</p>
          </div>
          <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded text-rose-400">
            <XCircle className="w-5 h-5" />
          </div>
        </div>

        <div className={`p-4 rounded-lg border flex items-center justify-between transition-colors ${
          isHighSuspicion 
            ? 'bg-rose-950/30 border-rose-500/50 text-rose-400 animate-pulse' 
            : 'bg-[#0b101b] border-white/10 text-gray-400'
        }`}>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest">Anti-Cheat Threat Level</p>
            <p className="text-sm font-bold font-mono mt-1 flex items-center gap-1.5">
              {isHighSuspicion ? (
                <>
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-400">BRUTE FORCE DETECTED</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-emerald-400">NORMAL / SECURE</span>
                </>
              )}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-gray-400">Fail Rate: </span>
            <span className={`text-sm font-bold font-mono ${failureRate > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {failureRate}%
            </span>
          </div>
        </div>
      </div>

      {/* Brute-force Warning Alert if High Suspicion */}
      {isHighSuspicion && (
        <div className="bg-rose-500/10 border border-rose-500/40 p-4 rounded-lg flex items-start gap-3 text-xs font-mono text-rose-300">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-rose-400 uppercase tracking-wide">
              Automated Anti-Cheat Trigger: Rapid Ingestion Anomaly
            </h4>
            <p className="mt-1 text-gray-300">
              Multiple rejected flags ({recentFails} failures) recorded in rapid succession. Automated flag spraying script or dictionary attack suspected from client node.
            </p>
          </div>
        </div>
      )}

      {/* Filter and Action Controls */}
      <div className="bg-[#0b101b] border border-white/10 p-4 rounded-lg flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#05070e] border border-white/15 focus:border-cyan-500/50 rounded pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#05070e] p-1 border border-white/10 rounded">
            {['ALL', 'VALID', 'INVALID'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-[11px] font-mono rounded transition-colors ${
                  filterType === type 
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
            <span>LIVE INGESTION ACTIVE</span>
          </div>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 rounded text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Purge Submission Stream
          </button>
        </div>
      </div>

      {/* Main Submissions Table */}
      <div className="bg-[#0b101b] border border-white/10 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            Flag Ingestion Telemetry ({filteredSubmissions.length} events)
          </h3>
          <span className="text-[10px] font-mono text-gray-500">Auto-logging all verified & rejected attempts</span>
        </div>

        <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#080d16] border-b border-white/10 text-[10px] font-mono text-gray-400 uppercase tracking-widest z-10">
              <tr>
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">Operator / Crew</th>
                <th className="py-2.5 px-4">Target Challenge</th>
                <th className="py-2.5 px-4">Payload Verification</th>
                <th className="py-2.5 px-4">Points Delta</th>
                <th className="py-2.5 px-4 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {filteredSubmissions.map(sub => {
                const isValid = sub.status === 'VALID';
                return (
                  <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-4 text-gray-400 text-[11px] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      {sub.timestamp || '00:00:00'}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-white">
                      {crewName || 'SPECTRE-9'}
                    </td>
                    <td className="py-2.5 px-4 text-gray-300">
                      <span className="text-cyan-400 mr-1.5">[{sub.missionId || 'N/A'}]</span>
                      {sub.title || 'Unknown Objective'}
                    </td>
                    <td className="py-2.5 px-4">
                      {isValid ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle className="w-3 h-3" />
                          VERIFIED AUTHENTIC
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          <XCircle className="w-3 h-3" />
                          HASH MISMATCH / REJECTED
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={isValid ? "text-amber-400 font-bold" : "text-gray-500"}>
                        {isValid ? `+${sub.points || 0} PTS` : '0 PTS'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="text-[10px] text-gray-500 uppercase">
                        LOG_OK #{sub.id.toString().slice(-6)}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 font-mono text-xs">
                    No submission logs found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Telemetry Stream (Activities Feed) */}
      <div className="bg-[#0b101b] border border-white/10 rounded-lg p-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Live Event Bus Stream (Latest Global Signals)
        </h4>
        <div className="space-y-1.5 font-mono text-xs max-h-48 overflow-y-auto pr-2">
          {activities.slice(0, 10).map((act, index) => (
            <div key={act.id || index} className="flex items-center justify-between py-1.5 px-3 rounded bg-white/[0.02] border border-white/5 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{act.timestamp || 'LIVE'}</span>
                <span className="text-cyan-300 font-bold">[{act.team}]</span>
                <span className="text-gray-300">{act.event}: {act.mission || act.details || ''}</span>
              </div>
              {act.points && (
                <span className="text-amber-400 font-bold">+{act.points} PTS</span>
              )}
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-gray-500 text-xs py-2">No activity events dispatched yet.</p>
          )}
        </div>
      </div>

      {/* Confirmation Modal to Clear Logs */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b101b] border border-rose-500/50 rounded-lg max-w-sm w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400 mb-3">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-bold font-mono text-sm uppercase">Purge Ingestion Logs?</h3>
            </div>
            <p className="text-xs font-mono text-gray-300 mb-5 leading-relaxed">
              This will permanently delete the current flag submission stream and telemetry audit logs for this CTF session.
            </p>
            <div className="flex justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearSubmissions();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Purge All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
