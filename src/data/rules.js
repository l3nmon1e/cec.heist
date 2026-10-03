export const RULES_DATA = [
  {
    id: "rules-event",
    category: "OPERATIONAL PROTOCOL",
    title: "Event Rules & Competition Parameters",
    content: [
      "CEC HEIST is an intensive time-bound cybersecurity CTF operation organized at Canara Engineering College.",
      "The competition duration is strictly governed by the master clock: 04:00:00 total operational window.",
      "All challenges are hosted within dedicated virtualized subnets (10.24.0.0/16) and accessible via team VPN profiles.",
      "Flags submitted after the timer reaches 00:00:00 will be discarded by the validation oracle without exception."
    ]
  },
  {
    id: "rules-scoring",
    category: "SCORING ALGORITHM",
    title: "Scoring & Dynamic Point Decay",
    content: [
      "Initial challenge values range from 100 to 500 points depending on verified technical difficulty tier (EASY, MEDIUM, HARD, INSANE).",
      "Dynamic Scoring Model: Challenge points decay asymptotically based on total successful solves across competing teams.",
      "First Blood Bonus: The first team to capture a flag on any challenge receives a +10% unpenalized score multiplier.",
      "Tie-breaking protocol: Teams with identical points are ranked in order of the timestamp of their last valid flag submission."
    ]
  },
  {
    id: "rules-flag",
    category: "SUBMISSION SYNTAX",
    title: "Flag Format & Verification Specification",
    content: [
      "Standard flag syntax adheres strictly to regular expression: ^CEC\\{[a-zA-Z0-9_\\-\\?!@#$%^&*]+\\}$",
      "Example valid format: CEC{d1g1tal_c4rv1ng_unl0cked_f4c1l1ty}",
      "All flags are case-sensitive. Trailing whitespace, linebreaks, or markdown wrapping will result in a validation failure.",
      "Flags must be directly obtained through exploit execution, binary reverse engineering, or artifact analysis."
    ]
  },
  {
    id: "rules-hints",
    category: "TACTICAL ASSISTANCE",
    title: "Hints & Penalty Deductions",
    content: [
      "Each mission provides up to 3 progressive technical hints designed to assist teams stalled on an objective.",
      "Hint unlock carries an immutable point penalty deducted immediately upon requisition: Hint 1 (-15 to -25 pts), Hint 2 (-25 to -50 pts), Hint 3 (-40 to -80 pts).",
      "Point deductions are permanently recorded against your team's cumulative challenge score for that specific mission.",
      "A challenge score cannot drop below 10 points regardless of hints utilized."
    ]
  },
  {
    id: "rules-team",
    category: "TEAM INTEGRITY",
    title: "Team Structure & Collaboration Bounds",
    content: [
      "Teams are strictly constrained to registered members (1 to 4 operators per callsign).",
      "Inter-team collusion, flag sharing, credential trading, or cooperative exploitation between differing callsigns is strictly prohibited.",
      "Any team detected sharing flags or solutions will face immediate disqualification and revocation of platform access."
    ]
  },
  {
    id: "rules-prohibited",
    category: "SECURITY DIRECTIVE",
    title: "Prohibited Actions & Attack Boundaries",
    content: [
      "DO NOT target platform infrastructure, scoring server, scoreboard, or router gateway (10.24.0.1).",
      "Denial of Service (DoS/DDoS) attacks, network flooding (SYN flood, UDP blast), and automated brute-force attacks exceeding 20 req/sec are strictly forbidden.",
      "Attacking other teams' client machines, spoofing VPN IPs, or hijacking team sessions will lead to immediate campus disciplinary review.",
      "Automated scanners (e.g., automated Nikto, Nessus, SQLmap aggressive crawl) that generate excessive noise against challenge servers are disallowed unless specified."
    ]
  },
  {
    id: "rules-submission",
    category: "RATE LIMITS",
    title: "Submission Rules & Lockout Triggers",
    content: [
      "Flag submission rate limit: Maximum 5 incorrect attempts per mission per 60-second sliding window.",
      "Exceeding 5 failed attempts will initiate an automatic 3-minute challenge submission lockout on your operator terminal.",
      "Brute-forcing flag combinations is mathematically futile and will trigger automated IP quarantine."
    ]
  },
  {
    id: "rules-support",
    category: "OPS DESK",
    title: "Technical Support & Incident Reporting",
    content: [
      "If a challenge container exhibits unexpected kernel panics, unresponsive sockets, or memory leaks, report to Mission Control Desk.",
      "Discord / IRC channel: #ops-support on the CEC Heist Tactical Server.",
      "Include challenge ID (e.g. MISSION 08), target IP, and packet dump excerpt in your ticket."
    ]
  }
];
