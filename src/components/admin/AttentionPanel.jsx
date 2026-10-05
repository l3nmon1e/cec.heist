import React from 'react';
import { useGame } from '../../context/GameContext';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

export const AttentionPanel = ({ onNavigateToModeration, onNavigateToTeams }) => {
  const { submissions, leaderboard, isGamePaused } = useGame();

  // Find suspicious submissions (failed attempts in current session)
  const failedSubs = submissions.filter(s => s.status === 'INVALID');
  const hasSuspiciousActivity = failedSubs.length >= 3;

  // Find disconnected / flagged teams
  const disconnectedTeams = leaderboard.filter(t => t.isDisqualified || t.lastActivity?.includes('h'));

  const items = [];

  if (isGamePaused) {
    items.push({
      id: 'paused',
      type: 'warning',
      text: 'Contest timer is currently PAUSED',
      actionLabel: 'VIEW STATUS',
      onClick: () => {}
    });
  }

  if (hasSuspiciousActivity) {
    items.push({
      id: 'suspicious',
      type: 'warning',
      text: `${failedSubs.length} suspicious submissions flagged`,
      actionLabel: 'REVIEW',
      onClick: onNavigateToModeration
    });
  }

  if (disconnectedTeams.length > 0) {
    items.push({
      id: 'teams',
      type: 'neutral',
      text: `${disconnectedTeams.length} crew${disconnectedTeams.length > 1 ? 's' : ''} inactive or sanctioned`,
      actionLabel: 'VIEW',
      onClick: onNavigateToTeams
    });
  }

  return (
    <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#8994A4]">
          Attention Required
        </span>
        {items.length === 0 && (
          <span className="text-[10px] font-mono font-semibold text-[#4DBB91] flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            ALL SYSTEMS NORMAL
          </span>
        )}
      </div>

      {items.length > 0 ? (
        <div className="mt-3 space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded bg-[#111923] border border-[#202B38] text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className={`w-3.5 h-3.5 shrink-0 ${
                  item.type === 'warning' ? 'text-[#D6AA55]' : 'text-[#8994A4]'
                }`} />
                <span className="text-[#F4F5F7]">{item.text}</span>
              </div>
              {item.actionLabel && (
                <button
                  onClick={item.onClick}
                  className="px-2 py-0.5 rounded bg-[#202B38] hover:bg-[#2c3a4b] text-[#C8A96B] hover:text-[#d8bb7d] text-[10px] font-bold transition-colors flex items-center gap-1"
                >
                  <span>[ {item.actionLabel} ]</span>
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-2.5 py-1 text-xs font-mono text-[#8994A4] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4DBB91]" />
          <span>No security anomalies or network incidents detected. All services operating normally.</span>
        </div>
      )}
    </div>
  );
};

export default AttentionPanel;
