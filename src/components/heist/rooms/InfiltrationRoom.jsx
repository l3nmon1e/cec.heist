import React from 'react';
import HeistRoomLayout from '../HeistRoomLayout';
import { Camera } from 'lucide-react';

export default function InfiltrationRoom() {
  return (
    <HeistRoomLayout
      roomNumber={3}
      roomId="infiltration"
      roomTitle="INFILTRATION"
      bgImage="/assets/heist/missions/restricted_terminal.jpg"
      objectiveTitle="Disable the internal surveillance system."
      objectiveDescription="Cut camera feeds and optical motion sensors."
      objectName="SECURITY PANEL"
      objectDescription="Override local corridor security junction."
      objectIcon={Camera}
      actionButtonText="BYPASS"
      completedStatusText="SECURITY DISABLED"
      nextRoute="/heist/network"
      nextRoomName="NETWORK"
      missionId="mission-08"
      monitoringBadge="CORRIDOR OPTICS ARMED"
    />
  );
}
