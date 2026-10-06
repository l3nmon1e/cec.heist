import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Terminal as TerminalIcon, 
  Lock, 
  Fingerprint, 
  Cpu, 
  Trophy, 
  Users, 
  FileText, 
  Check, 
  Send,
  HelpCircle,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';
import { getAssetUrl } from '../utils/formatters';
import CautionMarquee from './CautionMarquee';

export default function HomePageView({ onOpenRegister, onOpenFaq, isHeroReady = true }) {
  const navigate = useNavigate();
  const { setActiveTab, setSelectedMissionId, setSelectedCategory } = useGame();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(() => {
    try {
      return localStorage.getItem('cec_heist_newsletter_subscribed') === 'true';
    } catch {
      return false;
    }
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    sound.playSuccess();
    setSubscribed(true);
    try {
      localStorage.setItem('cec_heist_newsletter_subscribed', 'true');
    } catch {}
    setEmailInput('');
  };

  const handleCategoryClick = (categoryName) => {
    sound.playClick();
    let cat = (categoryName || '').toUpperCase();
    let targetSector = '/heist/recon';
    if (cat.includes('REVERSE')) {
      cat = 'REVERSE';
      targetSector = '/heist/core';
    } else if (cat.includes('WEB')) {
      cat = 'WEB';
      targetSector = '/heist/initial-access';
    } else if (cat.includes('CRYPTO')) {
      cat = 'CRYPTO';
      targetSector = '/heist/security';
    } else if (cat.includes('FORENSIC')) {
      cat = 'FORENSICS';
      targetSector = '/heist/infiltration';
    } else if (cat.includes('NETWORK')) {
      cat = 'NETWORK';
      targetSector = '/heist/network';
    }
    if (setSelectedCategory) {
      setSelectedCategory(cat);
    }
    setActiveTab('heist');
    navigate(targetSector);
  };

  return (
    <div className="w-full font-sans select-none pb-12">
      
      {/* 1. HERO SECTION WITH CINEMATIC VAULT BACKGROUND - 100% FULL BLEED VIEWPORT WIDTH */}
      <section className="relative w-full overflow-hidden border-b border-[#262626] min-h-[620px] sm:min-h-[700px] lg:min-h-[760px] 2xl:min-h-[820px] flex items-center">
        
        {/* Full-width Panoramic Background Image stretching 100vw edge to edge */}
        <div 
          className={`absolute inset-0 w-full h-full bg-cover bg-right lg:bg-center transition-all duration-700 ${
            isHeroReady ? 'animate-hero-bg' : 'opacity-0 scale-105'
          }`}
          style={{ backgroundImage: `url('${getAssetUrl('/images/hero_bg_vault.jpg')}')` }}
        />

        {/* Sophisticated dark gradient overlays ensuring high contrast text legibility on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-transparent to-black/30" />

        {/* Bottom Right Corner Hazard Stripes flush with the bottom right edge */}
        <div className="absolute bottom-0 right-0 w-32 sm:w-44 h-4 hazard-stripe opacity-90 z-10" />

        {/* Left Hero Content Container aligned with standard max-w-7xl grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 sm:py-24">
          <div className="max-w-2xl lg:max-w-3xl space-y-7 sm:space-y-8 lg:-translate-y-7 transition-transform">
            
            {/* Top college subtitle with yellow dash */}
            <div className={`flex items-center space-x-3.5 ${
              isHeroReady ? 'animate-hero-tagline' : 'opacity-0'
            }`}>
              <span className="w-10 h-[2.5px] bg-[#FACC15]" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[#B0B0B0] uppercase font-bold">
                CANARA ENGINEERING COLLEGE
              </span>
            </div>

            {/* Official Brand Logo - Enlarged Size */}
            <div className="space-y-4">
              <div className={isHeroReady ? 'animate-hero-logo' : 'opacity-0'}>
                <img 
                  src={getAssetUrl('/images/cec_heist_logo.png')} 
                  alt="CEC HEIST - Cyber Security Challenge" 
                  className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl object-contain py-1 drop-shadow-[0_0_35px_rgba(250,204,21,0.25)] hover:scale-[1.01] transition-transform duration-300"
                />
              </div>
              <p className={`font-mono text-sm sm:text-base lg:text-lg tracking-[0.35em] text-[#E0E0E0] uppercase font-semibold ${
                isHeroReady ? 'animate-hero-quote' : 'opacity-0'
              }`}>
                THINK. EXPLOIT. ESCAPE
              </p>
            </div>

            {/* Description */}
            <p className={`text-base sm:text-lg text-[#9CA3AF] max-w-xl leading-relaxed font-sans ${
              isHeroReady ? 'animate-hero-desc' : 'opacity-0'
            }`}>
              A next-gen cybersecurity challenge where your skills, logic and teamwork will be tested. Break in, find the secrets, and make it out.
            </p>

            {/* Flexible Info Chips with Reduced Height */}
            <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 max-w-2xl ${
              isHeroReady ? 'animate-hero-chips' : 'opacity-0'
            }`}>
              
              <div className="flex items-center space-x-3 py-2 px-3.5 sm:py-2.5 sm:px-4 bg-[#0A0A0A]/90 border border-[#2E2E2E] backdrop-blur-md flex-1">
                <Calendar className="w-4 h-4 text-[#FACC15] shrink-0" />
                <div className="font-mono leading-tight">
                  <span className="font-bold text-xs text-[#E5E7EB] block uppercase tracking-wider">
                    COMING SOON
                  </span>
                  <span className="text-[11px] text-[#737373] whitespace-nowrap">
                    Stay tuned for the official dates
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 py-2 px-3.5 sm:py-2.5 sm:px-4 bg-[#0A0A0A]/90 border border-[#2E2E2E] backdrop-blur-md flex-1">
                <MapPin className="w-4 h-4 text-[#FACC15] shrink-0" />
                <div className="font-mono leading-tight">
                  <span className="font-bold text-xs text-[#E5E7EB] block uppercase tracking-wider whitespace-nowrap">
                    CANARA ENGINEERING COLLEGE
                  </span>
                  <span className="text-[11px] text-[#737373]">
                    Mangalore
                  </span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className={`flex flex-wrap items-center gap-3 sm:gap-4 pt-2 ${
              isHeroReady ? 'animate-hero-actions' : 'opacity-0'
            }`}>
              <button
                onClick={() => {
                  sound.playClick();
                  navigate('/heist');
                }}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-[#C8A96B] hover:bg-[#E5D0A0] text-[#070B12] font-mono font-black text-sm sm:text-base tracking-[0.18em] uppercase flex items-center justify-center space-x-2.5 transition-all cursor-pointer shadow-[0_0_25px_rgba(200,169,107,0.35)] hover:shadow-[0_0_35px_rgba(200,169,107,0.5)] hover:scale-[1.02] rounded-lg"
              >
                <span>ENTER FACILITY // HEIST</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenRegister();
                }}
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 bg-[#121923] hover:bg-[#263140] border border-[#263140] hover:border-[#C8A96B] text-[#F4F5F7] font-extrabold text-sm sm:text-base tracking-wider uppercase flex items-center justify-center space-x-2 transition-all cursor-pointer rounded-lg"
              >
                <span>REGISTER CREW</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  const el = document.getElementById('about-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-4 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-[#8D98A8] hover:text-[#C8A96B] tracking-wider uppercase flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>FACILITY INTEL</span>
                <ArrowRight className="w-4 h-4 text-[#566375] group-hover:text-[#C8A96B]" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* CAUTION MARQUEE: Facility Security Warning Strip */}
      <CautionMarquee />

      {/* SUBSEQUENT SECTIONS CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-16 sm:py-20">

        {/* 2. ABOUT THE EVENT SECTION */}
        <section id="about-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Tactical Campus Satellite Map / Classified Board */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#111111] border border-[#303030] overflow-hidden shadow-2xl group">
              <img
                src={getAssetUrl('/images/target_map.jpg')}
                alt="Target Campus Blueprint"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-[#0A0A0A]/20 pointer-events-none" />
              
              {/* Coordinates badge overlay */}
              <div className="absolute bottom-3 left-3 bg-[#0A0A0A]/90 border border-[#FACC15]/40 px-3 py-1.5 font-mono text-[10px] text-[#FACC15] flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#FACC15] animate-ping" />
                <span>BENJANAPADAVU CAMPUS // 12.9141° N, 74.8560° E</span>
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-[#FACC15]" />
              <span className="font-mono text-xs tracking-[0.2em] text-[#FACC15] uppercase font-semibold">
                ABOUT THE EVENT
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FFFFFF] uppercase">
              THE ULTIMATE CYBER CHALLENGE
            </h2>

            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed font-sans">
              CEC HEIST is a Capture The Flag (CTF) event designed to push your technical skills, problem-solving ability and teamwork to the limit. From web exploitation to forensic analysis, every challenge brings you closer to the final vault.
            </p>

            {/* 4 Feature Highlight Blocks (as seen in mockup) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#151515] border border-[#303030] flex items-center justify-center text-[#FACC15]">
                  <TerminalIcon className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-[#E5E7EB] leading-tight">
                  Real-world scenarios
                </div>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#151515] border border-[#303030] flex items-center justify-center text-[#FACC15]">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-[#E5E7EB] leading-tight">
                  Individual & Team challenges
                </div>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#151515] border border-[#303030] flex items-center justify-center text-[#FACC15]">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-[#E5E7EB] leading-tight">
                  Write-ups & Learning
                </div>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#151515] border border-[#303030] flex items-center justify-center text-[#FACC15]">
                  <Trophy className="w-4 h-4 text-[#FACC15]" />
                </div>
                <div className="text-xs font-semibold text-[#E5E7EB] leading-tight">
                  Exciting prizes
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. CHALLENGES SECTION */}
      <section className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Headline & Explore CTA (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-[#FACC15]" />
              <span className="font-mono text-xs tracking-[0.2em] text-[#FACC15] uppercase font-semibold">
                CHALLENGES
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FFFFFF] uppercase">
              EXPLORE. SOLVE. UNLOCK.
            </h2>

            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              A variety of challenges across different domains to test your skills and keep you on your toes.
            </p>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('heist');
                navigate('/heist');
              }}
              className="px-5 py-2.5 bg-transparent border border-[#FACC15] text-[#FACC15] hover:bg-[#FACC15] hover:text-black font-mono font-bold text-xs tracking-wider uppercase flex items-center space-x-2 transition-all cursor-pointer"
            >
              <span>ENTER DIGITAL HEIST</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Side: 4 Domain Cards (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            
            {/* Card 1: Web Exploitation */}
            <div
              onClick={() => handleCategoryClick('WEB')}
              className="bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div className="aspect-[4/3] bg-[#070B12] overflow-hidden relative">
                <img
                  src={getAssetUrl('/assets/heist/missions/restricted_terminal.jpg')}
                  alt="Web Exploitation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C111A] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-4 space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#121923] border border-[#263140] flex items-center justify-center text-[#C8A96B]">
                  <TerminalIcon className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-mono text-xs font-bold text-[#F4F5F7] uppercase tracking-wide group-hover:text-[#C8A96B] transition-colors">
                  WEB INFILTRATION
                </h3>
                <p className="text-xs text-[#8D98A8] font-sans">
                  Identify access flaws. Bypass authorization gates.
                </p>
              </div>
            </div>

            {/* Card 2: Cryptography */}
            <div
              onClick={() => handleCategoryClick('CRYPTO')}
              className="bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div className="aspect-[4/3] bg-[#070B12] overflow-hidden relative">
                <img
                  src={getAssetUrl('/assets/heist/vault/vault_lock.jpg')}
                  alt="Cryptography"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C111A] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-4 space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#121923] border border-[#263140] flex items-center justify-center text-[#C8A96B]">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-mono text-xs font-bold text-[#F4F5F7] uppercase tracking-wide group-hover:text-[#C8A96B] transition-colors">
                  CRYPTOGRAPHY
                </h3>
                <p className="text-xs text-[#8D98A8] font-sans">
                  Decode encrypted intercepts. Reveal master keys.
                </p>
              </div>
            </div>

            {/* Card 3: Forensics */}
            <div
              onClick={() => handleCategoryClick('FORENSICS')}
              className="bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div className="aspect-[4/3] bg-[#070B12] overflow-hidden relative">
                <img
                  src={getAssetUrl('/assets/heist/surveillance/cctv_wall.jpg')}
                  alt="Forensics"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C111A] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-4 space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#121923] border border-[#263140] flex items-center justify-center text-[#C8A96B]">
                  <Fingerprint className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-mono text-xs font-bold text-[#F4F5F7] uppercase tracking-wide group-hover:text-[#C8A96B] transition-colors">
                  FORENSIC AUDIT
                </h3>
                <p className="text-xs text-[#8D98A8] font-sans">
                  Recover memory traces. Carve forensic payloads.
                </p>
              </div>
            </div>

            {/* Card 4: Reverse Engineering */}
            <div
              onClick={() => handleCategoryClick('REVERSE ENGINEERING')}
              className="bg-[#0C111A] border border-[#263140] hover:border-[#C8A96B] transition-all cursor-pointer group flex flex-col justify-between overflow-hidden shadow-lg"
            >
              <div className="aspect-[4/3] bg-[#070B12] overflow-hidden relative">
                <img
                  src={getAssetUrl('/assets/heist/missions/server_room.jpg')}
                  alt="Reverse Engineering"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C111A] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-4 space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#121923] border border-[#263140] flex items-center justify-center text-[#C8A96B]">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-mono text-xs font-bold text-[#F4F5F7] uppercase tracking-wide group-hover:text-[#C8A96B] transition-colors">
                  REVERSE ENGINEERING
                </h3>
                <p className="text-xs text-[#8D98A8] font-sans">
                  Disassemble vault logic. Control physical solenoids.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. TIMELINE SECTION ("MARK YOUR CALENDAR") */}
      <section className="relative pt-6">
        <div className="relative rounded-none overflow-hidden border border-[#263140] shadow-2xl">
          
          {/* Background Image of secure corridor */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${getAssetUrl('/assets/heist/facility/secure_corridor.jpg')}')` }}
          />
          <div className="absolute inset-0 bg-[#070B12]/90 backdrop-blur-[2px]" />

          {/* Overlay Content */}
          <div className="relative p-6 sm:p-12 lg:p-16 space-y-8">
            
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-8 h-[2px] bg-[#FACC15]" />
                <span className="font-mono text-xs tracking-[0.2em] text-[#FACC15] uppercase font-semibold">
                  TIMELINE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FFFFFF] uppercase">
                MARK YOUR CALENDAR
              </h2>
            </div>

            {/* Responsive Timeline: Vertical Connected Stepper on Mobile, Horizontal Pipeline on Desktop */}
            <div className="relative font-mono">
              
              {/* Connecting rail on Mobile (Vertical) */}
              <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#FACC15] via-[#C8A96B]/60 to-[#FACC15]/20 lg:hidden pointer-events-none" />

              {/* Connecting rail on Desktop (Horizontal) */}
              <div className="hidden lg:block absolute top-6 left-12 right-12 h-[2px] bg-gradient-to-r from-[#FACC15] via-[#C8A96B]/60 to-[#FACC15]/20 z-0 pointer-events-none" />

              <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
                
                {/* Step 01 */}
                <div className="relative flex flex-row lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0 lg:space-y-4 group">
                  <div className="w-12 h-12 rounded-full border-2 border-[#FACC15] bg-[#0A0A0A] flex items-center justify-center text-sm font-bold text-[#FACC15] shrink-0 shadow-[0_0_15px_rgba(250,204,21,0.25)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all">
                    01
                  </div>
                  <div className="flex-1 bg-[#121923]/70 lg:bg-transparent border border-[#263140]/80 lg:border-0 p-3.5 sm:p-4 lg:p-0 rounded-lg lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
                    <div className="flex items-center justify-between lg:block">
                      <h4 className="text-sm sm:text-base font-bold text-[#E5E7EB] group-hover:text-[#FACC15] transition-colors">
                        Registration Opens
                      </h4>
                      <span className="text-[10px] sm:text-xs font-mono text-[#FACC15] border border-[#FACC15]/40 bg-[#FACC15]/10 px-2 py-0.5 rounded ml-2 lg:ml-0 lg:mt-1.5 lg:inline-block">
                        TBA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 02 */}
                <div className="relative flex flex-row lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0 lg:space-y-4 group">
                  <div className="w-12 h-12 rounded-full border-2 border-[#FACC15] bg-[#0A0A0A] flex items-center justify-center text-sm font-bold text-[#FACC15] shrink-0 shadow-[0_0_15px_rgba(250,204,21,0.25)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all">
                    02
                  </div>
                  <div className="flex-1 bg-[#121923]/70 lg:bg-transparent border border-[#263140]/80 lg:border-0 p-3.5 sm:p-4 lg:p-0 rounded-lg lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
                    <div className="flex items-center justify-between lg:block">
                      <h4 className="text-sm sm:text-base font-bold text-[#E5E7EB] group-hover:text-[#FACC15] transition-colors">
                        Prelims
                      </h4>
                      <span className="text-[10px] sm:text-xs font-mono text-[#FACC15] border border-[#FACC15]/40 bg-[#FACC15]/10 px-2 py-0.5 rounded ml-2 lg:ml-0 lg:mt-1.5 lg:inline-block">
                        TBA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 03 */}
                <div className="relative flex flex-row lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0 lg:space-y-4 group">
                  <div className="w-12 h-12 rounded-full border-2 border-[#FACC15] bg-[#0A0A0A] flex items-center justify-center text-sm font-bold text-[#FACC15] shrink-0 shadow-[0_0_15px_rgba(250,204,21,0.25)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all">
                    03
                  </div>
                  <div className="flex-1 bg-[#121923]/70 lg:bg-transparent border border-[#263140]/80 lg:border-0 p-3.5 sm:p-4 lg:p-0 rounded-lg lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
                    <div className="flex items-center justify-between lg:block">
                      <h4 className="text-sm sm:text-base font-bold text-[#E5E7EB] group-hover:text-[#FACC15] transition-colors">
                        Main Event
                      </h4>
                      <span className="text-[10px] sm:text-xs font-mono text-[#FACC15] border border-[#FACC15]/40 bg-[#FACC15]/10 px-2 py-0.5 rounded ml-2 lg:ml-0 lg:mt-1.5 lg:inline-block">
                        TBA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 04 */}
                <div className="relative flex flex-row lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0 lg:space-y-4 group">
                  <div className="w-12 h-12 rounded-full border-2 border-[#FACC15] bg-[#0A0A0A] flex items-center justify-center text-sm font-bold text-[#FACC15] shrink-0 shadow-[0_0_15px_rgba(250,204,21,0.25)] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all">
                    04
                  </div>
                  <div className="flex-1 bg-[#121923]/70 lg:bg-transparent border border-[#263140]/80 lg:border-0 p-3.5 sm:p-4 lg:p-0 rounded-lg lg:rounded-none backdrop-blur-sm lg:backdrop-blur-none">
                    <div className="flex items-center justify-between lg:block">
                      <h4 className="text-sm sm:text-base font-bold text-[#E5E7EB] group-hover:text-[#FACC15] transition-colors">
                        Results
                      </h4>
                      <span className="text-[10px] sm:text-xs font-mono text-[#FACC15] border border-[#FACC15]/40 bg-[#FACC15]/10 px-2 py-0.5 rounded ml-2 lg:ml-0 lg:mt-1.5 lg:inline-block">
                        TBA
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. NEWSLETTER & COMMUNITY PRE-FOOTER */}
      <section className="bg-[#111111] border border-[#303030] p-6 sm:p-8 font-mono">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Brand Identity */}
          <div className="lg:col-span-4 space-y-2">
            <img 
              src={getAssetUrl('/images/logo.png')} 
              alt="CEC HEIST" 
              className="h-9 sm:h-10 object-contain"
            />
            <p className="text-xs text-[#737373] tracking-widest uppercase">
              ONE TEAM. ONE MISSION.
            </p>
            <div className="flex items-center space-x-3 pt-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  navigate('/rules');
                }}
                className="text-[#8D98A8] hover:text-[#C8A96B] underline cursor-pointer"
              >
                EVENT RULES
              </button>
              <span className="text-[#303030]">•</span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onOpenFaq?.();
                }}
                className="text-[#8D98A8] hover:text-[#C8A96B] underline cursor-pointer"
              >
                HEIST FAQ
              </button>
            </div>
          </div>

          {/* Center Newsletter Box */}
          <div className="lg:col-span-5 space-y-2">
            <p className="text-xs text-[#9CA3AF] font-sans">
              Stay updated with the latest news, announcements and event details.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center max-w-md">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-[#0A0A0A] border border-[#303030] focus:border-[#FACC15] px-3.5 py-2 text-xs text-[#E5E7EB] placeholder-[#525252] outline-none"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#FACC15] hover:bg-[#EAB308] text-black font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                {subscribed ? <Check className="w-4 h-4 text-black" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-[#4ADE80] block">
                Subscription confirmed. Operational updates will be dispatched to your inbox.
              </span>
            )}
          </div>

          {/* Right Socials */}
          <div className="lg:col-span-3 lg:text-right space-y-2 font-mono">
            <span className="text-xs text-[#737373] block uppercase tracking-wider">
              FOLLOW US
            </span>
            <div className="flex items-center lg:justify-end space-x-4 text-sm text-[#A3A3A3]">
              <a 
                href="https://discord.gg/cec-heist-2026" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#FACC15] transition-colors" 
                title="Discord Server"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/canara_engineering_college" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#FACC15] transition-colors" 
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@canaraengineering" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#FACC15] transition-colors" 
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com/school/canara-engineering-college" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#FACC15] transition-colors" 
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </section>

      </div>
    </div>
  );
}
