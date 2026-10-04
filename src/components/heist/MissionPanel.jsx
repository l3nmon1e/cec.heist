import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { 
  X, 
  Terminal, 
  ShieldCheck, 
  AlertTriangle, 
  Key, 
  CheckCircle2, 
  Lightbulb, 
  Send, 
  ArrowRight,
  Target,
  FileCode,
  HelpCircle,
  Copy,
  Check,
  Cpu,
  RotateCw,
  Unlock
} from 'lucide-react';

export default function MissionPanel({ missionId, onClose, onAdvanceRoom, nextRoomName }) {
  const { 
    missions, 
    submitFlag, 
    unlockedHints, 
    unlockHint, 
    setIsTerminalModalOpen, 
    setSelectedMissionId 
  } = useGame();

  const mission = missions.find(m => m.id === missionId) || missions[0];

  const [flagInput, setFlagInput] = useState('');
  const [submissionFeedback, setSubmissionFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('brief'); // 'brief' | 'terminal' | 'hints' | 'bypass'
  const [copiedTarget, setCopiedTarget] = useState(false);
  const [activeCommand, setActiveCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState(null);

  // Security Bypass Dial Mini-Game State
  const DIAL_VALUES = ['0x1F', '0x4A', '0x9E', '0xD2'];
  const TARGET_COMBINATION = [2, 0, 3, 1]; // [0x9E, 0x1F, 0xD2, 0x4A]
  const [dialState, setDialState] = useState([0, 1, 2, 3]);
  const [bypassSuccess, setBypassSuccess] = useState(false);

  const handleRotateDial = (index) => {
    sound.playClick();
    setDialState(prev => {
      const next = [...prev];
      next[index] = (next[index] + 1) % DIAL_VALUES.length;
      
      const isMatch = next.every((val, i) => val === TARGET_COMBINATION[i]);
      if (isMatch) {
        sound.playSuccess();
        setBypassSuccess(true);
        if (mission.flag) {
          setFlagInput(mission.flag);
        }
      } else {
        setBypassSuccess(false);
      }
      return next;
    });
  };

  const isSolved = mission.status === 'SOLVED';

  const handleCopyTarget = () => {
    if (mission.target) {
      navigator.clipboard?.writeText(mission.target);
      sound.playClick();
      setCopiedTarget(true);
      setTimeout(() => setCopiedTarget(false), 2000);
    }
  };

  const handleHintUnlock = (hintId, penalty) => {
    if (window.confirm(`Unlock hint for a penalty of -${penalty} PTS?`)) {
      unlockHint(mission.id, hintId, penalty);
    }
  };

  const handleSubmitFlag = (e) => {
    e.preventDefault();
    if (!flagInput.trim() || isSubmitting) return;

    sound.playClick();
    setIsSubmitting(true);
    setSubmissionFeedback(null);

    setTimeout(() => {
      const res = submitFlag(mission.id, flagInput);
      setSubmissionFeedback(res);
      setIsSubmitting(false);
    }, 400);
  };

  const handleRunCommand = (cmd) => {
    sound.playClick();
    setActiveCommand(cmd);
    const output = mission.terminalCommands ? mission.terminalCommands[cmd] : "Command executed. Output received.";
    setTerminalOutput(output || "Execution completed.");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070B12]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Tactical Mission Enclave Window */}
      <div className="relative w-full max-w-3xl bg-[#0C111A] border-2 border-[#263140] shadow-2xl overflow-hidden my-auto font-mono flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="bg-[#121923] border-b border-[#263140] px-4 py-3 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8A96B] animate-pulse shrink-0" />
            <span className="text-xs font-bold text-[#F4F5F7] tracking-widest uppercase truncate">
              TACTICAL INTERFACE // MISSION {mission.number}: {mission.title}
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className={`text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold border ${
              isSolved 
                ? 'bg-[#4FB286]/15 border-[#4FB286]/40 text-[#4FB286]' 
                : 'bg-[#C8A96B]/10 border-[#C8A96B]/30 text-[#C8A96B]'
            }`}>
              {isSolved ? 'SOLVED' : mission.difficulty || 'ACTIVE'}
            </span>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 hover:bg-[#263140] text-[#8D98A8] hover:text-[#F4F5F7] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub-Header Tabs */}
        <div className="bg-[#070B12] border-b border-[#263140] px-4 sm:px-6 flex items-center space-x-4 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('brief')}
            className={`py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'brief'
                ? 'border-[#C8A96B] text-[#C8A96B]'
                : 'border-transparent text-[#8D98A8] hover:text-[#F4F5F7]'
            }`}
          >
            BRIEFING & TARGET
          </button>

          {mission.terminalCommands && (
            <button
              onClick={() => setActiveTab('terminal')}
              className={`py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'terminal'
                  ? 'border-[#C8A96B] text-[#C8A96B]'
                  : 'border-transparent text-[#8D98A8] hover:text-[#F4F5F7]'
              }`}
            >
              EMBEDDED CONSOLE
            </button>
          )}

          <button
            onClick={() => setActiveTab('hints')}
            className={`py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'hints'
                ? 'border-[#C8A96B] text-[#C8A96B]'
                : 'border-transparent text-[#8D98A8] hover:text-[#F4F5F7]'
            }`}
          >
            <span>HINTS</span>
            <span className="text-[10px] text-[#C8A96B]">({mission.hints?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('bypass')}
            className={`py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'bypass'
                ? 'border-[#4FB286] text-[#4FB286]'
                : 'border-transparent text-[#8D98A8] hover:text-[#4FB286]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${bypassSuccess ? 'bg-[#4FB286]' : 'bg-[#C8A96B] animate-pulse'}`} />
            <span>BYPASS MATRIX</span>
          </button>
        </div>

        {/* Content Body Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-[#070B12] p-2.5 border border-[#263140]">
              <div className="text-[10px] text-[#8D98A8] uppercase">CLASSIFICATION</div>
              <div className="font-bold text-[#C8A96B]">{mission.category || "WEB"}</div>
            </div>
            <div className="bg-[#070B12] p-2.5 border border-[#263140]">
              <div className="text-[10px] text-[#8D98A8] uppercase">REWARD</div>
              <div className="font-bold text-[#4FB286]">+{mission.points} PTS</div>
            </div>
            <div className="bg-[#070B12] p-2.5 border border-[#263140]">
              <div className="text-[10px] text-[#8D98A8] uppercase">DIFFICULTY</div>
              <div className="font-bold text-[#F4F5F7]">{mission.difficulty || "MEDIUM"}</div>
            </div>
            <div className="bg-[#070B12] p-2.5 border border-[#263140]">
              <div className="text-[10px] text-[#8D98A8] uppercase">TIME ESTIMATE</div>
              <div className="font-bold text-[#8D98A8]">{mission.timeEstimate || "25 MIN"}</div>
            </div>
          </div>

          {/* TAB 1: BRIEFING */}
          {activeTab === 'brief' && (
            <div className="space-y-4">
              {/* Target Endpoint */}
              {mission.target && (
                <div className="bg-[#070B12] p-3 border border-[#263140] flex items-center justify-between">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <Target className="w-4 h-4 text-[#C8A96B] shrink-0" />
                    <span className="text-xs text-[#8D98A8]">TARGET:</span>
                    <code className="text-xs text-[#F4F5F7] font-bold truncate">{mission.target}</code>
                  </div>
                  <button
                    onClick={handleCopyTarget}
                    className="p-1 hover:bg-[#263140] text-[#8D98A8] hover:text-[#F4F5F7] transition-colors cursor-pointer"
                    title="Copy target"
                  >
                    {copiedTarget ? <Check className="w-3.5 h-3.5 text-[#4FB286]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}

              {/* Briefing Text */}
              <div className="space-y-1.5">
                <div className="text-xs text-[#C8A96B] font-bold uppercase tracking-wider">
                  MISSION BRIEFING
                </div>
                <p className="text-xs sm:text-sm text-[#F4F5F7] font-sans leading-relaxed bg-[#070B12]/60 p-3.5 border border-[#263140]/60">
                  {mission.brief}
                </p>
              </div>

              {/* Tactical Objectives */}
              {mission.objectives && mission.objectives.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs text-[#C8A96B] font-bold uppercase tracking-wider">
                    OPERATIONAL OBJECTIVES
                  </div>
                  <div className="space-y-1.5">
                    {mission.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-[#8D98A8] font-sans">
                        <span className="text-[#C8A96B] font-mono shrink-0 font-bold">[{i + 1}]</span>
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EMBEDDED CONSOLE */}
          {activeTab === 'terminal' && mission.terminalCommands && (
            <div className="space-y-3">
              <div className="text-xs text-[#8D98A8]">
                Execute pre-configured network queries against the target container:
              </div>
              <div className="space-y-2">
                {Object.keys(mission.terminalCommands).map((cmd, i) => (
                  <button
                    key={i}
                    onClick={() => handleRunCommand(cmd)}
                    className="w-full text-left bg-[#070B12] hover:bg-[#121923] p-2.5 border border-[#263140] hover:border-[#C8A96B] text-xs font-mono text-[#F4F5F7] flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <span className="text-[#C8A96B] group-hover:text-[#E5D0A0]">$ {cmd}</span>
                    <span className="text-[10px] text-[#8D98A8] group-hover:text-[#F4F5F7]">RUN [ENTER]</span>
                  </button>
                ))}
              </div>

              {terminalOutput && (
                <div className="mt-4 bg-[#070B12] border border-[#263140] p-3 text-xs">
                  <div className="text-[10px] text-[#8D98A8] mb-1 font-bold">OUTPUT:</div>
                  <pre className="text-[#4FB286] font-mono whitespace-pre-wrap break-all">
                    {terminalOutput}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: HINTS */}
          {activeTab === 'hints' && (
            <div className="space-y-3">
              <div className="text-xs text-[#8D98A8]">
                Decrypt tactical intel hints. Penalty points are deducted from the final reward upon unlocking:
              </div>
              {mission.hints && mission.hints.length > 0 ? (
                mission.hints.map((h, i) => {
                  const isUnlocked = (unlockedHints[mission.id] || []).includes(h.id);
                  return (
                    <div key={h.id} className="bg-[#070B12] border border-[#263140] p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-[#C8A96B] font-bold">HINT #{i + 1}</span>
                        <span className="text-[10px] text-[#B85C5C] font-bold">-{h.penalty} PTS PENALTY</span>
                      </div>
                      {isUnlocked ? (
                        <p className="text-xs text-[#F4F5F7] font-sans">{h.text}</p>
                      ) : (
                        <button
                          onClick={() => handleHintUnlock(h.id, h.penalty)}
                          className="px-3 py-1 bg-[#121923] hover:bg-[#263140] border border-[#263140] text-xs text-[#C8A96B] font-bold tracking-wider uppercase transition-colors cursor-pointer"
                        >
                          UNLOCK HINT (-{h.penalty} PTS)
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-xs text-[#8D98A8]">No hints filed for this challenge.</div>
              )}
            </div>
          )}

          {/* TAB 4: SECURITY BYPASS MATRIX MINI-GAME */}
          {activeTab === 'bypass' && (
            <div className="space-y-4 bg-[#070B12] border border-[#263140] p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-[#4FB286] animate-pulse" />
                  <span className="text-xs font-bold text-[#F4F5F7] tracking-wider uppercase">
                    CIPHER LOGIC GATE // DIAL ALIGNMENT BYPASS
                  </span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 font-bold uppercase border ${
                  bypassSuccess 
                    ? 'bg-[#4FB286]/15 border-[#4FB286]/40 text-[#4FB286]' 
                    : 'bg-[#C8A96B]/10 border-[#C8A96B]/30 text-[#C8A96B]'
                }`}>
                  {bypassSuccess ? 'BYPASS ACQUIRED' : 'FREQUENCY UNSYNCHRONIZED'}
                </span>
              </div>

              <div className="text-xs text-[#8D98A8] leading-relaxed">
                Calibrate the 4 subterranean relay nodes to match the target frequency signature. Once all dials lock onto the target frequencies, the security lock will dump its internal authentication flag.
              </div>

              {/* Target Sequence Display */}
              <div className="bg-[#0C111A] border border-[#263140] p-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] text-[#8D98A8] uppercase font-bold tracking-wider">
                  TARGET HARMONIC SIGNATURE:
                </span>
                <div className="flex items-center space-x-2 text-xs font-bold text-[#C8A96B] tracking-widest">
                  {TARGET_COMBINATION.map((targetIdx, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#070B12] border border-[#C8A96B]/40">
                      {DIAL_VALUES[targetIdx]}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4 Interactive Dials */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {dialState.map((valIdx, i) => {
                  const isMatched = valIdx === TARGET_COMBINATION[i];
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleRotateDial(i)}
                      className={`p-3 border text-center transition-all cursor-pointer group flex flex-col items-center space-y-2 ${
                        isMatched
                          ? 'bg-[#4FB286]/10 border-[#4FB286] shadow-[0_0_15px_rgba(79,178,134,0.25)]'
                          : 'bg-[#0C111A] border-[#263140] hover:border-[#C8A96B]'
                      }`}
                    >
                      <div className="text-[9px] text-[#8D98A8] uppercase tracking-wider font-semibold">
                        NODE {['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA'][i]}
                      </div>
                      <div className={`text-lg font-black font-mono tracking-widest ${
                        isMatched ? 'text-[#4FB286]' : 'text-[#F4F5F7] group-hover:text-[#C8A96B]'
                      }`}>
                        {DIAL_VALUES[valIdx]}
                      </div>
                      <div className="flex items-center space-x-1 text-[9px] text-[#8D98A8] group-hover:text-[#C8A96B]">
                        <RotateCw className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                        <span>CYCLE</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bypass Status & Auto-Inject CTA */}
              {bypassSuccess && (
                <div className="bg-[#4FB286]/15 border border-[#4FB286]/50 p-3 text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-[#4FB286] font-bold text-xs uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CIPHER GATE SYNCHRONIZED // FLAG EXTRACTED & LOADED</span>
                  </div>
                  <p className="text-[11px] text-[#8D98A8]">
                    The flag has been auto-injected into your authentication console below. Click submit to execute access clearance.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* FLAG SUBMISSION FORM */}
          <div className="pt-4 border-t border-[#263140]">
            <div className="text-xs font-bold text-[#C8A96B] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>SECURITY AUTHENTICATION FLAG</span>
              <span className="text-[10px] text-[#8D98A8]">FORMAT: CEC&#123;...&#125;</span>
            </div>

            {isSolved ? (
              <div className="bg-[#4FB286]/15 border-2 border-[#4FB286] p-5 text-center space-y-3 shadow-[0_0_25px_rgba(79,178,134,0.3)] rounded-sm">
                <div className="flex items-center justify-center space-x-2 text-[#4FB286] font-black text-sm uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5 animate-bounce" />
                  <span>MISSION COMPLETED // ACCESS GRANTED</span>
                </div>
                <p className="text-xs text-[#F4F5F7] font-sans">
                  The facility security barrier has been successfully disengaged for this sector!
                </p>
                {onAdvanceRoom ? (
                  <div className="pt-2 flex flex-col items-center space-y-2">
                    <button
                      onClick={onAdvanceRoom}
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#4FB286] hover:bg-[#3ea075] text-[#070B12] text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer shadow-lg hover:scale-105 transition-all rounded-sm"
                    >
                      <span>PROCEED DIRECTLY TO {nextRoomName || 'NEXT ROOM'}</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                    <p className="text-[11px] text-[#8D98A8] font-sans">
                      (Or click "Return to Facility" below to view the unlocked door in the room)
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-[#4FB286] font-bold">
                    You have unlocked all objectives for this sector!
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmitFlag} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="CEC{enter_captured_flag_here}"
                    className="flex-1 bg-[#070B12] border border-[#263140] focus:border-[#C8A96B] px-3.5 py-2.5 text-xs text-[#F4F5F7] placeholder-[#566375] outline-none font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !flagInput.trim()}
                    className="px-5 py-2.5 bg-[#C8A96B] hover:bg-[#E5D0A0] disabled:opacity-50 text-[#070B12] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>VERIFYING...</span>
                    ) : (
                      <>
                        <span>SUBMIT</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {submissionFeedback && (
                  <div className={`p-3 border text-xs font-mono ${
                    submissionFeedback.success
                      ? 'bg-[#4FB286]/10 border-[#4FB286]/40 text-[#4FB286]'
                      : 'bg-[#B85C5C]/10 border-[#B85C5C]/40 text-[#B85C5C]'
                  }`}>
                    {submissionFeedback.message}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-[#121923] border-t border-[#263140] px-4 py-3 sm:px-6 flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedMissionId(mission.id);
              setIsTerminalModalOpen(true);
            }}
            className="text-[#8D98A8] hover:text-[#C8A96B] flex items-center space-x-1.5 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>FULL SCREEN SHELL</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] text-[#F4F5F7] text-xs font-semibold cursor-pointer"
          >
            RETURN TO FACILITY
          </button>
        </div>

      </div>
    </div>
  );
}
