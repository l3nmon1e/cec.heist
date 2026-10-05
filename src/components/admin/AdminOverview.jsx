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
  CheckCircle2, 
  Layers
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
  const totalCompletedSolves = missions.reduce((sum, m) => sum + (m.solvedCount || 0), 0);
  const totalPossibleSolves = missions.length * Math.max(1, leaderboard.length);

  return (
    <div className="space-y-6">
      {/* 1. Four Compact Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Contest Status + Pause/Resume control */}
        <StatCard
          label="Contest Status"
          value={isGamePaused ? "PAUSED" : "RUNNING"}
          statusColor={isGamePaused ? "text-[#D6AA55]" : "text-[#4DBB91]"}
          subtext={isGamePaused ? "Timer halted for contestants" : "Live competition in progress"}
          action={
            <button
              onClick={() => setIsGamePaused(!isGamePaused)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors flex items-center gap-1.5 ${
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
          subtext="Contest countdown active"
          action={
            <div className="flex items-center gap-1">
              <button
                onClick={() => overrideTimer(secondsRemaining + 900)}
                className="px-1.5 py-0.5 rounded bg-[#111923] border border-[#202B38] text-[#8994A4] hover:text-[#C8A96B] text-[10px] font-mono"
                title="Add 15 minutes"
              >
                +15M
              </button>
            </div>
          }
        />

        {/* Card 3: Active Crews */}
        <StatCard
          label="Active Crews"
          value={activeCrewsCount}
          statusColor="text-[#C8A96B]"
          icon={Users}
          subtext={`${leaderboard.length} total enrolled teams`}
        />

        {/* Card 4: Completed Missions */}
        <StatCard
          label="Completed Missions"
          value={`${totalCompletedSolves} / ${totalPossibleSolves}`}
          statusColor="text-[#F4F5F7]"
          icon={CheckCircle2}
          subtext={`${missions.length} active challenges in pool`}
        />
      </div>

      {/* 2. Facility Progression (8 HEIST Sectors) */}
      <FacilityProgress 
        onSelectSectorFilter={(secName) => {
          onSelectSectorFilter?.(secName);
          onNavigateToTab('challenges');
        }}
      />

      {/* 3. Operational Grid: Attention Required & Compact Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Attention Required + Broadcast Composer */}
        <div className="space-y-6">
          <AttentionPanel 
            onNavigateToModeration={() => onNavigateToTab('moderation')}
            onNavigateToTeams={() => onNavigateToTab('teams')}
          />

          <BroadcastComposer />
        </div>

        {/* Right Column: Compact Live Activity */}
        <div>
          <LiveActivity 
            compact={true} 
            onViewAll={() => onNavigateToTab('activity')}
          />
        </div>
      </div>

      {/* 4. Danger Zone (Segregated at bottom) */}
      <DangerZone />
    </div>
  );
};

export default AdminOverview;
