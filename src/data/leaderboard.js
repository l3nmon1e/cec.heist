export const INITIAL_LEADERBOARD = [
  { rank: 1, team: "Team Alpha", solved: 19, score: 4850, lastActivity: "2m ago", change: "same", affiliation: "Dept. of CSE - CEC" },
  { rank: 2, team: "Root Access", solved: 17, score: 4420, lastActivity: "5m ago", change: "up", affiliation: "Dept. of ISE - CEC" },
  { rank: 3, team: "NullPointer", solved: 16, score: 4180, lastActivity: "12m ago", change: "down", affiliation: "Dept. of AIML - CEC" },
  { rank: 4, team: "CyberSharks", solved: 15, score: 3920, lastActivity: "18m ago", change: "up", affiliation: "CyberSec Guild" },
  { rank: 5, team: "DarkByte", solved: 14, score: 3750, lastActivity: "22m ago", change: "same", affiliation: "CEC Red Team" },
  { rank: 6, team: "ByteBandits", solved: 13, score: 3400, lastActivity: "31m ago", change: "down", affiliation: "Dept. of CSE" },
  { rank: 7, team: "0xDeadBeef", solved: 12, score: 3150, lastActivity: "42m ago", change: "up", affiliation: "Dept. of ECE - CEC" },
  { rank: 8, team: "CipherGuild", solved: 11, score: 2900, lastActivity: "54m ago", change: "same", affiliation: "Crypt Research Group" },
  { rank: 9, team: "KernelPanix", solved: 10, score: 2650, lastActivity: "1h ago", change: "same", affiliation: "Dept. of ISE" },
  { rank: 10, team: "RedCell", solved: 9, score: 2300, lastActivity: "1h 12m ago", change: "down", affiliation: "Dept. of CCE - CEC" },
  { rank: 11, team: "StackSmash", solved: 9, score: 2250, lastActivity: "1h 15m ago", change: "same", affiliation: "Independent" },
  { rank: 12, team: "BitFlip", solved: 9, score: 2180, lastActivity: "1h 20m ago", change: "up", affiliation: "Dept. of CSE" },
  { rank: 25, team: "ShadowRunners", solved: 8, score: 1910, lastActivity: "4m ago", change: "up", affiliation: "Dept. of AIML" },
  { rank: 26, team: "ZeroDayOps", solved: 8, score: 1880, lastActivity: "9m ago", change: "down", affiliation: "Dept. of ISE" },
  { rank: 27, team: "SPECTRE-9", solved: 8, score: 1840, lastActivity: "3m ago", change: "up", isCurrentPlayer: true, affiliation: "Canara Engineering College (OP-7492)" },
  { rank: 28, team: "PayloadSquad", solved: 7, score: 1720, lastActivity: "14m ago", change: "same", affiliation: "Dept. of CSE" },
  { rank: 29, team: "TerminalX", solved: 7, score: 1680, lastActivity: "20m ago", change: "down", affiliation: "Dept. of ECE" }
];

export const ACTIVITY_FEED = [
  { id: 1, timestamp: "14:46:12", team: "Root Access", event: "FLAG_CAPTURED", mission: "MISSION 18 - WEBSOCKET SURVEILLANCE FEED", points: 250 },
  { id: 2, timestamp: "14:44:30", team: "SPECTRE-9", event: "FLAG_CAPTURED", mission: "MISSION 04 - AIRLOCK OVERRIDE IDOR", points: 200 },
  { id: 3, timestamp: "14:41:05", team: "Team Alpha", event: "FIRST_BLOOD", mission: "MISSION 13 - MALWARE DOMAIN EXTRACT", points: 500 },
  { id: 4, timestamp: "14:38:52", team: "CyberSharks", event: "FLAG_CAPTURED", mission: "MISSION 15 - BGP & SUBDOMAIN TRACE", points: 200 },
  { id: 5, timestamp: "14:35:10", team: "NullPointer", event: "FLAG_CAPTURED", mission: "MISSION 07 - WEAK RSA MODULUS", points: 400 },
  { id: 6, timestamp: "14:31:44", team: "DarkByte", event: "HINT_UNLOCKED", mission: "MISSION 08 - THE LOCKED TERMINAL", penalty: -25 },
  { id: 7, timestamp: "14:28:19", team: "0xDeadBeef", event: "FLAG_CAPTURED", mission: "MISSION 05 - INTERCEPTED FREQUENCY CIPHER", points: 150 }
];
