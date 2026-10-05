import React from 'react';
import HeistRoomLayout from '../HeistRoomLayout';
import { Eye } from 'lucide-react';

export default function ReconRoom() {
  return (
    <HeistRoomLayout
      roomNumber={1}
      roomId="recon"
      roomTitle="RECONNAISSANCE"
      bgImage="/assets/heist/facility/facility_wide.jpg"
      objectiveTitle="Find the first access point."
      objectiveDescription="Locate the information hidden inside the surveillance system."
      objectName="SURVEILLANCE TERMINAL"
      objectDescription="Access the compromised surveillance workstation."
      objectIcon={Eye}
      actionButtonText="INVESTIGATE"
      completedStatusText="ACCESS GRANTED"
      nextRoute="/heist/initial-access"
      nextRoomName="INITIAL ACCESS"
      missionId="mission-14"
      monitoringBadge="PERIMETER SENSORS ONLINE"
    />
  );
}
