import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircle2,
  Terminal,
  Mail,
  Github,
  ArrowUpRight,
  Code2,
  Sparkles,
  Gift,
  Layers,
  Box,
  Palette
} from 'lucide-react';
import { reveal3D } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const foundersGridRef = useRef<HTMLDivElement>(null);
  const pillarsGridRef = useRef<HTMLDivElement>(null);
  const tenetsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text scrubbed highlight for manifesto statement
      const words = quoteRef.current?.querySelectorAll('span.scrub-word');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.2, y: 5 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: 0.5
            }
          }
        );
      }

      // Subtle 3D depth reveals
      reveal3D(
        foundersGridRef.current?.children ?? [],
        foundersGridRef.current
      );
      reveal3D(
        pillarsGridRef.current?.children ?? [],
        pillarsGridRef.current,
        { rotateX: 5, y: 20 }
      );
      reveal3D(
        tenetsGridRef.current?.children ?? [],
        tenetsGridRef.current,
        { rotateX: 6, y: 18, stagger: 0.05 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statement = "We are DEV STUDIOS — an avid full-stack engineering collective. We build full stack end-to-end systems. We are your 1-stop solution — from pixel-perfect frontend motion to resilient backend infrastructure, we obsess over every detail so you don't have to.";
  const statementWords = statement.split(' ');

  const founders = [
    {
      name: 'Nithin Selvaraj',
      role: 'Full Stack & Computational Systems',
      tag: 'CO-FOUNDER // FULL STACK',
      bio: 'Architecting end-to-end full stack web platforms, computational physics engines, orbital mechanics simulations, and WebGL graphics pipelines.',
      github: 'https://github.com/Nithinfgs',
      githubHandle: 'Nithinfgs',
      liveUrl: 'https://lucent-pika-c20d8a.netlify.app/',
      liveLabel: 'Bio Hub & Sim Matrix',
      skills: ['Full Stack Dev', 'RK4 Numerical Sim', 'WebGL & GLSL', 'Systems Design']
    },
    {
      name: 'Kranti .P.A',
      role: 'Systems Architecture & Backend Lead',
      tag: 'CO-FOUNDER // SYSTEMS ARCHITECT',
      bio: 'Leading backend infrastructure, scalable cloud deployments, resilient microservices, high-frequency data pipelines, and STEM system architectures.',
      github: 'https://github.com/Krtx-dev',
      githubHandle: 'Krtx-dev',
      liveUrl: 'https://stem-infrastructure.vercel.app/',
      liveLabel: 'STEM Infrastructure App',
      skills: ['Distributed Systems', 'Cloud Infrastructure', 'API Architecture', 'Database Tuning']
    },
    {
      name: 'Vivin .S',
      role: 'Creative Frontend & UI Motion Engineer',
      tag: 'CO-FOUNDER // CREATIVE FRONTEND',
      bio: 'Crafting buttery-smooth GSAP animations, tactile micro-interactions, responsive design systems, and empathetic mental well-being web platforms.',
      github: 'https://github.com/vivins2009-droid',
      githubHandle: 'vivins2009-droid',
      liveUrl: 'https://github.com/vivins2009-droid/Mental-well-being-website',
      liveLabel: 'Mental Well-Being Project',
      skills: ['GSAP & Lenis', 'Design Systems', 'Micro-Interactions', 'Creative UI/UX']
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="py-28 md:py-36 bg-ink-900 text-paper relative overflow-hidden select-none"
    >
      {/* Anchor alias for philosophy link */}
      <div id="philosophy" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Tag */}
        <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-paper-faint uppercase mb-8">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span>DEV STUDIOS • FOUNDING ENGINEERS</span>
        </div>

        {/* 1. DEV STUDIOS Founders Grid (Nithin Selvaraj, Kranti .P.A, Vivin .S) */}
        <div ref={foundersGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {founders.map((f, idx) => (
            <div
              key={idx}
              className="reveal-3d p-6 sm:p-8 rounded-3xl bg-ink-800 border border-white/10 shadow-xl hover:border-accent/40 hover:shadow-[0_0_35px_-10px_rgba(147,175,168,0.25)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest font-bold uppercase px-2.5 py-1 rounded-full text-accent-bright bg-accent/10">
                    {f.tag}
                  </span>
                  <span className="text-xs font-mono text-paper-faint font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <h4 className="font-display font-bold text-2xl uppercase tracking-tight text-paper">
                  {f.name}
                </h4>
                <span className="text-xs font-mono text-accent font-semibold block mt-1 mb-3">
                  {f.role}
                </span>

                <p className="text-xs font-mono text-paper-dim leading-relaxed mb-6">
                  {f.bio}
                </p>
              </div>

              <div>
                {/* Founder Direct Links & Project Access */}
                <div className="space-y-2 mb-4">
                  <a
                    href={f.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-accent/10 text-xs font-mono text-paper/80 transition-colors group"
                  >
                    <div className="flex items-center space-x-2">
                      <Github className="w-3.5 h-3.5 text-accent" />
                      <span className="font-bold">github.com/{f.githubHandle}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-paper-faint group-hover:text-paper" />
                  </a>

                  <a
                    href={f.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-accent/10 text-xs font-mono text-paper/80 transition-colors group"
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-accent-bright" />
                      <span className="font-medium truncate max-w-[200px]">{f.liveLabel}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-paper-faint group-hover:text-paper" />
                  </a>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {f.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-paper-dim"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Pillars of Philosophy: Full Stack Developers & 1-Stop Solution */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-ink-800/60 border border-white/10 shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block mb-1">
              PILLARS OF PHILOSOPHY // 1-STOP FULL STACK SOLUTION
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight">
              Why DEV STUDIOS is Your 1-Stop Engineering Partner
            </h3>
            <p className="text-xs sm:text-sm font-mono text-paper-dim mt-2 leading-relaxed">
              We eliminate technical fragmentation. Instead of hiring separate designers, frontend engineers, backend leads, and DevOps specialists, DEV STUDIOS provides a complete, cohesive full-stack team with zero communication overhead.
            </p>
          </div>

          <div ref={pillarsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="reveal-3d p-5 rounded-2xl bg-ink-700 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono font-bold text-accent">PILLAR 01</span>
              <h4 className="font-display font-bold text-base">Full-Stack Ownership</h4>
              <p className="text-xs font-mono text-paper-dim leading-relaxed">
                From relational schema design and edge APIs to reactive frontend components, we architect every layer directly.
              </p>
            </div>

            <div className="reveal-3d p-5 rounded-2xl bg-ink-700 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono font-bold text-accent-bright">PILLAR 02</span>
              <h4 className="font-display font-bold text-base">High-Precision Systems</h4>
              <p className="text-xs font-mono text-paper-dim leading-relaxed">
                Physics-backed simulations, RK4 numerical integration, GPU WebGL shaders, and NASA API streaming ingestion.
              </p>
            </div>

            <div className="reveal-3d p-5 rounded-2xl bg-ink-700 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono font-bold text-paper">PILLAR 03</span>
              <h4 className="font-display font-bold text-base">Sensory UI & Motion</h4>
              <p className="text-xs font-mono text-paper-dim leading-relaxed">
                Buttery-smooth GSAP choreography, kinetic typography, spatial audio, and zero cumulative layout shift (CLS = 0.00).
              </p>
            </div>

            <div className="reveal-3d p-5 rounded-2xl bg-ink-700 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono font-bold text-accent-dim">PILLAR 04</span>
              <h4 className="font-display font-bold text-base">Zero Overhead Speed</h4>
              <p className="text-xs font-mono text-paper-dim leading-relaxed">
                Direct engineer-to-client collaboration with rapid iterative deployment cycles on Netlify and Vercel.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Collective Promise & Direct Credentials Card */}
        <div
          id="contact"
          className="bg-ink-800 rounded-3xl p-8 sm:p-12 border-2 border-accent/25 hover:border-accent/50 shadow-2xl transition-all duration-300 mb-24 scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left: Bio, Promise & Free Demo Offer */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-accent-bright font-bold uppercase bg-accent/10 px-3 py-1 rounded-full">
                  DEV STUDIOS • ZERO OVERHEAD
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                Built by DEV STUDIOS — Nithin, Kranti & Vivin
              </h3>

              <p className="text-sm font-mono text-paper-dim leading-relaxed">
                We are your <span className="font-bold text-paper underline decoration-accent decoration-2">all-in-1 engineering collective</span>. From bespoke frontend design and 3D GPU shaders to scalable backend architectures, numerical simulations, and full cloud deployments — we take complete ownership of the technical stack. You trust us, and we deliver.
              </p>

              {/* High-Impact FREE DEMO PAGE Offer Banner */}
              <div className="p-5 rounded-2xl bg-accent/10 border border-accent/25 shadow-lg space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest font-bold text-accent-bright">
                  <Gift className="w-4 h-4 text-accent" />
                  <span>SPECIAL OFFER — GET A FREE DEMO PAGE</span>
                </div>
                <h4 className="font-display font-bold text-lg sm:text-xl text-paper leading-snug">
                  Email or message DEV STUDIOS for a completely free demo page!
                </h4>
                <p className="text-xs font-mono text-paper/80 leading-relaxed">
                  We build all types: <strong className="text-paper font-semibold">Static, 3D WebGL, Animated Interactive Experiences, Kinetic Gradients</strong>, or custom web platforms. Anything you can imagine or have seen anywhere on the internet — <strong className="text-accent-bright">we will build it for you.</strong>
                </p>

                {/* Capability Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-black/30 text-[10px] font-mono font-semibold flex items-center space-x-1 border border-white/10">
                    <Layers className="w-3 h-3 text-accent" />
                    <span>Static & Ultra-Fast</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/30 text-[10px] font-mono font-semibold flex items-center space-x-1 border border-white/10">
                    <Box className="w-3 h-3 text-accent-bright" />
                    <span>3D & WebGL</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/30 text-[10px] font-mono font-semibold flex items-center space-x-1 border border-white/10">
                    <Sparkles className="w-3 h-3 text-paper" />
                    <span>Animated GSAP</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/30 text-[10px] font-mono font-semibold flex items-center space-x-1 border border-white/10">
                    <Palette className="w-3 h-3 text-accent" />
                    <span>Custom Gradients</span>
                  </span>
                </div>
              </div>

              {/* GitHub Workspace Matrix Callout */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-accent text-ink-950 shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-paper block">
                      Explore All DEV STUDIOS Developer Repositories
                    </span>
                    <span className="text-[11px] font-mono text-paper-dim">
                      Nithin (Nithinfgs) • Kranti (Krtx-dev) • Vivin (vivins2009-droid)
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://github.com/Nithinfgs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-accent hover:text-ink-950 text-[10px] font-mono font-bold uppercase transition-colors"
                  >
                    NITHIN
                  </a>
                  <a
                    href="https://github.com/Krtx-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-accent hover:text-ink-950 text-[10px] font-mono font-bold uppercase transition-colors"
                  >
                    KRANTI
                  </a>
                  <a
                    href="https://github.com/vivins2009-droid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-accent hover:text-ink-950 text-[10px] font-mono font-bold uppercase transition-colors"
                  >
                    VIVIN
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Direct Contact & Developer Repositories Matrix */}
            <div className="lg:col-span-5 bg-ink-900 p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
              <span className="text-[10px] font-bold tracking-widest text-paper-faint uppercase block">
                MESSAGE DEV STUDIOS FOR FREE DEMO PAGE
              </span>

              {/* Email Button */}
              <a
                href="mailto:nithinselvaraj9@gmail.com?subject=DEV%20STUDIOS%20Free%20Demo%20Page%20Request&body=Hi%20DEV%20STUDIOS%20Team%2C%20I%20would%20like%20to%20request%20a%20free%20demo%20page%20for%20my%20project."
                className="flex items-center justify-between p-3.5 rounded-xl bg-ink-800 hover:border-accent border border-white/5 transition-all group shadow-sm"
              >
                <div className="flex items-center space-x-3 truncate mr-2">
                  <div className="p-2 rounded-lg bg-accent text-ink-950">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-accent font-bold block">EMAIL DEV STUDIOS FOR DEMO</span>
                    <span className="font-semibold text-paper truncate">
                      nithinselvaraj9@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-paper-faint group-hover:text-paper shrink-0" />
              </a>

              {/* Nithin's GitHub */}
              <a
                href="https://github.com/Nithinfgs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-ink-800 hover:border-accent border border-white/5 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-paper-faint block">NITHIN SELVARAJ (GITHUB)</span>
                    <span className="font-semibold text-paper">
                      github.com/Nithinfgs
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-paper-faint group-hover:text-paper shrink-0" />
              </a>

              {/* Kranti's GitHub */}
              <a
                href="https://github.com/Krtx-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-ink-800 hover:border-accent-bright border border-white/5 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent-bright/10 text-accent-bright">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-paper-faint block">KRANTI .P.A (GITHUB)</span>
                    <span className="font-semibold text-paper">
                      github.com/Krtx-dev
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-paper-faint group-hover:text-paper shrink-0" />
              </a>

              {/* Vivin's GitHub */}
              <a
                href="https://github.com/vivins2009-droid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-ink-800 hover:border-paper border border-white/5 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/10 text-paper">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-paper-faint block">VIVIN .S (GITHUB)</span>
                    <span className="font-semibold text-paper">
                      github.com/vivins2009-droid
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-paper-faint group-hover:text-paper shrink-0" />
              </a>

            </div>

          </div>
        </div>

        {/* 3. Scrubbed Highlight Quote (Positioned below the Contact Dossier Card) */}
        <div className="max-w-5xl mb-24">
          <p
            ref={quoteRef}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight uppercase"
          >
            {statementWords.map((word, i) => (
              <span
                key={i}
                className="scrub-word inline-block mr-[0.25em] transition-colors"
              >
                {word}
              </span>
            ))}
          </p>
          <div className="mt-8 flex items-center space-x-4">
            <div className="w-12 h-[3px] bg-accent rounded-full" />
            <span className="font-mono text-xs tracking-widest text-paper-dim uppercase font-bold">
              DEV STUDIOS — NITHIN SELVARAJ • KRANTI .P.A • VIVIN .S
            </span>
          </div>
        </div>

        {/* 3. 10 Architectural Tenets Grid */}
        <div className="bg-ink-800/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
            <h3 className="font-display font-bold text-xl sm:text-2xl uppercase">
              The 10 Architectural Tenets
            </h3>
            <span className="text-xs font-mono text-paper-faint">
              SYSTEM STANDARDS
            </span>
          </div>

          <div ref={tenetsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-xs font-mono">
            {[
              { num: '01', title: 'Numerical Rigor', desc: 'RK4 integrators & physics-backed state models.' },
              { num: '02', title: 'Zero Layout Shift', desc: 'Deterministic dimensions with CLS = 0.00.' },
              { num: '03', title: 'Sensory Tactility', desc: 'Audio synthesis, smooth lerp damping & physics.' },
              { num: '04', title: 'GPU Acceleration', desc: 'Direct WebGL pipelines & procedural GLSL.' },
              { num: '05', title: 'Real-time Feeds', desc: 'Live NASA EONET & satellite API ingestion.' },
              { num: '06', title: 'Cyberdeck Security', desc: 'Bit-plane steganography & entropy analysis.' },
              { num: '07', title: 'Micro-Interactions', desc: 'Fluid state transitions & kinetic typography.' },
              { num: '08', title: 'Swiss Grid System', desc: 'Strict typographic ratios and visual hierarchy.' },
              { num: '09', title: 'Offline Reliability', desc: 'Local memory streams & resilient fallbacks.' },
              { num: '10', title: 'Uncompromising Purity', desc: 'Less, but better across code and interface.' },
            ].map((tenet) => (
              <div
                key={tenet.num}
                className="reveal-3d p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-accent">
                    {tenet.num}
                  </span>
                  <h4 className="font-display font-bold text-sm text-paper mt-1 mb-2">
                    {tenet.title}
                  </h4>
                  <p className="text-paper-faint text-[11px] leading-relaxed">
                    {tenet.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[9px] text-paper-faint">APPLIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
