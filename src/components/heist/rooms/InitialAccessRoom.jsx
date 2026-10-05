import React from 'react';
import HeistRoomLayout from '../HeistRoomLayout';
import { Fingerprint } from 'lucide-react';

export default function InitialAccessRoom() {
  return (
    <HeistRoomLayout
      roomNumber={2}
      roomId="initial-access"
      roomTitle="INITIAL ACCESS"
      bgImage="/assets/heist/facility/secure_corridor.jpg"
      objectiveTitle="Bypass the facility authentication system."
      objectiveDescription="Exploit credentials to penetrate perimeter access control."
      objectName="AUTHENTICATION TERMINAL"
      objectDescription="Infiltrate the perimeter biometric barrier gateway."
      objectIcon={Fingerprint}
      actionButtonText="BREACH"
      completedStatusText="ACCESS GRANTED"
      nextRoute="/heist/infiltration"
      nextRoomName="INFILTRATION"
      missionId="mission-01"
      monitoringBadge="AUTH GATEWAY ACTIVE"
    />
  );
}
