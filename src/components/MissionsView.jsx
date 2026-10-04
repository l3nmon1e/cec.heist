import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { HEIST_STAGES } from '../data/heistStages';
import FacilityMap from './heist/FacilityMap';
import MissionCard from './heist/MissionCard';
import DigitalVault from './heist/DigitalVault';
import MissionDetailView from './MissionDetailView';
import { formatTimer, formatScore, getAssetUrl } from '../utils/formatters';
import { 
  Search, 
  Map, 
  Key, 
  Clock, 
  CheckCircle2, 
  Target,
  Layers,
  Crosshair,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/audio';

// Anchor missions that have photo evidence
const ANCHOR_MISSION_IMAGES = {
  'mission-01': '/assets/heist/facility/secure_corridor.jpg',
  'mission-08': '/assets/heist/missions/restricted_terminal.jpg',
  'mission-10': '/assets/heist/surveillance/cctv_wall.jpg',
  'mission-11': '/assets/heist/missions/server_room.jpg',
  'mission-13': '/assets/heist/vault/vault_entrance.jpg',
  'mission-14': '/assets/heist/facility/facility_wide.jpg',
  'mission-17': '/assets/heist/missions/network_ops.jpg'
};

const CATEGORIES = ['ALL', 'WEB', 'CRYPTO', 'FORENSICS', 'NETWORK', 'REVERSE'];

export default function MissionsView() {
  const { 
    missions, 
    selectedMissionId, 
    setSelectedMissionId, 
    secondsRemaining,
    selectedCategory = 'ALL',
    setSelectedCategory
  } = useGame();

  // Default directly to missions so players immediately see challenges
  const [activeView, setActiveView] = useState('missions'); // 'missions' | 'map' | 'vault'
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isViewingDetail, setIsViewingDetail] = useState(false);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'ALL') {
      setActiveView('missions');
      setIsViewingDetail(false);
    }
  }, [selectedCategory]);

  const solvedCount = missions.filter(m => m.status === 'SOLVED').length;
  const totalCount = missions.length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100);

  // If a mission is opened in detail view
  const currentDetailMission = missions.find(m => m.id === selectedMissionId) || missions[0];

  const handleOpenMission = (missionId) => {
    sound.playClick();
    setSelectedMissionId(missionId);
    setIsViewingDetail(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter missions based on category, difficulty and search
  const filteredMissions = missions.filter(m => {
    if (selectedCategory !== 'ALL' && m.category.toUpperCase() !== selectedCategory.toUpperCase()) {
      return false;
    }

    if (selectedDifficulty !== 'ALL' && m.difficulty.toUpperCase() !== selectedDifficulty.toUpperCase()) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchCategory = m.category.toLowerCase().includes(q);
      const matchBrief = m.brief.toLowerCase().includes(q);
      const matchNumber = m.number.includes(q);
      if (!matchTitle && !matchCategory && !matchBrief && !matchNumber) {
        return false;
      }
    }
    return true;
  });

  if (isViewingDetail && currentDetailMission) {
    return (
      <MissionDetailView
        mission={currentDetailMission}
        onBack={() => setIsViewingDetail(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 font-mono pb-20 select-none">
      
      {/* 1. MINIMAL HEADER SECTION (Matches Leaderboard & Profile aesthetic) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2 pb-2">
        
        {/* Left: Titles & Tagline */}
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8A96B] uppercase">
            <span className="w-6 h-[2px] bg-[#C8A96B]" />
            <span>SECTOR OBJECTIVES // CEC HEIST</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#F4F5F7] uppercase">
            FACILITY MISSIONS
          </h1>

          <p className="text-xs text-[#8D98A8] tracking-wider uppercase pt-0.5">
            ACTIVE TARGETS // SELECT A DOSSIER TO BEGIN INFILTRATION
          </p>
        </div>

        {/* Right: Clean Telemetry Status Pods */}
        <div className="flex items-center space-x-3 self-start md:self-end">
          
          {/* Time Remaining Pod */}
          <div className="bg-[#0C111A] border border-[#263140] px-4 py-2 min-w-[120px] rounded-lg">
            <span className="text-[10px] text-[#8D98A8] block tracking-wider uppercase font-semibold">
              TIME REMAINING
            </span>
            <span className="text-xl font-bold text-[#F4F5F7] leading-none block mt-1 tracking-wider">
              {formatTimer(secondsRemaining)}
            </span>
          </div>

          {/* Solved Targets Pod */}
          <div className="bg-[#0C111A] border border-[#263140] px-4 py-2 min-w-[120px] text-right rounded-lg">
            <span className="text-[10px] text-[#8D98A8] block tracking-wider uppercase font-semibold">
              SOLVED TARGETS
            </span>
            <span className="text-xl font-bold text-[#C8A96B] leading-none block mt-1">
              {solvedCount} <span className="text-xs font-normal text-[#8D98A8]">/ {totalCount}</span>
            </span>
          </div>

        </div>

      </div>

      {/* 2. THREE DEDICATED VIEW TABS (Missions vs Map vs Vault) */}
      <div className="flex items-center justify-between border-t border-b border-[#263140] py-3 gap-3 flex-wrap">
        <div className="flex items-center space-x-2">
          
          <button
            onClick={() => {
              sound.playClick();
              setActiveView('missions');
            }}
            className={`px-4 py-2 text-xs font-bold tracking-wider transition-colors cursor-pointer flex items-center space-x-2 rounded-lg ${
              activeView === 'missions'
                ? 'bg-[#C8A96B] text-[#070B12]'
                : 'bg-[#0C111A] text-[#8D98A8] border border-[#263140] hover:text-[#F4F5F7]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>MISSIONS GRID ({totalCount})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveView('map');
            }}
            className={`px-4 py-2 text-xs font-bold tracking-wider transition-colors cursor-pointer flex items-center space-x-2 rounded-lg ${
              activeView === 'map'
                ? 'bg-[#C8A96B] text-[#070B12]'
                : 'bg-[#0C111A] text-[#8D98A8] border border-[#263140] hover:text-[#F4F5F7]'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>FACILITY MAP</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveView('vault');
            }}
            className={`px-4 py-2 text-xs font-bold tracking-wider transition-colors cursor-pointer flex items-center space-x-2 rounded-lg ${
              activeView === 'vault'
                ? 'bg-[#C8A96B] text-[#070B12]'
                : 'bg-[#0C111A] text-[#8D98A8] border border-[#263140] hover:text-[#C8A96B]'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>DIGITAL VAULT</span>
          </button>

        </div>

        <div className="text-[11px] text-[#566375] hidden sm:block">
          STATUS: LEVEL-4 CLEARANCE ENGAGED
        </div>
      </div>

      {/* 3. VIEW 1: MISSIONS GRID (Clean, Direct, Zero Clutter) */}
      {activeView === 'missions' && (
        <section className="space-y-6">
          
          {/* Category Filter Pills & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => {
                const count = cat === 'ALL' 
                  ? missions.length 
                  : missions.filter(m => m.category.toUpperCase() === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      sound.playClick();
                      setSelectedCategory(cat);
                    }}
                    className={`px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer rounded-lg border ${
                      selectedCategory === cat
                        ? 'bg-[#C8A96B] text-[#070B12] border-[#C8A96B]'
                        : 'bg-[#0C111A] text-[#8D98A8] border-[#263140] hover:text-[#F4F5F7]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Right: Search & Difficulty Filter */}
            <div className="flex items-center space-x-2.5">
              
              {/* Difficulty Dropdown */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-[#0C111A] border border-[#263140] text-[#8D98A8] text-xs px-3 py-2 outline-none font-mono rounded-lg"
              >
                <option value="ALL">ALL LEVELS</option>
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
                <option value="INSANE">INSANE</option>
              </select>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#566375] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search targets..."
                  className="bg-[#0C111A] border border-[#263140] focus:border-[#C8A96B] pl-8 pr-3 py-2 text-xs text-[#F4F5F7] placeholder-[#566375] outline-none rounded-lg transition-colors w-40 sm:w-56 font-mono"
                />
              </div>

            </div>

          </div>

          {/* Missions Cards Grid */}
          {filteredMissions.length === 0 ? (
            <div className="bg-[#0C111A] border border-[#263140] p-12 text-center font-mono space-y-3 rounded-lg">
              <Crosshair className="w-8 h-8 text-[#566375] mx-auto" />
              <p className="text-sm font-bold text-[#F4F5F7]">NO MATCHING MISSIONS DISCOVERED</p>
              <p className="text-xs text-[#8D98A8]">Adjust your active category filter or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMissions.map((m) => {
                const stageForMission = HEIST_STAGES.find(s => s.missionIds.includes(m.id));
                const customImg = ANCHOR_MISSION_IMAGES[m.id];
                const hasImg = Boolean(customImg);

                return (
                  <MissionCard
                    key={m.id}
                    mission={m}
                    onSelect={handleOpenMission}
                    stageName={stageForMission?.name}
                    hasImage={hasImg}
                    customImage={customImg}
                  />
                );
              })}
            </div>
          )}

        </section>
      )}

      {/* 4. VIEW 2: DEDICATED FACILITY BLUEPRINT MAP */}
      {activeView === 'map' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#C8A96B]">
              <Map className="w-4 h-4" />
              <span className="font-bold tracking-wider uppercase">INTERACTIVE FACILITY PROGRESSION MAP</span>
            </div>
            <button
              onClick={() => setActiveView('missions')}
              className="text-xs text-[#C8A96B] hover:underline cursor-pointer flex items-center space-x-1"
            >
              <span>BACK TO MISSIONS GRID</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <FacilityMap 
            selectedStageId="all"
            onSelectStage={() => {}}
            onOpenMission={handleOpenMission}
          />
        </section>
      )}

      {/* 5. VIEW 3: DEDICATED DIGITAL VAULT SECTION */}
      {activeView === 'vault' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#C8A96B]">
              <Key className="w-4 h-4 text-[#C8A96B]" />
              <span className="font-bold tracking-wider uppercase">HEIST ENDGAME // THE DIGITAL VAULT</span>
            </div>
            <button
              onClick={() => setActiveView('missions')}
              className="text-xs text-[#C8A96B] hover:underline cursor-pointer flex items-center space-x-1"
            >
              <span>BACK TO MISSIONS GRID</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <DigitalVault onOpenVaultMission={handleOpenMission} />
        </section>
      )}

    </div>
  );
}
