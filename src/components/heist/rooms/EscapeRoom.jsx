import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import HeistRoomLayout from '../HeistRoomLayout';
import { useGame } from '../../../context/GameContext';
import { sound } from '../../../utils/audio';
import { formatTimer, formatScore } from '../../../utils/formatters';
import { LogOut, Trophy, AlertTriangle } from 'lucide-react';

export default function EscapeRoom() {
  const navigate = useNavigate();
  const { 
    missions, 
    lockdownSecondsRemaining, 
    escapeComplete, 
    triggerEscapeComplete,
    crewName,
    currentPlayer
  } = useGame();

  const [isDebriefOpen, setIsDebriefOpen] = useState(escapeComplete);
  const primaryMission = missions.find(m => m.id === 'mission-20');
  const isMissionSolved = primaryMission?.status === 'SOLVED' || escapeComplete;

  const handleFinalEscape = () => {
    sound.playSuccess();
    triggerEscapeComplete();
    setIsDebriefOpen(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const finalSuccessContent = (
    <button
      onClick={handleFinalEscape}
      className="w-full py-3.5 px-6 bg-[#4FB286] hover:bg-[#5fc597] text-[#070B12] font-black uppercase tracking-wider text-sm font-mono flex items-center justify-center space-x-2 transition-all shadow-[0_0_25px_rgba(79,178,134,0.4)] active:scale-95"
    >
      <span>ESCAPE NOW →</span>
    </button>
  );

  return (
    <>
      <HeistRoomLayout
        roomNumber={8}
        roomId="escape"
        roomTitle="ESCAPE ROUTE"
        bgImage="/assets/heist/facility/cyber_ops_center.jpg"
        objectiveTitle="Override the facility blast doors before lockdown seals the exit."
        objectiveDescription="Disengage emergency blast locks and reach the extraction van."
        objectName="EXIT TERMINAL"
        objectDescription="Emergency blast door manual override terminal."
        objectIcon={LogOut}
        actionButtonText="OPEN EXIT"
        completedStatusText="ESCAPE ROUTE OPEN"
        nextRoute={null}
        nextRoomName={null}
        missionId="mission-20"
        isLockdown={!isMissionSolved}
        lockdownTimerText={`LOCKDOWN: ${formatTimer(lockdownSecondsRemaining)}`}
        isFinalRoom={true}
        finalSuccessContent={finalSuccessContent}
        customSuccessAction={handleFinalEscape}
      />

      {/* Final Victory Debrief Modal */}
      {isDebriefOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B12]/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto font-mono">
          <div className="max-w-xl w-full bg-[#0C111A] border-2 border-[#C8A96B] p-6 sm:p-8 text-center space-y-6 shadow-[0_0_50px_rgba(200,169,107,0.35)] my-auto animate-in zoom-in-95 duration-300">
            
            <div className="w-16 h-16 rounded-full bg-[#C8A96B]/20 border-2 border-[#C8A96B] text-[#C8A96B] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(200,169,107,0.4)] animate-bounce">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-bold text-[#C8A96B] tracking-[0.3em] uppercase">
                OPERATION DEBRIEFING // CLEAN EXTRACTION
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#F4F5F7] tracking-wider uppercase">
                HEIST COMPLETE
              </h1>
              <p className="text-xs text-[#8D98A8] font-sans max-w-md mx-auto leading-relaxed">
                The facility master cryptographic asset has been successfully secured and extracted. Your crew escaped with zero trace.
              </p>
            </div>

            {/* Stats Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-left bg-[#070B12] p-4 border border-[#263140]">
              <div>
                <span className="text-[10px] text-[#8D98A8] uppercase block">ASSET</span>
                <span className="font-bold text-[#4FB286]">SECURED</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8D98A8] uppercase block">CREW</span>
                <span className="font-bold text-[#C8A96B]">{crewName || "GHOST-07"}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8D98A8] uppercase block">STATUS</span>
                <span className="font-bold text-[#4FB286]">ESCAPED</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8D98A8] uppercase block">FINAL SCORE</span>
                <span className="font-bold text-[#C8A96B]">{formatScore(currentPlayer.score)} PTS</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8D98A8] uppercase block">GLOBAL RANK</span>
                <span className="font-bold text-[#F4F5F7]">#{currentPlayer.rank}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8D98A8] uppercase block">EXTRACT TIME</span>
                <span className="font-bold text-[#4FB286]">VERIFIED</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate('/leaderboard')}
                className="flex-1 px-5 py-3 bg-[#C8A96B] hover:bg-[#d6b779] text-[#070B12] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
              >
                <Trophy className="w-4 h-4" />
                <span>VIEW LEADERBOARD</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className="px-5 py-3 bg-[#121923] hover:bg-[#263140] border border-[#263140] text-[#F4F5F7] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                EXIT TO HUB
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
