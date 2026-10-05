import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { 
  LayoutDashboard, 
  Layers, 
  Users, 
  Activity, 
  ShieldAlert, 
  Menu, 
  X 
} from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const AdminLayout = ({ 
  activeTab, 
  onSelectTab, 
  onLogout, 
  children 
}) => {
  const { isGamePaused } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabLabels = {
    overview: 'OVERVIEW',
    challenges: 'CHALLENGES',
    teams: 'TEAMS',
    activity: 'LIVE ACTIVITY',
    moderation: 'MODERATION'
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'challenges', label: 'Challenges', icon: Layers },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'moderation', label: 'Moderation', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-[#070B12] text-[#F4F5F7] flex flex-col font-sans selection:bg-[#C8A96B] selection:text-[#070B12]">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0D131D] border-b border-[#202B38] px-4 py-3 flex items-center justify-between">
        <div className="font-mono text-xs font-bold tracking-wider text-[#F4F5F7]">
          CEC HEIST <span className="text-[#8994A4]">/ ADMIN</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#8994A4] hover:text-[#F4F5F7] p-1"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D131D] border-b border-[#202B38] p-3 space-y-1 font-mono text-xs z-50 animate-fadeIn">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left ${
                  isActive ? 'bg-[#111923] text-[#C8A96B] font-bold' : 'text-[#8994A4]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#202B38]">
            <button
              onClick={onLogout}
              className="w-full text-left px-3 py-2 text-[#D96C6C] hover:bg-[#111923] rounded"
            >
              Lock Admin Session
            </button>
          </div>
        </div>
      )}

      {/* Main Desktop Container: Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Left Sidebar */}
        <div className="hidden md:flex">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={onSelectTab}
            isGamePaused={isGamePaused}
            onLogout={onLogout}
          />
        </div>

        {/* Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar */}
          <div className="hidden md:block">
            <TopBar activeTabName={tabLabels[activeTab] || 'OVERVIEW'} />
          </div>

          {/* Main Page Workspace */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 md:pb-8">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0D131D] border-t border-[#202B38] px-2 py-1.5 flex items-center justify-around z-40">
        {navItems.slice(0, 4).map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-mono transition-colors ${
                isActive ? 'text-[#C8A96B] font-bold' : 'text-[#8994A4]'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminLayout;
