import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, ExternalLink, Maximize2 } from 'lucide-react';
import { Project } from '../data/projects';
import { LazyLiveFrame } from './LazyLiveFrame';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenSandbox: (project: Project) => void;
  featuredProjects: Project[];
}

export const Hero: React.FC<HeroProps> = ({ onOpenSandbox, featuredProjects }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const devLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const studioLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const studioWrapperRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const cardCenterRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const [p1, p2, p3] = featuredProjects;

  // 1. DEV letters dropping from above
  const devLetters = [
    { char: 'D', color: 'text-accent', glow: 'drop-shadow-[0_0_30px_rgba(147,175,168,0.5)]' },
    { char: 'E', color: 'text-accent-bright', glow: 'drop-shadow-[0_0_30px_rgba(180,203,197,0.5)]' },
    { char: 'V', color: 'text-paper', glow: 'drop-shadow-[0_0_30px_rgba(236,235,230,0.35)]' }
  ];

  // 2. STUDIO letters slotting in from below
  const studioLetters = [
    { char: 'S', color: 'text-accent-bright' },
    { char: 'T', color: 'text-accent' },
    { char: 'U', color: 'text-paper' },
    { char: 'D', color: 'text-paper-dim' },
    { char: 'I', color: 'text-accent-bright' },
    { char: 'O', color: 'text-accent' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validDevLetters = devLettersRef.current.filter(Boolean);
      const validStudioLetters = studioLettersRef.current.filter(Boolean);

      // Master Kinetic Entrance Sequence
      const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Step 0: Set initial positions cleanly
      gsap.set(validDevLetters, {
        y: -160,
        opacity: 0,
        scale: 1.15,
        rotationZ: () => gsap.utils.random(-10, 10)
      });
      gsap.set(validStudioLetters, {
        y: 40,
        opacity: 0,
        scale: 0.9
      });
      gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
      gsap.set(metaRef.current, { y: -15, opacity: 0 });
      gsap.set([cardLeftRef.current, cardCenterRef.current, cardRightRef.current], {
        y: 45,
        opacity: 0,
        scale: 0.96
      });
      gsap.set(bottomBarRef.current, { opacity: 0, y: 15 });

      // Step 1: DEV letters drop down like heavy kinetic physics bricks
      masterTl.to(validDevLetters, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationZ: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'bounce.out'
      })
      // Step 2: STUDIO slots in from below
      .to(
        validStudioLetters,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'back.out(1.7)'
        },
        '-=0.25'
      )
      // Step 3: Subtitle & Meta tags glide in smoothly
      .to(
        [metaRef.current, subtitleRef.current],
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out'
        },
        '-=0.15'
      )
      // Step 4: Floating live window cards drop in
      .to(
        [cardLeftRef.current, cardCenterRef.current, cardRightRef.current],
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out'
        },
        '-=0.2'
      )
      // Step 5: Bottom bar fade in
      .to(
        bottomBarRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4
        },
        '-=0.3'
      );

      // Subtle 3D scroll-scrub on the floating cards: gentle depth tilt + rise
      // as the hero scrolls past, rather than a flat vertical parallax only.
      const scrubCard = (el: HTMLDivElement | null, distance: number, tilt: number) => {
        if (!el) return;
        gsap.to(el, {
          y: -distance,
          rotateX: tilt,
          transformPerspective: 1200,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      };

      scrubCard(cardLeftRef.current, 25, 4);
      scrubCard(cardRightRef.current, 35, -4);
      scrubCard(cardCenterRef.current, 15, 2.5);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const getCleanDomain = (url: string) => url.replace('https://', '').replace('/', '');

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-start gap-8 sm:gap-12 overflow-hidden select-none"
    >
      {/* Top Meta Line */}
      <div
        ref={metaRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] sm:text-xs font-mono tracking-wider text-paper-dim uppercase select-none"
      >
        <div className="flex items-center space-x-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
          <span className="font-semibold text-paper/90">
            DEV STUDIO // NITHIN SELVARAJ • KRANTI .P.A • VIVIN .S
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] text-paper-faint shrink-0">
          <span>HOVER TO PREVIEW • CLICK TO LAUNCH LIVE SANDBOX</span>
        </div>
      </div>

      {/* Kinetic Hero Centerpiece: DEV Drops Down & STUDIO Slots In Below */}
      <div
        ref={titleWrapperRef}
        className="text-center select-none relative z-10 py-2 sm:py-4"
      >
        <h1
          ref={heroTitleRef}
          className="flex flex-col items-center justify-center will-change-transform transform-gpu overflow-visible leading-[0.85] select-none"
        >
          {/* Top Line: DEV (Physics Dropdown) */}
          <div className="font-display font-black tracking-[-0.03em] text-[18vw] sm:text-[16vw] md:text-[13vw] uppercase flex items-center justify-center">
            {devLetters.map((item, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  devLettersRef.current[idx] = el;
                }}
                className={`inline-block mx-[0.025em] transition-transform ${item.color} ${item.glow}`}
                style={{ display: 'inline-block' }}
              >
                {item.char}
              </span>
            ))}
          </div>

          {/* Bottom Line: STUDIO (Slotted In Below) */}
          <div
            ref={studioWrapperRef}
            className="font-display font-black tracking-[0.25em] sm:tracking-[0.32em] md:tracking-[0.38em] text-[5vw] sm:text-[4.5vw] md:text-[3.8vw] uppercase flex items-center justify-center mt-2 sm:mt-3 px-5 py-1.5 rounded-2xl bg-white/5 border border-white/10 shadow-sm"
          >
            {studioLetters.map((item, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  studioLettersRef.current[idx] = el;
                }}
                className={`inline-block mx-[0.05em] font-extrabold transition-transform ${item.color}`}
                style={{ display: 'inline-block' }}
              >
                {item.char}
              </span>
            ))}
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-sm sm:text-base md:text-lg font-mono text-paper-dim max-w-2xl mx-auto px-4 tracking-tight leading-relaxed"
        >
          Your <strong className="text-paper font-semibold underline decoration-accent decoration-2">1-stop full stack engineering solution</strong>. Founded by <strong className="text-paper font-semibold">Nithin Selvaraj</strong>, <strong className="text-paper font-semibold">Kranti .P.A</strong> & <strong className="text-paper font-semibold">Vivin .S</strong>.
        </p>
      </div>

      {/* Floating Hero Live Browser Windows - Iconic Staggered Triangle Formation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 mt-8 sm:mt-14 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end">

          {/* Window 1: Left (BuildIt - Triangle Left Slope) */}
          {p1 && (
            <div
              ref={cardLeftRef}
              className="group flex flex-col justify-between bg-ink-700/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/10 hover:border-accent/60 shadow-xl hover:shadow-[0_0_35px_-8px_rgba(147,175,168,0.3)] transition-all duration-300 md:translate-y-8 lg:translate-y-10 will-change-transform transform-gpu"
            >
              {/* Browser bar */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                </div>
                <span className="text-[10px] font-mono text-paper-faint truncate max-w-[140px]">
                  {getCleanDomain(p1.liveUrl)}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-[9px] font-mono text-accent font-bold">
                  {p1.badge}
                </span>
              </div>

              {/* Real Live Iframe Viewport */}
              <div
                onClick={() => onOpenSandbox(p1)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-800 cursor-pointer mb-4 border border-white/5"
              >
                <LazyLiveFrame src={p1.liveUrl} title={p1.name} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-full bg-accent text-ink-950 text-xs font-mono font-bold tracking-wider flex items-center space-x-1.5 shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>LAUNCH LIVE</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-1">
                <div>
                  <h3
                    onClick={() => onOpenSandbox(p1)}
                    className="font-display font-bold text-sm sm:text-base group-hover:underline cursor-pointer"
                  >
                    {p1.name}
                  </h3>
                  <p className="text-xs font-mono text-accent truncate">
                    {p1.domain}
                  </p>
                </div>
                <a
                  href={p1.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-accent hover:text-ink-950 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Window 2: Centerpiece Featured (Library Assistant - Triangle Pinnacle) */}
          {p2 && (
            <div
              ref={cardCenterRef}
              className="group flex flex-col justify-between bg-ink-700/95 backdrop-blur-md p-5 sm:p-6 rounded-3xl border-2 border-accent/50 shadow-2xl hover:shadow-[0_0_45px_-8px_rgba(147,175,168,0.4)] transition-all duration-300 md:-translate-y-12 lg:-translate-y-16 md:scale-[1.04] z-10 will-change-transform transform-gpu ring-2 ring-accent/25"
            >
              {/* Browser bar */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                </div>
                <span className="text-[10px] font-mono text-paper-dim truncate max-w-[150px]">
                  {getCleanDomain(p2.liveUrl)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-accent text-ink-950 text-[9px] font-mono font-extrabold uppercase shadow-sm">
                  ★ FEATURED PINNACLE
                </span>
              </div>

              {/* Real Live Iframe Viewport */}
              <div
                onClick={() => onOpenSandbox(p2)}
                className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-ink-800 cursor-pointer mb-4 border border-white/5"
              >
                <LazyLiveFrame src={p2.liveUrl} title={p2.name} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-5 py-2.5 rounded-full bg-accent text-ink-950 text-xs font-mono font-bold tracking-wider flex items-center space-x-2 shadow-2xl">
                    <Sparkles className="w-4 h-4" />
                    <span>LAUNCH LIVE</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-1">
                <div>
                  <h3
                    onClick={() => onOpenSandbox(p2)}
                    className="font-display font-bold text-base sm:text-lg group-hover:underline cursor-pointer"
                  >
                    {p2.name}
                  </h3>
                  <p className="text-xs font-mono text-accent font-semibold">
                    {p2.domain}
                  </p>
                </div>
                <a
                  href={p2.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-accent text-ink-950 hover:opacity-90 transition-opacity font-bold shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Window 3: Right (Lab Assistant - Triangle Right Slope) */}
          {p3 && (
            <div
              ref={cardRightRef}
              className="group flex flex-col justify-between bg-ink-700/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/10 hover:border-accent-bright/50 shadow-xl hover:shadow-[0_0_35px_-8px_rgba(180,203,197,0.3)] transition-all duration-300 md:translate-y-16 lg:translate-y-20 will-change-transform transform-gpu"
            >
              {/* Browser bar */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-bright" />
                </div>
                <span className="text-[10px] font-mono text-paper-faint truncate max-w-[140px]">
                  {getCleanDomain(p3.liveUrl)}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-[9px] font-mono text-accent-bright font-bold">
                  {p3.badge}
                </span>
              </div>

              {/* Real Live Iframe Viewport */}
              <div
                onClick={() => onOpenSandbox(p3)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-800 cursor-pointer mb-4 border border-white/5"
              >
                <LazyLiveFrame src={p3.liveUrl} title={p3.name} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-full bg-accent text-ink-950 text-xs font-mono font-bold tracking-wider flex items-center space-x-1.5 shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>LAUNCH LIVE</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-1">
                <div>
                  <h3
                    onClick={() => onOpenSandbox(p3)}
                    className="font-display font-bold text-sm sm:text-base group-hover:underline cursor-pointer"
                  >
                    {p3.name}
                  </h3>
                  <p className="text-xs font-mono text-accent-bright truncate">
                    {p3.domain}
                  </p>
                </div>
                <a
                  href={p3.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-accent hover:text-ink-950 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div
        ref={bottomBarRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono text-paper-faint select-none"
      >
        <a
          href="#manifesto"
          className="inline-flex items-center space-x-2 hover:text-accent transition-colors"
        >
          <span>SCROLL DOWN FOR FOUNDERS & PHILOSOPHY</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-accent" />
        </a>
        <span className="hidden sm:inline text-accent">DEV STUDIO // ALL-IN-ONE SOLUTION</span>
      </div>
    </section>
  );
};
