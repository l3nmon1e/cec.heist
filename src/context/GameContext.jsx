import React, { createContext, useContext, useState, useEffect } from 'react';
import { MISSIONS_DATA } from '../data/missions';
import { INITIAL_LEADERBOARD, ACTIVITY_FEED } from '../data/leaderboard';
import { sound } from '../utils/audio';
import { formatTimer } from '../utils/formatters';

const GameContext = createContext();

const STORAGE_KEY = 'CEC_HEIST_STATE_V1';

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
      return saved ? JSON.parse(saved) : { "mission-08": [1] };
    } catch {
      return { "mission-08": [1] };
    }
  });

  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_SUBS');
      return saved ? JSON.parse(saved) : [
        { id: 1, missionId: "mission-01", title: "VAULT GATEWAY SQLi", status: "VALID", points: 100, timestamp: "13:30:14" },
        { id: 2, missionId: "mission-04", title: "AIRLOCK OVERRIDE IDOR", status: "VALID", points: 200, timestamp: "13:48:22" },
        { id: 3, missionId: "mission-05", title: "INTERCEPTED FREQUENCY CIPHER", status: "VALID", points: 150, timestamp: "14:02:11" },
        { id: 4, missionId: "mission-10", title: "CCTV FRAME STEGANOGRAPHY", status: "VALID", points: 150, timestamp: "14:15:40" },
        { id: 5, missionId: "mission-14", title: "GIT COMMIT TRAIL", status: "VALID", points: 100, timestamp: "14:21:05" },
        { id: 6, missionId: "mission-15", title: "BGP & SUBDOMAIN TRACE", status: "VALID", points: 200, timestamp: "14:38:52" }
      ];
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

  // Countdown timer: 02:47:18 -> ~10038 seconds
  const [secondsRemaining, setSecondsRemaining] = useState(10038);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    } , 1000);
    return () => clearInterval(timer);
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_MISSIONS', JSON.stringify(missions));
      localStorage.setItem(STORAGE_KEY + '_HINTS', JSON.stringify(unlockedHints));
      localStorage.setItem(STORAGE_KEY + '_SUBS', JSON.stringify(submissions));
      localStorage.setItem(STORAGE_KEY + '_LEADERBOARD', JSON.stringify(leaderboard));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [missions, unlockedHints, submissions, leaderboard]);

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

  // Recalculate rank dynamically based on score
  const currentPlayer = {
    id: "OP-7492",
    callsign: "SPECTRE-9",
    affiliation: "Canara Engineering College",
    score: totalScore,
    rank: 27, // will be computed in real-time
    solvedCount: solvedMissions.length,
    totalMissions: missions.length,
    accuracy: dynamicAccuracy,
    timePlayed: dynamicTimePlayed,
    securityClearance: "LEVEL-3 OMNI",
    assignedGateway: "10.24.16.0/24"
  };

  // Sort leaderboard with updated player score
  const updatedLeaderboard = [...leaderboard].map(entry => {
    if (entry.isCurrentPlayer) {
      return {
        ...entry,
        score: totalScore,
        solved: solvedMissions.length
      };
    }
    return entry;
  }).sort((a, b) => b.score - a.score).map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));

  const myRank = updatedLeaderboard.find(e => e.isCurrentPlayer)?.rank || 27;
  currentPlayer.rank = myRank;

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

      return {
        success: true,
        message: `VALID ACCESS CODE: +${pointsAwarded} PTS ACQUIRED. CLEARANCE GRANTED.`,
        pointsAwarded
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

  const resetAllProgress = () => {
    localStorage.removeItem(STORAGE_KEY + '_MISSIONS');
    localStorage.removeItem(STORAGE_KEY + '_HINTS');
    localStorage.removeItem(STORAGE_KEY + '_SUBS');
    localStorage.removeItem(STORAGE_KEY + '_LEADERBOARD');
    const resetMissions = MISSIONS_DATA.map(m => ({
      ...m,
      status: 'AVAILABLE'
    }));
    setMissions(resetMissions);
    setUnlockedHints({});
    setSubmissions([]);
    setLeaderboard(INITIAL_LEADERBOARD);
    setSelectedCategory('ALL');
    sound.playBeep(300, 0.1);
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
        resetAllProgress
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
