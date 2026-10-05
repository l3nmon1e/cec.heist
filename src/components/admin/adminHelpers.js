// Admin sector mappings, status helpers and utility formatters
export const SECTORS_LIST = [
  { id: "recon", number: "01", name: "RECON", shortName: "Recon", totalChallenges: 2, requiredStageId: "entrance" },
  { id: "initial-access", number: "02", name: "INITIAL ACCESS", shortName: "Initial Access", totalChallenges: 2, requiredStageId: "recon" },
  { id: "infiltration", number: "03", name: "INFILTRATION", shortName: "Infiltration", totalChallenges: 2, requiredStageId: "infiltration" },
  { id: "network", number: "04", name: "NETWORK", shortName: "Network", totalChallenges: 3, requiredStageId: "network" },
  { id: "security", number: "05", name: "SECURITY", shortName: "Security", totalChallenges: 2, requiredStageId: "security" },
  { id: "core", number: "06", name: "CORE", shortName: "Core", totalChallenges: 3, requiredStageId: "core" },
  { id: "vault", number: "07", name: "THE VAULT", shortName: "The Vault", totalChallenges: 4, requiredStageId: "vault" },
  { id: "escape", number: "08", name: "ESCAPE", shortName: "Escape", totalChallenges: 2, requiredStageId: "escape" }
];

export const MISSION_SECTOR_MAP = {
  "mission-14": { sector: "Recon", sectorId: "recon", order: 1 },
  "mission-15": { sector: "Recon", sectorId: "recon", order: 1 },
  "mission-01": { sector: "Initial Access", sectorId: "initial-access", order: 2 },
  "mission-04": { sector: "Initial Access", sectorId: "initial-access", order: 2 },
  "mission-02": { sector: "Infiltration", sectorId: "infiltration", order: 3 },
  "mission-05": { sector: "Infiltration", sectorId: "infiltration", order: 3 },
  "mission-03": { sector: "Network", sectorId: "network", order: 4 },
  "mission-07": { sector: "Network", sectorId: "network", order: 4 },
  "mission-18": { sector: "Network", sectorId: "network", order: 4 },
  "mission-06": { sector: "Security", sectorId: "security", order: 5 },
  "mission-08": { sector: "Security", sectorId: "security", order: 5 },
  "mission-09": { sector: "Core", sectorId: "core", order: 6 },
  "mission-10": { sector: "Core", sectorId: "core", order: 6 },
  "mission-19": { sector: "Core", sectorId: "core", order: 6 },
  "mission-11": { sector: "The Vault", sectorId: "vault", order: 7 },
  "mission-12": { sector: "The Vault", sectorId: "vault", order: 7 },
  "mission-13": { sector: "The Vault", sectorId: "vault", order: 7 },
  "mission-20": { sector: "The Vault", sectorId: "vault", order: 7 },
  "mission-16": { sector: "Escape", sectorId: "escape", order: 8 },
  "mission-17": { sector: "Escape", sectorId: "escape", order: 8 }
};

export const getMissionSector = (missionId, category = "") => {
  if (MISSION_SECTOR_MAP[missionId]) {
    return MISSION_SECTOR_MAP[missionId];
  }
  const cat = (category || "").toUpperCase();
  if (cat.includes("OSINT") || cat.includes("RECON")) return { sector: "Recon", sectorId: "recon", order: 1 };
  if (cat.includes("WEB") || cat.includes("AUTH")) return { sector: "Initial Access", sectorId: "initial-access", order: 2 };
  if (cat.includes("CRYPTO")) return { sector: "Security", sectorId: "security", order: 5 };
  if (cat.includes("REVERSE")) return { sector: "Infiltration", sectorId: "infiltration", order: 3 };
  if (cat.includes("NETWORK") || cat.includes("TRAFFIC")) return { sector: "Network", sectorId: "network", order: 4 };
  if (cat.includes("PWN") || cat.includes("EXPLOIT")) return { sector: "Core", sectorId: "core", order: 6 };
  if (cat.includes("HARDWARE") || cat.includes("VAULT")) return { sector: "The Vault", sectorId: "vault", order: 7 };
  return { sector: "The Vault", sectorId: "vault", order: 7 };
};

// Calculate team progression sector dynamically
export const getTeamCurrentSector = (team) => {
  const solved = team.solved || 0;
  if (solved >= 18) return "Escape";
  if (solved >= 14) return "The Vault";
  if (solved >= 11) return "Core";
  if (solved >= 9) return "Security";
  if (solved >= 6) return "Network";
  if (solved >= 4) return "Infiltration";
  if (solved >= 2) return "Initial Access";
  return "Recon";
};
