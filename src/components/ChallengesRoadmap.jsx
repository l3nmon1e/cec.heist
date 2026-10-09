import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  Terminal as TerminalIcon, 
  Lock, 
  Fingerprint, 
  Cpu, 
  ArrowRight, 
  ShieldAlert, 
  Compass, 
  Crosshair, 
  Radio, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getAssetUrl } from '../utils/formatters';

const NODES_DATA = [
  {
    id: 1,
    code: 'SECTOR-01',
    km: 'KM 0.9',
    phase: 'INITIAL BREACH',
    title: 'WEB INFILTRATION',
    category: 'WEB',
    tag: 'PORT EXPLOITATION',
    badge: 'NODE 01',
    description: 'Identify access flaws, intercept HTTP telemetry, and bypass front-facing perimeter firewalls.',
    fallbackImage: '/assets/heist/missions/restricted_terminal.jpg',
    icon: TerminalIcon,
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.25)',
  },
  {
    id: 2,
    code: 'SECTOR-02',
    km: 'KM 1.8',
    phase: 'CIPHER LAB',
    title: 'CRYPTOGRAPHY',
    category: 'CRYPTO',
    tag: 'KEY VAULT & CIPHERS',
    badge: 'NODE 02',
    description: 'Decode intercepted diplomatic ciphers. Reverse flawed crypto primitives to forge master access keys.',
    fallbackImage: '/assets/heist/vault/vault_lock.jpg',
    icon: Lock,
    accentColor: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 0.25)',
  },
  {
    id: 3,
    code: 'SECTOR-03',
    km: 'KM 2.7',
    phase: 'SURVEILLANCE WING',
    title: 'FORENSIC AUDIT',
    category: 'FORENSICS',
    tag: 'MEMORY & PACKET CARVING',
    badge: 'NODE 03',
    description: 'Recover volatile RAM artifacts, carve fragmented image packets, and reconstruct intruder timestamps.',
    fallbackImage: '/assets/heist/surveillance/cctv_wall.jpg',
    icon: Fingerprint,
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.25)',
  },
  {
    id: 4,
    code: 'SECTOR-04',
    km: 'KM 3.6',
    phase: 'CORE MAINFRAME',
    title: 'REVERSE ENGINEERING',
    category: 'REVERSE ENGINEERING',
    tag: 'BINARY DISASSEMBLY',
    badge: 'NODE 04',
    description: 'Disassemble compiled firmware, bypass hardware anti-tamper logic, and override lock solenoids.',
    fallbackImage: '/assets/heist/missions/server_room.jpg',
    icon: Cpu,
    accentColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.25)',
  },
];

