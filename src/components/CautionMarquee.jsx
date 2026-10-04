import React from 'react';

/**
 * WarningTriangle SVG icon
 * Precision-drawn industrial warning triangle for security strip
 */
function WarningTriangle({ className = "w-3 h-3 text-[#F5C542]" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 16 16" 
      fill="currentColor" 
      aria-hidden="true"
    >
      <path d="M7.134 2.5a1 1 0 011.732 0l5.196 9A1 1 0 0113.196 13H2.804a1 1 0 01-.866-1.5l5.196-9zM8 5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3A.75.75 0 008 5zm0 6a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
  );
}

const MARQUEE_SEGMENTS = [
  {
    badge: 'CAUTION',
    text: 'CEC HEIST SECURITY SYSTEM ACTIVE',
    highlight: true,
  },
  {
    text: 'UNAUTHORIZED ACCESS PROHIBITED',
    accent: '#E5D0A0',
  },
  {
    text: 'PROCEED WITH CAUTION',
    accent: '#F4F5F7',
  },
  {
    text: 'DIGITAL FACILITY UNDER SURVEILLANCE',
    accent: '#8D98A8',
  },
  {
    badge: 'SECTOR-01',
    text: 'SECURE PERIMETER PROTOCOL ENFORCED',
    highlight: false,
  },
];

function MarqueeContentGroup({ ariaHidden = false }) {
  return (
    <div 
      className="flex items-center space-x-6 sm:space-x-8 shrink-0 pr-6 sm:pr-8"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {MARQUEE_SEGMENTS.map((seg, idx) => (
        <div key={idx} className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
          <WarningTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F5C542] shrink-0" />
          
          {seg.badge && (
            <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider bg-[#F5C542]/15 text-[#F5C542] border border-[#F5C542]/30 rounded">
              {seg.badge}
            </span>
          )}

          <span 
            className="font-mono text-[11px] sm:text-xs font-medium tracking-widest uppercase select-none whitespace-nowrap"
            style={{ color: seg.accent || (seg.highlight ? '#F4F5F7' : '#C8D0DB') }}
          >
            {seg.text}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * CautionMarquee
 * Full-width horizontal security warning marquee placed directly below the hero section.
 * Features a seamless infinite linear CSS loop with pause-on-hover and reduced-motion support.
 */
export default function CautionMarquee() {
  return (
    <div 
      className="caution-marquee-container relative w-full overflow-hidden select-none bg-[#070B12] border-t border-[#F5C542]/40 border-b border-[#F5C542]/20"
      role="region"
      aria-label="Security System Warning"
      style={{
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(245, 197, 66, 0.02) 0px, rgba(245, 197, 66, 0.02) 1px, transparent 1px, transparent 28px)',
      }}
    >
      {/* Subtle edge fade masks for smooth entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#070B12] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#070B12] to-transparent z-10 pointer-events-none" />

      {/* Subtle hazard accent markers at extreme edges */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-3 opacity-30 pointer-events-none z-20"
        style={{
          background: 'repeating-linear-gradient(-45deg, #F5C542, #F5C542 4px, #070B12 4px, #070B12 8px)',
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-3 opacity-30 pointer-events-none z-20"
        style={{
          background: 'repeating-linear-gradient(-45deg, #F5C542, #F5C542 4px, #070B12 4px, #070B12 8px)',
        }}
      />

      {/* Height constrained: 40px mobile, 44px desktop */}
      <div className="h-10 sm:h-11 flex items-center">
        {/* Infinite Track with 3 identical copies for seamless looping */}
        <div className="caution-marquee-track">
          <MarqueeContentGroup ariaHidden={false} />
          <MarqueeContentGroup ariaHidden={true} />
          <MarqueeContentGroup ariaHidden={true} />
        </div>
      </div>
    </div>
  );
}
