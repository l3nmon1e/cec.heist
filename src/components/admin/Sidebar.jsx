import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Users, 
  Activity, 
  ShieldAlert, 
  LogOut,
  Radio
} from 'lucide-react';

export const Sidebar = ({ activeTab, onSelectTab, isGamePaused, onLogout }) => {
  const navItems = [
    { id: 'overview', label: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'challenges', label: 'CHALLENGES', icon: Layers },
    { id: 'teams', label: 'TEAMS', icon: Users },
    { id: 'activity', label: 'LIVE ACTIVITY', icon: Activity },
    { id: 'moderation', label: 'MODERATION', icon: ShieldAlert },
  ];

  return (
    <aside className="w-[230px] shrink-0 bg-[#070B12] border-r border-[#202B38] flex flex-col justify-between select-none">
      {/* Top Branding */}
      <div>
        <div className="px-5 py-5 border-b border-[#202B38]">
          <div className="font-mono text-sm font-bold tracking-widest text-[#F4F5F7]">
            CEC HEIST
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#8994A4] mt-0.5">
            ADMIN CENTER
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-mono tracking-wider transition-colors text-left relative ${
                  isActive
                    ? 'bg-[#111923] text-[#C8A96B] font-semibold'
                    : 'text-[#8994A4] hover:text-[#F4F5F7] hover:bg-[#0D131D]'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#C8A96B] rounded-r" />
                )}
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C8A96B]' : 'text-[#8994A4]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Contest Status Widget */}
        <div className="px-4 py-3 mx-3 mt-2 rounded bg-[#0D131D] border border-[#202B38]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#8994A4]">
            CONTEST STATUS
          </div>
          <div className="mt-1 flex items-center gap-2 font-mono text-xs font-semibold">
            {isGamePaused ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#D6AA55]" />
                <span className="text-[#D6AA55]">PAUSED</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#4DBB91] animate-pulse" />
                <span className="text-[#4DBB91]">RUNNING</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Profile & Logout */}
      <div className="p-3 border-t border-[#202B38] bg-[#070B12]">
        <div className="px-3 py-2 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono font-medium text-[#F4F5F7]">
              Operations Admin
            </div>
            <div className="text-[10px] font-mono text-[#8994A4]">
              Lead Director
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Lock Admin Session"
            className="p-1.5 text-[#8994A4] hover:text-[#D96C6C] hover:bg-[#111923] rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
