import React, { useEffect, useState } from 'react';
import { Home, LayoutGrid, User, Mail, Github } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail }
];

const GITHUB_LINKS = [
  { name: 'Nithin', url: 'https://github.com/Nithinfgs' },
  { name: 'Kranti', url: 'https://github.com/Krtx-dev' },
  { name: 'Vivin', url: 'https://github.com/vivins2009-droid' }
];

interface SideNavProps {
  onNavigate: (id: string) => void;
}

export const SideNav: React.FC<SideNavProps> = ({ onNavigate }) => {
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? doc.scrollTop / scrollable : 0);

      const centerY = doc.scrollTop + window.innerHeight / 2;
      let currentId = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= centerY) currentId = item.id;
      }
      setActive(currentId);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Primary"
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-20 flex-col items-center justify-between py-8 border-r border-white/8 bg-ink-950/60 backdrop-blur-sm"
      >
        <button
          onClick={() => onNavigate('home')}
          aria-label="Home"
          className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center font-display font-bold text-sm text-paper hover:border-accent hover:text-accent transition-colors cursor-pointer"
        >
          D
        </button>

        <div className="relative flex flex-col items-center gap-9">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-accent origin-top"
            style={{ height: `${Math.min(progress, 1) * 100}%` }}
          />
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-label={item.label}
                aria-current={isActive}
                className="group relative z-10 flex items-center cursor-pointer"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-accent scale-125' : 'bg-ink-500 group-hover:bg-paper-faint'
                  }`}
                />
                <span className="absolute left-6 whitespace-nowrap text-[10px] font-mono tracking-widest uppercase text-paper-faint group-hover:text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-6">
          {GITHUB_LINKS.map((g) => (
            <a
              key={g.name}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={g.name}
              className="group relative text-paper-faint hover:text-accent transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap font-accent italic text-lg text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {g.name}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <nav
        aria-label="Primary"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around py-3 bg-ink-950/90 backdrop-blur-md border-t border-white/8"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-label={item.label}
              aria-current={isActive}
              className="p-2 cursor-pointer"
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-accent' : 'text-paper-faint'}`} />
            </button>
          );
        })}
        {GITHUB_LINKS.map((g) => (
          <a key={g.name} href={g.url} target="_blank" rel="noopener noreferrer" aria-label={g.name} className="p-2">
            <Github className="w-4 h-4 text-paper-faint" />
          </a>
        ))}
      </nav>
    </>
  );
};
