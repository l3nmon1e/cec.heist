import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { TeamDrawer } from './TeamDrawer';
import { ChallengeDrawer } from './ChallengeDrawer';
import { 
  ShieldAlert, 
  AlertTriangle, 
  UserX, 
  UserCheck, 
  Trash2, 
  CheckCircle,
  Eye,
  Radio
} from 'lucide-react';

export const AdminModeration = () => {
  const { 
    submissions, 
    leaderboard, 
    clearSubmissions, 
    toggleDisqualifyTeam,
    missions
  } = useGame();

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);

  // Group invalid submissions by mission or team to detect suspicious activity
  const invalidSubs = submissions.filter(s => s.status === 'INVALID');
  const flaggedTeams = leaderboard.filter(t => t.isDisqualified);
  const disconnectedTeams = leaderboard.filter(t => !t.isDisqualified && t.lastActivity?.includes('h'));

  // Suspicious cases: repeated invalid submissions
  const suspiciousCases = invalidSubs.slice(0, 6).map((sub, idx) => ({
    id: sub.id || idx,
    team: 'CREW-04',
    challengeTitle: sub.title || 'Packet Intercept',
    missionId: sub.missionId,
    reason: 'Repeated invalid flag hashes in rapid sequence',
    time: sub.timestamp || '2m ago'
  }));

  // Fallback realistic suspicious case if none recorded yet
  if (suspiciousCases.length === 0) {
    suspiciousCases.push({
      id: 'mock-1',
      team: 'CREW-04',
      challengeTitle: 'Packet Intercept',
      missionId: 'mission-07',
      reason: 'Repeated invalid submissions (6 failed hashes)',
      time: '22:40:33'
    });
  }

  const handleReviewTeam = (teamName) => {
    const t = leaderboard.find(item => item.team === teamName) || leaderboard[0];
    setSelectedTeam(t);
  };

  const handleReviewMission = (missionId) => {
    const m = missions.find(item => item.id === missionId) || missions[0];
    setSelectedMission(m);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Moderation Overview Header */}
      <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#F4F5F7] flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#C8A96B]" />
            Competition Moderation & Sanctions
          </h2>
          <p className="text-xs text-[#8994A4] mt-0.5">
            Operational review queue for anti-cheat anomalies, suspicious attempts, and crew sanctions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearSubmissions}
            className="px-3 py-1.5 rounded bg-[#111923] border border-[#202B38] hover:border-[#D96C6C] text-[#D96C6C] text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Clear verified & invalid submission telemetry"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>PURGE LOG STREAM</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suspicious Submissions */}
        <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D6AA55] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D6AA55]" />
              Suspicious Submissions ({suspiciousCases.length})
            </h3>
            <span className="text-[10px] text-[#8994A4]">FLAG FILTER</span>
          </div>

          <div className="space-y-3">
            {suspiciousCases.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded bg-[#111923] border border-[#202B38] flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#F4F5F7]">{item.team}</span>
                    <span className="text-[#8994A4] text-[10px]">• {item.time}</span>
                  </div>
                  <div className="text-[#C8A96B] font-semibold mt-1">
                    Challenge: {item.challengeTitle}
                  </div>
                  <div className="text-[11px] text-[#8994A4] mt-0.5">
                    Reason: {item.reason}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleReviewTeam(item.team)}
                    className="px-2.5 py-1 rounded bg-[#202B38] hover:bg-[#2e3e50] text-[#C8A96B] font-bold text-[10px] transition-colors"
                  >
                    [ REVIEW ]
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged & Sanctioned Teams */}
        <div className="space-y-6">
          {/* Flagged Teams */}
          <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D96C6C] flex items-center gap-2">
                <UserX className="w-4 h-4 text-[#D96C6C]" />
                Sanctioned / Disqualified Crews ({flaggedTeams.length})
              </h3>
            </div>

            {flaggedTeams.length > 0 ? (
              <div className="space-y-2">
                {flaggedTeams.map(team => (
                  <div
                    key={team.team}
                    className="p-3 rounded bg-[#111923] border border-[#D96C6C]/30 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-[#F4F5F7]">{team.team}</div>
                      <div className="text-[10px] text-[#8994A4] mt-0.5">{team.affiliation}</div>
                    </div>
                    <button
                      onClick={() => toggleDisqualifyTeam(team.id || team.team)}
                      className="px-2.5 py-1 rounded bg-[#4DBB91]/15 border border-[#4DBB91]/40 text-[#4DBB91] hover:bg-[#4DBB91]/25 text-[10px] font-bold"
                    >
                      REINSTATE
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded bg-[#111923] border border-[#202B38] text-[#8994A4] flex items-center gap-2 text-xs">
                <CheckCircle className="w-4 h-4 text-[#4DBB91]" />
                <span>No crews currently disqualified or sanctioned.</span>
              </div>
            )}
          </div>

          {/* Disconnected Teams */}
          <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8994A4]">
                Inactive / Disconnected Teams ({disconnectedTeams.length})
              </h3>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {disconnectedTeams.map(t => (
                <div
                  key={t.team}
                  className="p-2.5 rounded bg-[#111923] border border-[#202B38] flex items-center justify-between text-[11px]"
                >
                  <span className="font-semibold text-[#F4F5F7]">{t.team}</span>
                  <span className="text-[#8994A4]">Last seen {t.lastActivity}</span>
                </div>
              ))}
              {disconnectedTeams.length === 0 && (
                <p className="text-xs text-[#8994A4]">All registered crews have logged recent activity.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drawers */}
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

      {selectedMission && (
        <ChallengeDrawer
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </div>
  );
};

export default AdminModeration;
