import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { AdminGuard } from '../components/admin/AdminGuard';
import { AdminCommandDeck } from '../components/admin/AdminCommandDeck';
import { AdminChallenges } from '../components/admin/AdminChallenges';
import { AdminLiveLogs } from '../components/admin/AdminLiveLogs';
import { AdminTeams } from '../components/admin/AdminTeams';
import { 
  ShieldAlert, 
  Terminal, 
  Layers, 
  Activity, 
  Users, 
  LogOut, 
  ArrowLeft,
  Volume2,
  VolumeX,
  Radio,
  Clock,
  Sparkles
} from 'lucide-react';

export const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('command'); // 'command' | 'challenges' | 'logs' | 'teams'
  const { audioEnabled, toggleSound, isGamePaused } = useGame();

  useEffect(() => {
    const authStatus = sessionStorage.getItem('CEC_ADMIN_AUTH');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('CEC_ADMIN_AUTH');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminGuard onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const tabs = [
    { id: 'command', label: 'COMMAND DECK', icon: Terminal, desc: 'Telemetry, Controls & Broadcast' },
    { id: 'challenges', label: 'CHALLENGES & FLAGS', icon: Layers, desc: 'Registry, Flags & Point Values' },
    { id: 'logs', label: 'LIVE LOGS & ANTI-CHEAT', icon: Activity, desc: 'Flag Ingestion Stream & Brute Alerts' },
    { id: 'teams', label: 'TEAMS & MODERATION', icon: Users, desc: 'Scores, Sanctions & CSV Export' }
  ];

  return (
    <div className="min-h-screen bg-[#05070e] text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Cyber System Bar */}
      <header className="border-b border-cyan-500/20 bg-[#080d16]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm tracking-widest text-cyan-400">
                  CEC HEIST
                </span>
                <span className="text-gray-500 font-mono text-xs">/</span>
                <span className="font-mono text-xs text-white uppercase font-bold tracking-wider">
                  MASTER OPERATIONS CENTER
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  CLEARANCE: LEVEL-5 ROOT
                </span>
              </div>
              <p className="text-[10px] font-mono text-gray-400">
                Administrative Central Node • v2.6.4 • All Commands Verified & Audited
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isGamePaused && (
              <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/50 text-amber-400 font-mono text-[11px] font-bold animate-pulse flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                CONTEST PAUSED
              </span>
            )}

            <button
              onClick={toggleSound}
              className={`p-2 rounded border transition-colors ${
                audioEnabled 
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
              title={audioEnabled ? "Mute Audio" : "Enable Audio"}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <Link
              to="/heist"
              className="px-3 py-1.5 rounded bg-white/5 border border-white/15 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit To Facility</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Terminal</span>
            </button>
          </div>
        </div>

        {/* Cyber Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-2 border-t border-white/5 pt-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 font-mono text-xs flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  isActive 
                    ? 'border-cyan-400 text-cyan-300 font-bold bg-cyan-950/20' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Admin Workspace Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6">
        {activeTab === 'command' && <AdminCommandDeck />}
        {activeTab === 'challenges' && <AdminChallenges />}
        {activeTab === 'logs' && <AdminLiveLogs />}
        {activeTab === 'teams' && <AdminTeams />}
      </main>

      {/* Cyber Admin Footer */}
      <footer className="border-t border-white/5 py-4 text-center text-gray-500 font-mono text-[10px]">
        CEC HEIST INCIDENT RESPONSE PROTOCOL 2026 • AUTHORIZED USE ONLY • ACCESS TOKEN SHA-256 SIGNED
      </footer>
    </div>
  );
};

export default AdminPage;
