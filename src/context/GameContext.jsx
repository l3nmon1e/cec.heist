import React, { createContext, useContext, useState, useEffect } from 'react';
import { MISSIONS_DATA } from '../data/missions';
import { INITIAL_LEADERBOARD, ACTIVITY_FEED } from '../data/leaderboard';
import { HEIST_STAGES_CONFIG } from '../data/heistGameData';
import { sound } from '../utils/audio';
import { formatTimer } from '../utils/formatters';

const GameContext = createContext();

export const ALL_SECTORS = [
  'entrance',
  'recon',
  'initial-access',
  'infiltration',
  'network',
  'security',
  'core',
  'vault',
  'escape'
];

const STORAGE_KEY = 'CEC_HEIST_V3';

export function GameProvider({ children }) {
  const [missions, setMissions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_MISSIONS');
      return saved ? JSON.parse(saved) : MISSIONS_DATA;
    } catch {
      return MISSIONS_DATA;
    }
  });

  const [unlockedHints, setUnlockedHints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_HINTS');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_SUBS');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_LEADERBOARD');
      return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
    } catch {
      return INITIAL_LEADERBOARD;
    }
  });

  const [activities, setActivities] = useState(() => ACTIVITY_FEED);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedMissionId, setSelectedMissionId] = useState('mission-08');
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Heist Central Game State
  const [crewName, setCrewName] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY + '_CREW') || 'GHOST-07';
    } catch {
      return 'GHOST-07';
    }
  });

  // Heist Mode: EXPLORATION (Free-Roam Preview) vs COMPETITION (Strict Progression Lock)
  const [heistMode, setHeistMode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY + '_HEIST_MODE') || 'COMPETITION';
    } catch {
      return 'COMPETITION';
    }
  });

  const toggleHeistMode = () => {
    sound.playClick();
    setHeistMode(prev => {
      const next = prev === 'EXPLORATION' ? 'COMPETITION' : 'EXPLORATION';
      try {
        localStorage.setItem(STORAGE_KEY + '_HEIST_MODE', next);
      } catch {}
      return next;
    });
  };

  const [unlockedRooms, setUnlockedRooms] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_UNLOCKED_ROOMS');
      const list = saved ? JSON.parse(saved) : ['entrance', 'recon'];
      return Array.from(new Set(['entrance', 'recon', ...list]));
    } catch {
      return ['entrance', 'recon'];
    }
  });

  const [completedRooms, setCompletedRooms] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_COMPLETED_ROOMS');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_INVENTORY');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lockdownActive, setLockdownActive] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY + '_LOCKDOWN') === 'true';
    } catch {
      return false;
    }
  });

  const [lockdownSecondsRemaining, setLockdownSecondsRemaining] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_LOCKDOWN_TIME');
      return saved ? parseInt(saved, 10) : 300;
    } catch {
      return 300;
    }
  });

  const [escapeComplete, setEscapeComplete] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY + '_ESCAPED') === 'true';
    } catch {
      return false;
    }
  });

  // UI Overlays & In-Game Modals
  const [isFacilityMapOpen, setIsFacilityMapOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [activeInGameMission, setActiveInGameMission] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState({ title: '', subtitle: '', nextRoute: null });

  // Countdown timer: 02:47:18 -> ~10038 seconds
  const [secondsRemaining, setSecondsRemaining] = useState(10038);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY + '_BROADCAST') || '';
    } catch {
      return '';
    }
  });

  const setGlobalBroadcast = (msg) => {
    setBroadcastMessage(msg);
    try {
      if (msg) localStorage.setItem(STORAGE_KEY + '_BROADCAST', msg);
      else localStorage.removeItem(STORAGE_KEY + '_BROADCAST');
    } catch {}
  };

  useEffect(() => {
    if (isGamePaused) return;
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isGamePaused]);

  // Lockdown countdown when active
  useEffect(() => {
    if (!lockdownActive || escapeComplete) return;
    const lTimer = setInterval(() => {
      setLockdownSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(lTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(lTimer);
  }, [lockdownActive, escapeComplete]);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_MISSIONS', JSON.stringify(missions));
      localStorage.setItem(STORAGE_KEY + '_HINTS', JSON.stringify(unlockedHints));
      localStorage.setItem(STORAGE_KEY + '_SUBS', JSON.stringify(submissions));
      localStorage.setItem(STORAGE_KEY + '_LEADERBOARD', JSON.stringify(leaderboard));
      localStorage.setItem(STORAGE_KEY + '_CREW', crewName);
      localStorage.setItem(STORAGE_KEY + '_UNLOCKED_ROOMS', JSON.stringify(unlockedRooms));
      localStorage.setItem(STORAGE_KEY + '_COMPLETED_ROOMS', JSON.stringify(completedRooms));
      localStorage.setItem(STORAGE_KEY + '_INVENTORY', JSON.stringify(inventory));
      localStorage.setItem(STORAGE_KEY + '_LOCKDOWN', lockdownActive ? 'true' : 'false');
      localStorage.setItem(STORAGE_KEY + '_LOCKDOWN_TIME', lockdownSecondsRemaining.toString());
      localStorage.setItem(STORAGE_KEY + '_ESCAPED', escapeComplete ? 'true' : 'false');
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [missions, unlockedHints, submissions, leaderboard, crewName, unlockedRooms, completedRooms, inventory, lockdownActive, lockdownSecondsRemaining, escapeComplete]);

  // Derived Player Stats
  const solvedMissions = missions.filter(m => m.status === 'SOLVED');
  const totalScore = solvedMissions.reduce((acc, m) => {
    // subtract hints penalty
    const hintsUsed = unlockedHints[m.id] || [];
    const penalty = hintsUsed.reduce((sum, hId) => {
      const hintObj = m.hints?.find(h => h.id === hId);
      return sum + (hintObj ? hintObj.penalty : 0);
    }, 0);
    return acc + Math.max(10, m.points - penalty);
  }, 0);

  // Dynamic accuracy calculation from submission history
  const totalSubmissions = submissions.length;
  const validSubmissions = submissions.filter(s => s.status === 'VALID').length;
  const dynamicAccuracy = totalSubmissions > 0 
    ? `${Math.round((validSubmissions / totalSubmissions) * 100)}%` 
    : (solvedMissions.length > 0 ? "100%" : "0%");

  // Dynamic session elapsed time
  const elapsedSeconds = Math.max(0, 5059 + (10038 - secondsRemaining));
  const dynamicTimePlayed = formatTimer(elapsedSeconds);

  // Sort leaderboard with updated player score
  const updatedLeaderboard = [...leaderboard].map(entry => {
    if (entry.isCurrentPlayer) {
      return {
        ...entry,
        team: crewName || entry.team,
        score: totalScore,
        solved: solvedMissions.length,
        escaped: escapeComplete
      };
    }
    return entry;
  }).sort((a, b) => b.score - a.score).map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));

  const myRank = updatedLeaderboard.find(e => e.isCurrentPlayer)?.rank || 1;

  // Recalculate player profile dynamically based on live score and telemetry
  const currentPlayer = {
    id: "OP-7492",
    callsign: crewName || "GHOST-07",
    affiliation: "Canara Engineering College",
    score: totalScore,
    rank: myRank,
    solvedCount: solvedMissions.length,
    totalMissions: missions.length,
    accuracy: dynamicAccuracy,
    timePlayed: dynamicTimePlayed,
    securityClearance: "LEVEL-3 OMNI",
    assignedGateway: "10.24.16.0/24",
    escaped: escapeComplete
  };

  const toggleSound = () => {
    const state = sound.toggleSound();
    setAudioEnabled(state);
  };

  const unlockHint = (missionId, hintId, penalty) => {
    sound.playBeep(440, 0.06);
    setUnlockedHints(prev => {
      const existing = prev[missionId] || [];
      if (existing.includes(hintId)) return prev;
      return { ...prev, [missionId]: [...existing, hintId] };
    });

    const mission = missions.find(m => m.id === missionId);
    const newActivity = {
      id: Date.now(),
      timestamp: new Date().toTimeString().slice(0, 8),
      team: "SPECTRE-9",
      event: "HINT_UNLOCKED",
      mission: `${mission?.number || '00'} - ${mission?.title || 'MISSION'} (HINT #${hintId})`,
      penalty: -penalty
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
  };

  const submitFlag = (missionId, flagInput) => {
    sound.init();
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return { success: false, message: "CRITICAL: Mission not recognized." };

    if (mission.status === 'SOLVED') {
      sound.playBeep(520, 0.05);
      return { success: true, message: "NOTICE: Flag already submitted and authenticated." };
    }

    const cleanInput = (flagInput || '').trim();
    if (!cleanInput) {
      sound.playError();
      return { success: false, message: "ERROR: Empty flag buffer supplied." };
    }

    if (cleanInput === mission.flag) {
      sound.playSuccess();

      // Deduct hint penalties
      const hintsUsed = unlockedHints[missionId] || [];
      const penalty = hintsUsed.reduce((sum, hId) => {
        const hintObj = mission.hints?.find(h => h.id === hId);
        return sum + (hintObj ? hintObj.penalty : 0);
      }, 0);
      const pointsAwarded = Math.max(10, mission.points - penalty);

      // Update mission status
      setMissions(prev => prev.map(m => {
        if (m.id === missionId) {
          return { ...m, status: 'SOLVED', solvedCount: m.solvedCount + 1 };
        }
        return m;
      }));

      // Update submissions
      const nowTime = new Date().toTimeString().slice(0, 8);
      const newSub = {
        id: Date.now(),
        missionId,
        title: mission.title,
        status: "VALID",
        points: pointsAwarded,
        timestamp: nowTime
      };
      setSubmissions(prev => [newSub, ...prev]);

      // Telemetry feed
      const newAct = {
        id: Date.now(),
        timestamp: nowTime,
        team: "SPECTRE-9",
        event: "FLAG_CAPTURED",
        mission: `MISSION ${mission.number} - ${mission.title}`,
        points: pointsAwarded
      };
      setActivities(prev => [newAct, ...prev.slice(0, 19)]);

      // Check if this mission completes any Heist Stage
      const matchedStage = HEIST_STAGES_CONFIG.find(s => 
        s.primaryMissionId === missionId || 
        (s.secondaryMissionIds && s.secondaryMissionIds.includes(missionId))
      );

      let stageCompletedNow = false;
      let nextRoomUnlockedNow = null;

      if (matchedStage) {
        // Solving the room's primary objective completes the stage and unlocks the next room
        if (matchedStage.primaryMissionId === missionId) {
          stageCompletedNow = true;
          setCompletedRooms(prev => prev.includes(matchedStage.id) ? prev : [...prev, matchedStage.id]);
          
          if (matchedStage.rewardItem) {
            setInventory(prev => prev.some(i => i.id === matchedStage.rewardItem.id) ? prev : [...prev, matchedStage.rewardItem]);
            sound.playItemAcquired();
          }

          if (matchedStage.nextStageId) {
            nextRoomUnlockedNow = matchedStage.nextStageId;
            setUnlockedRooms(prev => prev.includes(matchedStage.nextStageId) ? prev : [...prev, matchedStage.nextStageId]);
          }

          sound.playDoorUnlock();

          if (matchedStage.id === 'vault') {
            setLockdownActive(true);
            sound.playLockdown();
          }

          if (matchedStage.id === 'escape') {
            setEscapeComplete(true);
            sound.playSuccess();
          }
        }
      }

      return {
        success: true,
        message: `VALID ACCESS CODE: +${pointsAwarded} PTS ACQUIRED. CLEARANCE GRANTED.`,
        pointsAwarded,
        stageCompletedNow,
        matchedStage,
        nextRoomUnlockedNow
      };
    } else {
      sound.playError();
      const nowTime = new Date().toTimeString().slice(0, 8);
      const failSub = {
        id: Date.now(),
        missionId,
        title: mission.title,
        status: "INVALID",
        points: 0,
        timestamp: nowTime
      };
      setSubmissions(prev => [failSub, ...prev]);

      return {
        success: false,
        message: "ACCESS DENIED: Hash mismatch. Invalid token submitted."
      };
    }
  };

  const openMissionDetail = (missionId) => {
    sound.playClick();
    setSelectedMissionId(missionId);
    setActiveTab('missions');
  };

  const unlockRoom = (stageId) => {
    setUnlockedRooms(prev => prev.includes(stageId) ? prev : [...prev, stageId]);
  };

  const completeRoom = (stageId) => {
    setCompletedRooms(prev => prev.includes(stageId) ? prev : [...prev, stageId]);
    const stage = HEIST_STAGES_CONFIG.find(s => s.id === stageId);
    if (stage) {
      if (stage.rewardItem) {
        setInventory(prev => prev.some(i => i.id === stage.rewardItem.id) ? prev : [...prev, stage.rewardItem]);
      }
      if (stage.nextStageId) {
        setUnlockedRooms(prev => prev.includes(stage.nextStageId) ? prev : [...prev, stage.nextStageId]);
      }
    }
  };

  const isRoomCompleted = (stageId) => {
    if (completedRooms.includes(stageId)) return true;
    const stage = HEIST_STAGES_CONFIG.find(s => s.id === stageId);
    if (!stage || !stage.primaryMissionId) return false;
    return missions.find(m => m.id === stage.primaryMissionId)?.status === 'SOLVED';
  };

  const isRoomUnlocked = (stageId) => {
    if (!stageId || stageId === 'entrance' || stageId === 'recon') return true;
    if (heistMode === 'EXPLORATION') return true;
    
    // Strict progression: A room is unlocked if and only if the preceding room is completed
    const stageIndex = HEIST_STAGES_CONFIG.findIndex(s => s.id === stageId);
    if (stageIndex > 0) {
      const prevStage = HEIST_STAGES_CONFIG[stageIndex - 1];
      return isRoomCompleted(prevStage.id);
    }
    return false;
  };

  const openInGameMission = (mission) => {
    sound.playClick();
    setActiveInGameMission(mission);
  };

  const closeInGameMission = () => {
    sound.playClick();
    setActiveInGameMission(null);
  };

  const triggerLockdown = () => {
    setLockdownActive(true);
    sound.playLockdown();
  };

  const triggerEscapeComplete = () => {
    setEscapeComplete(true);
    sound.playSuccess();
  };

  const startTransition = (title, subtitle, nextRoute) => {
    setIsTransitioning(true);
    setTransitionData({ title, subtitle, nextRoute });
  };

  const finishTransition = () => {
    setIsTransitioning(false);
    setTransitionData({ title: '', subtitle: '', nextRoute: null });
  };

  const resetAllProgress = () => {
    localStorage.removeItem(STORAGE_KEY + '_MISSIONS');
    localStorage.removeItem(STORAGE_KEY + '_HINTS');
    localStorage.removeItem(STORAGE_KEY + '_SUBS');
    localStorage.removeItem(STORAGE_KEY + '_LEADERBOARD');
    localStorage.removeItem(STORAGE_KEY + '_UNLOCKED_ROOMS');
    localStorage.removeItem(STORAGE_KEY + '_COMPLETED_ROOMS');
    localStorage.removeItem(STORAGE_KEY + '_INVENTORY');
    localStorage.removeItem(STORAGE_KEY + '_LOCKDOWN');
    localStorage.removeItem(STORAGE_KEY + '_LOCKDOWN_TIME');
    localStorage.removeItem(STORAGE_KEY + '_ESCAPED');

    const resetMissions = MISSIONS_DATA.map(m => ({
      ...m,
      status: 'AVAILABLE'
    }));
    setMissions(resetMissions);
    setUnlockedHints({});
    setSubmissions([]);
    setLeaderboard(INITIAL_LEADERBOARD);
    setSelectedCategory('ALL');
    setUnlockedRooms(['entrance', 'recon']);
    setCompletedRooms([]);
    setInventory([]);
    setLockdownActive(false);
    setLockdownSecondsRemaining(300);
    setEscapeComplete(false);
    sound.playBeep(300, 0.1);
  };

  // Admin Methods
  const updateChallenge = (missionId, updatedFields) => {
    setMissions(prev => {
      const next = prev.map(m => m.id === missionId ? { ...m, ...updatedFields } : m);
      try {
        localStorage.setItem(STORAGE_KEY + '_MISSIONS', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const adjustTeamScore = (teamIdentifier, deltaPoints) => {
    setLeaderboard(prev => {
      const next = prev.map(t => {
        if (t.id === teamIdentifier || t.team === teamIdentifier) {
          const newScore = Math.max(0, (t.score || 0) + deltaPoints);
          return { ...t, score: newScore };
        }
        return t;
      }).sort((a, b) => b.score - a.score).map((t, idx) => ({ ...t, rank: idx + 1 }));
      try {
        localStorage.setItem(STORAGE_KEY + '_LEADERBOARD', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleDisqualifyTeam = (teamIdentifier) => {
    setLeaderboard(prev => {
      const next = prev.map(t => {
        if (t.id === teamIdentifier || t.team === teamIdentifier) {
          return { ...t, isDisqualified: !t.isDisqualified };
        }
        return t;
      });
      try {
        localStorage.setItem(STORAGE_KEY + '_LEADERBOARD', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const overrideTimer = (newSeconds) => {
    setSecondsRemaining(Math.max(0, newSeconds));
  };

  const clearSubmissions = () => {
    setSubmissions([]);
    try {
      localStorage.removeItem(STORAGE_KEY + '_SUBS');
    } catch {}
  };

  const selectedMission = missions.find(m => m.id === selectedMissionId) || missions[0];

  return (
    <GameContext.Provider
      value={{
        missions,
        selectedMission,
        selectedMissionId,
        setSelectedMissionId,
        selectedCategory,
        setSelectedCategory,
        activeTab,
        setActiveTab,
        unlockedHints,
        unlockHint,
        submitFlag,
        submissions,
        leaderboard: updatedLeaderboard,
        activities,
        currentPlayer,
        secondsRemaining,
        audioEnabled,
        toggleSound,
        openMissionDetail,
        isTerminalModalOpen,
        setIsTerminalModalOpen,
        resetAllProgress,
        // Heist Specific State & Actions
        heistMode,
        toggleHeistMode,
        crewName,
        setCrewName,
        unlockedRooms,
        completedRooms,
        inventory,
        lockdownActive,
        lockdownSecondsRemaining,
        escapeComplete,
        unlockRoom,
        completeRoom,
        isRoomUnlocked,
        isRoomCompleted,
        isFacilityMapOpen,
        setIsFacilityMapOpen,
        isInventoryOpen,
        setIsInventoryOpen,
        activeInGameMission,
        openInGameMission,
        closeInGameMission,
        isTransitioning,
        transitionData,
        startTransition,
        finishTransition,
        triggerLockdown,
        triggerEscapeComplete,
        // Admin State & Methods
        isGamePaused,
        setIsGamePaused,
        broadcastMessage,
        setGlobalBroadcast,
        updateChallenge,
        adjustTeamScore,
        toggleDisqualifyTeam,
        overrideTimer,
        clearSubmissions
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
