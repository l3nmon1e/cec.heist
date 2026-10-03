# CEC HEIST // Technical Cyber Challenge Platform

> **Capture The Flag & Cyber Operations Console**  
> Organized at **Canara Engineering College, Mangalore**

![CEC HEIST](/public/images/logo.png)

## Overview

**CEC HEIST** is a technical cybersecurity competition platform and restricted-facility CTF console designed for students and security researchers.

### Key Features

- **Hero Operations Console**: Full-width panoramic high-security facility environment with official branding.
- **19 Complete CTF Missions**: Spanning 6 operational domains:
  - **Web Exploitation** (SQLi, JWT None-Alg Forgery, Stored XSS, IDOR)
  - **Cryptography** (XOR Ciphers, Linux Shadow Hashes, Weak RSA Primes)
  - **Digital Forensics** (Disk Carving, ICMP Tunneling, Steganography)
  - **Reverse Engineering** (ELF x86-64 Solenoids, ARM Cortex-M Firmware, Malware DGAs)
  - **Open Source Intelligence** (Git Commit Forensics, Certificate Transparency, Campus Geolocation)
  - **Network Analysis** (Modbus PLC Coil Overrides, WebSockets, ARP Spoofing)
- **Live Flag Verification Oracle**: Validates submitted flags with simulated cryptographic latency and dynamic score allocation.
- **Integrated Diagnostic Terminal**: Interactive Linux shell supporting `help`, `ls -la`, `cat`, `strings`, `file`, `curl`, `nmap`, `whoami`, `ifconfig`, `flag <token>`.
- **Live Scoreboard & Telemetry Feed**: Real-time ranking with movement indicators and active solve streams.
- **Progressive Intel Requisitions (Hints)**: Multi-stage clues with recorded score penalties.
- **Operator Dossier**: Complete user statistics, accuracy radar, and incident evidence board.
- **Audio Feedback Engine**: Web Audio API synthesized mechanical relay clicks, verification beeps, and solve fanfare.

---

## Tech Stack

- **Frontend**: React 19, Vite 6, Tailwind CSS v4, Lucide Icons
- **State Management**: React Context with LocalStorage persistence
- **Sound System**: Native HTML5 Web Audio API
- **Design System**: Industrial Restricted Facility Theme (`#0A0A0A`, `#151515`, `#FACC15`)

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/s7arlen/cec-heist.git
   cd cec-heist
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   npm run preview
   ```

---

## License

Created for **Canara Engineering College** Cybersecurity Event. All rights reserved.
