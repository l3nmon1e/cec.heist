export const HEIST_STAGES_CONFIG = [
  {
    id: "entrance",
    slug: "",
    route: "/heist",
    order: 0,
    shortName: "ENTRANCE",
    codeName: "FACILITY BRIEFING // RESTRICTED INGRESS",
    title: "CEC DIGITAL FACILITY",
    sector: "SECTOR-00 // SURFACE CHECKPOINT",
    accessLevel: "RESTRICTED",
    statusText: "ACTIVE OPERATION",
    bgImage: "/assets/heist/facility/facility_wide.jpg",
    objective: "INFILTRATE THE FACILITY",
    objectiveDescription: "Assemble the crew, review the tactical briefing, and execute breach into the outer perimeter.",
    requiredStageId: null,
    doorName: "OUTER PERIMETER BLAST GATE",
    nextRoute: "/heist/recon",
    nextStageId: "recon",
    primaryMissionId: null,
    interactiveObjects: [
      {
        id: "entry_terminal",
        name: "FACILITY ACCESS CHECKPOINT",
        type: "terminal",
        icon: "Terminal",
        status: "ONLINE",
        badge: "CHECKPOINT G-0",
        description: "Primary visitor and operative access control console.",
        actionLabel: "INSPECT CHECKPOINT"
      },
      {
        id: "surveillance_cam_0",
        name: "EXTERIOR ROTARY CCTV",
        type: "camera",
        icon: "Camera",
        status: "ACTIVE",
        badge: "OPTIC SENSOR",
        description: "Automated pan-tilt infrared camera monitoring the access canyon.",
        actionLabel: "SURVEIL AREA"
      }
    ]
  },
  {
    id: "recon",
    slug: "recon",
    route: "/heist/recon",
    order: 1,
    shortName: "RECON",
    codeName: "PHASE-01 // PERIMETER RECONNAISSANCE",
    title: "RECONNAISSANCE OPERATIONS",
    sector: "SECTOR-Alpha // Perimeter Outpost",
    accessLevel: "LEVEL-1 INTEL",
    statusText: "ACTIVE RECON",
    bgImage: "/assets/heist/facility/facility_wide.jpg",
    objective: "FIND THE FIRST ACCESS POINT",
    objectiveDescription: "An internal blueprint has been leaked. Locate the information required to identify the facility's first access point.",
    requiredStageId: "entrance",
    doorName: "REINFORCED GATE G-301",
    nextRoute: "/heist/initial-access",
    nextStageId: "initial-access",
    primaryMissionId: "mission-14", // Git Commit Trail / The Leaked Blueprint
    secondaryMissionIds: ["mission-15"],
    rewardItem: {
      id: "item-blueprint",
      name: "FACILITY BLUEPRINT & ACCESS KEY",
      category: "KEY_ASSET",
      icon: "Map",
      description: "Declassified subterranean schematics revealing unmonitored maintenance conduits and ventilation passages."
    },
    interactiveObjects: [
      {
        id: "recon_terminal",
        name: "SURVEILLANCE TERMINAL",
        type: "terminal",
        icon: "Terminal",
        status: "AVAILABLE",
        badge: "OPERATIONS DESK",
        description: "Abandoned engineering console with cached repository logs and leaked commit data.",
        actionLabel: "ACCESS TERMINAL",
        missionId: "mission-14"
      },
      {
        id: "evidence_board",
        name: "EVIDENCE BOARD & OSINT",
        type: "intel",
        icon: "Search",
        status: "INVESTIGATING",
        badge: "FACILITY INTEL",
        description: "Tactical corkboard showing campus satellite overlays, BGP routes, and target subdomains.",
        actionLabel: "INSPECT EVIDENCE",
        missionId: "mission-15"
      },
      {
        id: "recon_door",
        name: "GATE G-301 AIRLOCK",
        type: "door",
        icon: "DoorClosed",
        status: "LOCKED",
        badge: "ACCESS BARRIER",
        description: "Heavy hydraulic security gate barring entry into the outer security ring.",
        actionLabel: "INSPECT GATE"
      }
    ]
  },
  {
    id: "initial-access",
    slug: "initial-access",
    route: "/heist/initial-access",
    order: 2,
    shortName: "INITIAL ACCESS",
    codeName: "PHASE-02 // PERIMETER INFILTRATION",
    title: "INITIAL ACCESS CHECKPOINT",
    sector: "SECTOR-Bravo // Outer Security Ring",
    accessLevel: "LEVEL-2 CLEARANCE",
    statusText: "CHECKPOINT ARMED",
    bgImage: "/assets/heist/facility/secure_corridor.jpg",
    objective: "BYPASS THE FIRST SECURITY LAYER",
    objectiveDescription: "An abandoned authentication terminal may provide our entry point. Bypass the badge authentication gateway.",
    requiredStageId: "recon",
    doorName: "SECURITY AIRLOCK A-02",
    nextRoute: "/heist/infiltration",
    nextStageId: "infiltration",
    primaryMissionId: "mission-01", // Vault Gateway SQLi / The Forgotten Login
    secondaryMissionIds: ["mission-04"],
    rewardItem: {
      id: "item-badge",
      name: "SECURITY BADGE TOKEN",
      category: "CREDENTIAL",
      icon: "Fingerprint",
      description: "Cloned supervisor badge cipher token granting passage through automated badge checkpoints."
    },
    interactiveObjects: [
      {
        id: "auth_terminal",
        name: "AUTHENTICATION TERMINAL",
        type: "terminal",
        icon: "Terminal",
        status: "VULNERABLE",
        badge: "LOGIN GATEWAY",
        description: "Perimeter badge verification station accepting raw query string input.",
        actionLabel: "HACK TERMINAL",
        missionId: "mission-01"
      },
      {
        id: "biometric_scanner",
        name: "BIOMETRIC SCANNER",
        type: "scanner",
        icon: "Fingerprint",
        status: "STANDBY",
        badge: "HARDWARE READER",
        description: "Optical scanner synced to administrative badge ID hashes.",
        actionLabel: "PROBE SCANNER",
        missionId: "mission-04"
      },
      {
        id: "initial_door",
        name: "AIRLOCK A-02 DOOR",
        type: "door",
        icon: "DoorClosed",
        status: "LOCKED",
        badge: "HEAVY DOOR",
        description: "Dual-seal decompression airlock separating outer perimeter from internal corridors.",
        actionLabel: "INSPECT AIRLOCK"
      }
    ]
  },
  {
    id: "infiltration",
    slug: "infiltration",
    route: "/heist/infiltration",
    order: 3,
    shortName: "INFILTRATION",
    codeName: "PHASE-03 // PHYSICAL & FORENSIC PENETRATION",
    title: "INTERNAL CORRIDOR INFILTRATION",
    sector: "SECTOR-Charlie // Subterranean Corridor 3B",
    accessLevel: "LEVEL-3 RESTRICTED",
    statusText: "CORRIDOR ACTIVE",
    bgImage: "/assets/heist/missions/restricted_terminal.jpg",
    objective: "MOVE THROUGH THE INTERNAL SYSTEM",
    objectiveDescription: "The corridor is locked down with motion sensors and active surveillance. Disable optical feeds and extract RAM forensics.",
    requiredStageId: "initial-access",
    doorName: "BLAST DOOR B-301",
    nextRoute: "/heist/network",
    nextStageId: "network",
    primaryMissionId: "mission-08", // The Locked Terminal / Volatile RAM Dump
    secondaryMissionIds: ["mission-10"],
    rewardItem: {
      id: "item-forensic",
      name: "FORENSIC CRYPT-KEY",
      category: "KEY_ASSET",
      icon: "Key",
      description: "Cryptographic memory artifact extracted from abandoned workstation kernel space."
    },
    interactiveObjects: [
      {
        id: "corridor_camera",
        name: "SECURITY CAMERA",
        type: "camera",
        icon: "Camera",
        status: "ACTIVE",
        badge: "OPTICAL FEED",
        description: "Ceiling-mounted PTZ dome camera streaming live telemetry to central SOC.",
        actionLabel: "BYPASS FEED",
        missionId: "mission-10"
      },
      {
        id: "restricted_workstation",
        name: "RESTRICTED TERMINAL",
        type: "terminal",
        icon: "Terminal",
        status: "SUSPENDED",
        badge: "WORKSTATION",
        description: "Emergency maintenance terminal with uncommitted process memory dump.",
        actionLabel: "ANALYZE RAM",
        missionId: "mission-08"
      },
      {
        id: "corridor_door",
        name: "BLAST DOOR B-301",
        type: "door",
        icon: "DoorClosed",
        status: "LOCKED",
        badge: "INTERIOR BULKHEAD",
        description: "Electromagnetically locked bulkhead sealing the telecom sector.",
        actionLabel: "INSPECT BULKHEAD"
      }
    ]
  },
  {
    id: "network",
    slug: "network",
    route: "/heist/network",
    order: 4,
    shortName: "NETWORK",
    codeName: "PHASE-04 // INTERNAL PROTOCOL OVERRIDE",
    title: "NETWORK & TELECOM OPERATIONS",
    sector: "SECTOR-Delta // Data Distribution Center",
    accessLevel: "LEVEL-4 RESTRICTED",
    statusText: "NETWORK MONITORED",
    bgImage: "/assets/heist/missions/network_ops.jpg",
    objective: "BREACH THE INTERNAL NETWORK",
    objectiveDescription: "Overwhelm the industrial PLC coils, breach the internal network, and hijack telemetry streams.",
    requiredStageId: "infiltration",
    doorName: "FIREWALL GATEWAY FG-04",
    nextRoute: "/heist/security",
    nextStageId: "security",
    primaryMissionId: "mission-17", // Modbus PLC Switch Override
    secondaryMissionIds: ["mission-19"],
    telemetry: {
      nodes: 24,
      active: 19,
      security: "HIGH",
      throughput: "4.8 Gbps"
    },
    rewardItem: {
      id: "item-network",
      name: "PLC NETWORK KEY",
      category: "KEY_ASSET",
      icon: "Cpu",
      description: "Industrial Modbus master control token enabling power relay overrides across the facility."
    },
    interactiveObjects: [
      {
        id: "network_console",
        name: "MAIN NETWORK CONSOLE",
        type: "terminal",
        icon: "Terminal",
        status: "CRITICAL",
        badge: "PLC CONTROLLER",
        description: "Supervisory Modbus interface regulating cooling pumps and backup power grids.",
        actionLabel: "ACCESS NETWORK",
        missionId: "mission-17"
      },
      {
        id: "server_rack_array",
        name: "TELECOM RACK ARRAY",
        type: "server",
        icon: "Server",
        status: "RUNNING",
        badge: "CORE ROUTER",
        description: "Backbone fiber switches with live ARP tables and packet mirrors.",
        actionLabel: "SNIFF PACKETS",
        missionId: "mission-19"
      },
      {
        id: "network_door",
        name: "GATEWAY FG-04 DOOR",
        type: "door",
        icon: "DoorClosed",
        status: "LOCKED",
        badge: "FIREWALL DOOR",
        description: "Reinforced gate secured by network-synchronized solenoid latches.",
        actionLabel: "INSPECT GATEWAY"
      }
    ]
  },
  {
    id: "security",
    slug: "security",
    route: "/heist/security",
    order: 5,
    shortName: "SECURITY",
    codeName: "PHASE-05 // SUPERVISORY ENCLAVE BREACH",
    title: "SECURITY OPERATIONS CENTER",
    sector: "SECTOR-Echo // Security Enclave",
    accessLevel: "LEVEL-5 CRITICAL",
    statusText: "MAXIMUM SURVEILLANCE",
    bgImage: "/assets/heist/surveillance/cctv_wall.jpg",
    objective: "DISABLE FACILITY SECURITY",
    objectiveDescription: "Blind the 16-screen CCTV video wall, capture supervisor shadow hashes, and neutralize defensive countermeasures.",
    requiredStageId: "network",
    doorName: "REINFORCED VAULT APPROACH",
    nextRoute: "/heist/core",
    nextStageId: "core",
    primaryMissionId: "mission-03", // Telemetry Injection / Shadow Hash
    secondaryMissionIds: ["mission-06"],
    telemetry: {
      cameras: "ACTIVE (16/16)",
      doors: "LOCKED",
      alarms: "ARMED",
      threatLevel: "ELEVATED"
    },
    rewardItem: {
      id: "item-security",
      name: "SECURITY OVERRIDE TOKEN",
      category: "OVERRIDE",
      icon: "ShieldAlert",
      description: "Administrative supervisor certificate that forces defensive sentries into maintenance standby."
    },
    interactiveObjects: [
      {
        id: "cctv_wall_node",
        name: "CCTV VIDEO WALL",
        type: "cctv",
        icon: "Eye",
        status: "SURVEILLING",
        badge: "16 FEEDS ACTIVE",
        description: "Central visual surveillance wall monitoring every corridor and vault entrance.",
        actionLabel: "OVERRIDE CCTV",
        missionId: "mission-03"
      },
      {
        id: "security_workstation",
        name: "SUPERVISOR DESK",
        type: "terminal",
        icon: "Terminal",
        status: "ENCRYPTED",
        badge: "SHADOW AUTH",
        description: "Chief Security Officer workstation with password hash database.",
        actionLabel: "CRACK SHADOW",
        missionId: "mission-06"
      },
      {
        id: "security_door",
        name: "APPROACH PORTAL GATE",
        type: "door",
        icon: "DoorClosed",
        status: "LOCKED",
        badge: "VAULT CORRIDOR",
        description: "Hardened steel portal with biometric retina scanner guarding the core mainframe.",
        actionLabel: "INSPECT PORTAL"
      }
    ]
  },
  {
    id: "core",
    slug: "core",
    route: "/heist/core",
    order: 6,
    shortName: "CORE",
    codeName: "PHASE-06 // RESTRICTED FIRMWARE & HSM",
    title: "DATA CENTER CORE MAINFRAME",
    sector: "SECTOR-Foxtrot // Main Server Core",
    accessLevel: "LEVEL-6 MAXIMUM",
    statusText: "HIGH VALUE TARGET",
    bgImage: "/assets/heist/missions/server_room.jpg",
    objective: "GAIN CORE ACCESS",
    objectiveDescription: "Disengage the 4 interlocking security subsystems to lift blast shutters guarding the Digital Vault.",
    requiredStageId: "security",
    doorName: "TITANIUM VAULT SHUTTER",
    nextRoute: "/heist/vault",
    nextStageId: "vault",
    primaryMissionId: "mission-11", // Vault Arm Binary / Core Firmware
    secondaryMissionIds: ["mission-12"],
    multiRequirements: [
      { id: "req-net", name: "NETWORK KEY", isComplete: true },
      { id: "req-enc", name: "ENCRYPTION KEY", isComplete: true },
      { id: "req-adm", name: "ADMIN ACCESS", isComplete: false, missionId: "mission-11" },
      { id: "req-sec", name: "FIRMWARE BYPASS", isComplete: false, missionId: "mission-12" }
    ],
    rewardItem: {
      id: "item-master-cred",
      name: "MASTER VAULT CREDENTIAL",
      category: "KEY_ASSET",
      icon: "Lock",
      description: "Hardware Security Module cryptographic certificate required to execute The Vault Protocol."
    },
    interactiveObjects: [
      {
        id: "core_terminal",
        name: "CORE MAINFRAME CONSOLE",
        type: "terminal",
        icon: "Terminal",
        status: "ARMED",
        badge: "HSM CONTROLLER",
        description: "Central processing core controlling mechanical blast shutters and vault power circuits.",
        actionLabel: "DISENGAGE SUBSYSTEMS",
        missionId: "mission-11"
      },
      {
        id: "firmware_flasher",
        name: "ARM CORTEX INTERFACE",
        type: "tool",
        icon: "Cpu",
        status: "STANDBY",
        badge: "EMBEDDED BUS",
        description: "JTAG debugging port connected to the robotic blast door hydraulic actuators.",
        actionLabel: "REVERSE FIRMWARE",
        missionId: "mission-12"
      },
      {
        id: "core_door",
        name: "VAULT BLAST SHUTTERS",
        type: "door",
        icon: "DoorClosed",
        status: "SEALED",
        badge: "TITANIUM SHUTTER",
        description: "Twelve-ton solid titanium shutters protecting the vault inner sanctum.",
        actionLabel: "INSPECT SHUTTERS"
      }
    ]
  },
  {
    id: "vault",
    slug: "vault",
    route: "/heist/vault",
    order: 7,
    shortName: "THE VAULT",
    codeName: "PHASE-07 // MASTER VAULT BREACH",
    title: "THE DIGITAL VAULT",
    sector: "SECTOR-Omega // Sub-Level 4 Sanctum",
    accessLevel: "LEVEL-7 CLASSIFIED",
    statusText: "ARMORED SANCTUM",
    bgImage: "/assets/heist/vault/vault_entrance.jpg",
    objective: "REACH THE DIGITAL ASSET",
    objectiveDescription: "Authenticate operative credentials, crack the dynamic domain cipher, and open the Master Vault.",
    requiredStageId: "core",
    doorName: "HYDRAULIC VAULT DOOR",
    nextRoute: "/heist/escape",
    nextStageId: "escape",
    primaryMissionId: "mission-13", // Malware Domain Extract / Master Vault Breach
    secondaryMissionIds: ["mission-07"], // Weak RSA Modulus / Hardware Cryptography
    vaultProtocolSystems: [
      { id: "sys-enc", name: "ENCRYPTION", defaultSolved: false },
      { id: "sys-auth", name: "AUTHENTICATION", defaultSolved: false },
      { id: "sys-acc", name: "ACCESS CONTROL", defaultSolved: false },
      { id: "sys-core", name: "CORE PROTOCOL", defaultSolved: false }
    ],
    rewardItem: {
      id: "item-asset",
      name: "THE DIGITAL ASSET (SECURED)",
      category: "ULTIMATE_ASSET",
      icon: "Trophy",
      description: "CEC Sovereign Cryptographic Kernel: The ultimate prize. Extraction must occur before lockdown reaches maximum."
    },
    interactiveObjects: [
      {
        id: "vault_pedestal",
        name: "VAULT CONSOLE PEDESTAL",
        type: "terminal",
        icon: "Terminal",
        status: "LOCKED",
        badge: "MASTER PROTOCOL",
        description: "Hardened titanium podium directly controlling the 4-phase vault unlocking sequence.",
        actionLabel: "EXECUTE PROTOCOL",
        missionId: "mission-13"
      },
      {
        id: "vault_mechanism",
        name: "ROTARY COMBINATION LOCK",
        type: "mechanism",
        icon: "Disc",
        status: "ENGAGED",
        badge: "RSA HSM LOCK",
        description: "Triple precision locking wheel secured by embedded HSM cryptographic factors.",
        actionLabel: "FACTOR RSA KEY",
        missionId: "mission-07"
      }
    ]
  },
  {
    id: "escape",
    slug: "escape",
    route: "/heist/escape",
    order: 8,
    shortName: "ESCAPE",
    codeName: "PHASE-08 // EMERGENCY EXFILTRATION",
    title: "FACILITY LOCKDOWN & EGRESS",
    sector: "SECTOR-Exfil // Subterranean Shaft",
    accessLevel: "LOCKDOWN PROTOCOL ACTIVE",
    statusText: "CRITICAL LOCKDOWN",
    bgImage: "/assets/heist/facility/cyber_ops_center.jpg",
    objective: "ESCAPE THE FACILITY BEFORE LOCKDOWN",
    objectiveDescription: "The alarm is active! Security is converging! Patch the emergency exit hydraulic bypass before the lockdown timer expires.",
    requiredStageId: "vault",
    doorName: "EMERGENCY EGRESS SHAFT",
    nextRoute: null,
    nextStageId: null,
    primaryMissionId: "mission-20", // Emergency Exit Protocol
    lockdownDurationSeconds: 300, // 5 minutes
    rewardItem: {
      id: "item-clean-exit",
      name: "EXFILTRATION RECORD: PERFECT ESCAPE",
      category: "FINAL_BADGE",
      icon: "CheckCircle2",
      description: "Clean getaway logged. Facility security bypassed with 100% operational success."
    },
    interactiveObjects: [
      {
        id: "escape_controller",
        name: "EGRESS HYDRAULIC CONTROLLER",
        type: "terminal",
        icon: "Terminal",
        status: "EMERGENCY",
        badge: "EXIT OVERRIDE",
        description: "Manual pneumatic valve console controlling the surface blast doors.",
        actionLabel: "TRIGGER OVERRIDE",
        missionId: "mission-20"
      },
      {
        id: "exit_blast_gate",
        name: "SUBTERRANEAN EGRESS HATCH",
        type: "door",
        icon: "DoorClosed",
        status: "SEALING",
        badge: "EMERGENCY HATCH",
        description: "Final escape tunnel leading to the exfil extraction vehicle.",
        actionLabel: "INSPECT HATCH"
      }
    ]
  }
];

export const STAGE_ROUTE_MAP = {
  "/heist": "entrance",
  "/heist/recon": "recon",
  "/heist/initial-access": "initial-access",
  "/heist/infiltration": "infiltration",
  "/heist/network": "network",
  "/heist/security": "security",
  "/heist/core": "core",
  "/heist/vault": "vault",
  "/heist/escape": "escape"
};

export function getStageByRoute(pathname) {
  // Normalize pathname: remove base path if present
  let clean = pathname || "";
  if (clean.startsWith("/cec-heist")) {
    clean = clean.replace("/cec-heist", "");
  }
  if (clean.endsWith("/") && clean.length > 1) {
    clean = clean.slice(0, -1);
  }
  const stageId = STAGE_ROUTE_MAP[clean] || (clean === "/heist" ? "entrance" : null);
  return HEIST_STAGES_CONFIG.find(s => s.id === stageId) || HEIST_STAGES_CONFIG[0];
}

export function getStageById(id) {
  return HEIST_STAGES_CONFIG.find(s => s.id === id) || null;
}
