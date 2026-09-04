import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Maximize2, ExternalLink, Cpu, Globe, Code2 } from 'lucide-react';
import { Project } from '../data/projects';
import { LazyLiveFrame } from './LazyLiveFrame';
import { reveal3D } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxShowcaseProps {
  onOpenSandbox: (project: Project) => void;
  projects: Project[];
}

export const ParallaxShowcase: React.FC<ParallaxShowcaseProps> = ({
  onOpenSandbox,
  projects
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const bigText1Ref = useRef<HTMLDivElement>(null);
  const bigText2Ref = useRef<HTMLDivElement>(null);
  const win1Ref = useRef<HTMLDivElement>(null);
  const win2Ref = useRef<HTMLDivElement>(null);
  const win3Ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);

  const cosmo = projects.find((p) => p.id === 'cosmocrypt') || projects[3];
  const vance = projects.find((p) => p.id === 'arthur-vance-dossier') || projects[4];
  const apex = projects.find((p) => p.id === 'apex-aerospace') || projects[6];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Parallax oversized background text movement
      if (bigText1Ref.current) {
        gsap.fromTo(
          bigText1Ref.current,
          { xPercent: 12 },
          {
            xPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }

      if (bigText2Ref.current) {
        gsap.fromTo(
          bigText2Ref.current,
          { xPercent: -15 },
          {
            xPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }

      // 3. Multi-layer Window Parallax Scrub with subtle 3D tilt
      const scrubWindow = (el: HTMLDivElement | null, distance: number, tilt: number) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { yPercent: distance, rotateY: -tilt, transformPerspective: 1200 },
          {
            yPercent: -distance,
            rotateY: tilt,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      };

      scrubWindow(win1Ref.current, 15, 3);
      scrubWindow(win2Ref.current, 20, 4);
      scrubWindow(win3Ref.current, 15, 4);

      // Subtle 3D reveals
      reveal3D(headerRef.current?.children ?? [], headerRef.current, { rotateX: 5 });
      reveal3D(
        capabilitiesRef.current?.children ?? [],
        capabilitiesRef.current,
        { rotateX: 5, y: 20, stagger: 0.06 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="relative py-28 md:py-40 overflow-hidden text-paper select-none"
    >
      {/* Background fill */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 bg-ink-950 -z-10"
      />

      {/* Layer 1: Giant Background Kinetic Typography Scrub */}
      <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-around opacity-[0.06] overflow-hidden -z-5">
        <div
          ref={bigText1Ref}
          className="font-display font-black text-[16vw] uppercase whitespace-nowrap text-stroke-thick tracking-tight"
        >
          INTERACTIVE ARCHITECTURE
        </div>
        <div
          ref={bigText2Ref}
          className="font-display font-black text-[16vw] uppercase whitespace-nowrap text-stroke-thick tracking-tight"
        >
          COMPUTATIONAL PHYSICS
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="reveal-3d">
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-accent uppercase mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>LIVE WEB APPLICATION ARCHIVES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase">
              Interactive Systems & Portals
            </h2>
          </div>
          <p className="reveal-3d text-sm sm:text-base font-mono text-paper-dim max-w-md leading-relaxed">
            Hover over any live window to inspect the live Netlify application or click to launch the embedded fullscreen sandbox.
          </p>
        </div>

        {/* Feature 1: Dr. Arthur Vance Dossier (Large Live Window) */}
        {vance && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-36">
            <div className="lg:col-span-7">
              <div
                ref={win1Ref}
                className="group relative bg-ink-800 rounded-3xl p-5 border border-white/10 shadow-2xl overflow-hidden"
              >
                {/* Window Chrome Header */}
                <div className="flex items-center justify-between mb-3 px-2 py-1 bg-black/40 rounded-xl">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-paper-dim">
                    <Globe className="w-2.5 h-2.5 text-accent" />
                    <span>{vance.liveUrl.replace('https://', '').replace('/', '')}</span>
                  </div>
                  <span className="text-[10px] font-mono text-paper-faint">{vance.badge || 'LIVE PLATFORM'}</span>
                </div>

                {/* Real Live Iframe Window Frame */}
                <div
                  onClick={() => onOpenSandbox(vance)}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black cursor-pointer border border-white/5"
                >
                  <LazyLiveFrame src={vance.liveUrl} title={vance.name} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-5 py-2.5 rounded-full bg-paper text-ink-950 text-xs font-mono font-bold tracking-wider flex items-center space-x-2 shadow-2xl">
                      <Maximize2 className="w-4 h-4" />
                      <span>OPEN FULL LIVE SANDBOX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-paper-faint tracking-widest uppercase">
                // DESIGN SYSTEMS & EDITORIAL
              </span>
              <h3 className="font-display text-3xl font-bold leading-tight">
                {vance.name} — 5-Portal Pedagogy & Design Systems
              </h3>
              <p className="text-paper-dim font-mono text-sm leading-relaxed">
                Architectural design dossier featuring 5 interactive navigation portals, Socratic inquiry models, and rigorous Swiss typographic hierarchy.
              </p>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => onOpenSandbox(vance)}
                  className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest uppercase py-3 px-6 rounded-full bg-paper text-ink-950 hover:opacity-90 transition-opacity font-bold"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Launch Live Portal</span>
                </button>
                <a
                  href={vance.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/20 hover:border-white text-paper transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Feature 2: Dual Grid (CosmoCrypt & Apex Aerospace) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* CosmoCrypt Terminal */}
          {cosmo && (
            <div className="space-y-6">
              <div
                ref={win2Ref}
                className="group relative bg-ink-800 rounded-3xl p-5 border border-white/10 shadow-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3 px-2 py-1 bg-black/40 rounded-xl">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  </div>
                  <span className="text-[10px] font-mono text-paper-dim truncate">
                    cheery-starlight-5fd4e8...
                  </span>
                  <span className="text-[10px] font-mono text-accent">CYBERDECK</span>
                </div>

                <div
                  onClick={() => onOpenSandbox(cosmo)}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-black cursor-pointer border border-white/5"
                >
                  <LazyLiveFrame src={cosmo.liveUrl} title={cosmo.name} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-full bg-accent text-ink-950 text-xs font-mono font-bold tracking-wider flex items-center space-x-2 shadow-2xl">
                      <Maximize2 className="w-4 h-4" />
                      <span>LAUNCH CYBERDECK</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 space-y-2">
                <h4 className="font-display text-xl font-bold">{cosmo.name}</h4>
                <p className="text-xs font-mono text-paper-dim">
                  Bit-plane LSB image steganography, NASA APOD carrier ingestion, and Web Audio acoustic scope.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onOpenSandbox(cosmo)}
                    className="text-xs font-mono tracking-wider text-accent hover:underline uppercase"
                  >
                    Open Live Sandbox →
                  </button>
                  <a
                    href={cosmo.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-paper-faint hover:text-paper flex items-center space-x-1"
                  >
                    <span>Netlify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Apex Aerospace Studio */}
          {apex && (
            <div className="space-y-6 md:mt-20">
              <div
                ref={win3Ref}
                className="group relative bg-ink-800 rounded-3xl p-5 border border-white/10 shadow-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3 px-2 py-1 bg-black/40 rounded-xl">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  </div>
                  <span className="text-[10px] font-mono text-paper-dim truncate">
                    celebrated-duckanoo-9a3b66...
                  </span>
                  <span className="text-[10px] font-mono text-accent">ROCKET SIM</span>
                </div>

                <div
                  onClick={() => onOpenSandbox(apex)}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-black cursor-pointer border border-white/5"
                >
                  <LazyLiveFrame src={apex.liveUrl} title={apex.name} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-full bg-accent text-ink-950 text-xs font-mono font-bold tracking-wider flex items-center space-x-2 shadow-2xl">
                      <Maximize2 className="w-4 h-4" />
                      <span>LAUNCH AEROSPACE SIM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 space-y-2">
                <h4 className="font-display text-xl font-bold">{apex.name}</h4>
                <p className="text-xs font-mono text-paper-dim">
                  Sounding rocket aerodynamics, Haack / Von Kármán profile optimizer, and mission patch studio.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onOpenSandbox(apex)}
                    className="text-xs font-mono tracking-wider text-accent hover:underline uppercase"
                  >
                    Open Live Sandbox →
                  </button>
                  <a
                    href={apex.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-paper-faint hover:text-paper flex items-center space-x-1"
                  >
                    <span>Netlify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Capabilities Bar */}
        <div ref={capabilitiesRef} className="mt-32 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="reveal-3d flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <Code2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h5 className="font-display font-semibold text-sm">Real-time Numerical Simulation</h5>
              <p className="text-xs font-mono text-paper-faint mt-1">
                RK4 numerical integrators, orbital mechanics, and supersonic aerodynamics.
              </p>
            </div>
          </div>

          <div className="reveal-3d flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm font-mono font-bold text-accent-bright">WebGL</span>
            </div>
            <div>
              <h5 className="font-display font-semibold text-sm">GLSL Shader & 3D Pipelines</h5>
              <p className="text-xs font-mono text-paper-faint mt-1">
                Custom vertex/fragment shaders, Euler camera tracks, and chromatic aberration.
              </p>
            </div>
          </div>

          <div className="reveal-3d flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm font-mono font-bold text-paper">API</span>
            </div>
            <div>
              <h5 className="font-display font-semibold text-sm">Live NASA & Satellite Ingestion</h5>
              <p className="text-xs font-mono text-paper-faint mt-1">
                Direct integration with NASA EONET v3 and GIBS satellite composites.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
