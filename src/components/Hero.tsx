import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { revealLines } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const devLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const studioLettersRef = useRef<(HTMLSpanElement | null)[]>([]);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validDevLetters = devLettersRef.current.filter(Boolean);
      const validStudioLetters = studioLettersRef.current.filter(Boolean);

      const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set(validDevLetters, {
        y: -160,
        opacity: 0,
        scale: 1.15,
        rotationZ: () => gsap.utils.random(-10, 10)
      });
      gsap.set(validStudioLetters, { y: 40, opacity: 0, scale: 0.9 });
      gsap.set(metaRef.current, { opacity: 0 });
      gsap.set(bottomBarRef.current, { opacity: 0, y: 15 });

      masterTl
        .to(validDevLetters, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'bounce.out'
        })
        .to(
          validStudioLetters,
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: 'back.out(1.7)' },
          '-=0.25'
        )
        .to(metaRef.current, { opacity: 1, duration: 0.6 }, '-=0.2')
        .call(() => revealLines(taglineRef.current, { y: 60, stagger: 0.12 }), undefined, '-=0.1')
        .to(bottomBarRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden select-none px-6"
    >
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
      <h1 className="flex flex-col items-center justify-center will-change-transform transform-gpu overflow-visible leading-[0.85] select-none">
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

        <div className="font-display font-black tracking-[0.3em] sm:tracking-[0.38em] text-[5.5vw] sm:text-[4vw] md:text-[3.2vw] uppercase flex items-center justify-center mt-3 sm:mt-4">
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
