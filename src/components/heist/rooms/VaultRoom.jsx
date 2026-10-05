import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import HeistRoomLayout from '../HeistRoomLayout';
import VaultUnlockingSequence from '../VaultUnlockingSequence';
import { useGame } from '../../../context/GameContext';
import { Disc, AlertTriangle } from 'lucide-react';

export default function VaultRoom() {
  const navigate = useNavigate();
  const { onAdvanceRoom } = useOutletContext() || {};
  const { isRoomCompleted, missions, triggerLockdown, lockdownActive } = useGame();
  
  const [isCutsceneActive, setIsCutsceneActive] = useState(false);
  const isMissionSolved = missions.find(m => m.id === 'mission-13')?.status === 'SOLVED' || isRoomCompleted('vault');

  const handleProceedWithCutscene = () => {
    setIsCutsceneActive(true);
  };

  const handleCutsceneComplete = () => {
    setIsCutsceneActive(false);
    if (triggerLockdown) {
      triggerLockdown();
    }

    if (onAdvanceRoom) {
      onAdvanceRoom('/heist/escape', 'EMERGENCY ESCAPE ROUTE');
    } else {
      navigate('/heist/escape');
    }
  };

  return (
    <div className="relative w-full flex-1 flex flex-col justify-between">
      {/* Red Alert Banner if lockdown triggered */}
      {isMissionSolved && (
        <div className="bg-[#180A0A] border border-[#B85C5C] px-4 py-2 font-mono text-center text-xs text-[#B85C5C] flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(184,92,92,0.3)] max-w-6xl mx-auto w-full mt-2">
          <AlertTriangle className="w-4 h-4 animate-ping shrink-0" />
          <span className="font-black tracking-widest uppercase">
            EVENT: FACILITY LOCKDOWN TRIGGERED — EXFILTRATE IMMEDIATELY
          </span>
        </div>
      )}

      <HeistRoomLayout
        roomNumber={7}
        roomId="vault"
        roomTitle="THE VAULT"
        bgImage="/assets/heist/vault/vault_entrance.jpg"
        objectiveTitle="Breach the primary vault door."
        objectiveDescription="Crack the cipher mechanism and extract the encrypted master asset."
        objectName="VAULT CONTROL"
        objectDescription="Heavy hydraulic vault locking mechanism."
        objectIcon={Disc}
        actionButtonText="BREACH VAULT"
        completedStatusText="VAULT UNLOCKED"
        nextRoute="/heist/escape"
        nextRoomName="ESCAPE ROUTE"
        missionId="mission-13"
        monitoringBadge={isMissionSolved ? "LOCKDOWN ACTIVE" : "VAULT INTERLOCK ARMED"}
        customSuccessAction={handleProceedWithCutscene}
      />

      {/* Fullscreen Procedural 3D Vault Unlocking Cutscene */}
      <VaultUnlockingSequence
        isActive={isCutsceneActive}
        onComplete={handleCutsceneComplete}
      />
    </div>
  );
}
