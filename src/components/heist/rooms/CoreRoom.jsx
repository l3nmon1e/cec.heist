import React from 'react';
import HeistRoomLayout from '../HeistRoomLayout';
import { Cpu } from 'lucide-react';

export default function CoreRoom() {
  return (
    <HeistRoomLayout
      roomNumber={6}
      roomId="core"
      roomTitle="CORE SYSTEM"
      bgImage="/assets/heist/missions/server_room.jpg"
      objectiveTitle="Overload the central power relay."
      objectiveDescription="Disrupt auxiliary power routing to unseal the vault chamber."
      objectName="CORE TERMINAL"
      objectDescription="Central reactor bus and distribution mainframe."
      objectIcon={Cpu}
      actionButtonText="ACCESS CORE"
      completedStatusText="CORE OVERLOAD INITIATED"
      nextRoute="/heist/vault"
      nextRoomName="THE VAULT"
      missionId="mission-11"
      monitoringBadge="REACTOR CORE ENGAGED"
    />
  );
}
