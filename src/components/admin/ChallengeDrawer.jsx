import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { getMissionSector } from './adminHelpers';
import { 
  X, 
  Check, 
  Lock, 
  Unlock, 
  Edit3, 
  Save, 
  HelpCircle, 
  Activity, 
  Eye, 
  EyeOff,
  Clock
} from 'lucide-react';

export const ChallengeDrawer = ({ mission, onClose, onUpdated }) => {
  const { 
    updateChallenge, 
    unlockHint, 
    unlockedHints, 
    submissions 
  } = useGame();

  const [isEditing, setIsEditing] = useState(false);
  const [flagInput, setFlagInput] = useState(mission?.flag || '');
  const [pointsInput, setPointsInput] = useState(mission?.points || 100);
  const [showFlag, setShowFlag] = useState(false);

  if (!mission) return null;

  const sectorInfo = getMissionSector(mission.id, mission.category);
  const isAvailable = mission.status === 'AVAILABLE' || mission.status === 'SOLVED';
  const hints = mission.hints || [];
  const currentUnlockedHints = unlockedHints[mission.id] || [];

  // Recent submissions matching this mission
  const recentSubs = submissions.filter(s => s.missionId === mission.id).slice(0, 5);

  const handleToggleStatus = () => {
    const nextStatus = mission.status === 'LOCKED' ? 'AVAILABLE' : 'LOCKED';
    updateChallenge(mission.id, { status: nextStatus });
    onUpdated?.();
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateChallenge(mission.id, {
      flag: flagInput.trim(),
      points: Number(pointsInput)
    });
    setIsEditing(false);
    onUpdated?.();
  };

  const handleReleaseHint = (hintId) => {
    unlockHint(mission.id, hintId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-in drawer container */}
      <div className="w-full max-w-lg bg-[#0D131D] border-l border-[#202B38] h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto font-mono text-xs">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[#202B38]">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#8994A4]">
                CHALLENGE DETAILS • #{mission.number}
              </div>
              <h2 className="text-base font-bold text-[#F4F5F7] mt-1">
                {mission.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#8994A4] hover:text-[#F4F5F7] p-1 rounded hover:bg-[#111923]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
              <span className="text-[10px] text-[#8994A4] block">SECTOR</span>
              <span className="font-semibold text-[#F4F5F7] text-xs mt-0.5 block truncate">
                {sectorInfo.sector}
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
              <span className="text-[10px] text-[#8994A4] block">DIFFICULTY</span>
              <span className={`font-semibold text-xs mt-0.5 block ${
                mission.difficulty === 'EASY' ? 'text-[#4DBB91]' :
                mission.difficulty === 'MEDIUM' ? 'text-[#D6AA55]' :
                'text-[#D96C6C]'
              }`}>
                {mission.difficulty}
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
              <span className="text-[10px] text-[#8994A4] block">POINTS</span>
              <span className="font-bold text-[#C8A96B] text-xs mt-0.5 block">
                {mission.points} PTS
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#111923] border border-[#202B38]">
              <span className="text-[10px] text-[#8994A4] block">SOLVES</span>
              <span className="font-semibold text-[#F4F5F7] text-xs mt-0.5 block">
                {mission.solvedCount || 0} / 24
              </span>
            </div>
          </div>

          {/* Status and Action Buttons */}
          <div className="p-3 rounded bg-[#111923] border border-[#202B38] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#8994A4]">CURRENT STATUS:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                mission.status === 'LOCKED'
                  ? 'bg-[#D96C6C]/10 text-[#D96C6C] border border-[#D96C6C]/30'
                  : 'bg-[#4DBB91]/10 text-[#4DBB91] border border-[#4DBB91]/30'
              }`}>
                {mission.status}
              </span>
            </div>

            <button
              onClick={handleToggleStatus}
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                mission.status === 'LOCKED'
                  ? 'bg-[#4DBB91]/15 text-[#4DBB91] border border-[#4DBB91]/40 hover:bg-[#4DBB91]/25'
                  : 'bg-[#D96C6C]/15 text-[#D96C6C] border border-[#D96C6C]/40 hover:bg-[#D96C6C]/25'
              }`}
            >
              {mission.status === 'LOCKED' ? (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>ENABLE</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>DISABLE</span>
                </>
              )}
            </button>
          </div>

          {/* Description */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#8994A4] mb-1.5">
              DESCRIPTION & OBJECTIVES
            </div>
            <p className="text-xs font-sans text-[#F4F5F7] leading-relaxed bg-[#111923] p-3 rounded border border-[#202B38]">
              {mission.brief || "No description provided."}
            </p>
          </div>

          {/* Target Flag / Points Edit Section */}
          <div className="p-3.5 rounded bg-[#111923] border border-[#202B38] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-[#8994A4]">
                AUTHENTICATION FLAG STRING
              </span>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-[#C8A96B] hover:underline text-[11px] flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Flag'}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveEdit} className="space-y-3 pt-1">
                <div>
                  <label className="text-[10px] text-[#8994A4] block mb-1">Target Flag</label>
                  <input
                    type="text"
                    required
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    className="w-full bg-[#0D131D] border border-[#202B38] rounded px-3 py-1.5 text-[#F4F5F7] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8994A4] block mb-1">Points Allocated</label>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={pointsInput}
                    onChange={(e) => setPointsInput(e.target.value)}
                    className="w-full bg-[#0D131D] border border-[#202B38] rounded px-3 py-1.5 text-[#C8A96B] focus:outline-none focus:border-[#C8A96B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#C8A96B] text-[#070B12] font-bold rounded hover:bg-[#d8bb7d] transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>SAVE PARAMETERS</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between bg-[#0D131D] px-3 py-2 rounded border border-[#202B38]">
                <code className="text-[#C8A96B] font-mono text-xs">
                  {showFlag ? (mission.flag || 'NO_FLAG') : '••••••••••••••••••••'}
                </code>
                <button
                  onClick={() => setShowFlag(!showFlag)}
                  className="text-[#8994A4] hover:text-[#F4F5F7] p-1"
                >
                  {showFlag ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Hints Section */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-[#8994A4] flex items-center justify-between">
              <span>HINTS AVAILABLE ({hints.length})</span>
            </div>

            {hints.map((h) => {
              const isUnlocked = currentUnlockedHints.includes(h.id);
              return (
                <div
                  key={h.id}
                  className="p-2.5 rounded bg-[#111923] border border-[#202B38] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <span className="text-[#C8A96B] font-bold mr-1.5">Hint #{h.id}:</span>
                    <span className="text-[#8994A4] truncate">{h.text}</span>
                  </div>

                  {isUnlocked ? (
                    <span className="text-[10px] text-[#4DBB91] shrink-0 font-bold">
                      RELEASED
                    </span>
                  ) : (
                    <button
                      onClick={() => handleReleaseHint(h.id)}
                      className="px-2 py-0.5 rounded bg-[#202B38] hover:bg-[#2e3e50] text-[#D6AA55] text-[10px] shrink-0"
                    >
                      RELEASE HINT
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Recent Submissions */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-wider text-[#8994A4]">
              RECENT SUBMISSIONS FOR THIS CHALLENGE
            </div>
            {recentSubs.length > 0 ? (
              <div className="divide-y divide-[#202B38] bg-[#111923] rounded border border-[#202B38] p-2">
                {recentSubs.map((s) => (
                  <div key={s.id} className="py-1.5 px-2 flex items-center justify-between text-[11px]">
                    <span className="text-[#8994A4]">{s.timestamp || 'RECENT'}</span>
                    <span className={s.status === 'VALID' ? 'text-[#4DBB91] font-bold' : 'text-[#D96C6C]'}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#8994A4] italic bg-[#111923] p-3 rounded border border-[#202B38]">
                No submissions recorded yet for this challenge.
              </p>
            )}
          </div>
        </div>

        {/* Footer close */}
        <div className="pt-4 border-t border-[#202B38] mt-4">
          <button
            onClick={onClose}
            className="w-full py-2 rounded bg-[#111923] border border-[#202B38] text-[#8994A4] hover:text-[#F4F5F7] font-semibold transition-colors"
          >
            CLOSE DRAWER
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDrawer;
