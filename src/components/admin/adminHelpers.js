// Admin sector mappings, status helpers and utility formatters
export const SECTORS_LIST = [
  { id: "recon", number: "01", name: "RECON", shortName: "Recon", totalChallenges: 3, requiredStageId: null },
  { id: "initial-access", number: "02", name: "INITIAL ACCESS", shortName: "Initial Access", totalChallenges: 3, requiredStageId: "recon" },
  { id: "infiltration", number: "03", name: "INFILTRATION", shortName: "Infiltration", totalChallenges: 3, requiredStageId: "initial-access" },
  { id: "network", number: "04", name: "NETWORK", shortName: "Network", totalChallenges: 3, requiredStageId: "infiltration" },
  { id: "security", number: "05", name: "SECURITY", shortName: "Security", totalChallenges: 3, requiredStageId: "network" },
  { id: "core", number: "06", name: "CORE", shortName: "Core", totalChallenges: 2, requiredStageId: "security" },
  { id: "vault", number: "07", name: "THE VAULT", shortName: "The Vault", totalChallenges: 2, requiredStageId: "core" },
  { id: "escape", number: "08", name: "ESCAPE", shortName: "Escape", totalChallenges: 1, requiredStageId: "vault" }
];

export const MISSION_SECTOR_MAP = {
  "mission-14": { sector: "Recon", sectorShort: "Recon", sectorId: "recon", order: 1 },
  "mission-15": { sector: "Recon", sectorShort: "Recon", sectorId: "recon", order: 1 },
  "mission-16": { sector: "Recon", sectorShort: "Recon", sectorId: "recon", order: 1 },
  "mission-01": { sector: "Initial Access", sectorShort: "Initial Access", sectorId: "initial-access", order: 2 },
  "mission-02": { sector: "Initial Access", sectorShort: "Initial Access", sectorId: "initial-access", order: 2 },
  "mission-04": { sector: "Initial Access", sectorShort: "Initial Access", sectorId: "initial-access", order: 2 },
  "mission-08": { sector: "Infiltration", sectorShort: "Infiltration", sectorId: "infiltration", order: 3 },
  "mission-09": { sector: "Infiltration", sectorShort: "Infiltration", sectorId: "infiltration", order: 3 },
  "mission-10": { sector: "Infiltration", sectorShort: "Infiltration", sectorId: "infiltration", order: 3 },
  "mission-17": { sector: "Network", sectorShort: "Network", sectorId: "network", order: 4 },
  "mission-18": { sector: "Network", sectorShort: "Network", sectorId: "network", order: 4 },
  "mission-19": { sector: "Network", sectorShort: "Network", sectorId: "network", order: 4 },
  "mission-03": { sector: "Security", sectorShort: "Security", sectorId: "security", order: 5 },
  "mission-05": { sector: "Security", sectorShort: "Security", sectorId: "security", order: 5 },
  "mission-06": { sector: "Security", sectorShort: "Security", sectorId: "security", order: 5 },
  "mission-11": { sector: "Core", sectorShort: "Core", sectorId: "core", order: 6 },
  "mission-12": { sector: "Core", sectorShort: "Core", sectorId: "core", order: 6 },
  "mission-07": { sector: "The Vault", sectorShort: "The Vault", sectorId: "vault", order: 7 },
  "mission-13": { sector: "The Vault", sectorShort: "The Vault", sectorId: "vault", order: 7 },
  "mission-20": { sector: "Escape", sectorShort: "Escape", sectorId: "escape", order: 8 }
};

export const getMissionSector = (missionId, category = "") => {
  if (MISSION_SECTOR_MAP[missionId]) {
    return MISSION_SECTOR_MAP[missionId];
  }
  const cat = (category || "").toUpperCase();
  if (cat.includes("OSINT") || cat.includes("RECON")) return { sector: "Recon", sectorShort: "Recon", sectorId: "recon", order: 1 };
  if (cat.includes("WEB") || cat.includes("AUTH")) return { sector: "Initial Access", sectorShort: "Initial Access", sectorId: "initial-access", order: 2 };
  if (cat.includes("FORENSIC")) return { sector: "Infiltration", sectorShort: "Infiltration", sectorId: "infiltration", order: 3 };
  if (cat.includes("NETWORK") || cat.includes("TRAFFIC")) return { sector: "Network", sectorShort: "Network", sectorId: "network", order: 4 };
  if (cat.includes("CRYPTO") || cat.includes("SECURITY")) return { sector: "Security", sectorShort: "Security", sectorId: "security", order: 5 };
  if (cat.includes("PWN") || cat.includes("EXPLOIT") || cat.includes("REVERSE")) return { sector: "Core", sectorShort: "Core", sectorId: "core", order: 6 };
  if (cat.includes("HARDWARE") || cat.includes("VAULT")) return { sector: "The Vault", sectorShort: "The Vault", sectorId: "vault", order: 7 };
  return { sector: "The Vault", sectorShort: "The Vault", sectorId: "vault", order: 7 };
};

// Calculate team progression sector dynamically
export const getTeamCurrentSector = (team) => {
  const solved = team.solved || 0;
  if (solved >= 19) return "Escape";
  if (solved >= 16) return "The Vault";
  if (solved >= 13) return "Core";
  if (solved >= 10) return "Security";
  if (solved >= 7) return "Network";
  if (solved >= 4) return "Infiltration";
  if (solved >= 2) return "Initial Access";
  return "Recon";
};
