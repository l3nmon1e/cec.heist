import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Search, 
  Edit3, 
  Key, 
  Award, 
  CheckCircle, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  X,
  Save,
  Filter
} from 'lucide-react';

const CATEGORIES = ["ALL", "WEB", "CRYPTO", "FORENSICS", "REVERSE", "PWN", "OSINT", "NETWORK", "CLOUD"];

export const AdminChallenges = () => {
  const { missions, updateChallenge } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [editingMission, setEditingMission] = useState(null);
  const [revealedFlags, setRevealedFlags] = useState({});
  const [notification, setNotification] = useState(null);

  // Edit form state
  const [formFlag, setFormFlag] = useState('');
  const [formPoints, setFormPoints] = useState(100);
  const [formDifficulty, setFormDifficulty] = useState('MEDIUM');
  const [formStatus, setFormStatus] = useState('AVAILABLE');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleFlagReveal = (id) => {
    setRevealedFlags(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openEditModal = (mission) => {
    setEditingMission(mission);
    setFormFlag(mission.flag || '');
    setFormPoints(mission.points || 100);
    setFormDifficulty(mission.difficulty || 'MEDIUM');
    setFormStatus(mission.status || 'AVAILABLE');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingMission) return;

    updateChallenge(editingMission.id, {
      flag: formFlag.trim(),
      points: Number(formPoints),
      difficulty: formDifficulty,
      status: formStatus
    });

    showNotification(`Challenge "${editingMission.title}" updated successfully.`);
    setEditingMission(null);
  };

  const toggleChallengeStatus = (mission) => {
    const nextStatus = mission.status === 'LOCKED' ? 'AVAILABLE' : 'LOCKED';
    updateChallenge(mission.id, { status: nextStatus });
    showNotification(`${mission.id} status changed to ${nextStatus}`);
  };

  // Filtered missions
  const filteredMissions = missions.filter(m => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.flag && m.flag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (m.category && m.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'ALL' || m.category?.toUpperCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPoints = missions.reduce((sum, m) => sum + (m.points || 0), 0);
  const solvedCount = missions.filter(m => m.status === 'SOLVED').length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Notification */}
      {notification && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Stat Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0b101b] border border-cyan-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Total Registered</p>
            <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">{missions.length}</p>
          </div>
          <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded text-cyan-400">
            <Key className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b101b] border border-amber-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Total Point Pool</p>
            <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{totalPoints} PTS</p>
          </div>
          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded text-amber-400">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b101b] border border-emerald-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Player Solved</p>
            <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{solvedCount} / {missions.length}</p>
          </div>
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0b101b] border border-purple-500/20 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Global Categories</p>
            <p className="text-2xl font-bold font-mono text-purple-400 mt-1">8 SECTORS</p>
          </div>
          <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded text-purple-400">
            <Filter className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-[#0b101b] border border-white/10 p-4 rounded-lg flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, flag, ID, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#05070e] border border-white/15 focus:border-cyan-500/50 rounded pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Categories Carousel/Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded uppercase transition-colors ${
                selectedCategory === cat 
                  ? 'bg-cyan-500/20 border border-cyan-500/60 text-cyan-300 font-bold' 
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Table */}
      <div className="bg-[#0b101b] border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                <th className="py-3 px-4"># / ID</th>
                <th className="py-3 px-4">Title & Objectives</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Points</th>
                <th className="py-3 px-4">Target Flag String</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {filteredMissions.map(m => {
                const isRevealed = !!revealedFlags[m.id];
                return (
                  <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-gray-400">
                      <span className="text-cyan-400 font-bold mr-1">#{m.number}</span>
                      <span className="text-[10px] text-gray-500">({m.id})</span>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-white text-sm truncate">{m.title}</div>
                      <div className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{m.brief}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-gray-300 border border-white/10">
                        {m.category || 'GENERAL'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.difficulty === 'EASY' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                        m.difficulty === 'MEDIUM' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                        'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                      }`}>
                        {m.difficulty || 'MEDIUM'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-amber-400 font-bold">
                      {m.points} PTS
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-cyan-300 bg-[#05070e] px-2 py-1 rounded border border-white/10">
                          {isRevealed ? (m.flag || 'NO_FLAG_SET') : '••••••••••••••••••••'}
                        </span>
                        <button 
                          onClick={() => toggleFlagReveal(m.id)} 
                          className="text-gray-400 hover:text-cyan-400 p-1 transition-colors"
                          title={isRevealed ? "Hide Flag" : "Reveal Flag"}
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-gray-500" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.status === 'SOLVED' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                        m.status === 'LOCKED' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' :
                        'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {m.status === 'SOLVED' && <CheckCircle className="w-3 h-3" />}
                        {m.status === 'LOCKED' && <Lock className="w-3 h-3" />}
                        {m.status === 'AVAILABLE' && <Unlock className="w-3 h-3" />}
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleChallengeStatus(m)}
                          className="p-1.5 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                          title={m.status === 'LOCKED' ? "Unlock Challenge" : "Lock Challenge"}
                        >
                          {m.status === 'LOCKED' ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                        </button>
                        <button
                          onClick={() => openEditModal(m)}
                          className="px-2.5 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded hover:bg-cyan-500/30 text-cyan-300 text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredMissions.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500 font-mono text-xs">
                    No challenges matched the search query or selected category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Challenge Modal */}
      {editingMission && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b101b] border border-cyan-500/40 rounded-lg max-w-lg w-full p-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-cyan-400" />
                  EDIT CHALLENGE #{editingMission.number}
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{editingMission.title}</p>
              </div>
              <button 
                onClick={() => setEditingMission(null)}
                className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-gray-400 mb-1 text-[11px] uppercase tracking-wider">
                  Target Flag String (Exact Match)
                </label>
                <input
                  type="text"
                  required
                  value={formFlag}
                  onChange={(e) => setFormFlag(e.target.value)}
                  className="w-full bg-[#05070e] border border-cyan-500/30 rounded px-3 py-2 text-cyan-300 focus:outline-none focus:border-cyan-400"
                  placeholder="CEC{...}"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Format typically: CEC&#123;flag_contents_here&#125;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1 text-[11px] uppercase tracking-wider">
                    Points Allocated
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="5000"
                    step="10"
                    required
                    value={formPoints}
                    onChange={(e) => setFormPoints(e.target.value)}
                    className="w-full bg-[#05070e] border border-amber-500/30 rounded px-3 py-2 text-amber-300 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 text-[11px] uppercase tracking-wider">
                    Difficulty Tier
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value)}
                    className="w-full bg-[#05070e] border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 text-[11px] uppercase tracking-wider">
                  Challenge State
                </label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className="w-full bg-[#05070e] border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="AVAILABLE">AVAILABLE (UNLOCKED)</option>
                  <option value="LOCKED">LOCKED (DISABLED)</option>
                  <option value="SOLVED">SOLVED (FORCE CLEARED)</option>
                </select>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded text-[11px] text-amber-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <span>Modifying this flag takes effect immediately across all active operator terminals and CTF scoring instances.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingMission(null)}
                  className="px-4 py-2 rounded bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
