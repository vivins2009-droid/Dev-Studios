import React, { useState } from 'react';
import { Project } from '../data/projects';
import {
  X,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  Smartphone,
  Tablet,
  Monitor,
  ShieldCheck,
  Terminal,
  Layers
} from 'lucide-react';

interface LiveSandboxModalProps {
  project: Project | null;
  onClose: () => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export const LiveSandboxModal: React.FC<LiveSandboxModalProps> = ({
  project,
  onClose
}) => {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [reloadKey, setReloadKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  if (!project) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(project.liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getContainerWidth = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[390px] h-[80vh]';
      case 'tablet':
        return 'max-w-[768px] h-[82vh]';
      default:
        return 'w-full h-[84vh]';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-ink-800 text-paper w-full max-w-7xl h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sandbox Browser Chrome */}
        <div className="bg-ink-900 px-4 sm:px-6 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 select-none">

          {/* Left: Window Controls & Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors flex items-center justify-center text-[8px] text-ink-950 font-bold"
              >
                ✕
              </button>
              <span className="w-3.5 h-3.5 rounded-full bg-white/15" />
              <span className="w-3.5 h-3.5 rounded-full bg-accent" />
            </div>

            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-paper tracking-wider">
                {project.num} // {project.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-paper/70">
                {project.domain}
              </span>
            </div>
          </div>

          {/* Center: Interactive Device Viewport Switcher */}
          <div className="flex items-center space-x-1 bg-black/50 p-1 rounded-full border border-white/10 text-xs font-mono">
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all ${
                device === 'desktop'
                  ? 'bg-paper text-ink-950 font-semibold'
                  : 'text-paper/60 hover:text-paper'
              }`}
              title="Desktop 100% View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all ${
                device === 'tablet'
                  ? 'bg-paper text-ink-950 font-semibold'
                  : 'text-paper/60 hover:text-paper'
              }`}
              title="Tablet 768px View"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all ${
                device === 'mobile'
                  ? 'bg-paper text-ink-950 font-semibold'
                  : 'text-paper/60 hover:text-paper'
              }`}
              title="Mobile 390px View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile</span>
            </button>
          </div>

          {/* Right: Actions & External Links */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setReloadKey((k) => k + 1)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-paper/70 hover:text-paper transition-colors"
              title="Reload Frame"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-paper/70 hover:text-paper transition-colors flex items-center space-x-1"
              title="Copy Netlify URL"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono tracking-wider transition-all flex items-center space-x-1.5 ${
                showSpecs
                  ? 'bg-paper text-ink-950 border-paper font-bold'
                  : 'bg-white/5 text-paper/80 border-white/10 hover:border-white/30'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Highlights</span>
            </button>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-accent text-ink-950 hover:opacity-90 text-xs font-mono font-bold tracking-wider flex items-center space-x-1.5 shadow-lg"
            >
              <span>OPEN FULL TAB</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-paper transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Live Active URL Navigation Sub-bar */}
        <div className="bg-ink-700 px-4 py-2 border-b border-white/5 flex items-center justify-between text-xs font-mono text-paper/60">
          <div className="flex items-center space-x-2 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="text-white/40">https://</span>
            <span className="text-paper font-medium truncate">
              {project.liveUrl.replace('https://', '')}
            </span>
          </div>
          <span className="text-[10px] text-accent uppercase tracking-wider font-bold hidden sm:inline">
            ● 100% LIVE INTERACTIVE SANDBOX
          </span>
        </div>

        {/* Sandbox Body (Iframe + Optional Specs Drawer) */}
        <div className="flex-1 relative flex items-center justify-center p-3 sm:p-6 bg-ink-950 overflow-hidden">

          {/* The Live Interactive Device Container */}
          <div
            className={`transition-all duration-500 rounded-2xl overflow-hidden bg-paper shadow-2xl border border-white/10 relative ${getContainerWidth()}`}
          >
            <iframe
              key={reloadKey}
              src={project.liveUrl}
              title={project.name}
              className="w-full h-full border-0 bg-white"
              allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; xr-spatial-tracking"
              allowFullScreen
            />
          </div>

          {/* Technical Specifications Slide-Over Drawer */}
          {showSpecs && (
            <div className="absolute top-0 right-0 bottom-0 w-80 sm:w-96 bg-ink-900/95 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 z-30">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-accent" />
                    <span className="font-display font-bold text-sm uppercase">
                      Architecture & Stack
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSpecs(false)}
                    className="p-1 rounded-lg hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-paper-faint uppercase tracking-widest block mb-1">
                    PROJECT TITLE
                  </span>
                  <h3 className="font-display font-bold text-lg">{project.name}</h3>
                  <span className="text-xs font-mono text-accent block mt-1">
                    {project.domain}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-paper-faint uppercase tracking-widest block mb-2">
                    DESCRIPTION
                  </span>
                  <p className="text-xs font-mono text-paper/70 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-paper-faint uppercase tracking-widest block mb-2">
                    TECHNICAL HIGHLIGHTS
                  </span>
                  <ul className="space-y-2 text-xs font-mono text-paper/80">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-accent font-bold">0{idx + 1}.</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-paper text-ink-950 hover:opacity-90 text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center space-x-2"
                >
                  <span>VISIT DEPLOYMENT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
