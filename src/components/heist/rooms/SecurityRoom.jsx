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
import { ShieldAlert, ShieldCheck, Eye, EyeOff, Lock, Unlock, AlertTriangle } from 'lucide-react';

export default function SecurityRoom() {
  const navigate = useNavigate();
  const { onAdvanceRoom } = useOutletContext() || {};
  const { 
    openInGameMission, 
    isRoomCompleted, 
    missions 
  } = useGame();

  const stage = HEIST_STAGES_CONFIG.find(s => s.id === 'security');
  const isCompleted = isRoomCompleted('security');
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
        onAdvanceRoom('/heist/core', 'SECTOR-FOXTROT (CORE)');
      } else {
        navigate('/heist/core');
      }
    }, 500);
  };

  return (
    <DirectRouteGuard stageId="security">
      <div className="w-full flex-1 flex flex-col justify-between py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        
        {/* Room Header & Dangerous Threat Level */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border p-4 font-mono transition-colors duration-500 ${
          isMissionSolved 
            ? 'bg-[#0C111A] border-[#263140]' 
            : 'bg-[#180A0A] border-[#B85C5C]/60 shadow-[0_0_20px_rgba(184,92,92,0.2)]'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest">
              <span className={`w-2 h-2 rounded-full ${isMissionSolved ? 'bg-[#4FB286]' : 'bg-[#B85C5C] animate-ping'}`} />
              <span className={isMissionSolved ? 'text-[#4FB286]' : 'text-[#B85C5C]'}>
                {isMissionSolved ? "THREAT LEVEL: NEUTRALIZED" : "THREAT LEVEL: CRITICAL HAZARD"}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#F4F5F7] tracking-wider uppercase">
              ROOM 05 // {stage.title}
            </h2>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="bg-[#070B12] px-3 py-1.5 border border-[#263140]">
              <span className="text-[#8D98A8] text-[10px] uppercase block">CLEARANCE</span>
              <span className="font-bold text-[#C8A96B]">{stage.accessLevel}</span>
            </div>
            <div className="bg-[#070B12] px-3 py-1.5 border border-[#263140]">
              <span className="text-[#8D98A8] text-[10px] uppercase block">SECURITY GRID</span>
              <span className={`font-bold ${isMissionSolved ? 'text-[#4FB286]' : 'text-[#B85C5C]'}`}>
                {isMissionSolved ? 'OFFLINE // STANDBY' : 'ARMED & MONITORING'}
              </span>
            </div>
          </div>
        </div>

        {/* Environmental Viewport (CCTV Video Wall) */}
        <div className={`relative min-h-[360px] sm:min-h-[420px] border overflow-hidden flex flex-col justify-between p-4 sm:p-6 shadow-2xl transition-colors duration-700 ${
          isMissionSolved ? 'bg-[#0C111A] border-[#263140]' : 'bg-[#120808] border-[#B85C5C]/40'
        }`}>
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none ${
              isMissionSolved ? 'opacity-30 mix-blend-luminosity' : 'opacity-50'
            }`}
            style={{ backgroundImage: `url('${getAssetUrl(stage.bgImage)}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-transparent to-[#070B12]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />

          {/* Top In-World Floating HUD */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <CrewAvatar isMoving={isMoving} />

            {/* Security Grid Status (Requirement 15) */}
            <div className="font-mono text-xs bg-[#070B12]/90 border border-[#263140] p-2 flex items-center space-x-4">
              <div><span className="text-[#8D98A8]">CAMERAS:</span> <span className={`font-bold ${isMissionSolved ? 'text-[#8D98A8]' : 'text-[#B85C5C]'}`}>{isMissionSolved ? 'BLINDED' : 'ACTIVE (16)'}</span></div>
              <div><span className="text-[#8D98A8]">DOORS:</span> <span className={`font-bold ${isMissionSolved ? 'text-[#4FB286]' : 'text-[#B85C5C]'}`}>{isMissionSolved ? 'UNLOCKED' : 'LOCKED'}</span></div>
              <div><span className="text-[#8D98A8]">ALARMS:</span> <span className={`font-bold ${isMissionSolved ? 'text-[#4FB286]' : 'text-[#B85C5C]'}`}>{isMissionSolved ? 'DISARMED' : 'ARMED'}</span></div>
            </div>
          </div>

          {/* CCTV Wall Centerpiece */}
          <div className="relative z-10 my-4 text-center select-none">
            <div className="inline-block bg-[#070B12]/90 border border-[#263140] p-4 sm:p-6 max-w-lg backdrop-blur-sm">
              {isMissionSolved ? (
                <ShieldCheck className="w-8 h-8 text-[#4FB286] mx-auto mb-2 animate-pulse" />
              ) : (
                <ShieldAlert className="w-8 h-8 text-[#B85C5C] mx-auto mb-2 animate-bounce" />
              )}
              <div className="font-mono text-xs font-bold text-[#F4F5F7] tracking-wider uppercase mb-1">
                SECURITY ENCLAVE // CCTV ARRAY WALL
              </div>
              <p className="text-[11px] text-[#8D98A8] font-sans">
                {isMissionSolved 
                  ? "Security Operations Center blinded. CCTV feeds muted with static noise loop."
                  : "Supervisory sentries actively watching. Intercept telemetry and crack Linux shadow hashes to neutralize the defense grid."
                }
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
              nextRoomName="CORE"
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
          nextRoomName="CORE"
        />

      </div>
    </DirectRouteGuard>
  );
}
