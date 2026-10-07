import React from 'react';
import { useGame } from '../../context/GameContext';
import { AlertCircle, ChevronRight } from 'lucide-react';

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

  // If nothing requires attention, keep overview minimal and don't render clutter
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between px-3.5 py-2 rounded bg-[#161F2E] border border-[#D6AA55]/40 text-xs font-mono shadow-xs"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#D6AA55]" />
            <span className="text-[#F4F5F7] font-medium">{item.text}</span>
          </div>
          {item.actionLabel && (
            <button
              onClick={item.onClick}
              className="px-2 py-0.5 rounded bg-[#202B38] hover:bg-[#2c3a4b] text-[#C8A96B] hover:text-[#d8bb7d] text-[10px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{item.actionLabel}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AttentionPanel;
