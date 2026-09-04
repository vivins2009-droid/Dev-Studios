import React, { useState } from 'react';
import { Project } from '../data/projects';
import { ExternalLink, Maximize2, Sparkles, Globe, RefreshCw, CheckCircle2, Code2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface LivePreviewCardProps {
  project: Project;
  onOpenSandbox: (project: Project) => void;
  priority?: boolean;
}

export const LivePreviewCard: React.FC<LivePreviewCardProps> = ({
  project,
  onOpenSandbox,
  priority = false
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const { ref: frameRef, inView } = useInView<HTMLDivElement>('300px');

  const cleanDomain = project.liveUrl.replace('https://', '').replace('/', '');

  return (
    <div
      onMouseLeave={() => setInteractiveMode(false)}
      className="group relative bg-ink-800 rounded-3xl p-5 border border-white/10 hover:border-accent/50 shadow-lg hover:shadow-[0_0_35px_-10px_rgba(147,175,168,0.3)] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Browser Top Window Chrome Bar */}
        <div className="flex items-center justify-between px-3 py-2.5 mb-3 bg-ink-700 rounded-2xl border border-white/5 select-none">
          {/* Traffic light dots */}
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15 group-hover:bg-accent transition-colors" />
          </div>

          {/* URL Pill */}
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/30 text-[10px] font-mono text-paper-dim max-w-[200px] sm:max-w-[240px] truncate shadow-xs">
            <Globe className="w-2.5 h-2.5 shrink-0 text-accent" />
            <span className="truncate">{cleanDomain}</span>
          </div>

          {/* Window action icons */}
          <div className="flex items-center space-x-1 text-paper-faint">
            <button
              onClick={() => setReloadKey((k) => k + 1)}
              className="p-1 hover:text-paper transition-colors"
              title="Reload preview"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:text-paper transition-colors"
              title="Open in new window"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Live Website Window Container */}
        <div
          ref={frameRef}
          className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-ink-900 border border-white/5 shadow-inner"
        >

          {/* Real Live Web Application Iframe — only mounted near viewport */}
          {inView ? (
            <div className="w-full h-full relative">
              <iframe
                key={reloadKey}
                src={project.liveUrl}
                title={project.name}
                loading={priority ? 'eager' : 'lazy'}
                onLoad={() => setIframeLoaded(true)}
                className={`w-[200%] h-[200%] transform scale-50 origin-top-left border-0 transition-opacity duration-300 ${
                  iframeLoaded ? 'opacity-100' : 'opacity-20'
                } ${interactiveMode ? 'pointer-events-auto' : 'pointer-events-none'}`}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-700 text-paper-faint/60">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-wider truncate max-w-[85%]">{cleanDomain}</span>
            </div>
          )}

          {/* Loading Indicator */}
          {inView && !iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink-900/80">
              <div className="flex items-center space-x-2 text-xs font-mono text-paper-faint bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent" />
                <span>Loading live site...</span>
              </div>
            </div>
          )}

          {/* Interactive Overlay on Hover */}
          {!interactiveMode && (
            <div
              onClick={() => onOpenSandbox(project)}
              className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInteractiveMode(true);
                  }}
                  className="px-3.5 py-2 rounded-full bg-accent text-ink-950 hover:opacity-95 text-xs font-mono tracking-wider font-bold shadow-xl flex items-center space-x-1.5 backdrop-blur-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-ink-950" />
                  <span>Interact</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenSandbox(project);
                  }}
                  className="px-3.5 py-2 rounded-full bg-black/90 text-paper text-xs font-mono tracking-wider font-semibold shadow-xl flex items-center space-x-1.5 backdrop-blur-sm"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Sandbox</span>
                </button>
              </div>
            </div>
          )}

          {/* Interactive Mode Exit Badge */}
          {interactiveMode && (
            <div className="absolute bottom-3 right-3 flex items-center space-x-2 z-10">
              <span className="px-2.5 py-1 rounded-full bg-accent text-ink-950 text-[10px] font-mono uppercase tracking-wider font-bold shadow-md animate-pulse">
                ● Live Interactive
              </span>
              <button
                onClick={() => setInteractiveMode(false)}
                className="px-2.5 py-1 rounded-full bg-black/80 text-paper hover:bg-black text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm shadow-md"
              >
                Exit
              </button>
            </div>
          )}

          {/* Tag badge in top corner */}
          <div className="absolute top-3 left-3 flex items-center space-x-1.5 pointer-events-none">
            <span className="text-[10px] font-mono tracking-widest uppercase bg-black/80 text-paper backdrop-blur-sm px-2.5 py-0.5 rounded-full font-bold">
              {project.num} // {project.builder}
            </span>
          </div>
        </div>

        {/* Project Meta */}
        <div className="mt-5 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono text-accent uppercase tracking-wider font-semibold">
                  {project.domain}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-paper-faint">
                  {project.builder}
                </span>
              </div>
              <h3
                onClick={() => onOpenSandbox(project)}
                className="font-display font-bold text-lg sm:text-xl group-hover:underline cursor-pointer leading-tight mt-0.5 transition-colors"
              >
                {project.name}
              </h3>
            </div>
            <div className="flex items-center space-x-1.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-white/10 hover:border-accent text-paper-dim hover:text-paper transition-colors"
                  title="View GitHub Repository"
                >
                  <Code2 className="w-4 h-4" />
                </a>
              )}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl border border-white/10 hover:border-accent text-paper-dim hover:text-paper transition-colors"
                title="Open Live Deployment"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-xs font-mono text-paper-dim line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Technical Highlights list */}
          <div className="pt-2 space-y-1">
            {project.highlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 text-[11px] font-mono text-paper-dim">
                <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                <span className="truncate">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenSandbox(project)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-paper text-ink-950 group-hover:bg-accent transition-all text-xs font-mono tracking-wider font-semibold flex items-center justify-center space-x-2"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>LAUNCH LIVE SANDBOX</span>
        </button>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 rounded-xl border border-white/15 hover:border-accent transition-colors text-xs font-mono font-medium flex items-center space-x-1"
        >
          <span>{project.liveUrl.includes('vercel.app') ? 'VERCEL' : project.liveUrl.includes('github.com') ? 'GITHUB' : 'NETLIFY'}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
