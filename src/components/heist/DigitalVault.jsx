import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { getAssetUrl, formatScore } from '../../utils/formatters';
import { sound } from '../../utils/audio';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Key, 
  Terminal, 
  Cpu, 
  AlertCircle,
  CheckCircle2, 
  RotateCw,
  ArrowRight,
  Fingerprint
} from 'lucide-react';

export default function DigitalVault({ onOpenVaultMission }) {
  const { missions, submitFlag } = useGame();
  const [enteredCode, setEnteredCode] = useState('');
  const [authStatus, setAuthStatus] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const solvedCount = missions.filter(m => m.status === 'SOLVED').length;
  const totalCount = missions.length;

  // Vault Security resistance drops as missions are solved
  const vaultSecurityPercent = Math.max(8, 100 - Math.round((solvedCount / totalCount) * 92));

  // 5 Master Cryptographic Access Keys derived from sector solves
  const keys = [
    {
      id: "key-1",
      name: "PERIMETER RECON TOKEN",
      sector: "SECTOR-Alpha (Recon)",
      requiredSolves: 2,
      isUnlocked: missions.filter(m => ['mission-14', 'mission-15', 'mission-16'].includes(m.id) && m.status === 'SOLVED').length >= 2,
      code: "REC-0x49A"
    },
    {
      id: "key-2",
      name: "GATEWAY OVERRIDE HASH",
      sector: "SECTOR-Bravo (Initial Access)",
      requiredSolves: 2,
      isUnlocked: missions.filter(m => ['mission-01', 'mission-02', 'mission-04'].includes(m.id) && m.status === 'SOLVED').length >= 2,
      code: "ACC-0x7F2"
    },
    {
      id: "key-3",
      name: "FORENSIC MEMORY KEY",
      sector: "SECTOR-Charlie (Infiltration)",
      requiredSolves: 2,
      isUnlocked: missions.filter(m => ['mission-08', 'mission-09', 'mission-10'].includes(m.id) && m.status === 'SOLVED').length >= 2,
      code: "FOR-0x9C1"
    },
    {
      id: "key-4",
      name: "PLC PROTOCOL BYPASS",
      sector: "SECTOR-Delta (Network)",
      requiredSolves: 2,
      isUnlocked: missions.filter(m => ['mission-17', 'mission-18', 'mission-19'].includes(m.id) && m.status === 'SOLVED').length >= 2,
      code: "NET-0x3B8"
    },
    {
      id: "key-5",
      name: "SUPERVISORY SHADOW TOKEN",
      sector: "SECTOR-Echo (Security)",
      requiredSolves: 2,
      isUnlocked: missions.filter(m => ['mission-03', 'mission-05', 'mission-06'].includes(m.id) && m.status === 'SOLVED').length >= 2,
      code: "SEC-0x1D4"
    }
  ];

  const unlockedKeyCount = keys.filter(k => k.isUnlocked).length;
  const isVaultBreached = missions.find(m => m.id === 'mission-13')?.status === 'SOLVED';

  const handleKeypadPress = (val) => {
    sound.playClick();
    if (enteredCode.length < 16) {
      setEnteredCode(prev => prev + val);
    }
  };

  const handleKeypadClear = () => {
    sound.playClick();
    setEnteredCode('');
    setAuthStatus(null);
  };

  const handleVaultAttempt = (e) => {
    e?.preventDefault();
    if (!enteredCode.trim()) return;

    sound.playClick();
    setIsVerifying(true);
    setAuthStatus(null);

    setTimeout(() => {
      setIsVerifying(false);
      // Attempt verification against mission 13 flag or master override
      const res = submitFlag('mission-13', enteredCode.trim());
      if (res.success) {
        setAuthStatus({ success: true, message: "CLEARANCE CONFIRMED // DIGITAL VAULT SOLENOIDS RELEASED" });
      } else {
        setAuthStatus({ success: false, message: "AUTHENTICATION DENIED: Cryptographic handshake mismatch. Verify all 5 sector tokens." });
      }
    }, 600);
  };

  return (
    <div className="relative bg-[#0C111A] border border-[#263140] overflow-hidden shadow-2xl">
      {/* Top Industrial Header Banner */}
      <div className="bg-[#121923] border-b border-[#263140] px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-4 font-mono">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isVaultBreached ? 'bg-[#4FB286] animate-ping' : 'bg-[#C8A96B] animate-pulse'}`} />
          <h2 className="text-sm font-bold text-[#F4F5F7] tracking-widest uppercase">
            CENTRAL REPOSITORY // THE DIGITAL VAULT
          </h2>
          <span className="text-[10px] text-[#C8A96B] border border-[#C8A96B]/30 bg-[#C8A96B]/10 px-2 py-0.5">
            CLASSIFIED LEVEL-5
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div>
            <span className="text-[#8D98A8]">SECTOR:</span>{' '}
            <span className="text-[#F4F5F7] font-bold">LEVEL-4 GEOLOGICAL CORE</span>
          </div>
          <div>
            <span className="text-[#8D98A8]">STATUS:</span>{' '}
            <span className={isVaultBreached ? 'text-[#4FB286] font-bold' : 'text-[#D6A85F] font-bold'}>
              {isVaultBreached ? 'BREACHED & UNLOCKED' : 'HARDENED SHUT'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Vault Chamber Canvas */}
      <div className="relative min-h-[580px] bg-[#070B12] overflow-hidden">
        {/* Realistic Vault Entrance Image Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url('${getAssetUrl('/assets/heist/vault/vault_entrance.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C111A] via-[#0C111A]/80 to-[#070B12]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

        {/* Content Overlay Grid */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 space-y-8">
          
          {/* Top Vault Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            {/* Metric 1: Vault Security Resistance */}
            <div className="bg-[#121923]/90 border border-[#263140] p-4">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-[#8D98A8]">VAULT INTEGRITY</span>
                <span className={`font-bold text-sm ${vaultSecurityPercent > 50 ? 'text-[#B85C5C]' : 'text-[#C8A96B]'}`}>
                  {vaultSecurityPercent}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#0C111A] border border-[#263140] overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 ${vaultSecurityPercent > 50 ? 'bg-[#B85C5C]' : 'bg-[#C8A96B]'}`}
                  style={{ width: `${vaultSecurityPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-[#566375] mt-1.5 block">
                {isVaultBreached ? "LOCK BOLTS DISENGAGED" : "HEAVY MECHANICAL REINFORCEMENT ACTIVE"}
              </span>
            </div>

            {/* Metric 2: Access Requirements */}
            <div className="bg-[#121923]/90 border border-[#263140] p-4">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-[#8D98A8]">ACCESS REQUIREMENTS</span>
                <span className="font-bold text-sm text-[#C8A96B]">
                  0{unlockedKeyCount} / 05 KEYS
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#0C111A] border border-[#263140] overflow-hidden">
                <div 
                  className="h-full bg-[#C8A96B] transition-all duration-700"
                  style={{ width: `${(unlockedKeyCount / 5) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-[#566375] mt-1.5 block">
                {unlockedKeyCount === 5 ? "ALL 5 SECTOR KEYS READY" : `REQUIRES ${5 - unlockedKeyCount} MORE SECTOR TOKENS`}
              </span>
            </div>

            {/* Metric 3: System Clearance */}
            <div className="bg-[#121923]/90 border border-[#263140] p-4">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-[#8D98A8]">LOCK MECHANISM</span>
                <span className={`font-bold text-sm ${isVaultBreached ? 'text-[#4FB286]' : 'text-[#D6A85F]'}`}>
                  {isVaultBreached ? "DISENGAGED" : "TRIPLE INTERLOCK"}
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#0C111A] border border-[#263140] overflow-hidden">
                <div 
                  className={`h-full ${isVaultBreached ? 'bg-[#4FB286]' : 'bg-[#D6A85F]'}`}
                  style={{ width: isVaultBreached ? '100%' : '35%' }}
                />
              </div>
              <span className="text-[10px] text-[#566375] mt-1.5 block">
                HYDRAULIC PINS: {isVaultBreached ? "RETRACTED" : "SECURED"}
              </span>
            </div>
          </div>

          {/* Center Stage: Interactive Keypad & Lock Chamber Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column: 5 Sector Cryptographic Key Pins (7 cols) */}
            <div className="lg:col-span-7 bg-[#121923]/95 border border-[#263140] p-5 sm:p-6 space-y-4 font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-[#263140]">
                <div className="flex items-center space-x-2">
                  <Key className="w-4 h-4 text-[#C8A96B]" />
                  <h3 className="text-xs font-bold text-[#F4F5F7] tracking-wider uppercase">
                    SECTOR CRYPTOGRAPHIC BYPASS PINS
                  </h3>
                </div>
                <span className="text-[10px] text-[#8D98A8]">AUTOMATICALLY HARVESTED FROM SOLVES</span>
              </div>

              <div className="space-y-2.5">
                {keys.map((k, idx) => (
                  <div
                    key={k.id}
                    className={`p-3 border transition-all flex items-center justify-between gap-4 ${
                      k.isUnlocked
                        ? 'bg-[#0C111A] border-[#C8A96B]/50 text-[#F4F5F7]'
                        : 'bg-[#070B12]/80 border-[#1C2633] text-[#566375]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-7 h-7 flex items-center justify-center border text-xs font-bold ${
                        k.isUnlocked 
                          ? 'border-[#C8A96B] bg-[#C8A96B]/10 text-[#C8A96B]' 
                          : 'border-[#263140] bg-[#121923] text-[#566375]'
                      }`}>
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold tracking-wide">
                          {k.name}
                        </div>
                        <div className="text-[10px] text-[#8D98A8]">
                          {k.sector}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-right">
                      {k.isUnlocked ? (
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-[#C8A96B] block font-bold">
                            {k.code}
                          </span>
                          <span className="text-[9px] text-[#4FB286] flex items-center justify-end space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>AUTHENTICATED</span>
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-[#566375] block">
                            REQUIRES 2 SOLVES
                          </span>
                          <span className="text-[9px] text-[#B85C5C] flex items-center justify-end space-x-1">
                            <Lock className="w-3 h-3" />
                            <span>LOCKED</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mission 13 Direct Target Link */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenVaultMission('mission-13')}
                  className="w-full py-2.5 px-4 bg-[#0C111A] hover:bg-[#16202D] border border-[#263140] hover:border-[#C8A96B] text-xs font-mono text-[#C8A96B] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>OPEN MISSION 13: MALWARE MASTER REVERSE DOSSIER</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Physical Vault Dial & Electronic Keypad (5 cols) */}
            <div className="lg:col-span-5 bg-[#121923]/95 border border-[#263140] p-5 sm:p-6 flex flex-col justify-between space-y-4 font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-[#263140]">
                <div className="flex items-center space-x-2">
                  <Fingerprint className="w-4 h-4 text-[#C8A96B]" />
                  <span className="text-xs font-bold text-[#F4F5F7] tracking-wider uppercase">
                    BIOMETRIC KEYPAD ORACLE
                  </span>
                </div>
                <span className="text-[10px] text-[#8D98A8]">ROTARY BYPASS</span>
              </div>

              {/* OLED Display Buffer */}
              <div className="bg-[#070B12] border border-[#263140] p-3 text-center space-y-1 shadow-inner">
                <div className="text-[10px] text-[#8D98A8] flex items-center justify-between">
                  <span>BUFFER: {enteredCode.length}/16</span>
                  <span className="text-[#C8A96B]">INPUT: CEC{'{...}'}</span>
                </div>
                <input
                  type="text"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  placeholder="Enter vault token..."
                  className="w-full bg-transparent border-0 text-center font-mono text-xs sm:text-sm text-[#F4F5F7] tracking-widest outline-none placeholder-[#566375]"
                />
              </div>

              {/* Physical Numeric Keypad Matrix */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeypadPress(num.toString())}
                    className="py-2.5 bg-[#0C111A] hover:bg-[#16202D] border border-[#263140] text-sm font-bold text-[#F4F5F7] hover:text-[#C8A96B] transition-colors cursor-pointer"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleKeypadClear}
                  className="py-2.5 bg-[#0C111A] hover:bg-[#B85C5C]/20 border border-[#263140] text-[11px] font-bold text-[#B85C5C] transition-colors cursor-pointer"
                >
                  CLR
                </button>
                <button
                  onClick={() => handleKeypadPress('0')}
                  className="py-2.5 bg-[#0C111A] hover:bg-[#16202D] border border-[#263140] text-sm font-bold text-[#F4F5F7] hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  0
                </button>
                <button
                  onClick={handleVaultAttempt}
                  disabled={isVerifying || !enteredCode.trim()}
                  className="py-2.5 bg-[#C8A96B] hover:bg-[#D6A85F] text-[#070B12] text-[11px] font-bold tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isVerifying ? "VERIFY..." : "ENTER"}
                </button>
              </div>

              {/* Feedback messages */}
              {authStatus && (
                <div className={`p-2.5 text-[11px] border leading-tight ${
                  authStatus.success 
                    ? 'bg-[#4FB286]/10 border-[#4FB286]/40 text-[#4FB286]' 
                    : 'bg-[#B85C5C]/10 border-[#B85C5C]/40 text-[#B85C5C]'
                }`}>
                  {authStatus.message}
                </div>
              )}

              <div className="pt-2 border-t border-[#263140] text-[10px] text-[#566375] text-center">
                HEIST DIRECTIVE: Solenoids engage permanently upon Mission 13 token clearance.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
