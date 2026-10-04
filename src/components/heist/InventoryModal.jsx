import React from 'react';
import { useGame } from '../../context/GameContext';
import { sound } from '../../utils/audio';
import { 
  X, 
  Briefcase, 
  Key, 
  Fingerprint, 
  Cpu, 
  ShieldAlert, 
  Lock, 
  Trophy, 
  Map, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const ICON_MAP = {
  Key,
  Fingerprint,
  Cpu,
  ShieldAlert,
  Lock,
  Trophy,
  Map,
  CheckCircle2
};

export default function InventoryModal({ onClose }) {
  const { inventory } = useGame();

  return (
    <div className="fixed inset-0 z-50 bg-[#070B12]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Tactical Gear Enclave */}
      <div className="relative w-full max-w-2xl bg-[#0C111A] border-2 border-[#263140] shadow-2xl overflow-hidden my-auto font-mono flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-[#121923] border-b border-[#263140] px-4 py-3 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Briefcase className="w-4 h-4 text-[#C8A96B]" />
            <span className="text-xs font-bold text-[#F4F5F7] tracking-widest uppercase">
              OPERATIVE INVENTORY // CRYPTOGRAPHIC KEYRING
            </span>
          </div>

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

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="text-xs text-[#8D98A8] leading-relaxed">
            Assets, forged tokens, and hardware security credentials harvested during facility penetration:
          </div>

          {inventory && inventory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inventory.map((item, idx) => {
                const IconComp = ICON_MAP[item.icon] || Key;
                const isAsset = item.id === 'item-asset';

                return (
                  <div
                    key={item.id || idx}
                    className={`relative p-3.5 border transition-all ${
                      isAsset 
                        ? 'bg-[#18150C] border-[#C8A96B] shadow-[0_0_20px_rgba(200,169,107,0.3)] animate-pulse' 
                        : 'bg-[#070B12] border-[#263140]'
                    }`}
                  >
                    {/* Top Type Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded border flex items-center justify-center ${
                        isAsset 
                          ? 'bg-[#C8A96B]/20 border-[#C8A96B] text-[#C8A96B]' 
                          : 'bg-[#121923] border-[#263140] text-[#C8A96B]'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>

                      <span className={`text-[9px] px-2 py-0.5 uppercase tracking-wider font-semibold border ${
                        isAsset 
                          ? 'bg-[#C8A96B]/20 border-[#C8A96B] text-[#C8A96B]' 
                          : 'bg-[#121923] border-[#263140] text-[#8D98A8]'
                      }`}>
                        {item.category || "TOKEN"}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xs sm:text-sm font-bold text-[#F4F5F7] mb-1">
                      {item.name}
                    </h4>

                    {/* Description */}
                    <p className="text-[11px] text-[#8D98A8] font-sans leading-relaxed">
                      {item.description}
                    </p>

                    {/* Cryptographic Verification Stamp */}
                    <div className="mt-3 pt-2 border-t border-[#263140]/60 flex items-center justify-between text-[10px]">
                      <span className="text-[#8D98A8]">HASH VERIFIED:</span>
                      <code className="text-[#C8A96B] font-mono">0x{Math.sin(idx + 1).toString(16).slice(2, 8).toUpperCase()}</code>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#070B12] border border-[#263140] p-8 text-center space-y-3">
              <Key className="w-8 h-8 text-[#566375] mx-auto animate-pulse" />
              <div className="text-xs font-bold text-[#8D98A8] tracking-widest uppercase">
                INVENTORY BUFFER EMPTY
              </div>
              <p className="text-xs text-[#566375] max-w-sm mx-auto font-sans">
                Solve sector challenges to acquire security tokens, bypass keys, and the Digital Vault asset.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#121923] border-t border-[#263140] px-4 py-3 sm:px-6 flex items-center justify-between text-xs">
          <span className="text-[#8D98A8]">TOTAL ITEMS: {inventory.length}</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] text-[#F4F5F7] font-semibold transition-colors cursor-pointer"
          >
            DISMISS
          </button>
        </div>

      </div>
    </div>
  );
}
