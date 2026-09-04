import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Maximize2 } from 'lucide-react';
import { Project } from '../data/projects';
import { LazyLiveFrame } from './LazyLiveFrame';
import { reveal3D, revealLines } from '../lib/motion';

interface HighlightsProps {
  projects: Project[];
  onOpenSandbox: (project: Project) => void;
}

export const Highlights: React.FC<HighlightsProps> = ({ projects, onOpenSandbox }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(headingRef.current, { y: 70, stagger: 0.08 });
      if (gridRef.current) {
        reveal3D(gridRef.current.children, gridRef.current, {
          rotateX: 6,
          y: 26,
          stagger: 0.09,
          start: 'top 88%'
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 md:pl-20 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={headingRef} className="mb-12 md:mb-16">
          <div className="overflow-hidden">
            <span className="block text-[10px] font-mono tracking-widest text-accent uppercase">
              Selected work
            </span>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onOpenSandbox(project)}
              className="reveal-3d group text-left bg-ink-800 rounded-3xl p-3 border border-white/8 hover:border-accent/50 shadow-xl hover:shadow-[0_0_40px_-12px_rgba(147,175,168,0.35)] transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-900">
                <LazyLiveFrame src={project.liveUrl} title={project.name} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-300 flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 text-paper text-[9px] font-mono tracking-wider backdrop-blur-sm">
                  {project.num}
                </span>
              </div>
              <div className="flex items-center justify-between px-2 pt-3 pb-1.5">
                <h3 className="font-display font-semibold text-lg group-hover:text-accent transition-colors truncate mr-2">
                  {project.name}
                </h3>
                <span className="shrink-0 text-[9px] font-mono tracking-wider text-paper-faint uppercase">
                  {project.category.split(' ')[0]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
