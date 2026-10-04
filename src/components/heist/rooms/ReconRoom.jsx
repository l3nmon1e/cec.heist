import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useGame } from '../../../context/GameContext';
import { HEIST_STAGES_CONFIG } from '../../../data/heistGameData';
import ObjectivePanel from '../ObjectivePanel';
import CrewAvatar from '../CrewAvatar';
import InteractiveObject from '../InteractiveObject';
import Door from '../Door';
import DirectRouteGuard from '../DirectRouteGuard';
import { sound } from '../../../utils/audio';
import { getAssetUrl } from '../../../utils/formatters';
import { Eye, Shield, Radio, CheckCircle2, Lock, Unlock } from 'lucide-react';

export default function ReconRoom() {
  const navigate = useNavigate();
  const { onAdvanceRoom } = useOutletContext() || {};
  const { 
    openInGameMission, 
    isRoomCompleted, 
    missions,
    crewName 
  } = useGame();

  const stage = HEIST_STAGES_CONFIG.find(s => s.id === 'recon');
  const isCompleted = isRoomCompleted('recon');
  const [isMoving, setIsMoving] = useState(false);

  const primaryMission = missions.find(m => m.id === stage.primaryMissionId);
  const isMissionSolved = primaryMission?.status === 'SOLVED' || isCompleted;

  const handleInteract = (obj) => {
    if (obj.type === 'door') {
      if (isMissionSolved) {
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
        onAdvanceRoom('/heist/initial-access', 'SECTOR-BRAVO (INITIAL ACCESS)');
      } else {
        navigate('/heist/initial-access');
      }
    }, 500);
  };

  return (
    <DirectRouteGuard stageId="recon">
      <div className="w-full flex-1 flex flex-col justify-between py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        
        {/* Room Header & Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0C111A] border border-[#263140] p-4 font-mono">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] text-[#C8A96B] font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
              <span>{stage.sector}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#F4F5F7] tracking-wider uppercase">
              ROOM 01 // {stage.title}
            </h2>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="bg-[#070B12] px-3 py-1.5 border border-[#263140]">
              <span className="text-[#8D98A8] text-[10px] uppercase block">CLEARANCE</span>
              <span className="font-bold text-[#C8A96B]">{stage.accessLevel}</span>
            </div>
            <div className="bg-[#070B12] px-3 py-1.5 border border-[#263140]">
              <span className="text-[#8D98A8] text-[10px] uppercase block">STATUS</span>
              <span className={`font-bold ${isMissionSolved ? 'text-[#4FB286]' : 'text-[#D6A85F]'}`}>
                {isMissionSolved ? 'CLEARED' : 'UNSECURED'}
              </span>
            </div>
          </div>
        </div>

        {/* Environmental Panoramic Viewport */}
        <div className="relative min-h-[360px] sm:min-h-[420px] bg-[#0C111A] border border-[#263140] overflow-hidden flex flex-col justify-between p-4 sm:p-6 shadow-2xl">
          {/* Room Photographic Environment Asset */}
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
              MONITORING: <span className="text-[#4FB286]">PERIMETER SENSORS ONLINE</span>
            </div>
          </div>

          {/* Mid World Visual Centerpiece (Surveillance Video Monitors) */}
          <div className="relative z-10 my-4 text-center select-none">
            <div className="inline-block bg-[#070B12]/90 border border-[#263140] p-4 sm:p-6 max-w-lg backdrop-blur-sm">
              <Eye className="w-8 h-8 text-[#C8A96B] mx-auto mb-2 animate-pulse" />
              <div className="font-mono text-xs font-bold text-[#F4F5F7] tracking-wider uppercase mb-1">
                SURVEILLANCE WORKSTATION FEED #01
              </div>
              <p className="text-[11px] text-[#8D98A8] font-sans">
                "An internal blueprint has been leaked. Locate the information required to identify the facility's first access point."
              </p>
            </div>
          </div>

          {/* Bottom Objective Panel */}
          <div className="relative z-10">
            <ObjectivePanel
              objective={stage.objective}
              description={stage.objectiveDescription}
              isCompleted={isMissionSolved}
              onNextRoom={handleProceedNext}
              nextRoomName="INITIAL ACCESS"
            />
          </div>
        </div>

        {/* Interactive In-World Objects & Security Door */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stage.interactiveObjects.map((obj) => (
            <InteractiveObject
              key={obj.id}
              object={obj}
              isCompleted={obj.missionId ? (missions.find(m => m.id === obj.missionId)?.status === 'SOLVED') : isMissionSolved}
              onInteract={handleInteract}
            />
          ))}
        </div>

        {/* Dedicated Door Progression Mechanism */}
        <Door
          name={stage.doorName}
          status={isMissionSolved ? 'OPEN' : 'LOCKED'}
          onOpen={handleProceedNext}
          nextRoomName="INITIAL ACCESS"
        />

      </div>
    </DirectRouteGuard>
  );
}
