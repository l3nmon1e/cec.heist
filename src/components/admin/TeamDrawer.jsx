import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { getTeamCurrentSector } from './adminHelpers';
import { 
  X, 
  Trophy, 
  Activity, 
  UserX, 
  UserCheck, 
  Plus, 
  Minus,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const TeamDrawer = ({ team, onClose, onUpdated }) => {
  const { 
    adjustTeamScore, 
    toggleDisqualifyTeam, 
    missions, 
    submissions 
  } = useGame();

  const [deltaInput, setDeltaInput] = useState(50);

  if (!team) return null;

  const currentSector = getTeamCurrentSector(team);
  const isDisqualified = !!team.isDisqualified;

  // Filter submissions related to this team if available
  const teamSubmissions = submissions.slice(0, 5);

  const handleAdjust = (delta) => {
    adjustTeamScore(team.id || team.team, delta);
    onUpdated?.();
  };

  const handleToggleDisqualify = () => {
    toggleDisqualifyTeam(team.id || team.team);
    onUpdated?.();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-lg bg-[#0D131D] border-l border-[#202B38] h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto font-mono text-xs">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[#202B38]">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#8994A4]">
                CREW DOSSIER • #{team.rank || 1}
              </div>
              <h2 className="text-base font-bold text-[#F4F5F7] mt-1 flex items-center gap-2">
                <span>{team.team}</span>
                {team.isCurrentPlayer && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/30">
                    HOST
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-[#8994A4] mt-0.5">
                {team.affiliation || "Independent Crew"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#8994A4] hover:text-[#F4F5F7] p-1 rounded hover:bg-[#111923]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
              <span className="text-[10px] text-[#8994A4] block">STATUS</span>
              <span className={`font-semibold text-xs mt-0.5 block ${
                isDisqualified ? 'text-[#D96C6C]' : 'text-[#4DBB91]'
              }`}>
                {isDisqualified ? 'SANCTIONED' : 'ACTIVE'}
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
              <span className="text-[10px] text-[#8994A4] block">SCORE</span>
              <span className="font-bold text-[#C8A96B] text-xs mt-0.5 block">
                {team.score || 0} PTS
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
              <span className="text-[10px] text-[#8994A4] block">CURRENT SECTOR</span>
              <span className="font-semibold text-[#F4F5F7] text-xs mt-0.5 block truncate">
                {currentSector}
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
              <span className="text-[10px] text-[#8994A4] block">PROGRESS</span>
              <span className="font-semibold text-[#F4F5F7] text-xs mt-0.5 block">
                {team.solved || 0} / 20
              </span>
            </div>
          </div>

          {/* Last Activity */}
          <div className="p-3 rounded bg-[#111923] border border-[#202B38] flex items-center justify-between text-xs">
            <span className="text-[#8994A4]">LAST OBSERVED ACTIVITY:</span>
            <span className="font-semibold text-[#F4F5F7]">
              {team.lastActivity || '2m ago'}
            </span>
          </div>

          {/* Score Adjustment Controls */}
          <div className="p-3.5 rounded bg-[#111923] border border-[#202B38] space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-[#8994A4] block">
              MANUAL SCORE ADJUSTMENT
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleAdjust(50)}
                className="px-3 py-1.5 rounded bg-[#4DBB91]/15 border border-[#4DBB91]/40 hover:bg-[#4DBB91]/25 text-[#4DBB91] font-bold text-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> 50 PTS
              </button>
              <button
                onClick={() => handleAdjust(100)}
                className="px-3 py-1.5 rounded bg-[#4DBB91]/15 border border-[#4DBB91]/40 hover:bg-[#4DBB91]/25 text-[#4DBB91] font-bold text-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> 100 PTS
              </button>
              <button
                onClick={() => handleAdjust(-50)}
                className="px-3 py-1.5 rounded bg-[#D96C6C]/15 border border-[#D96C6C]/40 hover:bg-[#D96C6C]/25 text-[#D96C6C] font-bold text-xs transition-colors flex items-center gap-1"
              >
                <Minus className="w-3.5 h-3.5" /> 50 PTS
              </button>
              <button
                onClick={() => handleAdjust(-100)}
                className="px-3 py-1.5 rounded bg-[#D96C6C]/15 border border-[#D96C6C]/40 hover:bg-[#D96C6C]/25 text-[#D96C6C] font-bold text-xs transition-colors flex items-center gap-1"
              >
                <Minus className="w-3.5 h-3.5" /> 100 PTS
              </button>
            </div>
          </div>

          {/* Moderation Actions */}
          <div className="p-3.5 rounded bg-[#111923] border border-[#202B38] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#F4F5F7] text-xs">Tournament Eligibility</div>
              <div className="text-[10px] text-[#8994A4] mt-0.5">
                {isDisqualified ? 'Crew is currently disqualified from standings' : 'Crew is in good standing'}
              </div>
            </div>

            <button
              onClick={handleToggleDisqualify}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1.5 ${
                isDisqualified
                  ? 'bg-[#4DBB91]/15 border border-[#4DBB91]/40 text-[#4DBB91] hover:bg-[#4DBB91]/25'
                  : 'bg-[#D96C6C]/15 border border-[#D96C6C]/40 text-[#D96C6C] hover:bg-[#D96C6C]/25'
              }`}
            >
              {isDisqualified ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>REINSTATE</span>
                </>
              ) : (
                <>
                  <UserX className="w-3.5 h-3.5" />
                  <span>DISQUALIFY</span>
                </>
              )}
            </button>
          </div>

          {/* Recent Submissions */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-[#8994A4]">
              RECENT SUBMISSIONS & EVENT LOGS
            </div>
            {teamSubmissions.length > 0 ? (
              <div className="divide-y divide-[#202B38] bg-[#111923] rounded border border-[#202B38] p-2">
                {teamSubmissions.map((s, idx) => (
                  <div key={s.id || idx} className="py-2 px-2 flex items-center justify-between text-[11px]">
                    <div>
                      <div className="text-[#F4F5F7] font-semibold">{s.title || 'Mission'}</div>
                      <div className="text-[#8994A4] text-[10px]">{s.timestamp || '2m ago'}</div>
                    </div>
                    <span className={s.status === 'VALID' ? 'text-[#4DBB91] font-bold' : 'text-[#D96C6C]'}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#8994A4] italic bg-[#111923] p-3 rounded border border-[#202B38]">
                No recent submission history.
              </p>
            )}
          </div>
        </div>

        {/* Footer close */}
        <div className="pt-4 border-t border-[#202B38] mt-4">
          <button
            onClick={onClose}
            className="w-full py-2 rounded bg-[#111923] border border-[#202B38] text-[#8994A4] hover:text-[#F4F5F7] font-semibold transition-colors"
          >
            CLOSE DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamDrawer;
