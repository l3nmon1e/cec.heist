import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CATEGORIES } from '../data/missions';
import MissionCard from './MissionCard';
import MissionDetailView from './MissionDetailView';
import { Search, Filter, Layers, CheckCircle2, Shield, AlertTriangle } from 'lucide-react';
import { sound } from '../utils/audio';

export default function MissionsView() {
  const { missions, selectedMissionId, setSelectedMissionId } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isViewingDetail, setIsViewingDetail] = useState(false);

  // If a mission was explicitly opened via "ENTER MISSION"
  const currentDetailMission = missions.find(m => m.id === selectedMissionId) || missions[0];

  const handleCategorySelect = (catId) => {
    sound.playClick();
    setSelectedCategory(catId);
  };

  const handleDifficultySelect = (diff) => {
    sound.playClick();
    setSelectedDifficulty(diff);
  };

  const handleStatusSelect = (stat) => {
    sound.playClick();
    setSelectedStatus(stat);
  };

  // Filter logic
  const filteredMissions = missions.filter(m => {
    if (selectedCategory !== 'ALL' && m.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'ALL' && m.difficulty !== selectedDifficulty) return false;
    if (selectedStatus !== 'ALL' && m.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchCategory = m.category.toLowerCase().includes(q);
      const matchSkills = m.requiredSkills?.some(s => s.toLowerCase().includes(q));
      const matchBrief = m.brief.toLowerCase().includes(q);
      const matchNumber = m.number.includes(q);
      if (!matchTitle && !matchCategory && !matchSkills && !matchBrief && !matchNumber) {
        return false;
      }
    }
    return true;
  });

  const solvedCount = missions.filter(m => m.status === 'SOLVED').length;
  const totalCount = missions.length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100);

  if (isViewingDetail && currentDetailMission) {
    return (
      <MissionDetailView
        mission={currentDetailMission}
        onBack={() => setIsViewingDetail(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Header & Strategic Progress Bar */}
      <div className="bg-[#151515] border border-[#303030] p-4 sm:p-5 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#FACC15] font-semibold mb-1">
              <Layers className="w-4 h-4" />
              <span>ACTIVE TARGET DIRECTORY // OPERATION CEC HEIST</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#E5E7EB] uppercase">
              TACTICAL MISSIONS GRID
            </h1>
          </div>

          {/* Progress stats */}
          <div className="bg-[#0A0A0A] p-3 border border-[#262626] min-w-[240px]">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-[#737373]">SECTOR PENETRATION</span>
              <span className="font-bold text-[#FACC15]">{solvedCount} / {totalCount} ({progressPercent}%)</span>
            </div>
            {/* Custom Tactical Progress Bar */}
            <div className="h-2 w-full bg-[#1F1F1F] border border-[#303030] overflow-hidden">
              <div
                className="h-full bg-[#FACC15] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-5 pt-4 border-t border-[#262626] space-y-3">
          
          {/* Categories Horizontal Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 text-xs">
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat.id;
              const catMissions = missions.filter(m => cat.id === 'ALL' || m.category === cat.id);
              const catSolved = catMissions.filter(m => m.status === 'SOLVED').length;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-3 py-1.5 shrink-0 border transition-colors flex items-center space-x-2 ${
                    isSelected
                      ? 'bg-[#FACC15] text-[#0A0A0A] font-bold border-[#FACC15]'
                      : 'bg-[#101010] text-[#737373] border-[#2A2A2A] hover:border-[#3E3E3E] hover:text-[#E5E7EB]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1 py-0.2 ${isSelected ? 'bg-black/20 text-black' : 'bg-[#1F1F1F] text-[#9CA3AF]'}`}>
                    {catSolved}/{catMissions.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sub-filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by mission ID, CVE, protocol, skill (e.g. SQLi, RSA, Carving)..."
                className="w-full bg-[#0A0A0A] border border-[#303030] focus:border-[#FACC15] pl-9 pr-3 py-1.5 text-xs text-[#E5E7EB] placeholder-[#525252] outline-none"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#737373] text-[11px]">DIFFICULTY:</span>
              {['ALL', 'EASY', 'MEDIUM', 'HARD', 'INSANE'].map(d => (
                <button
                  key={d}
                  onClick={() => handleDifficultySelect(d)}
                  className={`px-2 py-1 text-[11px] border ${
                    selectedDifficulty === d
                      ? 'bg-[#1F1F1F] text-[#FACC15] border-[#FACC15]'
                      : 'bg-[#101010] text-[#737373] border-[#262626] hover:text-[#E5E7EB]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[#737373] text-[11px]">STATUS:</span>
              {['ALL', 'AVAILABLE', 'SOLVED', 'LOCKED'].map(s => (
                <button
                  key={s}
                  onClick={() => handleStatusSelect(s)}
                  className={`px-2 py-1 text-[11px] border ${
                    selectedStatus === s
                      ? 'bg-[#1F1F1F] text-[#FACC15] border-[#FACC15]'
                      : 'bg-[#101010] text-[#737373] border-[#262626] hover:text-[#E5E7EB]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Grid of Mission Cards */}
      {filteredMissions.length === 0 ? (
        <div className="bg-[#151515] border border-[#303030] p-12 text-center font-mono">
          <AlertTriangle className="w-8 h-8 text-[#FACC15] mx-auto mb-3" />
          <p className="text-sm font-bold text-[#E5E7EB] uppercase">NO MATCHING TARGETS LOCATED</p>
          <p className="text-xs text-[#737373] mt-1">Adjust your search parameters or category filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedDifficulty('ALL');
              setSelectedStatus('ALL');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-1.5 bg-[#1F1F1F] border border-[#303030] text-xs text-[#FACC15] hover:border-[#FACC15]"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}

    </div>
  );
}
