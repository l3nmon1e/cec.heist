import React from 'react';
import HeistRoomLayout from '../HeistRoomLayout';
import { Server } from 'lucide-react';

export default function NetworkRoom() {
  return (
    <HeistRoomLayout
      roomNumber={4}
      roomId="network"
      roomTitle="NETWORK"
      bgImage="/assets/heist/missions/network_ops.jpg"
      objectiveTitle="Gain access to the internal network."
      objectiveDescription="Tap into the switch fabric and locate the core subnet."
      objectName="NETWORK CONSOLE"
      objectDescription="Access main distribution frame routing bus."
      objectIcon={Server}
      actionButtonText="CONNECT"
      completedStatusText="NETWORK COMPROMISED"
      nextRoute="/heist/security"
      nextRoomName="SECURITY OPERATIONS"
      missionId="mission-17"
      monitoringBadge="PLC TELEMETRY STREAMING"
    />
  );
}
