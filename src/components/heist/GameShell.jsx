import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import GameHUD from './GameHUD';
import SectorStepper from './SectorStepper';
import FacilityMapModal from './FacilityMapModal';
import InventoryModal from './InventoryModal';
import MissionPanel from './MissionPanel';
import MobileGameDock from './MobileGameDock';
import GameTransition from './GameTransition';
import { getStageByRoute } from '../../data/heistGameData';
import { sound } from '../../utils/audio';

export default function GameShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    isFacilityMapOpen, 
    setIsFacilityMapOpen, 
    isInventoryOpen, 
    setIsInventoryOpen,
    activeInGameMission,
    closeInGameMission,
    isTransitioning,
    transitionData,
    finishTransition,
    startTransition,
    openInGameMission
  } = useGame();

  const currentStage = getStageByRoute(location.pathname);
  const targetRouteRef = React.useRef(null);

  const handleExitHeist = () => {
    sound.playClick();
    navigate('/');
  };

  const handleAdvanceToRoute = (targetRoute, nextTitle = "NEXT SECTOR") => {
    targetRouteRef.current = targetRoute;
    startTransition("ACCESS GRANTED", `ADVANCING TO ${nextTitle}`, targetRoute);
  };

  const handleTransitionComplete = () => {
    const route = targetRouteRef.current || transitionData?.nextRoute;
    finishTransition();
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-[#F4F5F7] flex flex-col font-sans relative selection:bg-[#C8A96B] selection:text-[#070B12] pb-16 md:pb-0">
      
      {/* Background blueprint grid texture */}
      <div className="fixed inset-0 bg-blueprint-grid opacity-30 pointer-events-none z-0" />

      {/* Persistent Game HUD */}
      <GameHUD 
        onExitHeist={handleExitHeist} 
        currentStageTitle={currentStage.shortName}
      />

      {/* Sector Stage Progression Stepper */}
      <SectorStepper />

      {/* Game World (Primary Area) */}
      <main className="flex-1 w-full relative z-10 flex flex-col">
        <Outlet context={{ onAdvanceRoom: handleAdvanceToRoute }} />
      </main>

      {/* In-Game Challenge Mission Panel Modal */}
      {activeInGameMission && (
        <MissionPanel
          missionId={activeInGameMission.id || activeInGameMission}
          onClose={closeInGameMission}
          onAdvanceRoom={currentStage.nextRoute ? () => {
            closeInGameMission();
            handleAdvanceToRoute(currentStage.nextRoute, currentStage.nextStageId?.toUpperCase());
          } : null}
          nextRoomName={currentStage.nextStageId?.toUpperCase()}
        />
      )}

      {/* Secondary Facility Map Modal */}
      {isFacilityMapOpen && (
        <FacilityMapModal
          currentStageId={currentStage.id}
          onNavigateRoom={(route) => navigate(route)}
          onClose={() => setIsFacilityMapOpen(false)}
        />
      )}

      {/* Operative Inventory Modal */}
      {isInventoryOpen && (
        <InventoryModal
          onClose={() => setIsInventoryOpen(false)}
        />
      )}

      {/* Seamless Room Transition Curtain */}
      <GameTransition
        isActive={isTransitioning}
        title={transitionData.title || "ACCESS GRANTED"}
        subtitle={transitionData.subtitle || "PROCEEDING TO NEXT SECTOR"}
        onComplete={handleTransitionComplete}
      />

      {/* Dedicated Mobile Game Bottom Dock */}
      <MobileGameDock
        onOpenFacility={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMissions={() => {
          if (currentStage.primaryMissionId && openInGameMission) {
            openInGameMission(currentStage.primaryMissionId);
          } else {
            setIsFacilityMapOpen(true);
          }
        }}
        onOpenMap={() => setIsFacilityMapOpen(true)}
        onOpenScore={() => navigate('/leaderboard')}
        onExitHeist={handleExitHeist}
      />

    </div>
  );
}
