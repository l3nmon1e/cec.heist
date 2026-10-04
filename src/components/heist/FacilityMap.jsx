import React, { useState } from 'react';
import { HEIST_STAGES } from '../../data/heistStages';
import { useGame } from '../../context/GameContext';
import { getAssetUrl } from '../../utils/formatters';
import { sound } from '../../utils/audio';
import { 
  Shield, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Crosshair, 
  Layers, 
  Key, 
  Radio, 
  Terminal, 
  Cpu, 
  ArrowRight,
  Maximize2
} from 'lucide-react';

export default function FacilityMap({ selectedStageId, onSelectStage, onOpenMission }) {
  const { missions, submissions } = useGame();
  const [hoveredStage, setHoveredStage] = useState(null);
  const [showBlueprintModal, setShowBlueprintModal] = useState(false);

  const solvedCount = missions.filter(m => m.status === 'SOLVED').length;

  // Compute status for each stage based on progression
  const stageStats = HEIST_STAGES.map((stage, index) => {
    const stageMissions = missions.filter(m => stage.missionIds.includes(m.id));
    const stageSolved = stageMissions.filter(m => m.status === 'SOLVED').length;
    const isUnlocked = solvedCount >= stage.requiredSolvedToUnlock;
    const isComplete = stageMissions.length > 0 && stageSolved === stageMissions.length;
    const inProgress = isUnlocked && !isComplete && stageSolved > 0;

    let status = 'LOCKED';
    if (isComplete) status = 'COMPLETED';
    else if (inProgress) status = 'IN_PROGRESS';
    else if (isUnlocked) status = 'AVAILABLE';

    return {
      ...stage,
      totalMissions: stageMissions.length,
      solvedMissions: stageSolved,
      status,
      missions: stageMissions
    };
  });

  const activeStageData = stageStats.find(s => s.id === (hoveredStage || selectedStageId)) || stageStats[0];

  return (
    <div className="relative bg-[#0C111A] border border-[#263140] rounded-none overflow-hidden shadow-2xl">
      {/* Blueprint Header Bar */}
      <div className="bg-[#121923] border-b border-[#263140] px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 font-mono">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-[#C8A96B] animate-pulse rounded-full" />
          <span className="text-xs font-bold text-[#F4F5F7] tracking-widest uppercase">
            FACILITY SCHEMATIC // SITE-DELTA BLUEPRINT
          </span>
          <span className="text-[11px] text-[#8D98A8] hidden sm:inline border-l border-[#263140] pl-3">
            SECTOR STATUS: MONITORED
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-[#8D98A8]">CLEARANCE:</span>
            <span className="text-[#C8A96B] font-bold">LEVEL-4 OMNI</span>
          </div>
          <button
            onClick={() => setShowBlueprintModal(true)}
            className="flex items-center space-x-1.5 text-[11px] text-[#8D98A8] hover:text-[#C8A96B] transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">FULL BLUEPRINT</span>
          </button>
        </div>
      </div>

      {/* Main Blueprint & Interactive Map Area */}
      <div className="relative min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] bg-[#070B12] overflow-hidden flex flex-col justify-between">
        {/* Real Architectural Blueprint Background with dark gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url('${getAssetUrl('/assets/heist/backgrounds/technical_blueprint.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-transparent to-[#070B12]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B12] via-transparent to-[#070B12] pointer-events-none" />

        {/* Blueprint Vector Grid Lines overlay */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none" />

        {/* Top Telemetry Overlay */}
        <div className="relative z-10 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 font-mono">
          <div className="space-y-1">
            <div className="text-[10px] tracking-widest text-[#C8A96B] uppercase font-semibold">
              PROGRESSION VECTOR
            </div>
            <div className="text-sm font-bold text-[#F4F5F7] tracking-wider">
              {activeStageData.callsign}
            </div>
            <div className="text-xs text-[#8D98A8]">
              {activeStageData.sector} • <span className="text-[#C8A96B]">{activeStageData.blueprintArea}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="px-2.5 py-1 bg-[#121923] border border-[#263140] text-[#8D98A8] text-[11px]">
              SOLVED: <span className="text-[#F4F5F7] font-bold">{solvedCount}</span> / {missions.length}
            </span>
            <span className={`px-2.5 py-1 text-[11px] font-bold border ${
              activeStageData.status === 'COMPLETED' 
                ? 'bg-[#4FB286]/10 text-[#4FB286] border-[#4FB286]/30'
                : activeStageData.status === 'IN_PROGRESS'
                ? 'bg-[#C8A96B]/10 text-[#C8A96B] border-[#C8A96B]/30'
                : activeStageData.status === 'AVAILABLE'
                ? 'bg-[#121923] text-[#F4F5F7] border-[#263140]'
                : 'bg-[#0C111A] text-[#566375] border-[#1C2633]'
            }`}>
              {activeStageData.status}
            </span>
          </div>
        </div>

        {/* Interactive Heist Node Progression Path */}
        <div className="relative z-10 px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 relative">
            {stageStats.map((stg, idx) => {
              const isSelected = selectedStageId === stg.id;
              const isLocked = stg.status === 'LOCKED';
              const isCompleted = stg.status === 'COMPLETED';
              const isInProgress = stg.status === 'IN_PROGRESS';

              return (
                <div
                  key={stg.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectStage(stg.id);
                  }}
                  onMouseEnter={() => setHoveredStage(stg.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                  className={`relative p-3 sm:p-3.5 border transition-all cursor-pointer flex flex-col justify-between min-h-[140px] sm:min-h-[160px] group ${
                    isSelected
                      ? 'bg-[#121923] border-[#C8A96B] shadow-[0_0_20px_rgba(200,169,107,0.15)] ring-1 ring-[#C8A96B]'
                      : isCompleted
                      ? 'bg-[#0C111A]/90 border-[#C8A96B]/40 hover:border-[#C8A96B]'
                      : isInProgress
                      ? 'bg-[#121923]/90 border-[#D6A85F]/50 hover:border-[#C8A96B]'
                      : !isLocked
                      ? 'bg-[#0C111A]/80 border-[#263140] hover:border-[#8D98A8]'
                      : 'bg-[#070B12]/80 border-[#1C2633] opacity-60'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div className={`h-[2px] w-full absolute top-0 left-0 ${
                    isSelected ? 'bg-[#C8A96B]' : isCompleted ? 'bg-[#C8A96B]/80' : isInProgress ? 'bg-[#D6A85F]' : !isLocked ? 'bg-[#263140]' : 'bg-transparent'
                  }`} />

                  {/* Stage Order & Lock Icon */}
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className={`text-[10px] font-bold ${
                      isCompleted ? 'text-[#C8A96B]' : isSelected ? 'text-[#C8A96B]' : 'text-[#8D98A8]'
                    }`}>
                      0{stg.order}
                    </span>

                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A96B]" />
                    ) : isLocked ? (
                      <Lock className="w-3.5 h-3.5 text-[#566375]" />
                    ) : isInProgress ? (
                      <div className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
                    ) : (
                      <Unlock className="w-3.5 h-3.5 text-[#8D98A8]" />
                    )}
                  </div>

                  {/* Stage Title */}
                  <div className="space-y-1 my-auto">
                    <h4 className={`font-mono text-xs font-bold uppercase tracking-wider leading-tight transition-colors ${
                      isSelected ? 'text-[#C8A96B]' : isCompleted ? 'text-[#F4F5F7]' : !isLocked ? 'text-[#F4F5F7] group-hover:text-[#C8A96B]' : 'text-[#566375]'
                    }`}>
                      {stg.name}
                    </h4>
                    <p className="text-[10px] text-[#8D98A8] line-clamp-2 font-sans hidden sm:block">
                      {stg.subtitle}
                    </p>
                  </div>

                  {/* Progress ratio */}
                  <div className="pt-2 border-t border-[#263140]/60 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#8D98A8]">SECTOR</span>
                    <span className={isCompleted ? 'text-[#C8A96B] font-bold' : isLocked ? 'text-[#566375]' : 'text-[#F4F5F7]'}>
                      {stg.totalMissions > 0 ? `${stg.solvedMissions}/${stg.totalMissions}` : 'VAULT'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Panel Bar */}
        <div className="relative z-10 bg-[#121923]/95 border-t border-[#263140] p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3.5">
            <div className="w-10 h-10 bg-[#0C111A] border border-[#263140] flex items-center justify-center shrink-0 text-[#C8A96B]">
              <Crosshair className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#F4F5F7]">
                  {activeStageData.name}: {activeStageData.subtitle}
                </span>
                <span className="text-[10px] font-mono text-[#8D98A8]">
                  [{activeStageData.sector}]
                </span>
              </div>
              <p className="text-xs text-[#8D98A8] font-sans mt-0.5 max-w-3xl">
                {activeStageData.description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end md:self-auto shrink-0 font-mono text-xs">
            {activeStageData.status === 'LOCKED' ? (
              <div className="px-3 py-1.5 bg-[#0C111A] border border-[#1C2633] text-[#566375] text-[11px] flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>SOLVE {activeStageData.requiredSolvedToUnlock - solvedCount} MORE TO UNLOCK</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectStage(activeStageData.id);
                  const el = document.getElementById('missions-dossier-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-[#C8A96B] hover:bg-[#D6A85F] text-[#070B12] font-bold text-xs tracking-wider transition-colors cursor-pointer"
              >
                <span>VIEW MISSIONS ({activeStageData.totalMissions})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full Blueprint Lightbox Modal */}
      {showBlueprintModal && (
        <div className="fixed inset-0 z-50 bg-[#070B12]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#0C111A] border border-[#263140] max-w-5xl w-full p-4 sm:p-6 space-y-4 font-mono shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#263140]">
              <div>
                <span className="text-xs font-bold text-[#C8A96B] tracking-wider uppercase block">
                  SITE-DELTA ARCHITECTURAL BLUEPRINT // CLASSIFIED
                </span>
                <span className="text-[11px] text-[#8D98A8]">
                  DEEP GEOLOGICAL ISOLATION BUNKER • STRUCTURAL & RF SCHEMATICS
                </span>
              </div>
              <button
                onClick={() => setShowBlueprintModal(false)}
                className="px-3 py-1 bg-[#121923] hover:bg-[#263140] text-[#F4F5F7] text-xs border border-[#263140] transition-colors cursor-pointer"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="relative bg-[#070B12] border border-[#263140] overflow-hidden max-h-[70vh] flex items-center justify-center">
              <img
                src={getAssetUrl('/assets/heist/backgrounds/technical_blueprint.jpg')}
                alt="Facility Blueprint Schematics"
                className="w-full h-auto object-contain max-h-[70vh]"
              />
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#8D98A8]">
              <span>SECURITY RATING: HARDENED MIL-SPEC // CANARA ENGINEERING COLLEGE CYBER LABS</span>
              <span className="text-[#C8A96B]">ALL CORRIDORS COVERED BY SENSOR NODES</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
