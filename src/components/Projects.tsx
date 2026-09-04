import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../data/projects';
import { reveal3D, revealLines } from '../lib/motion';

interface ProjectsProps {
  projects: Project[];
  onOpenSandbox: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onOpenSandbox }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(headingRef.current, { y: 70, stagger: 0.08 });
      if (listRef.current) {
        reveal3D(listRef.current.children, listRef.current, {
          rotateX: 5,
          y: 18,
          stagger: 0.04,
          start: 'top 90%'
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={sectionRef} id="projects" className="relative py-28 md:py-36 md:pl-20 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={headingRef} className="mb-14 md:mb-20">
          <div className="overflow-hidden">
            <span className="block text-[10px] font-mono tracking-widest text-accent uppercase mb-3">
              {projects[0]?.num} — {projects[projects.length - 1]?.num}
            </span>
          </div>
          <div className="overflow-hidden">
            <h2 className="font-display font-black text-[13vw] sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.9]">
              More Work
            </h2>
          </div>
        </div>

        <div ref={listRef} className="border-t border-white/10">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onOpenSandbox(project)}
              className="reveal-3d group w-full flex items-center justify-between gap-4 py-5 sm:py-6 border-b border-white/10 hover:border-accent/40 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-baseline gap-4 sm:gap-8 min-w-0">
                <span className="shrink-0 text-xs sm:text-sm font-mono text-paper-faint">
                  {project.num}
                </span>
                <span className="font-display font-bold text-xl sm:text-3xl md:text-4xl tracking-tight truncate group-hover:text-accent transition-colors">
                  {project.name}
                </span>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                <span className="hidden sm:inline text-[10px] font-mono tracking-widest text-paper-faint uppercase">
                  {project.category}
                </span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-paper-faint group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
