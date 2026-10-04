import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useGame } from '../../../context/GameContext';
import { HEIST_STAGES_CONFIG } from '../../../data/heistGameData';
import RoomGuideBar from '../RoomGuideBar';
import ObjectivePanel from '../ObjectivePanel';
import CrewAvatar from '../CrewAvatar';
import InteractiveObject from '../InteractiveObject';
import Door from '../Door';
import DirectRouteGuard from '../DirectRouteGuard';
import { sound } from '../../../utils/audio';
import { getAssetUrl } from '../../../utils/formatters';
import { Lock, Unlock, Cpu, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CoreRoom() {
  const navigate = useNavigate();
  const { onAdvanceRoom } = useOutletContext() || {};
  const { 
    openInGameMission, 
    isRoomCompleted, 
    missions,
    hasItem 
  } = useGame();

  const stage = HEIST_STAGES_CONFIG.find(s => s.id === 'core');
  const isCompleted = isRoomCompleted('core');
  const [isMoving, setIsMoving] = useState(false);

  const primaryMission = missions.find(m => m.id === stage.primaryMissionId);
  const isAdminSolved = primaryMission?.status === 'SOLVED' || isCompleted;

  // Subsystem requirements checklist (Requirement 16)
  const requirements = [
    { name: "NETWORK KEY", isComplete: true },
    { name: "ENCRYPTION KEY", isComplete: true },
    { name: "ADMIN ACCESS", isComplete: isAdminSolved, isActionable: true },
    { name: "SECURITY BYPASS", isComplete: true }
  ];

  const completedCount = requirements.filter(r => r.isComplete).length;
  const isCoreAccessGranted = completedCount === requirements.length;

  const handleInteract = (obj) => {
    if (obj.type === 'door') {
      if (isCoreAccessGranted) {
        handleProceedNext();
      } else {
        sound.playError();
      }
      return;
    }

    if (obj.missionId) {
      openInGameMission(obj.missionId);
    }
  };

  const handleProceedNext = () => {
    setIsMoving(true);
    sound.playDoorUnlock();
    setTimeout(() => {
      if (onAdvanceRoom) {
        onAdvanceRoom('/heist/vault', 'SECTOR-OMEGA (THE DIGITAL VAULT)');
      } else {
        navigate('/heist/vault');
      }
    }, 600);
  };

  return (
    <DirectRouteGuard stageId="core">
      <div className="w-full flex-1 flex flex-col justify-between py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        
        {/* Room Header & Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0C111A] border border-[#263140] p-4 font-mono">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] text-[#C8A96B] font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
              <span>{stage.sector}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#F4F5F7] tracking-wider uppercase">
              ROOM 06 // {stage.title}
            </h2>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="bg-[#070B12] px-3 py-1.5 border border-[#263140]">
              <span className="text-[#8D98A8] text-[10px] uppercase block">CLEARANCE</span>
              <span className="font-bold text-[#C8A96B]">{stage.accessLevel}</span>
            </div>
            <div className="bg-[#070B12] px-3 py-1.5 border border-[#263140]">
              <span className="text-[#8D98A8] text-[10px] uppercase block">SUBSYSTEMS</span>
              <span className={`font-bold ${isCoreAccessGranted ? 'text-[#4FB286]' : 'text-[#C8A96B]'}`}>
                {completedCount} / 4 VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Environmental Viewport (Core Mainframe Server) */}
        <div className="relative min-h-[360px] sm:min-h-[420px] bg-[#0C111A] border border-[#263140] overflow-hidden flex flex-col justify-between p-4 sm:p-6 shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-100 hover:scale-[1.01] transition-transform duration-700 pointer-events-none"
            style={{ backgroundImage: `url('${getAssetUrl(stage.bgImage)}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-transparent to-[#070B12]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />

          {/* Top In-World Floating HUD */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <CrewAvatar isMoving={isMoving} />

            <div className="font-mono text-xs bg-[#070B12]/90 border border-[#263140] px-3 py-1 text-[#8D98A8]">
              STATUS: <span className={isCoreAccessGranted ? "text-[#4FB286] font-bold" : "text-[#C8A96B]"}>
                {isCoreAccessGranted ? "CORE ACCESS GRANTED" : "AWAITING ADMIN PRIVILEGES"}
              </span>
            </div>
          </div>

          {/* Core Subsystem Verification Panel (Requirement 16) */}
          <div className="relative z-10 my-4 max-w-lg mx-auto w-full select-none">
            <div className="bg-[#070B12]/95 border-2 border-[#263140] p-4 sm:p-5 backdrop-blur-md space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-[#263140] pb-2">
                <span className="text-xs font-bold text-[#F4F5F7] tracking-wider uppercase flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-[#C8A96B]" />
                  <span>CORE ACCESS PROTOCOL</span>
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 border ${
                  isCoreAccessGranted ? 'bg-[#4FB286]/15 border-[#4FB286] text-[#4FB286]' : 'bg-[#C8A96B]/15 border-[#C8A96B] text-[#C8A96B]'
                }`}>
                  REQUIRED: {completedCount} / 4
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {requirements.map((req, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-2.5 border ${
                      req.isComplete 
                        ? 'bg-[#4FB286]/10 border-[#4FB286]/30 text-[#4FB286]' 
                        : 'bg-[#121923] border-[#263140] text-[#8D98A8]'
                    }`}
                  >
                    <span className="font-bold tracking-wider">{req.name}</span>
                    {req.isComplete ? (
                      <span className="flex items-center space-x-1 text-[#4FB286] font-bold text-[10px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>COMPLETE</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => openInGameMission(stage.primaryMissionId)}
                        className="px-2 py-0.5 bg-[#C8A96B] hover:bg-[#E5D0A0] text-[#070B12] text-[10px] font-bold uppercase transition-colors cursor-pointer"
                      >
                        RESOLVE CHALLENGE
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isCoreAccessGranted && (
                <div className="pt-2 text-center text-xs text-[#4FB286] font-bold tracking-widest uppercase animate-pulse">
                  ✓ CORE ACCESS GRANTED // THE VAULT UNLOCKED
                </div>
              )}
            </div>
          </div>

          {/* Bottom Objective Panel */}
          <div className="relative z-10">
            <ObjectivePanel
              objective={stage.objective}
              description={stage.objectiveDescription}
              isCompleted={isCoreAccessGranted}
              onNextRoom={handleProceedNext}
              nextRoomName="THE VAULT"
            />
          </div>
        </div>

        {/* Step-by-Step Operator Guide & High-Visibility Completion Banner */}
        <RoomGuideBar
          isCompleted={isCoreAccessGranted}
          primaryMission={primaryMission}
          primaryObjectName={stage.interactiveObjects.find(o => o.missionId === stage.primaryMissionId)?.name || "HSM Cryptographic Core"}
          nextRoomName="THE VAULT"
          onProceedNext={handleProceedNext}
          onOpenPrimaryMission={() => openInGameMission(stage.primaryMissionId)}
        />

        {/* Interactive In-World Objects & Security Door */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stage.interactiveObjects.map((obj) => (
            <InteractiveObject
              key={obj.id}
              object={obj}
              isPrimary={obj.missionId === stage.primaryMissionId}
              isCompleted={obj.missionId ? (missions.find(m => m.id === obj.missionId)?.status === 'SOLVED') : isCoreAccessGranted}
              onInteract={handleInteract}
            />
          ))}
        </div>

        {/* Dedicated Door Progression Mechanism */}
        <Door
          name={stage.doorName}
          status={isCoreAccessGranted ? 'OPEN' : 'LOCKED'}
          onOpen={handleProceedNext}
          nextRoomName="THE VAULT"
        />

      </div>
    </DirectRouteGuard>
  );
}
