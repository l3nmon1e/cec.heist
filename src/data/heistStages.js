export const HEIST_STAGES = [
  {
    id: "recon",
    order: 1,
    name: "RECON",
    callsign: "PHASE-01 // PERIMETER RECONNAISSANCE",
    subtitle: "External Intel & OSINT Gathering",
    sector: "SECTOR-Alpha // External Perimeter",
    description: "Map exposed assets, discover leaked developer tokens, and trace campus network infrastructure before breaching the outer fence.",
    missionIds: ["mission-14", "mission-15", "mission-16"],
    requiredSolvedToUnlock: 0, // open from start
    image: "/assets/heist/facility/facility_wide.jpg",
    blueprintArea: "SURFACE ACCESS & PERIMETER"
  },
  {
    id: "initial_access",
    order: 2,
    name: "INITIAL ACCESS",
    callsign: "PHASE-02 // PERIMETER INFILTRATION",
    subtitle: "Gateway & Authentication Bypass",
    sector: "SECTOR-Bravo // Outer Security Ring",
    description: "Compromise exterior badge authentication endpoints, forge token algorithms, and exploit access control API gateways.",
    missionIds: ["mission-01", "mission-04", "mission-02"],
    requiredSolvedToUnlock: 1, // requires 1 recon solve
    image: "/assets/heist/facility/secure_corridor.jpg",
    blueprintArea: "SECTOR SECURITY GATES G-301"
  },
  {
    id: "infiltration",
    order: 3,
    name: "INFILTRATION",
    callsign: "PHASE-03 // PHYSICAL & FORENSIC PENETRATION",
    subtitle: "Memory Forensics & Covert Streams",
    sector: "SECTOR-Charlie // Subterranean Corridor 3B",
    description: "Triage abandoned administrative terminals, recover covert ICMP channels, and extract hidden surveillance frames.",
    missionIds: ["mission-08", "mission-10", "mission-09"],
    requiredSolvedToUnlock: 2, // requires at least 2 solves
    image: "/assets/heist/missions/restricted_terminal.jpg",
    blueprintArea: "OPERATIONS CORRIDOR 3B-2"
  },
  {
    id: "network",
    order: 4,
    name: "NETWORK",
    callsign: "PHASE-04 // INTERNAL PROTOCOL OVERRIDE",
    subtitle: "PLC Coils & Protocol Spoofing",
    sector: "SECTOR-Delta // Data Distribution & Telecom",
    description: "Hijack industrial Modbus PLC coils, tap internal surveillance WebSockets, and poison gateway ARP routing tables.",
    missionIds: ["mission-17", "mission-18", "mission-19"],
    requiredSolvedToUnlock: 4,
    image: "/assets/heist/missions/network_ops.jpg",
    blueprintArea: "LEVEL 3: NOC & TELECOM"
  },
  {
    id: "security",
    order: 5,
    name: "SECURITY",
    callsign: "PHASE-05 // SUPERVISORY ENCLAVE BREACH",
    subtitle: "Credential Hashes & Cryptanalysis",
    sector: "SECTOR-Echo // Security Operations Center",
    description: "Blind the CCTV monitoring wall, inject telemetry to harvest supervisor tokens, and crack Linux shadow hashes.",
    missionIds: ["mission-03", "mission-05", "mission-06"],
    requiredSolvedToUnlock: 6,
    image: "/assets/heist/surveillance/cctv_wall.jpg",
    blueprintArea: "SECURITY CONTROL CENTER"
  },
  {
    id: "core",
    order: 6,
    name: "CORE",
    callsign: "PHASE-06 // RESTRICTED FIRMWARE & HSM",
    subtitle: "Embedded Logic & Hardware Cryptography",
    sector: "SECTOR-Foxtrot // Main Server Core",
    description: "Factor weak RSA HSM keys, reverse engineer robotic arm ELF binaries, and crack blast door ARM Cortex firmware.",
    missionIds: ["mission-07", "mission-11", "mission-12"],
    requiredSolvedToUnlock: 8,
    image: "/assets/heist/missions/server_room.jpg",
    blueprintArea: "LEVEL 3: DATA CENTER CORE"
  },
  {
    id: "vault",
    order: 7,
    name: "THE VAULT",
    callsign: "PHASE-07 // MASTER VAULT BREACH",
    subtitle: "High-Security Titanium Safe Depository",
    sector: "SECTOR-Omega // Deep Geological Vault Level 4",
    description: "Disengage triple interlocking mechanical lock pins, defeat dynamic malware domain cipher algorithms, and crack the digital vault.",
    missionIds: ["mission-13"],
    requiredSolvedToUnlock: 10,
    image: "/assets/heist/vault/vault_entrance.jpg",
    blueprintArea: "LEVEL 4: MAIN VAULT SANCTUM"
  },
  {
    id: "escape",
    order: 8,
    name: "ESCAPE",
    callsign: "PHASE-08 // EXFILTRATION & EVIDENCE SANITIZATION",
    subtitle: "Cover Tracks & Clean Exit",
    sector: "SECTOR-Exfil // Deep Geological Egress",
    description: "Purge surveillance traces, wipe server transaction journals, and exfiltrate the decrypted master asset token with zero detection.",
    missionIds: [],
    requiredSolvedToUnlock: 11,
    image: "/assets/heist/facility/cyber_ops_center.jpg",
    blueprintArea: "EMERGENCY EGRESS SHAFT"
  }
];
