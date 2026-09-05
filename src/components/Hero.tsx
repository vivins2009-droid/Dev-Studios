import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { revealLines, prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const devLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const studioLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const groundLineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const devLetters = [
    { char: 'D', color: 'text-accent', glow: 'drop-shadow-[0_0_40px_rgba(147,175,168,0.5)]' },
    { char: 'E', color: 'text-accent-bright', glow: 'drop-shadow-[0_0_40px_rgba(180,203,197,0.5)]' },
    { char: 'V', color: 'text-paper', glow: 'drop-shadow-[0_0_40px_rgba(236,235,230,0.35)]' }
  ];

  const studioLetters = [
    { char: 'S', color: 'text-accent-bright' },
    { char: 'T', color: 'text-accent' },
    { char: 'U', color: 'text-paper' },
    { char: 'D', color: 'text-paper-dim' },
    { char: 'I', color: 'text-accent-bright' },
    { char: 'O', color: 'text-accent' }
  ];

  // Intro: every letter of DEV STUDIO drops in under gravity, cascading
  // top to bottom, with a ground-line impact cue when it lands.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const validDevLetters = devLettersRef.current.filter(Boolean);
      const validStudioLetters = studioLettersRef.current.filter(Boolean);
      const allLetters = [...validDevLetters, ...validStudioLetters];

      gsap.set(allLetters, { transformPerspective: 700 });
      gsap.set(validDevLetters, {
        y: -220,
        opacity: 0,
        scale: 1.15,
        rotationZ: () => gsap.utils.random(-12, 12)
      });
      gsap.set(validStudioLetters, {
        y: -110,
        opacity: 0,
        scale: 1.05,
        rotationZ: () => gsap.utils.random(-6, 6)
      });
      gsap.set(groundLineRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(metaRef.current, { opacity: 0 });
      gsap.set(bottomBarRef.current, { opacity: 0, y: 15 });

      const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      masterTl
        .to(validDevLetters, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'bounce.out'
        })
        .to(
          groundLineRef.current,
          { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power2.out' },
          '-=0.2'
        )
        .to(
          validStudioLetters,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationZ: 0,
            duration: 0.6,
            stagger: 0.045,
            ease: 'bounce.out'
          },
          '-=0.25'
        )
        .to(metaRef.current, { opacity: 1, duration: 0.6 }, '-=0.15')
        .call(() => revealLines(taglineRef.current, { y: 60, stagger: 0.12 }), undefined, '-=0.1')
        .to(bottomBarRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Idle: letters tilt gently toward the cursor once landed — subtle
  // depth cue, desktop-only, respects reduced-motion.
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

    const allLetters = [...devLettersRef.current, ...studioLettersRef.current].filter(
      Boolean
    ) as HTMLElement[];
    if (allLetters.length === 0) return;

    const setters = allLetters.map((el) => ({
      rotY: gsap.quickTo(el, 'rotateY', { duration: 0.7, ease: 'power3.out' }),
      rotX: gsap.quickTo(el, 'rotateX', { duration: 0.7, ease: 'power3.out' })
    }));

    const onMove = (e: MouseEvent) => {
      const relX = (e.clientX / window.innerWidth - 0.5) * 2;
      const relY = (e.clientY / window.innerHeight - 0.5) * 2;
      setters.forEach(({ rotY, rotX }) => {
        rotY(relX * 7);
        rotX(-relY * 7);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden select-none px-6"
    >
      {/* Blueprint grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 -z-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(147,175,168,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(147,175,168,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)'
        }}
      />

      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140vw] h-[80vh] opacity-[0.15] -z-10"
        style={{ background: 'radial-gradient(ellipse at center, #93AFA8 0%, transparent 65%)' }}
      />

      {/* Edge micro-labels */}
      <div
        ref={metaRef}
        className="absolute left-6 right-6 md:left-28 md:right-10 top-8 sm:top-10 flex items-center justify-between text-[10px] font-mono tracking-widest text-paper-faint uppercase"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          EST. 2026
        </span>
        <span>N · K · V</span>
      </div>

      {/* Kinetic wordmark */}
      <h1
        className="flex flex-col items-center justify-center will-change-transform transform-gpu overflow-visible leading-[0.85] select-none"
        style={{ perspective: 900 }}
      >
        <div className="font-display font-black tracking-[-0.03em] text-[22vw] sm:text-[17vw] md:text-[14vw] uppercase flex items-center justify-center">
          {devLetters.map((item, idx) => (
            <span
              key={idx}
              ref={(el) => {
                devLettersRef.current[idx] = el;
              }}
              className={`inline-block mx-[0.02em] ${item.color} ${item.glow}`}
            >
              {item.char}
            </span>
          ))}
        </div>

        {/* Ground impact line */}
        <div
          ref={groundLineRef}
          className="w-[60vw] sm:w-[40vw] md:w-[28vw] h-px bg-gradient-to-r from-transparent via-accent to-transparent origin-center my-2 sm:my-3"
        />

        <div className="font-display font-black tracking-[0.3em] sm:tracking-[0.38em] text-[5.5vw] sm:text-[4vw] md:text-[3.2vw] uppercase flex items-center justify-center">
          {studioLetters.map((item, idx) => (
            <span
              key={idx}
              ref={(el) => {
                studioLettersRef.current[idx] = el;
              }}
              className={`inline-block mx-[0.04em] font-extrabold ${item.color}`}
            >
              {item.char}
            </span>
          ))}
        </div>
      </h1>

      {/* Single tagline fragment, revealed line by line */}
      <div ref={taglineRef} className="mt-10 sm:mt-12 flex flex-col items-center gap-1.5">
        <div className="overflow-hidden">
          <span className="block font-mono text-xs sm:text-sm tracking-[0.3em] text-paper-dim uppercase">
            Full-stack engineering.
          </span>
        </div>
        <div className="overflow-hidden">
          <span className="block font-mono text-xs sm:text-sm tracking-[0.3em] text-accent uppercase">
            Zero overhead.
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={bottomBarRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono tracking-widest text-paper-faint uppercase"
      >
        <span>Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-accent" />
      </div>
    </section>
  );
};
