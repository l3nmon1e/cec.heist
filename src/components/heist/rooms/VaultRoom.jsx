import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useGame } from '../../../context/GameContext';
import { HEIST_STAGES_CONFIG } from '../../../data/heistGameData';
import ObjectivePanel from '../ObjectivePanel';
import CrewAvatar from '../CrewAvatar';
import InteractiveObject from '../InteractiveObject';
import DirectRouteGuard from '../DirectRouteGuard';
import { sound } from '../../../utils/audio';
import { getAssetUrl } from '../../../utils/formatters';
import { 
  Lock, 
  Unlock, 
  Disc, 
  Sparkles, 
  Trophy, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function VaultRoom() {
  const navigate = useNavigate();
  const { onAdvanceRoom } = useOutletContext() || {};
  const { 
    openInGameMission, 
    isRoomCompleted, 
    missions,
    crewName,
    triggerLockdown,
    lockdownActive
  } = useGame();

  const stage = HEIST_STAGES_CONFIG.find(s => s.id === 'vault');
  const isVaultAlreadyCompleted = isRoomCompleted('vault');

  // Vault Arrival & Protocol State Machine
  const [arrivalStep, setArrivalStep] = useState(isVaultAlreadyCompleted ? 4 : 1); // 1: scan -> 2: locks -> 3: core -> 4: ready
  const [scanProgress, setScanProgress] = useState(isVaultAlreadyCompleted ? 100 : 0);
  const [protocolProgress, setProtocolProgress] = useState(isVaultAlreadyCompleted ? 4 : 0);
  const [isOpeningCinematic, setIsOpeningCinematic] = useState(false);
  const [isAssetAcquired, setIsAssetAcquired] = useState(isVaultAlreadyCompleted);
  const [showLockdownAlert, setShowLockdownAlert] = useState(false);

  const primaryMission = missions.find(m => m.id === stage.primaryMissionId);
  const isMissionSolved = primaryMission?.status === 'SOLVED' || isVaultAlreadyCompleted;

  // Arrival Step 1: Scan progress animation
  useEffect(() => {
    if (arrivalStep === 1 && !isVaultAlreadyCompleted) {
      sound.playBeep(600, 0.05);
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            sound.playSuccess();
            setTimeout(() => setArrivalStep(2), 500);
            return 100;
          }
          return prev + 20;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [arrivalStep, isVaultAlreadyCompleted]);

  // Arrival Step 2 & 3: Lock checks and core online
  useEffect(() => {
    if (arrivalStep === 2) {
      sound.playClick();
      const timer = setTimeout(() => {
        setArrivalStep(3);
      }, 700);
      return () => clearTimeout(timer);
    }
    if (arrivalStep === 3) {
      sound.playBeep(880, 0.08);
      const timer = setTimeout(() => {
        setArrivalStep(4);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [arrivalStep]);

  // When final vault mission is solved, trigger Vault Opening Cinematic
  useEffect(() => {
    if (isMissionSolved && !isAssetAcquired && !isOpeningCinematic) {
      setIsOpeningCinematic(true);
      sound.playVaultMechanisms();

      // Sequence:
      // 1. System warning / mechanisms
      // 2. Pins disengage
      // 3. Vault door opens
      // 4. Asset acquired!
      setTimeout(() => {
        sound.playItemAcquired();
        setIsAssetAcquired(true);
        setIsOpeningCinematic(false);

        // Immediately trigger lockdown sequence (Section 20 & 21)
        setTimeout(() => {
          setShowLockdownAlert(true);
          triggerLockdown();

          // Navigate to escape route after 2.5 seconds
          setTimeout(() => {
            if (onAdvanceRoom) {
              onAdvanceRoom('/heist/escape', 'SECTOR-EXFIL (EMERGENCY ESCAPE)');
            } else {
              navigate('/heist/escape');
            }
          }, 2500);
        }, 1500);
      }, 2000);
    }
  }, [isMissionSolved, isAssetAcquired, isOpeningCinematic]);

  const handleProtocolClick = () => {
    if (isAssetAcquired) {
      navigate('/heist/escape');
      return;
    }
    openInGameMission(stage.primaryMissionId);
  };

  return (
    <DirectRouteGuard stageId="vault">
      <div className="w-full flex-1 flex flex-col justify-between py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 font-mono select-none">
        
        {/* Room Header & Telemetry */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border p-4 transition-colors duration-500 ${
          showLockdownAlert 
            ? 'bg-[#180A0A] border-[#B85C5C] shadow-[0_0_25px_rgba(184,92,92,0.3)]' 
            : 'bg-[#0C111A] border-[#263140]'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] text-[#C8A96B] font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse" />
              <span>{stage.sector}</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-[#F4F5F7] tracking-wider uppercase">
              ROOM 07 // {stage.title}
            </h2>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-[#070B12] px-3 py-1.5 border border-[#263140]">
              <span className="text-[#8D98A8] text-[10px] uppercase block">SECURITY</span>
              <span className="font-bold text-[#B85C5C]">MAXIMUM</span>
            </div>
            <div className="bg-[#070B12] px-3 py-1.5 border border-[#263140]">
              <span className="text-[#8D98A8] text-[10px] uppercase block">VAULT STATUS</span>
              <span className={`font-bold ${isAssetAcquired ? 'text-[#4FB286]' : 'text-[#C8A96B]'}`}>
                {isAssetAcquired ? 'BREACHED // ASSET SECURED' : 'ARMORED // LOCKED'}
              </span>
            </div>
          </div>
        </div>

        {/* Environmental Viewport (The Massive Vault Blast Door) */}
        <div className="relative min-h-[440px] sm:min-h-[500px] bg-[#070B12] border-2 border-[#263140] overflow-hidden flex flex-col justify-between p-4 sm:p-6 shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-100 hover:scale-[1.01] transition-transform duration-700 pointer-events-none"
            style={{ backgroundImage: `url('${getAssetUrl(stage.bgImage)}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-transparent to-[#070B12]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />

          {/* Top In-World Floating HUD */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <CrewAvatar isMoving={isOpeningCinematic} />

            <div className="text-xs bg-[#0C111A]/90 border border-[#263140] px-3 py-1 text-[#8D98A8]">
              LOCKING CYLINDERS: <span className="text-[#C8A96B] font-bold">TITANIUM INTERLOCK</span>
            </div>
          </div>

          {/* Central Massive Vault Wheel & Protocol Interface */}
          <div className="relative z-10 my-4 max-w-xl mx-auto w-full text-center">
            
            {/* STEP 1: Arrival Scanning */}
            {arrivalStep === 1 && (
              <div className="bg-[#0C111A]/95 border border-[#263140] p-6 space-y-4 backdrop-blur-md">
                <Radio className="w-8 h-8 text-[#C8A96B] mx-auto animate-pulse" />
                <div className="text-xs font-bold text-[#F4F5F7] tracking-widest uppercase">
                  STEP 1 // CREW IDENTIFICATION
                </div>
                <div className="text-[11px] text-[#8D98A8]">SCANNING OPERATIVE SIGNATURES...</div>
                <div className="w-full bg-[#070B12] h-2 border border-[#263140] overflow-hidden">
                  <div className="bg-[#C8A96B] h-full transition-all duration-200" style={{ width: `${scanProgress}%` }} />
                </div>
                <div className="text-xs font-bold text-[#C8A96B]">{scanProgress}% COMPLETE</div>
              </div>
            )}

            {/* STEP 2 & 3: Verification Checks */}
            {(arrivalStep === 2 || arrivalStep === 3) && (
              <div className="bg-[#0C111A]/95 border border-[#263140] p-6 space-y-3 backdrop-blur-md">
                <div className="text-xs font-bold text-[#4FB286] tracking-widest uppercase flex items-center justify-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>IDENTITY VERIFIED // CREW {crewName || "GHOST-07"}</span>
                </div>
                <div className="text-xs text-[#8D98A8]">
                  {arrivalStep === 2 ? "DISENGAGING PERIMETER LATCHES..." : "VAULT CORE: ONLINE"}
                </div>
              </div>
            )}

            {/* STEP 4: Ready for The Vault Protocol */}
            {arrivalStep === 4 && (
              <div className="bg-[#0C111A]/95 border-2 border-[#263140] p-5 sm:p-6 backdrop-blur-md space-y-4">
                
                {/* Vault Door Mechanism Graphic */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full border-4 border-[#263140] bg-[#070B12] flex items-center justify-center shadow-[0_0_35px_rgba(0,0,0,0.8)] overflow-hidden">
                  <div className={`absolute inset-0 rounded-full border-4 border-dashed border-[#C8A96B]/40 ${isOpeningCinematic ? 'animate-spin' : ''}`} />
                  
                  {isAssetAcquired ? (
                    <Trophy className="w-12 h-12 text-[#C8A96B] animate-bounce shadow-lg" />
                  ) : (
                    <Disc className={`w-14 h-14 ${isOpeningCinematic ? 'text-[#4FB286] animate-spin' : 'text-[#C8A96B]'}`} />
                  )}
                </div>

                {/* Status Callout */}
                {isAssetAcquired ? (
                  <div className="space-y-2">
                    <div className="text-sm sm:text-base font-black text-[#4FB286] tracking-widest uppercase animate-pulse">
                      ASSET ACQUIRED // OBJECTIVE COMPLETE
                    </div>
                    <p className="text-xs text-[#8D98A8] font-sans">
                      The Sovereign Cryptographic Kernel has been downloaded to local operative memory.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-[#C8A96B] tracking-widest uppercase">
                      THE VAULT PROTOCOL // MASTER CIPHER
                    </div>
                    <p className="text-xs text-[#8D98A8] font-sans">
                      Disengage dynamic domain algorithms to breach the Master Vault and extract the digital asset.
                    </p>
                  </div>
                )}

                {/* 4 Protocol Subsystem Indicator Badges (Requirement 19) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                  <div className={`p-2 border ${isMissionSolved ? 'bg-[#4FB286]/15 border-[#4FB286] text-[#4FB286]' : 'bg-[#070B12] border-[#263140] text-[#8D98A8]'}`}>
                    <div className="font-bold">ENCRYPTION</div>
                    <div>{isMissionSolved ? 'BREACHED' : 'ARMED'}</div>
                  </div>
                  <div className={`p-2 border ${isMissionSolved ? 'bg-[#4FB286]/15 border-[#4FB286] text-[#4FB286]' : 'bg-[#070B12] border-[#263140] text-[#8D98A8]'}`}>
                    <div className="font-bold">AUTHENTICATION</div>
                    <div>{isMissionSolved ? 'VERIFIED' : 'PENDING'}</div>
                  </div>
                  <div className={`p-2 border ${isMissionSolved ? 'bg-[#4FB286]/15 border-[#4FB286] text-[#4FB286]' : 'bg-[#070B12] border-[#263140] text-[#8D98A8]'}`}>
                    <div className="font-bold">ACCESS CONTROL</div>
                    <div>{isMissionSolved ? 'DISABLED' : 'ENGAGED'}</div>
                  </div>
                  <div className={`p-2 border ${isMissionSolved ? 'bg-[#4FB286]/15 border-[#4FB286] text-[#4FB286]' : 'bg-[#070B12] border-[#263140] text-[#8D98A8]'}`}>
                    <div className="font-bold">CORE PROTOCOL</div>
                    <div>{isMissionSolved ? 'UNLOCKED' : 'LOCKED'}</div>
                  </div>
                </div>

                {/* Trigger Button */}
                {!isAssetAcquired && (
                  <button
                    onClick={handleProtocolClick}
                    className="w-full py-3 bg-[#C8A96B] hover:bg-[#E5D0A0] text-[#070B12] text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(200,169,107,0.3)] cursor-pointer"
                  >
                    EXECUTE FINAL VAULT PROTOCOL
                  </button>
                )}

              </div>
            )}

          </div>

          {/* Bottom Objective Panel */}
          <div className="relative z-10">
            <ObjectivePanel
              objective={isAssetAcquired ? "ESCAPE THE FACILITY" : stage.objective}
              description={isAssetAcquired ? "Facility lockdown initiated! Retreat through the egress shaft immediately." : stage.objectiveDescription}
              isCompleted={isAssetAcquired}
              onNextRoom={() => navigate('/heist/escape')}
              nextRoomName="ESCAPE ROUTE"
            />
          </div>
        </div>

        {/* Interactive In-World Objects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stage.interactiveObjects.map((obj) => (
            <InteractiveObject
              key={obj.id}
              object={obj}
              isCompleted={isAssetAcquired}
              onInteract={handleProtocolClick}
            />
          ))}
        </div>

        {/* Lockdown Flash Banner Alert */}
        {showLockdownAlert && (
          <div className="p-4 bg-[#B85C5C] text-[#070B12] font-mono text-center font-black tracking-widest uppercase animate-pulse shadow-[0_0_30px_#B85C5C] space-y-1">
            <div className="text-base flex items-center justify-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>ASSET ACQUIRED // FACILITY LOCKDOWN INITIATED</span>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-xs">
              REDIRECTING TO EMERGENCY EGRESS SHAFT...
            </div>
          </div>
        )}

      </div>
    </DirectRouteGuard>
  );
}
