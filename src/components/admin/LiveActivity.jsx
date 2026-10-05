import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Search, ChevronRight, Activity } from 'lucide-react';

export const LiveActivity = ({ compact = false, onViewAll }) => {
  const { activities, submissions } = useGame();
  const [filter, setFilter] = useState('ALL'); // ALL | CHALLENGES | TEAMS | SECURITY
  const [search, setSearch] = useState('');

  // Unify and sort events chronologically
  const unifiedEvents = [
    ...activities.map(a => ({
      id: `act-${a.id}`,
      time: a.timestamp || '22:41:00',
      team: a.team || 'CREW',
      desc: a.mission ? `${a.event === 'FIRST_BLOOD' ? 'First Blood on ' : 'Completed '}${a.mission}` : a.event,
      type: 'CHALLENGES',
      points: a.points,
      status: 'success'
    })),
    ...submissions.map(s => ({
      id: `sub-${s.id}`,
      time: s.timestamp || '22:40:00',
      team: 'CREW-04',
      desc: s.status === 'VALID' ? `Verified flag for ${s.title}` : `Submitted incorrect flag for ${s.title}`,
      type: s.status === 'VALID' ? 'CHALLENGES' : 'SECURITY',
      points: s.points,
      status: s.status === 'VALID' ? 'success' : 'warning'
    }))
  ];

  // If list is small, provide realistic competition activity events
  const defaultEvents = [
    { id: 'ev-1', time: '22:41:08', team: 'GHOST-07', desc: 'Completed Mission 14 - Git Commit Trail', type: 'CHALLENGES', status: 'success' },
    { id: 'ev-2', time: '22:40:51', team: 'NOVA-12', desc: 'Entered Security (Sector 05)', type: 'SECURITY', status: 'neutral' },
    { id: 'ev-3', time: '22:40:33', team: 'CREW-04', desc: 'Submitted incorrect flag for Packet Intercept', type: 'SECURITY', status: 'warning' },
    { id: 'ev-4', time: '22:40:02', team: 'GHOST-07', desc: 'Completed Mission 08 - Firmware Reverse', type: 'CHALLENGES', status: 'success' },
    { id: 'ev-5', time: '22:38:40', team: 'SPECTRE-9', desc: 'Unlocked hint #1 on Vault Gateway', type: 'CHALLENGES', status: 'neutral' },
    { id: 'ev-6', time: '22:35:12', team: 'Team Alpha', desc: 'Entered The Vault (Sector 07)', type: 'TEAMS', status: 'neutral' },
    { id: 'ev-7', time: '22:33:04', team: 'NullPointer', desc: 'Completed Mission 03 - SSRF Metadata', type: 'CHALLENGES', status: 'success' },
    { id: 'ev-8', time: '22:30:19', team: 'CyberSharks', desc: 'Submitted incorrect flag for JWT Confusion', type: 'SECURITY', status: 'warning' }
  ];

  const allEvents = unifiedEvents.length > 0 ? unifiedEvents : defaultEvents;

  // Filter events
  const filteredEvents = allEvents.filter(ev => {
    const matchesFilter = 
      filter === 'ALL' ||
      (filter === 'CHALLENGES' && ev.type === 'CHALLENGES') ||
      (filter === 'TEAMS' && (ev.type === 'TEAMS' || ev.desc.toLowerCase().includes('entered'))) ||
      (filter === 'SECURITY' && (ev.type === 'SECURITY' || ev.status === 'warning'));

    const matchesSearch = 
      search === '' ||
      ev.team.toLowerCase().includes(search.toLowerCase()) ||
      ev.desc.toLowerCase().includes(search.toLowerCase()) ||
      ev.time.includes(search);

    return matchesFilter && matchesSearch;
  });

  const displayEvents = compact ? allEvents.slice(0, 7) : filteredEvents;

  if (compact) {
    return (
      <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-5 shadow-sm flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#202B38]">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F5F7]">
              Live Activity
            </h3>
            <span className="text-[10px] font-mono text-[#8994A4]">
              Real-time feed
            </span>
          </div>

          <div className="mt-3 divide-y divide-[#202B38]/50 font-mono text-xs">
            {displayEvents.map((ev) => (
              <div key={ev.id} className="py-2.5 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 min-w-0">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    ev.status === 'warning' ? 'bg-[#D6AA55]' :
                    ev.status === 'success' ? 'bg-[#4DBB91]' :
                    'bg-[#8994A4]'
                  }`} />
                  <div className="truncate">
                    <span className="font-semibold text-[#F4F5F7] mr-1.5">{ev.team}</span>
                    <span className="text-[#8994A4]">{ev.desc}</span>
                  </div>
                </div>
                <span className="text-[11px] text-[#8994A4] shrink-0 font-mono">
                  {ev.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {onViewAll && (
          <div className="pt-3 border-t border-[#202B38] mt-3">
            <button
              onClick={onViewAll}
              className="w-full py-1.5 text-center text-xs font-mono text-[#C8A96B] hover:text-[#d8bb7d] transition-colors flex items-center justify-center gap-1"
            >
              <span>VIEW ALL ACTIVITY</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-6 shadow-sm space-y-5">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#202B38]">
        <div>
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#F4F5F7]">
            Live Event Feed
          </h2>
          <p className="text-xs font-mono text-[#8994A4] mt-0.5">
            Chronological audit of competition flag attempts, room transitions, and security signals
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8994A4]" />
            <input
              type="text"
              placeholder="Search activity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111923] border border-[#202B38] rounded pl-8 pr-3 py-1.5 text-xs font-mono text-[#F4F5F7] placeholder-[#8994A4] focus:outline-none focus:border-[#C8A96B]"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 bg-[#111923] p-1 border border-[#202B38] rounded">
            {['ALL', 'CHALLENGES', 'TEAMS', 'SECURITY'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                  filter === f
                    ? 'bg-[#0D131D] text-[#C8A96B] font-bold border border-[#202B38]'
                    : 'text-[#8994A4] hover:text-[#F4F5F7]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed list */}
      <div className="divide-y divide-[#202B38] font-mono text-xs">
        {displayEvents.map((ev) => (
          <div key={ev.id} className="py-3 flex items-center justify-between gap-4 hover:bg-[#111923]/40 px-2 rounded transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-[#8994A4] text-[11px] w-16 shrink-0">{ev.time}</span>
              <span className={`w-2 h-2 rounded-full shrink-0 ${
                ev.status === 'warning' ? 'bg-[#D6AA55]' :
                ev.status === 'success' ? 'bg-[#4DBB91]' :
                'bg-[#8994A4]'
              }`} />
              <span className="font-bold text-[#F4F5F7] min-w-[90px]">{ev.team}</span>
              <span className="text-[#8994A4]">{ev.desc}</span>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              {ev.points && (
                <span className="text-[#C8A96B] font-semibold text-[11px]">
                  +{ev.points} PTS
                </span>
              )}
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#111923] text-[#8994A4] border border-[#202B38]">
                {ev.type}
              </span>
            </div>
          </div>
        ))}

        {displayEvents.length === 0 && (
          <div className="py-12 text-center text-[#8994A4] font-mono text-xs">
            No events match the search query or active filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveActivity;
