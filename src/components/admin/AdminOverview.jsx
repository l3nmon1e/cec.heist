import React from 'react';
import { useGame } from '../../context/GameContext';
import { StatCard } from './StatCard';
import { FacilityProgress } from './FacilityProgress';
import { LiveActivity } from './LiveActivity';
import { AttentionPanel } from './AttentionPanel';
import { BroadcastComposer } from './BroadcastComposer';
import { DangerZone } from './DangerZone';
import { formatTimer } from '../../utils/formatters';
import { 
  Play, 
  Pause, 
  Users, 
  Clock, 
  CheckCircle2
} from 'lucide-react';

export const AdminOverview = ({ 
  onNavigateToTab, 
  onSelectSectorFilter 
}) => {
  const { 
    secondsRemaining, 
    isGamePaused, 
    setIsGamePaused, 
    leaderboard, 
    missions,
    overrideTimer
  } = useGame();

  const activeCrewsCount = leaderboard.filter(t => !t.isDisqualified).length;
  // Calculate total verified solves across all teams / missions
  const totalCompletedSolves = missions.reduce((sum, m) => sum + (m.solvedCount || 0), 0);

  return (
    <div className="space-y-5">
      {/* 1. Essential Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Contest Status */}
        <StatCard
          label="Contest Status"
          value={isGamePaused ? "PAUSED" : "RUNNING"}
          statusColor={isGamePaused ? "text-[#D6AA55]" : "text-[#4DBB91]"}
          action={
            <button
              onClick={() => setIsGamePaused(!isGamePaused)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                isGamePaused
                  ? 'bg-[#4DBB91] text-[#070B12] hover:bg-[#5ec49d]'
                  : 'bg-[#111923] border border-[#202B38] text-[#D6AA55] hover:border-[#D6AA55]'
              }`}
            >
              {isGamePaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3" />}
              <span>{isGamePaused ? "RESUME" : "PAUSE"}</span>
            </button>
          }
        />

        {/* Card 2: Time Remaining */}
        <StatCard
          label="Time Remaining"
          value={formatTimer(secondsRemaining)}
          statusColor="text-[#F4F5F7]"
          icon={Clock}
          action={
            <button
              onClick={() => overrideTimer(secondsRemaining + 900)}
              className="px-2 py-0.5 rounded bg-[#111923] border border-[#202B38] hover:border-[#C8A96B] text-[#8994A4] hover:text-[#C8A96B] text-[11px] font-mono font-bold cursor-pointer transition-colors"
              title="Add 15 minutes"
            >
              +15M
            </button>
          }
        />

        {/* Card 3: Active Crews */}
        <StatCard
          label="Active Crews"
          value={`${activeCrewsCount} / ${leaderboard.length}`}
          statusColor="text-[#C8A96B]"
          icon={Users}
        />

        {/* Card 4: Total Solves */}
        <StatCard
          label="Total Solves"
          value={totalCompletedSolves}
          statusColor="text-[#4DBB91]"
          icon={CheckCircle2}
        />
      </div>

      {/* 2. Streamlined Sector Pipeline (Minimal Horizontal Track) */}
      <FacilityProgress 
        onSelectSectorFilter={(secName) => {
          onSelectSectorFilter?.(secName);
          onNavigateToTab('challenges');
        }}
      />

      {/* 3. Urgent Attention Alert (Renders only when issues exist) */}
      <AttentionPanel 
        onNavigateToModeration={() => onNavigateToTab('moderation')}
        onNavigateToTeams={() => onNavigateToTab('teams')}
      />

      {/* 4. Two-Column Live Operations: Announcements & Live Solves Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BroadcastComposer />

        <LiveActivity 
          compact={true} 
          onViewAll={() => onNavigateToTab('activity')}
        />
      </div>

      {/* 5. Danger Zone (Safely positioned at the bottom) */}
      <DangerZone />
    </div>
  );
};

export default AdminOverview;
