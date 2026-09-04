import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { reveal3D, revealLines } from '../lib/motion';

const FOUNDERS = [
  {
    name: 'Nithin Selvaraj',
    role: 'Full Stack',
    skills: ['Systems', 'WebGL', 'RK4 Sim']
  },
  {
    name: 'Kranti .P.A',
    role: 'Systems Architect',
    skills: ['Backend', 'Cloud', 'API']
  },
  {
    name: 'Vivin .S',
    role: 'Creative Frontend',
    skills: ['GSAP', 'Motion', 'UI/UX']
  }
];

const STATS = [
  { value: '19', label: 'Live Apps' },
  { value: '03', label: 'Founders' },
  { value: '2026', label: 'Founded' }
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const foundersRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(manifestoRef.current, { y: 90, stagger: 0.1, rotateX: 14 });
      reveal3D(foundersRef.current?.children ?? [], foundersRef.current, { rotateX: 6, y: 22 });
      reveal3D(statsRef.current?.children ?? [], statsRef.current, { rotateX: 5, y: 18, stagger: 0.06 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-36 md:pl-20 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={manifestoRef} className="mb-24 md:mb-32 max-w-4xl">
          <div className="overflow-hidden">
            <span className="block text-[10px] font-mono tracking-widest text-accent uppercase mb-4">
              About
            </span>
          </div>
          <div className="overflow-hidden">
            <p className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
              We don't chase trends.
            </p>
          </div>
          <div className="overflow-hidden">
            <p className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-paper-dim">
              We engineer outcomes.
            </p>
          </div>
          <div className="overflow-hidden">
            <p className="font-accent italic text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-accent mt-1">
              Full ownership, always.
            </p>
          </div>
        </div>

        {/* Founders */}
        <div ref={foundersRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-24 md:mb-32">
          {FOUNDERS.map((f, idx) => (
            <div key={f.name} className="reveal-3d border-t border-white/10 pt-6">
              <span className="text-[10px] font-mono text-paper-faint">0{idx + 1}</span>
              <h3 className="font-display font-bold text-xl mt-2">{f.name}</h3>
              <span className="block text-xs font-mono text-accent uppercase tracking-wider mt-1 mb-4">
                {f.role}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {f.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-paper-dim"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-6 md:gap-12 border-t border-white/10 pt-10">
          {STATS.map((s) => (
            <div key={s.label} className="reveal-3d">
              <span className="block font-display font-black text-4xl sm:text-6xl text-paper">
                {s.value}
              </span>
              <span className="block text-[10px] sm:text-xs font-mono tracking-widest text-paper-faint uppercase mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
