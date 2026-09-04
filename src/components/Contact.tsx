import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github } from 'lucide-react';
import { revealLines, reveal3D } from '../lib/motion';

const GITHUB_LINKS = [
  { name: 'Nithin', url: 'https://github.com/Nithinfgs' },
  { name: 'Kranti', url: 'https://github.com/Krtx-dev' },
  { name: 'Vivin', url: 'https://github.com/vivins2009-droid' }
];

const AVAILABILITY = [
  { label: 'Location', value: 'Remote-First' },
  { label: 'Response', value: 'Within 24h' },
  { label: 'Status', value: 'Open' }
];

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(headingRef.current, { y: 80, stagger: 0.1 });
      reveal3D(rowRef.current?.children ?? [], rowRef.current, { rotateX: 5, y: 18, stagger: 0.06 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 md:py-40 md:pl-20 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={headingRef} className="mb-14 md:mb-20">
          <div className="overflow-hidden">
            <span className="block text-[10px] font-mono tracking-widest text-accent uppercase mb-4">
              Contact
            </span>
          </div>
          <div className="overflow-hidden">
            <p className="font-display font-bold text-3xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
              Let's build something.
            </p>
          </div>
        </div>

        <a
          href="mailto:devstudionvk@gmail.com"
          className="group block font-display font-black text-[8vw] sm:text-5xl md:text-6xl tracking-tight break-all sm:break-normal text-paper hover:text-accent transition-colors duration-300 mb-20 md:mb-28"
        >
          devstudionvk@gmail.com
        </a>

        <div ref={rowRef} className="flex flex-wrap items-center gap-x-16 gap-y-10 border-t border-white/10 pt-10">
          <div className="reveal-3d flex items-center gap-8">
            {GITHUB_LINKS.map((g) => (
              <a
                key={g.name}
                href={g.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={g.name}
                className="group relative text-paper-dim hover:text-accent transition-colors"
              >
                <Github className="w-6 h-6" />
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap font-accent italic text-xl text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {g.name}
                </span>
              </a>
            ))}
          </div>

          {AVAILABILITY.map((a) => (
            <div key={a.label} className="reveal-3d">
              <span className="block text-[10px] font-mono tracking-widest text-paper-faint uppercase">
                {a.label}
              </span>
              <span className="block text-sm font-mono text-paper mt-1">{a.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-32 flex items-center justify-between text-[10px] font-mono text-paper-faint uppercase tracking-widest">
          <span>© 2026 Dev Studios</span>
          <span>N · K · V</span>
        </div>
      </div>
    </section>
  );
};
