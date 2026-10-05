import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Send, X, Radio } from 'lucide-react';

export const BroadcastComposer = () => {
  const { broadcastMessage, setGlobalBroadcast } = useGame();
  const [text, setText] = useState('');
  const [history, setHistory] = useState([
    "15 MINUTES REMAINING. EXTRACTION POINT COMPROMISED. COMPLETE FINAL OBJECTIVES.",
    "ALL CREWS: SECTOR 04 NETWORK FIREWALL RULES UPDATED.",
    "WELCOME OPERATIVES. HEIST PROTOCOL INITIALIZED."
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const msg = text.trim();
    setGlobalBroadcast(msg);
    setHistory(prev => [msg, ...prev.filter(m => m !== msg).slice(0, 2)]);
    setText('');
  };

  const handleClearCurrent = () => {
    setGlobalBroadcast('');
  };

  return (
    <div className="bg-[#0D131D] border border-[#202B38] rounded-md p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#202B38]">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F5F7] flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-[#C8A96B]" />
          Announcement
        </h3>
        {broadcastMessage && (
          <span className="text-[10px] font-mono text-[#D6AA55] flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6AA55] animate-pulse" />
            BROADCAST ACTIVE
          </span>
        )}
      </div>

      {/* Active Broadcast Alert */}
      {broadcastMessage && (
        <div className="p-3 rounded bg-[#111923] border border-[#D6AA55]/40 flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#D6AA55] min-w-0">
            <span className="font-bold shrink-0">[ LIVE BANNER ]:</span>
            <span className="truncate text-[#F4F5F7]">{broadcastMessage}</span>
          </div>
          <button
            onClick={handleClearCurrent}
            className="text-[#8994A4] hover:text-[#D96C6C] p-1 shrink-0"
            title="Dismiss current broadcast banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Composer Form */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          placeholder="Write announcement for all crews..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-[#111923] border border-[#202B38] rounded px-3 py-2 text-xs font-mono text-[#F4F5F7] placeholder-[#8994A4] focus:outline-none focus:border-[#C8A96B]"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-2 bg-[#C8A96B] hover:bg-[#d8bb7d] disabled:opacity-40 text-[#070B12] font-mono font-bold text-xs rounded transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>SEND TO ALL CREWS</span>
        </button>
      </form>

      {/* Latest Announcements */}
      <div className="pt-2">
        <div className="text-[10px] font-mono uppercase text-[#8994A4] mb-1.5">
          Recent Broadcasts
        </div>
        <div className="space-y-1 text-xs font-mono text-[#8994A4]">
          {history.slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              onClick={() => setText(item)}
              className="py-1 px-2 rounded hover:bg-[#111923] cursor-pointer truncate transition-colors flex items-center gap-2"
              title="Click to copy into composer"
            >
              <span className="text-[#C8A96B] font-bold">›</span>
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BroadcastComposer;
