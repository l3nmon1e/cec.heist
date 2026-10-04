import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Copy, Check } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Terminal({ mission, onClose, isModal = false }) {
  const { submitFlag, currentPlayer } = useGame();
  const [history, setHistory] = useState([
    { type: 'system', text: "CEC HEIST TACTICAL SHELL v3.4.1 (x86_64-linux-gnu)" },
    { type: 'system', text: "OPERATIONAL CONTEXT: VPN TUNNEL ESTABLISHED [tun0: 10.24.16.88]" },
    { type: 'system', text: "Type 'help' for available tactical commands. Target context loaded." },
    { type: 'system', text: `ACTIVE TARGET: ${mission?.target || '10.24.16.42:2222'}` }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sound.playClick();
      processCommand(inputVal.trim());
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete files
      const files = mission?.terminalFiles || [
        { name: "triage_notes.txt" },
        { name: "disk_dump.raw" }
      ];
      const match = files.find(f => f.name.startsWith(inputVal.split(' ').pop()));
      if (match) {
        const parts = inputVal.split(' ');
        parts[parts.length - 1] = match.name;
        setInputVal(parts.join(' '));
      }
    }
  };

  const processCommand = (cmd) => {
    if (!cmd) {
      setHistory(prev => [...prev, { type: 'input', text: '' }]);
      return;
    }

    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    const newHistory = [...history, { type: 'input', text: cmd }];
    setInputVal('');

    const lowerCmd = cmd.toLowerCase();
    const parts = cmd.split(' ');
    const mainCommand = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    // Check mission custom terminal commands first
    if (mission?.terminalCommands && mission.terminalCommands[cmd]) {
      newHistory.push({ type: 'output', text: mission.terminalCommands[cmd] });
      setHistory(newHistory);
      return;
    }

    switch (mainCommand) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: [
            "AVAILABLE OPERATIONAL COMMANDS:",
            "  help                 Display command syntax manual",
            "  ls [-la]             List files in target staging directory",
            "  cat <file>           Concatenate and display file content",
            "  strings <file>       Extract printable ASCII strings",
            "  file <file>          Determine file type and architecture",
            "  curl <url>           Send HTTP/REST requests to target host",
            "  nmap <host>          Perform TCP port audit",
            "  whoami               Display current session operator privileges",
            "  ifconfig             Display active network interfaces and VPN IP",
            "  flag <string>        Submit target flag directly through console",
            "  clear                Purge terminal buffer"
          ].join('\n')
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `operator (${currentPlayer.id}) [CLEARANCE: LEVEL-3] [CALLSIGN: ${currentPlayer.callsign}]`
        });
        break;

      case 'ifconfig':
      case 'ip':
        newHistory.push({
          type: 'output',
          text: [
            "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
            "        inet 192.168.1.104  netmask 255.255.255.0  broadcast 192.168.1.255",
            "tun0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1420",
            "        inet 10.24.16.88  netmask 255.255.0.0  destination 10.24.0.1",
            "        [TUNNEL: CEC-HEIST-VPN-SECURE]"
          ].join('\n')
        });
        break;

      case 'ls':
        {
          const files = mission?.terminalFiles || [
            { name: "triage_notes.txt", size: "128B" },
            { name: "disk_dump.raw", size: "64MB" }
          ];
          if (parts.includes('-la') || parts.includes('-l')) {
            const list = files.map(f => `-rw-r--r-- 1 operator operator ${f.size || '512B'} Oct 03 14:22 ${f.name}`).join('\n');
            newHistory.push({
              type: 'output',
              text: `total ${files.length * 4}\ndrwxr-xr-x 2 operator operator 4096 Oct 03 14:20 .\ndrwxr-xr-x 4 root root 4096 Oct 03 14:00 ..\n${list}`
            });
          } else {
            newHistory.push({
              type: 'output',
              text: files.map(f => f.name).join('    ')
            });
          }
        }
        break;

      case 'cat':
        {
          if (!arg) {
            newHistory.push({ type: 'error', text: "cat: missing file operand" });
            break;
          }
          const files = mission?.terminalFiles || [];
          const found = files.find(f => f.name.toLowerCase() === arg.toLowerCase());
          if (found) {
            newHistory.push({ type: 'output', text: found.content });
          } else {
            newHistory.push({ type: 'error', text: `cat: ${arg}: No such file or directory` });
          }
        }
        break;

      case 'nmap':
        {
          const targetHost = arg || mission?.target?.split(':')[0] || '10.24.16.42';
          newHistory.push({
            type: 'output',
            text: [
              `Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-03 14:48 IST`,
              `Nmap scan report for ${targetHost}`,
              `Host is up (0.0042s latency).`,
              `Not shown: 997 closed tcp ports`,
              `PORT     STATE SERVICE     VERSION`,
              `22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu 3ubuntu0.6`,
              `80/tcp   open  http        nginx/1.18.0 (Ubuntu)`,
              `2222/tcp open  EtherNet/IP-2 (Tactical SSH Diagnostic Port)`,
              `MAC Address: 02:42:0A:18:10:2A (Virtual Target Container)`,
              `Nmap done: 1 IP address (1 host up) scanned in 1.48 seconds`
            ].join('\n')
          });
        }
        break;

      case 'curl':
        {
          if (!arg) {
            newHistory.push({ type: 'error', text: "curl: try 'curl --help' for more information" });
            break;
          }
          if (mission?.terminalCommands && mission.terminalCommands[cmd]) {
            newHistory.push({ type: 'output', text: mission.terminalCommands[cmd] });
          } else if (arg.includes('badge_id') && (arg.includes('OR') || arg.includes('1=1'))) {
            newHistory.push({
              type: 'output',
              text: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{"status":"ACCESS_GRANTED","role":"SECURITY_SUPERVISOR","flag":"CEC{sql_inj_byp4ss_2026}"}'
            });
          } else if (arg.includes('10.24.12.80')) {
            newHistory.push({
              type: 'output',
              text: 'HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n\n{"status":"DENIED","error":"Missing or invalid badge credentials"}'
            });
          } else {
            newHistory.push({
              type: 'output',
              text: `HTTP/1.1 200 OK\nServer: CEC-Heist-Internal\nContent-Length: 48\n\nTarget service active on ${arg}. Access restricted.`
            });
          }
        }
        break;

      case 'strings':
        {
          if (!arg) {
            newHistory.push({ type: 'error', text: "strings: missing file argument" });
            break;
          }
          if (arg.includes('disk_dump') || arg.includes('sdb1')) {
            newHistory.push({
              type: 'output',
              text: [
                "/dev/sdb1: Linux filesystem recovery",
                "LOST_DIR_FRAGMENT_001",
                "ROOT_ACCESS_LOG",
                "==> CARVED PAYLOAD: CEC{d1g1tal_c4rv1ng_unl0cked_f4c1l1ty}",
                "END OF SECTOR ALLOCATION"
              ].join('\n')
            });
          } else if (arg.includes('vault_arm')) {
            newHistory.push({
              type: 'output',
              text: [
                "passkey_check_initialized",
                "Enter arm authorization passkey:",
                "CEC{r3v_x86_c0mp4r3_p4ss_882}",
                "Authorization Accepted."
              ].join('\n')
            });
          } else {
            newHistory.push({
              type: 'output',
              text: `[DUMP]: ELF64, /lib64/ld-linux-x86-64.so.2, libc.so.6, printf, exit`
            });
          }
        }
        break;

      case 'file':
        {
          if (!arg) {
            newHistory.push({ type: 'error', text: "file: missing argument" });
            break;
          }
          newHistory.push({
            type: 'output',
            text: `${arg}: Linux rev 1.0 ext4 filesystem data, UUID=7a8b-4c9d-88ff (extents) (large files)`
          });
        }
        break;

      case 'flag':
        {
          if (!arg) {
            newHistory.push({ type: 'error', text: "Usage: flag CEC{...}" });
            break;
          }
          const result = submitFlag(mission ? mission.id : 'mission-08', arg);
          if (result.success) {
            newHistory.push({
              type: 'success',
              text: `[+] AUTHENTICATION SUCCESS: ${result.message}`
            });
          } else {
            newHistory.push({
              type: 'error',
              text: `[-] ${result.message}`
            });
          }
        }
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `bash: ${mainCommand}: command not found. Type 'help' for available tactical tools.`
        });
        break;
    }

    setHistory(newHistory);
  };

  const copyLog = () => {
    const text = history.map(h => h.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col bg-[#0A0A0A] border border-[#303030] font-mono text-xs overflow-hidden ${isModal ? 'h-[580px] w-full max-w-4xl shadow-2xl' : 'h-[360px]'}`}>
      
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#151515] border-b border-[#303030] select-none">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-3.5 h-3.5 text-[#FACC15]" />
          <span className="font-bold text-[#E5E7EB] tracking-wider text-[11px]">
            TACTICAL CONSOLE // {mission?.target || '10.24.16.42'}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 bg-[#1F1F1F] text-[#737373] border border-[#303030]">
            SSH: tun0
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[#737373]">
          <button
            onClick={copyLog}
            className="p-1 hover:text-[#E5E7EB] hover:bg-[#1F1F1F] transition-colors"
            title="Copy Console Output"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:text-[#EF4444] hover:bg-[#1F1F1F] transition-colors"
              title="Close Terminal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Output scroll area */}
      <div 
        ref={scrollContainerRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-3.5 overflow-y-auto space-y-2 bg-[#0A0A0A] cursor-text select-text"
      >
        {history.map((entry, idx) => {
          if (entry.type === 'input') {
            return (
              <div key={idx} className="flex items-start space-x-2 text-[#E5E7EB]">
                <span className="text-[#FACC15] select-none font-bold">operator@cec-ops:~$</span>
                <span>{entry.text}</span>
              </div>
            );
          }
          if (entry.type === 'system') {
            return (
              <div key={idx} className="text-[#737373] leading-relaxed">
                [SYS] {entry.text}
              </div>
            );
          }
          if (entry.type === 'error') {
            return (
              <div key={idx} className="text-[#F87171] leading-relaxed">
                {entry.text}
              </div>
            );
          }
          if (entry.type === 'success') {
            return (
              <div key={idx} className="text-[#4ADE80] font-semibold leading-relaxed">
                {entry.text}
              </div>
            );
          }
          return (
            <pre key={idx} className="text-[#D1D5DB] whitespace-pre-wrap leading-relaxed">
              {entry.text}
            </pre>
          );
        })}
      </div>

      {/* Interactive Command Input line */}
      <div className="flex items-center px-3 py-2 bg-[#111111] border-t border-[#303030]">
        <span className="text-[#FACC15] font-bold mr-2 select-none">operator@cec-ops:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' or command (e.g. ls, cat, nmap, flag CEC{...})..."
          className="flex-1 bg-transparent text-[#E5E7EB] placeholder-[#525252] outline-none font-mono text-xs caret-[#FACC15]"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <div className="w-2 h-4 bg-[#FACC15] animate-pulse ml-1 opacity-70" />
      </div>

      {/* Helper quick commands bar */}
      <div className="px-3 py-1 bg-[#151515] border-t border-[#262626] flex items-center justify-between text-[10px] text-[#737373]">
        <div className="flex items-center space-x-2">
          <span>QUICK COMMANDS:</span>
          <button 
            onClick={() => processCommand('help')}
            className="hover:text-[#FACC15] underline decoration-dotted"
          >
            help
          </button>
          <span>·</span>
          <button 
            onClick={() => processCommand('ls -la')}
            className="hover:text-[#FACC15] underline decoration-dotted"
          >
            ls -la
          </button>
          <span>·</span>
          <button 
            onClick={() => processCommand(`nmap ${mission?.target?.split(':')[0] || '10.24.16.42'}`)}
            className="hover:text-[#FACC15] underline decoration-dotted"
          >
            nmap
          </button>
          <span>·</span>
          <button 
            onClick={() => processCommand('whoami')}
            className="hover:text-[#FACC15] underline decoration-dotted"
          >
            whoami
          </button>
        </div>
        <div className="hidden sm:block">
          Use [UP/DOWN] for history, [TAB] for completion
        </div>
      </div>

    </div>
  );
}