export default function ChallengesRoadmap({ onCategoryClick, onEnterHeist }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 90%']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  // Calculate road progress percentage for tactical HUD
  const roadPercent = useTransform(smoothProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="relative pt-4 pb-16 select-none">
      
      {/* SECTION HEADER & TACTICAL ROAD INTEL */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-10 lg:mb-12 px-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#121923] border border-[#263140] rounded-full">
          <Radio className="w-3.5 h-3.5 text-[#FACC15] animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#FACC15] uppercase font-bold">
            INFILTRATION ROADMAP // 4 CHECKPOINTS
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FFFFFF] uppercase font-mono">
          EXPLORE. SOLVE. UNLOCK.
        </h2>

        <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto font-sans">
          Navigate the infiltration route sector by sector. Clear all four security checkpoints to unlock the central vault facility.
        </p>

        {/* Live Road HUD Status Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs text-[#8D98A8]">
          <div className="flex items-center space-x-2 bg-[#0C111A] px-3 py-1.5 border border-[#263140] rounded">
            <Compass className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>ROUTE: <strong className="text-[#F4F5F7]">ACTIVE ROADWAY</strong></span>
          </div>
          <div className="flex items-center space-x-2 bg-[#0C111A] px-3 py-1.5 border border-[#263140] rounded">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-ping" />
            <span>CHECKPOINTS: <strong className="text-[#F4F5F7]">4 NODES CONNECTED</strong></span>
          </div>
          <div className="flex items-center space-x-2 bg-[#0C111A] px-3 py-1.5 border border-[#263140] rounded">
            <Crosshair className="w-3.5 h-3.5 text-[#FACC15]" />
            <span>DESTINATION: <strong className="text-[#FACC15]">CENTRAL VAULT</strong></span>
          </div>
        </div>
      </div>

      {/* ROAD CONTAINER */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* DESKTOP ROAD SVG (Treasure Hunt Zig-Zag Yellow Line with Moving Arrows) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <svg 
            className="w-full h-full" 
            viewBox="0 0 1000 1500" 
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Guide Path Definition for moving arrows (Matching curve.png Reference) */}
            <path
              id="treasurePath"
              d="M 500,20 C 500,80 140,40 140,150 C 10,250 150,350 450,320 C 680,290 940,240 800,390 C 980,480 840,580 550,540 C 320,510 80,580 250,675 C 40,780 200,860 480,830 C 720,800 950,830 800,960 C 960,1080 650,1260 500,1380"
              stroke="#374151"
              strokeWidth="2"
              strokeDasharray="10 10"
              fill="none"
            />

            {/* Active Scroll Line (Smooth Serpentine Flow matching curve.png) */}
            <motion.path
              d="M 500,20 C 500,80 140,40 140,150 C 10,250 150,350 450,320 C 680,290 940,240 800,390 C 980,480 840,580 550,540 C 320,510 80,580 250,675 C 40,780 200,860 480,830 C 720,800 950,830 800,960 C 960,1080 650,1260 500,1380"
              stroke="#EAB308"
              strokeWidth="2.5"
              strokeDasharray="10 10"
              fill="none"
              style={{ pathLength: smoothProgress }}
              className="drop-shadow-[0_0_4px_rgba(234,179,8,0.4)]"
            />

            {/* Moving Tactical Arrows along the Treasure Path */}
            {[0, 1.8, 3.6, 5.4, 7.2].map((delay, idx) => (
              <g key={idx}>
                {/* Tactical Chevron Arrow */}
                <path
                  d="M -7,-5 L 3,0 L -7,5 L -3,5 L 7,0 L -3,-5 Z"
                  fill="#FACC15"
                  opacity="0.9"
                  className="drop-shadow-[0_0_3px_rgba(250,204,21,0.6)]"
                />
                <animateMotion
                  dur="9s"
                  repeatCount="indefinite"
                  rotate="auto"
                  begin={`${delay}s`}
                >
                  <mpath href="#treasurePath" />
                </animateMotion>
              </g>
            ))}
          </svg>
        </div>

        {/* MOBILE & TABLET ROAD CONNECTOR (Vertical spine) */}
        <div className="lg:hidden absolute left-6 sm:left-10 top-0 bottom-0 w-8 pointer-events-none z-0">
          <div className="w-8 h-full relative flex items-center justify-center">
            <div className="w-[2px] h-full border-r-2 border-dashed border-[#374151]" />
            <motion.div 
              className="absolute top-0 w-1 bg-[#EAB308] opacity-80"
              style={{ height: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
        </div>

        {/* ROAD NODES LIST */}
        <div className="relative z-10 flex flex-col space-y-12 sm:space-y-14 lg:space-y-0 lg:block lg:h-[1500px] py-4 lg:py-0">
          {NODES_DATA.map((node, index) => {
            // Precise custom positioning for each waypoint
            const leftPos = ['lg:left-[14%]', 'lg:left-[80%]', 'lg:left-[25%]', 'lg:left-[80%]'][index];
            const topPos = ['lg:top-[10%]', 'lg:top-[26%]', 'lg:top-[45%]', 'lg:top-[64%]'][index];
            const sizeClass = 'max-w-[18rem] sm:max-w-[21rem] lg:w-[23rem] xl:w-[26rem]';

            return (
              <div 
                key={node.id} 
                className={`relative flex flex-col items-center pl-12 sm:pl-16 lg:pl-0 
                  lg:absolute ${leftPos} ${topPos} lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-auto`}
              >
                {/* 1. NODE CARD CONTAINER */}
                <motion.div 
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full lg:w-auto group"
                >
                  <div 
                    onClick={() => onCategoryClick?.(node.category)}
                    className={`relative w-full ${sizeClass} lg:max-w-none mx-auto lg:mx-0 cursor-pointer transition-transform duration-500 hover:scale-[1.06] hover:-translate-y-2 group hover:drop-shadow-[0_0_28px_rgba(200,169,107,0.45)]`}
                  >
                    <img
                        src={getAssetUrl(`/assets/heist/mission/node${node.id}.png`)}
                        alt={node.title}
                        onError={(e) => {
                          if (!e.target.dataset.altTried) {
                            e.target.dataset.altTried = '1';
                            e.target.src = getAssetUrl(`/assets/heist/missions/node${node.id}.png`);
                          } else if (!e.target.dataset.fallbackTried) {
                            e.target.dataset.fallbackTried = '1';
                            e.target.src = getAssetUrl(node.fallbackImage);
                          }
                        }}
                        className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
                    />
                  </div>
                </motion.div>

                {/* Mobile Waypoint Badge */}
                <div className="lg:hidden absolute -left-12 sm:-left-16 top-6">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 bg-[#0C111A] flex items-center justify-center font-mono font-bold text-xs shadow-[0_0_10px_rgba(250,204,21,0.4)]"
                    style={{ borderColor: node.accentColor, color: node.accentColor }}
                  >
                    0{node.id}
                  </div>
                </div>

              </div>
            );
          })}

          {/* 3. ROAD TERMINUS // FINAL DESTINATION (THE VAULT GATE - NODE 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-8 pt-4 text-center relative z-20 lg:absolute lg:left-[50%] lg:-translate-x-1/2 lg:top-[92%] lg:-translate-y-1/2 lg:mt-0 lg:pt-0 w-full lg:w-auto"
          >
            {/* Road Finish Line Hazard Stripes */}
            <div className="max-w-md mx-auto h-2 hazard-stripe rounded mb-6 opacity-80 lg:hidden" />

            <div 
              onClick={() => {
                sound.playClick();
                onEnterHeist?.();
              }}
              className="relative w-full max-w-[18rem] sm:max-w-[21rem] lg:max-w-none lg:w-[22rem] xl:w-[25rem] mx-auto lg:mx-0 cursor-pointer transition-transform duration-500 hover:scale-[1.06] hover:-translate-y-2 group hover:drop-shadow-[0_0_30px_rgba(200,169,107,0.5)] mt-4 lg:mt-0"
            >
              <img
                  src={getAssetUrl(`/assets/heist/mission/node5.png`)}
                  alt="The Central Vault"
                  onError={(e) => {
                    if (!e.target.dataset.altTried) {
                      e.target.dataset.altTried = '1';
                      e.target.src = getAssetUrl(`/assets/heist/missions/node5.png`);
                    } else if (!e.target.dataset.fallbackTried) {
                      e.target.dataset.fallbackTried = '1';
                      e.target.src = getAssetUrl('/assets/heist/placeholder.png');
                    }
                  }}
                  className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
