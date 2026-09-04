import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowRight, Check, ExternalLink, Globe, Mail, Github, Gift } from 'lucide-react';
import { PROJECTS } from '../data/projects';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [clocks, setClocks] = useState({
    tokyo: '',
    berlin: '',
    london: '',
    newyork: ''
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setClocks({
        tokyo: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }),
        berlin: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' }),
        london: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
        newyork: now.toLocaleTimeString('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink-950 text-paper pt-24 pb-12 border-t border-white/10 relative overflow-hidden select-none font-mono">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-bright/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* World Clocks Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-12 mb-16 border-b border-white/10 text-xs text-paper-faint">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>TYO:</span>
            <span className="text-paper font-semibold tabular-nums">{clocks.tokyo || '19:00'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>BER:</span>
            <span className="text-paper font-semibold tabular-nums">{clocks.berlin || '12:00'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>LON:</span>
            <span className="text-paper font-semibold tabular-nums">{clocks.london || '11:00'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>NYC:</span>
            <span className="text-paper font-semibold tabular-nums">{clocks.newyork || '06:00'}</span>
          </div>
        </div>

        {/* Credentials & Free Demo Page Direct Connect Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.04] border-2 border-accent/20 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
              <Gift className="w-3.5 h-3.5" />
              <span>CLAIM A FREE DEMO PAGE FROM DEV STUDIOS</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-paper">
              Email DEV STUDIOS for a free demo page.
            </h3>
            <p className="text-paper/70 text-xs max-w-2xl leading-relaxed">
              We do all types: <strong>Static, 3D WebGL, Animated GSAP, and Kinetic Gradients</strong>. Anything you can imagine or have seen on the internet — DEV STUDIOS will build it for you.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="mailto:nithinselvaraj9@gmail.com?subject=DEV%20STUDIOS%20Free%20Demo%20Page%20Request&body=Hi%20DEV%20STUDIOS%20Team%2C%20I%20would%20like%20to%20request%20a%20free%20demo%20page%20for%20my%20project."
              className="px-6 py-3.5 rounded-full bg-accent text-ink-950 font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-lg cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Email DEV STUDIOS for Free Demo</span>
            </a>
          </div>
        </div>

        {/* Projects Live Netlify Quick Access Matrix */}
        <div className="pb-16 mb-16 border-b border-white/10">
          <div className="flex items-center space-x-2 text-[10px] text-paper-faint uppercase tracking-widest mb-6">
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>{PROJECTS.length} LIVE DEPLOYMENTS QUICK INDEX</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROJECTS.map((proj) => (
              <a
                key={proj.id}
                href={proj.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all flex items-center justify-between group"
              >
                <div className="truncate mr-2">
                  <span className="text-[10px] text-accent font-bold mr-1.5">
                    {proj.num}
                  </span>
                  <span className="font-display font-medium text-paper group-hover:underline">
                    {proj.name}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-paper-faint group-hover:text-paper shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">

          {/* Newsletter Column */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-[10px] tracking-widest text-paper-faint uppercase block">
              RESEARCH DISPATCHES & LOGS
            </span>
            <h4 className="font-display font-bold text-xl uppercase tracking-tight">
              Engineering breakthroughs & physics simulations.
            </h4>
            <p className="text-paper-dim text-xs leading-relaxed max-w-sm">
              Receive updates on aerospace flight models, WebGL experiments, steganographic algorithms, and architectural component systems.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2 flex items-center max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your engineering email..."
                className="flex-1 bg-white/5 border border-white/15 rounded-l-full py-2.5 px-4 text-xs font-mono text-paper focus:outline-none focus:border-accent/60 placeholder:text-white/30"
              />
              <button
                type="submit"
                className="bg-paper text-ink-950 px-5 py-2.5 rounded-r-full font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center space-x-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>JOINED</span>
                  </>
                ) : (
                  <>
                    <span>SUBSCRIBE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Developer Credentials Column */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] tracking-widest text-paper-faint uppercase block">
              DEVELOPERS & CODEBASES
            </span>
            <ul className="space-y-2.5 text-paper/80">
              <li>
                <a href="mailto:nithinselvaraj9@gmail.com" className="hover:text-accent transition-colors flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  <span className="truncate">nithinselvaraj9@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Nithinfgs" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center space-x-2">
                  <Github className="w-3.5 h-3.5 text-accent" />
                  <span>Nithin Selvaraj</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/Krtx-dev" target="_blank" rel="noopener noreferrer" className="hover:text-accent-bright transition-colors flex items-center space-x-2">
                  <Github className="w-3.5 h-3.5 text-accent-bright" />
                  <span>Kranti .P.A</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/vivins2009-droid" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors flex items-center space-x-2">
                  <Github className="w-3.5 h-3.5 text-paper" />
                  <span>Vivin .S</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] tracking-widest text-paper-faint uppercase block">
              SECTIONS
            </span>
            <ul className="space-y-2 text-paper/70">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('catalog')}
                  className="hover:text-paper transition-colors text-left cursor-pointer"
                >
                  Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('showcase')}
                  className="hover:text-paper transition-colors text-left cursor-pointer"
                >
                  Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('horizontal-gallery')}
                  className="hover:text-paper transition-colors text-left cursor-pointer"
                >
                  Spotlight
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('manifesto')}
                  className="hover:text-paper transition-colors text-left cursor-pointer"
                >
                  Manifesto & Bio
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-2 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-widest text-paper-faint uppercase block">
                ETHOS
              </span>
              <p className="text-paper-dim text-[11px] leading-relaxed mt-2">
                "From frontend to backend, the small things, DEV STUDIOS will obsess so you don't have to."
              </p>
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-paper text-xs uppercase tracking-wider cursor-pointer"
              >
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-paper-faint">
          <div>
            <span>© 2026 DEV STUDIOS • NITHIN SELVARAJ • KRANTI .P.A • VIVIN .S. ALL {PROJECTS.length} SYSTEMS OPERATIONAL.</span>
          </div>
          <div className="flex items-center space-x-6">
            <span>INSPIRED BY MINIMAL GOODS & TIMOTHY RICKS</span>
            <span>BUILT WITH REACT + GSAP SCROLLTRIGGER + LENIS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
