import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Maximize2, Sparkles, Globe } from 'lucide-react';
import { Project } from '../data/projects';
import { LazyLiveFrame } from './LazyLiveFrame';
import { reveal3D, prefersReducedMotion } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalGalleryProps {
  projects: Project[];
  onOpenSandbox: (project: Project) => void;
}

export const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({
  projects,
  onOpenSandbox
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const spotlightProjects = projects.slice(0, 7);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinTrigger = triggerRef.current;
      const track = trackRef.current;

      if (!pinTrigger || !track) return;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 80;
      };

      const reduceMotion = prefersReducedMotion();

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinTrigger,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const pct = Math.round(self.progress * 100);
            setScrollProgress(pct);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${pct}%`;
            }
            // Subtle 3D "camera pan" across the scrub track: a gentle
            // rotateY sweep from -3deg to +3deg, never a hard tilt.
            if (!reduceMotion && track) {
              const rotate = (self.progress - 0.5) * 6;
              gsap.set(track, { rotateY: rotate, transformPerspective: 2000 });
            }
          }
        }
      });

      reveal3D(headerRef.current?.children ?? [], headerRef.current, { rotateX: 5 });

      return () => {
        horizontalTween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [spotlightProjects]);

  return (
    <section
      ref={sectionRef}
      id="horizontal-gallery"
      className="relative bg-ink-950 text-paper overflow-hidden select-none"
    >
      <div
        ref={triggerRef}
        className="h-screen w-full flex flex-col justify-between pt-20 pb-8 px-4 sm:px-8 overflow-hidden"
      >
        {/* Top Header & Progress Bar */}
        <div ref={headerRef} className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3 select-none">
          <div className="reveal-3d">
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-paper-faint uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>HORIZONTAL PINNED SCRUB TRACK</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight">
              Live Software Spotlight
            </h2>
          </div>

          <div className="reveal-3d flex items-center space-x-4">
            <span className="font-mono text-xs text-paper-dim">
              SCRUB [{scrollProgress}%]
            </span>
            <div className="w-36 h-[3px] bg-white/15 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-accent transition-all duration-75"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>

        {/* Horizontal Track Container */}
        <div className="w-full flex-1 flex items-center overflow-visible my-auto" style={{ perspective: '2000px' }}>
          <div
            ref={trackRef}
            className="flex items-center space-x-6 sm:space-x-8 pl-4 pr-24 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {spotlightProjects.map((project) => {
              const cleanUrl = project.liveUrl.replace('https://', '').replace('/', '');
              return (
                <div
                  key={project.id}
                  className="w-[85vw] sm:w-[440px] md:w-[500px] shrink-0 group bg-ink-800 rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-accent/50 shadow-xl hover:shadow-[0_0_35px_-10px_rgba(147,175,168,0.3)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Window Chrome Header */}
                    <div className="flex items-center justify-between px-3 py-2 mb-3 bg-ink-700 rounded-xl border border-white/5">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/15 group-hover:bg-accent transition-colors" />
                      </div>

                      <div className="flex items-center space-x-1.5 text-[10px] font-mono text-paper-dim truncate max-w-[180px]">
                        <Globe className="w-2.5 h-2.5 text-accent shrink-0" />
                        <span className="truncate">{cleanUrl}</span>
                      </div>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-paper-faint hover:text-accent"
                        title="Open external window"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Real Live Website Iframe Window */}
                    <div
                      onClick={() => onOpenSandbox(project)}
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-ink-900 cursor-pointer mb-4 border border-white/5"
                    >
                      <LazyLiveFrame src={project.liveUrl} title={project.name} />

                      {/* Hover Action Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-5 py-2.5 rounded-full bg-accent text-ink-950 text-xs font-mono font-bold tracking-wider flex items-center space-x-2 shadow-2xl">
                          <Maximize2 className="w-4 h-4" />
                          <span>LAUNCH LIVE APPLICATION</span>
                        </div>
                      </div>

                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 text-paper text-[9px] font-mono uppercase tracking-wider backdrop-blur-sm">
                        {project.num} // {project.badge}
                      </span>
                    </div>

                    {/* Project Metadata */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-accent uppercase tracking-wider font-semibold">
                        {project.domain}
                      </span>
                      <h3
                        onClick={() => onOpenSandbox(project)}
                        className="font-display font-bold text-lg sm:text-xl group-hover:underline cursor-pointer leading-tight"
                      >
                        {project.name}
                      </h3>
                      <p className="text-xs font-mono text-paper-dim line-clamp-2 leading-relaxed pt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center space-x-3">
                    <button
                      onClick={() => onOpenSandbox(project)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-paper text-ink-950 group-hover:bg-accent transition-all text-xs font-mono tracking-wider font-semibold flex items-center justify-center space-x-2 shadow-md"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>EXPLORE LIVE DEMO</span>
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-white/15 hover:border-accent transition-colors"
                      title="Open Netlify deployment in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] font-mono text-paper-faint pt-2 select-none">
          <span>← HORIZONTAL PINNED TRACK →</span>
          <span className="hidden sm:inline">REAL LIVE NETLIFY IFRAME WINDOWS</span>
        </div>
      </div>
    </section>
  );
};
