import React from 'react';
import HeistRoomLayout from '../HeistRoomLayout';
import { ShieldAlert } from 'lucide-react';

export default function SecurityRoom() {
  return (
    <HeistRoomLayout
      roomNumber={5}
      roomId="security"
      roomTitle="SECURITY OPERATIONS"
      bgImage="/assets/heist/surveillance/cctv_wall.jpg"
      objectiveTitle="Disable physical barrier controls."
      objectiveDescription="Deactivate blast doors and automated defensive protocols."
      objectName="SECURITY CONTROL"
      objectDescription="Primary terminal controlling facility blast interlocks."
      objectIcon={ShieldAlert}
      actionButtonText="DISABLE"
      completedStatusText="BARRIER DEACTIVATED"
      nextRoute="/heist/core"
      nextRoomName="CORE SYSTEM"
      missionId="mission-03"
      monitoringBadge="SUPERVISOR WALL ACTIVE"
    />
  );
}
