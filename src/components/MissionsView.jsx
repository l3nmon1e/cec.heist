import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { HEIST_STAGES } from '../data/heistStages';
import FacilityMap from './heist/FacilityMap';
import MissionCard from './heist/MissionCard';
import DigitalVault from './heist/DigitalVault';
import MissionDetailView from './MissionDetailView';
import { formatTimer, formatScore, getAssetUrl } from '../utils/formatters';
import { 
  Search, 
  Filter, 
  Layers, 
  Map, 
  Grid, 
  Lock, 
  Key, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  Cpu, 
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

export default function MissionsView() {
  const { 
    missions, 
    selectedMissionId, 
    setSelectedMissionId, 
    secondsRemaining 
  } = useGame();

  const [activeView, setActiveView] = useState('all'); // 'all' | 'map' | 'vault'
  const [selectedStageId, setSelectedStageId] = useState('recon');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isViewingDetail, setIsViewingDetail] = useState(false);

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

  const handleStageSelect = (stageId) => {
    setSelectedStageId(stageId);
  };

  // Filter missions based on active stage / category and search
  const filteredMissions = missions.filter(m => {
    // If a specific stage is selected (and not 'ALL')
    if (selectedStageId !== 'all') {
      const stageObj = HEIST_STAGES.find(s => s.id === selectedStageId);
      if (stageObj && !stageObj.missionIds.includes(m.id)) {
        return false;
      }
    }

    if (selectedDifficulty !== 'ALL' && m.difficulty !== selectedDifficulty) return false;

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

  const activeStageObj = HEIST_STAGES.find(s => s.id === selectedStageId);

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* 1. TOP HEIST COMMAND HEADER */}
      <div className="bg-[#0C111A] border border-[#263140] p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Subtle accent strip */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A96B] to-transparent" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#C8A96B] tracking-[0.25em] uppercase">
                CEC HEIST // DIGITAL FACILITY
              </span>
              <span className="px-2 py-0.5 bg-[#4FB286]/10 border border-[#4FB286]/30 text-[#4FB286] font-mono text-[10px] font-bold tracking-wider">
                HEIST STATUS: ACTIVE
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F4F5F7] uppercase font-mono">
              OPERATION: DIGITAL FACILITY INFILTRATION
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8D98A8] font-mono">
              <span className="text-[#C8A96B] font-bold">
                PRIMARY OBJECTIVE: INFILTRATE & OPEN THE DIGITAL VAULT
              </span>
              <span>•</span>
              <span>RESTRICTED SECTORS: 08</span>
              <span>•</span>
              <span>CLEARANCE: LEVEL-4</span>
            </div>
          </div>

          {/* Right Metrics: Countdown & Penetration Gauge */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-[#070B12] p-4 border border-[#263140] shrink-0 font-mono">
            {/* Countdown */}
            <div className="pr-4 border-r border-[#263140] space-y-1">
              <div className="flex items-center space-x-1.5 text-[10px] text-[#8D98A8]">
                <Clock className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>TIME REMAINING</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#F4F5F7] tracking-widest">
                {formatTimer(secondsRemaining)}
              </div>
            </div>

            {/* Penetration */}
            <div className="space-y-1 min-w-[130px]">
              <div className="flex justify-between items-center text-[10px] text-[#8D98A8]">
                <span>PENETRATION</span>
                <span className="font-bold text-[#C8A96B]">{progressPercent}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#121923] border border-[#263140] overflow-hidden">
                <div 
                  className="h-full bg-[#C8A96B] transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-[#566375] block">
                {solvedCount}/{totalCount} TARGETS SECURED
              </span>
            </div>
          </div>
        </div>

        {/* View Selection Mode Buttons */}
        <div className="mt-6 pt-4 border-t border-[#1C2633] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveView('all');
              }}
              className={`px-3.5 py-1.5 border text-xs font-bold tracking-wider transition-colors cursor-pointer ${
                activeView === 'all'
                  ? 'bg-[#121923] border-[#C8A96B] text-[#C8A96B]'
                  : 'bg-[#070B12] border-[#263140] text-[#8D98A8] hover:text-[#F4F5F7]'
              }`}
            >
              COMPLETE OVERVIEW
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveView('map');
              }}
              className={`px-3.5 py-1.5 border text-xs font-bold tracking-wider transition-colors cursor-pointer ${
                activeView === 'map'
                  ? 'bg-[#121923] border-[#C8A96B] text-[#C8A96B]'
                  : 'bg-[#070B12] border-[#263140] text-[#8D98A8] hover:text-[#F4F5F7]'
              }`}
            >
              BLUEPRINT MAP
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveView('vault');
              }}
              className={`px-3.5 py-1.5 border text-xs font-bold tracking-wider transition-colors cursor-pointer flex items-center space-x-1.5 ${
                activeView === 'vault'
                  ? 'bg-[#121923] border-[#C8A96B] text-[#C8A96B]'
                  : 'bg-[#070B12] border-[#263140] text-[#8D98A8] hover:text-[#C8A96B]'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-[#C8A96B]" />
              <span>THE DIGITAL VAULT</span>
            </button>
          </div>

          <div className="text-[11px] text-[#8D98A8]">
            FACILITY BLUEPRINT: <span className="text-[#F4F5F7]">LEVEL-1 TO LEVEL-4 HARDENED</span>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE FACILITY BLUEPRINT MAP (Visible in 'all' and 'map' modes) */}
      {(activeView === 'all' || activeView === 'map') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#C8A96B]">
              <Map className="w-4 h-4" />
              <span className="font-bold tracking-wider uppercase">INTERACTIVE FACILITY PROGRESSION MAP</span>
            </div>
            <span className="text-[#8D98A8] text-[11px]">SELECT ANY SECTOR TO INSPECT OBJECTIVES</span>
          </div>

          <FacilityMap 
            selectedStageId={selectedStageId}
            onSelectStage={handleStageSelect}
            onOpenMission={handleOpenMission}
          />
        </section>
      )}

      {/* 3. DEDICATED DIGITAL VAULT SECTION (Visible in 'all' and 'vault' modes) */}
      {(activeView === 'all' || activeView === 'vault') && (
        <section id="the-vault-section" className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#C8A96B]">
              <Key className="w-4 h-4" />
              <span className="font-bold tracking-wider uppercase">HEIST ENDGAME // THE DIGITAL VAULT</span>
            </div>
            <span className="text-[#8D98A8] text-[11px]">CENTRAL SECURE DEPOSITORY</span>
          </div>

          <DigitalVault onOpenVaultMission={handleOpenMission} />
        </section>
      )}

      {/* 4. MISSION DOSSIERS GRID (Visible in 'all' and 'map' modes) */}
      {(activeView === 'all' || activeView === 'map') && (
        <section id="missions-dossier-grid" className="space-y-5 pt-4">
          
          {/* Section Filter & Search Header */}
          <div className="bg-[#0C111A] border border-[#263140] p-4 sm:p-5 font-mono space-y-4">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#C8A96B] uppercase font-bold tracking-widest block">
                  ACTIVE DOSSIERS
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#F4F5F7] tracking-wider uppercase">
                  {selectedStageId === 'all' 
                    ? 'ALL SECTOR MISSIONS (19 TARGETS)' 
                    : `${activeStageObj?.name} // ${activeStageObj?.subtitle} (${filteredMissions.length} MISSIONS)`
                  }
                </h3>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-[#566375] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search mission title, CVE, target..."
                  className="w-full bg-[#070B12] border border-[#263140] focus:border-[#C8A96B] pl-9 pr-3.5 py-2 text-xs text-[#F4F5F7] placeholder-[#566375] outline-none font-mono transition-colors"
                />
              </div>
            </div>

            {/* Stage Selector Pills Bar */}
            <div className="pt-3 border-t border-[#1C2633] flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedStageId('all');
                  }}
                  className={`px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                    selectedStageId === 'all'
                      ? 'bg-[#C8A96B] text-[#070B12] border-[#C8A96B]'
                      : 'bg-[#121923] text-[#8D98A8] border-[#263140] hover:text-[#F4F5F7]'
                  }`}
                >
                  ALL SECTORS
                </button>

                {HEIST_STAGES.map((stg) => (
                  <button
                    key={stg.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedStageId(stg.id);
                    }}
                    className={`px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                      selectedStageId === stg.id
                        ? 'bg-[#C8A96B] text-[#070B12] border-[#C8A96B]'
                        : 'bg-[#121923] text-[#8D98A8] border-[#263140] hover:text-[#F4F5F7]'
                    }`}
                  >
                    0{stg.order}. {stg.name}
                  </button>
                ))}
              </div>

              {/* Difficulty filter */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-[#566375]">LEVEL:</span>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-[#070B12] border border-[#263140] text-[#8D98A8] text-xs px-2.5 py-1 outline-none font-mono"
                >
                  <option value="ALL">ALL LEVELS</option>
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                  <option value="INSANE">INSANE</option>
                </select>
              </div>
            </div>

          </div>

          {/* Missions Cards Grid */}
          {filteredMissions.length === 0 ? (
            <div className="bg-[#0C111A] border border-[#263140] p-12 text-center font-mono space-y-3">
              <Crosshair className="w-8 h-8 text-[#566375] mx-auto" />
              <p className="text-sm font-bold text-[#F4F5F7]">NO MATCHING MISSIONS DISCOVERED</p>
              <p className="text-xs text-[#8D98A8]">Adjust your active sector filter or search criteria.</p>
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

    </div>
  );
}
