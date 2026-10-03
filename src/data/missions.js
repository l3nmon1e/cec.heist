export const MISSIONS_DATA = [
  {
    id: "mission-01",
    number: "01",
    title: "VAULT GATEWAY SQLi",
    category: "WEB",
    difficulty: "EASY",
    points: 100,
    solvedCount: 68,
    status: "SOLVED",
    target: "10.24.12.80:80",
    timeEstimate: "20 MIN",
    requiredSkills: ["SQL Injection", "Authentication Bypass", "SQLite Query Structure"],
    brief: "The facility perimeter security gate operates a badge verification endpoint. Intelligence reveals that user input sent in the badge query string is directly interpolated into an SQLite query without parameterized sanitization.",
    objectives: [
      "Probe parameter ?badge_id= for syntax error induction",
      "Bypass the authentication boolean condition using classic ' OR 1=1--",
      "Dump the administrative session token from the response header",
      "Submit the retrieved flag to verify gate clearance"
    ],
    hints: [
      { id: 1, text: "Try terminating the single-quote string literal and appending an always-true predicate.", penalty: 15 },
      { id: 2, text: "The backend is SQLite: comment syntax is '--' without requiring space after double dash.", penalty: 25 },
      { id: 3, text: "Payload ' OR '1'='1' UNION SELECT 1,'admin',flag FROM credentials-- reveals the flag.", penalty: 40 }
    ],
    flag: "CEC{sql_inj_byp4ss_2026}",
    terminalAvailable: true,
    terminalFiles: [
      { name: "probe.py", content: "# Script to probe badge endpoint\nimport requests\nresp = requests.get('http://10.24.12.80/verify?badge_id=1')\nprint(resp.text)" },
      { name: "notes.txt", content: "Gatekeeper v2.1 running on port 80. Badge auth logic uses single quotes." }
    ],
    terminalCommands: {
      "curl http://10.24.12.80/verify?badge_id=1": '{"status":"DENIED","badge_id":1,"error":"Badge not found"}',
      "curl \"http://10.24.12.80/verify?badge_id=' OR 1=1--\"": '{"status":"ACCESS_GRANTED","role":"SECURITY_SUPERVISOR","flag":"CEC{sql_inj_byp4ss_2026}"}'
    }
  },
  {
    id: "mission-02",
    number: "02",
    title: "JWT ALGORITHM CONFUSION",
    category: "WEB",
    difficulty: "MEDIUM",
    points: 250,
    solvedCount: 42,
    status: "AVAILABLE",
    target: "10.24.12.94:443",
    timeEstimate: "35 MIN",
    requiredSkills: ["JWT Signature Forgery", "Base64URL", "Header Manipulation"],
    brief: "The restricted door access control service validates identity tokens using JSON Web Tokens. Security auditing uncovered that the token parser insecurely respects 'alg': 'none', accepting unsigned forged administrative credentials.",
    objectives: [
      "Decode the current guest session JWT from the authorization cookie",
      "Modify the JWT header algorithm field from 'HS256' to 'none'",
      "Elevate the payload role from 'GUEST' to 'FACILITY_DIRECTOR'",
      "Re-encode payload without cryptographic signature and dispatch to /api/override"
    ],
    hints: [
      { id: 1, text: "The signature portion of the JWT can be empty (i.e. header.payload.) when alg is none.", penalty: 20 },
      { id: 2, text: "Ensure 'alg' is lowercase 'none'. Some implementations check case sensitivity.", penalty: 35 },
      { id: 3, text: "Try base64url encoding {'alg':'none','typ':'JWT'} and {'sub':'admin','role':'FACILITY_DIRECTOR'}.", penalty: 60 }
    ],
    flag: "CEC{jwt_n0ne_4lg_expl0it3d}",
    terminalAvailable: true,
    terminalFiles: [
      { name: "token.jwt", content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvcGVyYXRvcl8xNyIsInJvbGUiOiJHVUVTVCJ9.sig" },
      { name: "forge.sh", content: "#!/bin/bash\n# Use jwt-tool or echo to craft forged token" }
    ],
    terminalCommands: {
      "cat token.jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvcGVyYXRvcl8xNyIsInJvbGUiOiJHVUVTVCJ9.sig",
      "curl -H \"Authorization: Bearer forged\" https://10.24.12.94/api/override": "[!] ALERT: Unlocked Door 3B-2. Access granted to FACILITY_DIRECTOR. Flag: CEC{jwt_n0ne_4lg_expl0it3d}"
    }
  },
  {
    id: "mission-03",
    number: "03",
    title: "TELEMETRY INJECTION (XSS)",
    category: "WEB",
    difficulty: "HARD",
    points: 350,
    solvedCount: 21,
    status: "AVAILABLE",
    target: "10.24.14.15:8000",
    timeEstimate: "45 MIN",
    requiredSkills: ["Stored XSS", "DOM Sanitization Bypass", "Session Hijacking"],
    brief: "The CCTV status log viewer reflects the client's telemetry packet payload directly to the operator's live browser console. Craft an injection payload that executes in the supervisor's session context.",
    objectives: [
      "Identify the unescaped sensor description input field in the telemetry POST route",
      "Bypass the client-side character filter for angled brackets",
      "Deliver a payload that exfiltrates the security chief's active session cookie",
      "Authenticate as the security chief and read the classified vault manifest"
    ],
    hints: [
      { id: 1, text: "Check SVG-based script execution vectors like <svg/onload=...>.", penalty: 25 },
      { id: 2, text: "The telemetry reader executes in an isolated iframe with allow-scripts enabled.", penalty: 45 },
      { id: 3, text: "Flag is stored in document.cookie: 'flag=CEC{xss_s3ss10n_st0len_cctv}'.", penalty: 70 }
    ],
    flag: "CEC{xss_s3ss10n_st0len_cctv}",
    terminalAvailable: true
  },
  {
    id: "mission-04",
    number: "04",
    title: "AIRLOCK OVERRIDE IDOR",
    category: "WEB",
    difficulty: "MEDIUM",
    points: 200,
    solvedCount: 51,
    status: "SOLVED",
    target: "10.24.14.99:5000",
    timeEstimate: "25 MIN",
    requiredSkills: ["Insecure Direct Object Reference", "REST API Tampering", "Privilege Escalation"],
    brief: "Airlock doors across Sectors 1 through 9 are toggled via API endpoint /api/v1/door/status/{doorId}. While sector 1 is unprivileged, sector 9 requires director credentials, but the endpoint fails to enforce authorization checks.",
    objectives: [
      "Enumerate valid door ID ranges through dictionary fuzzing",
      "Observe differences between Door 101 and restricted Door 909",
      "Send a state change request '{\"state\":\"FORCED_OPEN\"}' to Door 909",
      "Retrieve the emergency unlock override flag"
    ],
    hints: [
      { id: 1, text: "Door 909 maps to the Primary Vault Blast Airlock.", penalty: 20 },
      { id: 2, text: "The request requires method PUT with Content-Type: application/json.", penalty: 30 }
    ],
    flag: "CEC{1d0r_d00r_0v3rr1d3_unl0ck}",
    terminalAvailable: true
  },
  {
    id: "mission-05",
    number: "05",
    title: "INTERCEPTED FREQUENCY CIPHER",
    category: "CRYPTO",
    difficulty: "EASY",
    points: 150,
    solvedCount: 59,
    status: "SOLVED",
    target: "RF-433.92MHz Demodulated Stream",
    timeEstimate: "25 MIN",
    requiredSkills: ["XOR Analysis", "Frequency Analysis", "Vigenère Decryption"],
    brief: "An SDR antenna tuned to 433.92MHz captured an encrypted burst transmission between perimeter guard patrols. Intelligence indicates the encryption key is repeating and related to Canara Engineering College foundation year.",
    objectives: [
      "Extract the raw hexadecimal stream from the audio demodulation dump",
      "Perform a known-plaintext attack using the known flag prefix 'CEC{'",
      "Derive the repeating key 'CEC2001'",
      "Decrypt the full transmission and recover the security pass phrase"
    ],
    hints: [
      { id: 1, text: "Key length is 7 characters: starts with 'CEC'.", penalty: 15 },
      { id: 2, text: "Year of establishment of Canara Engineering College is 2001.", penalty: 25 }
    ],
    flag: "CEC{x0r_rad10_strea_cec2001}",
    terminalAvailable: true
  },
  {
    id: "mission-06",
    number: "06",
    title: "SHADOW HASH RECOVERY",
    category: "CRYPTO",
    difficulty: "MEDIUM",
    points: 250,
    solvedCount: 38,
    status: "AVAILABLE",
    target: "/etc/shadow.bak",
    timeEstimate: "35 MIN",
    requiredSkills: ["Hashcat", "John the Ripper", "SHA-512 Crypt"],
    brief: "A compromised backup archive extracted from the central maintenance node contains the root password hash formatted in standard Linux crypt format ($6$salt$hash).",
    objectives: [
      "Parse the salt and cryptographic format indicator ($6$ = SHA-512 crypt)",
      "Set up a rule-based attack using the technical event dictionary",
      "Crack the plaintext password of user 'vault_operator'",
      "Compute the verification flag according to format rules"
    ],
    hints: [
      { id: 1, text: "The password is 10 characters long, combining an engineering term with numbers.", penalty: 25 },
      { id: 2, text: "Plaintext password is 'heist2026!'", penalty: 50 }
    ],
    flag: "CEC{s4lt3d_r00t_cr4ck3d_99}",
    terminalAvailable: true
  },
  {
    id: "mission-07",
    number: "07",
    title: "WEAK RSA MODULUS",
    category: "CRYPTO",
    difficulty: "HARD",
    points: 400,
    solvedCount: 16,
    status: "AVAILABLE",
    target: "vault_pubkey.pem",
    timeEstimate: "50 MIN",
    requiredSkills: ["RSA Factorization", "Fermat's Factorization", "Python Cryptography"],
    brief: "The communications link to the central vault safe relies on RSA-2048. Because of a flawed pseudo-random number generator implementation, primes p and q are exceptionally close together (|p - q| < 2^512).",
    objectives: [
      "Extract modulus N and public exponent e from the PEM certificate",
      "Implement Fermat's factorization method to calculate p and q in under 20 iterations",
      "Compute Euler's totient phi(N) and private exponent d",
      "Decrypt ciphertext.enc to recover the classified payload"
    ],
    hints: [
      { id: 1, text: "Fermat factorization succeeds in milliseconds when p and q are close.", penalty: 35 },
      { id: 2, text: "Use Python gmpy2 or sympy.integer_nthroot for arbitrary precision math.", penalty: 60 }
    ],
    flag: "CEC{f3rm4t_f4ct0r_sh4r3d_pr1m3s}",
    terminalAvailable: true
  },
  {
    id: "mission-08",
    number: "08",
    title: "THE LOCKED TERMINAL",
    category: "FORENSICS",
    difficulty: "HARD",
    points: 350,
    solvedCount: 14,
    status: "AVAILABLE",
    target: "10.24.16.42:2222",
    timeEstimate: "45 MIN",
    requiredSkills: ["Disk Carving", "Ext4 Inodes", "Hex Inspection", "Memory Forensics"],
    brief: "A rogue technician abruptly severed connection to a terminal console inside the server room. The file containing the facility bypass sequence was deleted immediately before disconnection. You have read-only SSH access to the triage image.",
    objectives: [
      "Access the target console via SSH on port 2222",
      "Identify the unallocated sectors on the /dev/sdb1 mount",
      "Carve the deleted raw text file using ext4magic or raw strings grep",
      "Extract and submit the complete vault recovery flag"
    ],
    hints: [
      { id: 1, text: "The deleted file had an inode timestamp within the last 15 minutes.", penalty: 25 },
      { id: 2, text: "Run `strings /dev/sdb1 | grep CEC{` inside the target terminal.", penalty: 50 },
      { id: 3, text: "Flag string is: CEC{d1g1tal_c4rv1ng_unl0cked_f4c1l1ty}", penalty: 80 }
    ],
    flag: "CEC{d1g1tal_c4rv1ng_unl0cked_f4c1l1ty}",
    terminalAvailable: true,
    terminalFiles: [
      { name: "triage_notes.txt", content: "CRITICAL: Drive /dev/sdb1 unmounted forcefully at 14:22 UTC.\nFile .vault_override.key was unlinked." },
      { name: "disk_dump.raw", content: "[RAW EXT4 IMAGE: 64MB BLOCK ALLOCATOR TABLE]" }
    ],
    terminalCommands: {
      "ls -la": "total 65548\ndrwxr-xr-x 2 operator operator     4096 Oct 03 14:22 .\ndrwxr-xr-x 4 root     root         4096 Oct 03 14:00 ..\n-rw-r--r-- 1 operator operator      128 Oct 03 14:22 triage_notes.txt\n-rw-r--r-- 1 root     root     67108864 Oct 03 14:23 disk_dump.raw",
      "cat triage_notes.txt": "CRITICAL: Drive /dev/sdb1 unmounted forcefully at 14:22 UTC.\nFile .vault_override.key was unlinked.",
      "strings disk_dump.raw | grep CEC": "FOUND OFFSET 0x004F8A20: CEC{d1g1tal_c4rv1ng_unl0cked_f4c1l1ty}",
      "file disk_dump.raw": "disk_dump.raw: Linux rev 1.0 ext4 filesystem data, UUID=7a8b-4c9d-88ff (extents) (large files)"
    }
  },
  {
    id: "mission-09",
    number: "09",
    title: "ICMP TUNNEL INVESTIGATION",
    category: "FORENSICS",
    difficulty: "MEDIUM",
    points: 250,
    solvedCount: 33,
    status: "AVAILABLE",
    target: "heist_traffic_dump.pcapng",
    timeEstimate: "35 MIN",
    requiredSkills: ["Wireshark", "Tshark", "Protocol Exfiltration"],
    brief: "Network intrusion detection caught anomalous ICMP traffic leaving the security perimeter. The payload bytes of regular ping echo requests contain custom fragmented data exfiltrating facility floor plans.",
    objectives: [
      "Open heist_traffic_dump.pcapng and filter for icmp.type == 8",
      "Reconstruct the 32-byte data field from successive ping requests",
      "Decode the concatenated hex stream into plaintext ASCII",
      "Submit the flag extracted from the exfiltrated packet payload"
    ],
    hints: [
      { id: 1, text: "Filter Wireshark by 'icmp and data.len > 16'.", penalty: 20 },
      { id: 2, text: "Tshark command: tshark -r dump.pcapng -Y 'icmp' -T fields -e data | xxd -r -p", penalty: 40 }
    ],
    flag: "CEC{1cmp_tunne1_p4ck3t_l34k}",
    terminalAvailable: true
  },
  {
    id: "mission-10",
    number: "10",
    title: "CCTV FRAME STEGANOGRAPHY",
    category: "FORENSICS",
    difficulty: "EASY",
    points: 150,
    solvedCount: 61,
    status: "SOLVED",
    target: "corridor_cam_04.png",
    timeEstimate: "20 MIN",
    requiredSkills: ["Steghide", "LSB Extraction", "PNG Metadata"],
    brief: "An image dumped from Camera 04 in the North Corridor contains hidden coordinate data embedded in the least significant bits of the blue color plane.",
    objectives: [
      "Inspect image metadata with exiftool for suspicious copyright tags",
      "Run zsteg or steghide to extract hidden data from LSB channels",
      "Locate the embedded facility grid coordinates",
      "Submit the verified coordinate flag"
    ],
    hints: [
      { id: 1, text: "Check the blue channel LSB with zsteg.", penalty: 15 },
      { id: 2, text: "No password is required for steghide extraction.", penalty: 25 }
    ],
    flag: "CEC{lsb_st3g0_cctv_c00rd1n4t3s}",
    terminalAvailable: true
  },
  {
    id: "mission-11",
    number: "11",
    title: "VAULT ARM BINARY",
    category: "REVERSE ENGINEERING",
    difficulty: "HARD",
    points: 400,
    solvedCount: 18,
    status: "AVAILABLE",
    target: "vault_arm.bin (ELF 64-bit)",
    timeEstimate: "50 MIN",
    requiredSkills: ["Ghidra", "GDB", "x86_64 Disassembly", "Assembly Tracing"],
    brief: "The robotic locking arm that seals the inner safe runs a stripped ELF 64-bit binary. Disassemble the binary and identify the secret key comparison algorithm that controls the mechanical solenoid.",
    objectives: [
      "Inspect the binary architecture and entry point using objdump/readelf",
      "Decompile the check_auth_passkey function at virtual address 0x4010a0",
      "Analyze the string comparison logic and anti-debugging ptrace check",
      "Extract the valid passkey string that satisfies the branch condition"
    ],
    hints: [
      { id: 1, text: "Look at the memory location referenced right before the strcmp call.", penalty: 30 },
      { id: 2, text: "The binary checks if ptrace is attached before decrypting the secret in memory.", penalty: 50 },
      { id: 3, text: "Bypass ptrace or read the static XOR array with key 0x5A.", penalty: 75 }
    ],
    flag: "CEC{r3v_x86_c0mp4r3_p4ss_882}",
    terminalAvailable: true,
    terminalFiles: [
      { name: "vault_arm.bin", content: "\x7fELF\x02\x01\x01\x00 [ELF 64-bit LSB executable, x86-64, dynamically linked]" },
      { name: "gdb_script.py", content: "import gdb\n# Breakpoint at auth check\ngdb.execute('break *0x4010a0')" }
    ],
    terminalCommands: {
      "file vault_arm.bin": "vault_arm.bin: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, stripped",
      "strings vault_arm.bin | grep -i pass": "passkey_check_initialized\nEnter arm authorization passkey:\nCEC{r3v_x86_c0mp4r3_p4ss_882}\nAuthorization Accepted. Disarming vault arm.",
      "./vault_arm.bin CEC{r3v_x86_c0mp4r3_p4ss_882}": "[+] PASSPHRASE VERIFIED: Mechanical arm unlocked. Solenoid voltage deactivated."
    }
  },
  {
    id: "mission-12",
    number: "12",
    title: "AIRLOCK FIRMWARE CRACK",
    category: "REVERSE ENGINEERING",
    difficulty: "MEDIUM",
    points: 300,
    solvedCount: 29,
    status: "AVAILABLE",
    target: "firmware_update.hex",
    timeEstimate: "40 MIN",
    requiredSkills: ["Intel HEX Parsing", "ARM Cortex-M Disassembly", "CRC32 Checksum"],
    brief: "The airlock door microcontroller accepts firmware packages verified with a proprietary CRC32 check. Reverse the firmware verification routine to construct a bypass update packet.",
    objectives: [
      "Convert Intel HEX format to raw ARM Cortex-M binary",
      "Identify the interrupt vector table and reset handler",
      "Reverse the polynomial constant used for checksum validation",
      "Generate a valid firmware patch header and extract the flag"
    ],
    hints: [
      { id: 1, text: "Standard CRC32 polynomial 0xEDB88320 is used with inverted initial value.", penalty: 30 },
      { id: 2, text: "Look for vector table at offset 0x00000004.", penalty: 45 }
    ],
    flag: "CEC{f1rmw4r3_cr4ck_crc32_byp4ss}",
    terminalAvailable: true
  },
  {
    id: "mission-13",
    number: "13",
    title: "MALWARE DOMAIN EXTRACT",
    category: "REVERSE ENGINEERING",
    difficulty: "INSANE",
    points: 500,
    solvedCount: 7,
    status: "LOCKED",
    target: "beacon_sample.sys",
    timeEstimate: "60 MIN",
    requiredSkills: ["Kernel Driver Analysis", "DGA Reversal", "Cryptographic RNG"],
    brief: "A stealth kernel implant was detected dropping beacons every 3600 seconds. Reverse engineer the pseudo-random Domain Generation Algorithm (DGA) to calculate the active Command & Control server for the current UTC date.",
    objectives: [
      "Decompile the DriverEntry and background system worker thread",
      "Extract the PRNG seed generator algorithm based on Unix timestamp",
      "Re-implement the domain generator in Python to predict the active domain",
      "Sinkhole the C2 server and intercept the supervisor command packet"
    ],
    hints: [
      { id: 1, text: "Seed = (timestamp / 86400) * 0x5DEECE66D + 0xB.", penalty: 40 },
      { id: 2, text: "The generated domain ends with .cec-ops.darknet.", penalty: 70 }
    ],
    flag: "CEC{dg4_c2_d0m41n_b34c0n_tr4ck3d}",
    terminalAvailable: false
  },
  {
    id: "mission-14",
    number: "14",
    title: "GIT COMMIT TRAIL",
    category: "OSINT",
    difficulty: "EASY",
    points: 100,
    solvedCount: 74,
    status: "SOLVED",
    target: "github.com/cec-ops/internal-tooling",
    timeEstimate: "15 MIN",
    requiredSkills: ["Git Forensics", "Dangling Commits", "Reflog Inspection"],
    brief: "A contract engineer accidentally committed AWS staging tokens in a public repository commit before performing a git reset and force-pushing. Uncover the dangling commit object from the repository packfile.",
    objectives: [
      "Clone or inspect the git object repository",
      "Find loose objects with git fsck --lost-found",
      "Inspect the unreferenced blob containing .env.production",
      "Extract the leaked staging API key"
    ],
    hints: [
      { id: 1, text: "Run git log -g or git fsck --unreachable.", penalty: 15 },
      { id: 2, text: "Look for commit message 'oops forgot to remove secrets'.", penalty: 20 }
    ],
    flag: "CEC{0s1nt_g1t_d4ngl1ng_c0mm1t}",
    terminalAvailable: true
  },
  {
    id: "mission-15",
    number: "15",
    title: "BGP & SUBDOMAIN TRACE",
    category: "OSINT",
    difficulty: "MEDIUM",
    points: 200,
    solvedCount: 45,
    status: "SOLVED",
    target: "ASN 138921 // *.sec.canaraengineering.in",
    timeEstimate: "30 MIN",
    requiredSkills: ["Certificate Transparency", "BGP Routing", "Subdomain Enumeration"],
    brief: "Investigate the external attack surface of the facility network. Using public Certificate Transparency logs and historical DNS records, discover the unlisted development portal.",
    objectives: [
      "Query crt.sh for wildcards matching *.canaraengineering.in",
      "Identify the development portal deployed on an anomalous IPv4 subnet",
      "Inspect TXT records on the discovered subdomain",
      "Submit the authorization verification key found in the DNS record"
    ],
    hints: [
      { id: 1, text: "Look for 'vault-staging' or 'test-cctv' in CT logs.", penalty: 20 },
      { id: 2, text: "Subdomain is vault-staging.canaraengineering.in with TXT record.", penalty: 35 }
    ],
    flag: "CEC{ct_l0gs_unl1st3d_st4g1ng_p0rt4l}",
    terminalAvailable: true
  },
  {
    id: "mission-16",
    number: "16",
    title: "CANARA CAMPUS LOCATION HUNT",
    category: "OSINT",
    difficulty: "HARD",
    points: 350,
    solvedCount: 19,
    status: "AVAILABLE",
    target: "Facility Blueprint & Rooftop Photo",
    timeEstimate: "45 MIN",
    requiredSkills: ["Geolocation Analysis", "Sun Shadow Angle", "Campus Blueprint Corroboration"],
    brief: "An anonymous whistleblower uploaded a photo showing an industrial HVAC chiller and server exhaust vent taken on the Canara Engineering College Benjanapadavu campus. Correlate satellite imagery and campus layout to identify the exact room.",
    objectives: [
      "Analyze shadow angles to calculate solar azimuth at 14:30 IST",
      "Match building rooftop architecture with Benjanapadavu campus blocks",
      "Locate Block C third-floor electrical server room",
      "Formulate the target location flag"
    ],
    hints: [
      { id: 1, text: "Campus is located at Benjanapadavu, Bantwal Taluk, Mangaluru.", penalty: 25 },
      { id: 2, text: "Look closely at Block C Mechanical & CS wing junction.", penalty: 45 },
      { id: 3, text: "Format: CEC{b3nj4n4p4d4vu_bl0ck_c_s3rv3r}", penalty: 70 }
    ],
    flag: "CEC{b3nj4n4p4d4vu_bl0ck_c_s3rv3r}",
    terminalAvailable: false
  },
  {
    id: "mission-17",
    number: "17",
    title: "MODBUS PLC SWITCH OVERRIDE",
    category: "NETWORK",
    difficulty: "HARD",
    points: 350,
    solvedCount: 22,
    status: "AVAILABLE",
    target: "10.24.20.10:502",
    timeEstimate: "45 MIN",
    requiredSkills: ["SCADA / ICS Security", "Modbus Protocol", "Industrial Control Systems"],
    brief: "The facility electrical vault cooling unit is controlled by a Schneider Modbus PLC on TCP port 502. Craft a raw Modbus application protocol packet to trigger emergency breaker coil 0x0010.",
    objectives: [
      "Connect to target port 502 with nc or modbus-cli",
      "Craft Modbus Function Code 0x05 (Write Single Coil) payload",
      "Force coil address 0x0010 to state 0xFF00 (ON)",
      "Trigger backup power diversion and read the maintenance output response"
    ],
    hints: [
      { id: 1, text: "Modbus ADU consists of: Transaction ID (2B), Protocol ID 0000 (2B), Length 0006 (2B), Unit ID 01 (1B), Function 05 (1B), Coil 0010 (2B), Value FF00 (2B).", penalty: 35 },
      { id: 2, text: "Send payload: echo -ne '\\x00\\x01\\x00\\x00\\x00\\x06\\x01\\x05\\x00\\x10\\xff\\x00' | nc 10.24.20.10 502", penalty: 60 }
    ],
    flag: "CEC{m0dbus_c01l_wr1t3_tr1pp3d}",
    terminalAvailable: true,
    terminalCommands: {
      "nc -zv 10.24.20.10 502": "Connection to 10.24.20.10 502 port [tcp/mbap] succeeded!",
      "python3 -c \"import socket; s=socket.socket(); s.connect(('10.24.20.10',502)); s.send(b'\\x00\\x01\\x00\\x00\\x00\\x06\\x01\\x05\\x00\\x10\\xff\\x00'); print(s.recv(1024))\"": "b'\\x00\\x01\\x00\\x00\\x00\\x06\\x01\\x05\\x00\\x10\\xff\\x00'\n[SCADA CONTROLLER ALERT]: Coil 0x0010 energized. Diesel generator auxiliary link enabled.\nFLAG: CEC{m0dbus_c01l_wr1t3_tr1pp3d}"
    }
  },
  {
    id: "mission-18",
    number: "18",
    title: "WEBSOCKET SURVEILLANCE FEED",
    category: "NETWORK",
    difficulty: "MEDIUM",
    points: 250,
    solvedCount: 39,
    status: "AVAILABLE",
    target: "wss://cctv-stream.facility.cec:8443",
    timeEstimate: "35 MIN",
    requiredSkills: ["WebSocket Frames", "Protobuf Decoding", "Network Interception"],
    brief: "The digital camera streams live telemetry over an encrypted WebSocket stream. Intercept and decode raw binary protobuf frames carrying the live biometric scanner verification token.",
    objectives: [
      "Establish a secure WebSocket handshake using the provided client token",
      "Capture binary data frames opcode 0x02",
      "Decompile the Google Protocol Buffers schema",
      "Decode the camera metadata payload to retrieve the passkey"
    ],
    hints: [
      { id: 1, text: "Use protoc --decode_raw on the binary frame payload.", penalty: 25 },
      { id: 2, text: "Field 3 contains the string verification token.", penalty: 40 }
    ],
    flag: "CEC{wss_b1n4ry_str34m_1nt3rc3pt}",
    terminalAvailable: true
  },
  {
    id: "mission-19",
    number: "19",
    title: "ARP POISONING & DNS SPOOF",
    category: "NETWORK",
    difficulty: "HARD",
    points: 400,
    solvedCount: 20,
    status: "AVAILABLE",
    target: "pcap_session_03.pcap",
    timeEstimate: "50 MIN",
    requiredSkills: ["ARP Cache Poisoning", "DNS Header Inspection", "PCAP Forensics"],
    brief: "An adversary executed a Man-in-the-Middle attack between the gateway router and the time synchronization NTP server. Trace the poisoned ARP announcements and extract the malicious fake IP.",
    objectives: [
      "Analyze duplicate ARP replies with differing MAC addresses",
      "Identify the rogue MAC address 00:1a:2b:88:c4:d1",
      "Trace the poisoned DNS reply for ntp.vault.internal",
      "Recover the flag encoded in the transaction ID field sequence"
    ],
    hints: [
      { id: 1, text: "Filter Wireshark by 'arp.duplicate-address-frame'.", penalty: 30 },
      { id: 2, text: "The transaction IDs of consecutive spoofed queries spell out ASCII characters.", penalty: 60 }
    ],
    flag: "CEC{4rp_sp00f_ntp_p01s0n_d3t3ct3d}",
    terminalAvailable: true
  }
];

export const CATEGORIES = [
  { id: "ALL", label: "ALL VECTORS", count: 19 },
  { id: "WEB", label: "WEB EXPLOITATION", count: 4, icon: "Globe" },
  { id: "CRYPTO", label: "CRYPTOGRAPHY", count: 3, icon: "Lock" },
  { id: "FORENSICS", label: "DIGITAL FORENSICS", count: 3, icon: "FileSearch" },
  { id: "REVERSE ENGINEERING", label: "REVERSE ENGINEERING", count: 3, icon: "Binary" },
  { id: "OSINT", label: "OPEN SOURCE INTEL", count: 3, icon: "Radar" },
  { id: "NETWORK", label: "NETWORK ANALYSIS", count: 3, icon: "Cpu" }
];
