import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PROJECTS, Project } from './data/projects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ParallaxShowcase } from './components/ParallaxShowcase';
import { HorizontalGallery } from './components/HorizontalGallery';
import { CuratedCatalog } from './components/CuratedCatalog';
import { PhilosophySection } from './components/PhilosophySection';
import { Footer } from './components/Footer';
import { LiveSandboxModal } from './components/LiveSandboxModal';
import { CustomCursor } from './components/CustomCursor';
import { Search, X, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [projects] = useState<Project[]>(PROJECTS);
  const [activeSandboxProject, setActiveSandboxProject] = useState<Project | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const lenisRef = useRef<Lenis | null>(null);

  // 1. High-Performance Lenis Smooth Scroll & GSAP ScrollTrigger Integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    let scrollTimeout: ReturnType<typeof setTimeout>;
    const onScrollStart = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 150);
    };

    window.addEventListener('scroll', onScrollStart, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollStart);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Dedicated section navigation that accounts for GSAP ScrollTrigger pinned spacers
  const handleNavigateToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      lenisRef.current?.scrollTo(0, { duration: 1.2 });
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: sectionId === 'manifesto' ? -20 : -50,
          duration: 1.3,
          immediate: false
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const searchedProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Hero center showcase: BuildIt, Library Assistant (center flagship), and Lab Assistant
  const heroFeaturedProjects = [
    projects.find((p) => p.id === 'buildit') || projects[0],
    projects.find((p) => p.id === 'library-assistant') || projects[1],
    projects.find((p) => p.id === 'lab-assistant') || projects[2]
  ];

  return (
    <div className="min-h-screen bg-ink-950 text-paper selection:bg-accent selection:text-ink-950">

      {/* Interactive GPU-Accelerated Custom Cursor */}
      <CustomCursor />

      {/* Top Sticky Navigation with Logo Dock Slot */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigateToSection}
      />

      {/* 1. Signature GSAP ScrollTrigger Hero Section with Live Windows */}
      <Hero
        featuredProjects={heroFeaturedProjects}
        onOpenSandbox={(p) => setActiveSandboxProject(p)}
      />

      {/* 2. Engineering Manifesto, Pillars of Philosophy & DEV STUDIOS Founders */}
      <PhilosophySection />

      {/* 3. Parallax Multi-layer Showcase */}
      <ParallaxShowcase
        projects={projects}
        onOpenSandbox={(p) => setActiveSandboxProject(p)}
      />

      {/* 4. Pinned Horizontal Scrub Gallery */}
      <HorizontalGallery
        projects={projects}
        onOpenSandbox={(p) => setActiveSandboxProject(p)}
      />

      {/* 5. Complete 19 Projects Live Catalog & Samples with Filters */}
      <CuratedCatalog
        projects={projects}
        onOpenSandbox={(p) => setActiveSandboxProject(p)}
      />

      {/* 6. Footer with Quick Index Matrix & Live Clocks */}
      <Footer
        onNavigate={handleNavigateToSection}
      />

      {/* Fullscreen Live Sandbox Device Modal */}
      <LiveSandboxModal
        project={activeSandboxProject}
        onClose={() => setActiveSandboxProject(null)}
      />

      {/* Global Search Overlay Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="bg-ink-800 text-paper w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center space-x-3 flex-1 mr-4">
                <Search className="w-5 h-5 text-paper-faint" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 19 projects, BuildIt, Library, Lab, physics, WebGL..."
                  className="w-full bg-transparent text-sm sm:text-base font-mono focus:outline-none placeholder:text-paper-faint"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3">
              {searchedProjects.length === 0 ? (
                <p className="text-xs font-mono text-center py-8 text-paper-faint">
                  No projects found matching "{searchQuery}".
                </p>
              ) : (
                searchedProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveSandboxProject(p);
                    }}
                    className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-accent font-bold">
                          {p.num}
                        </span>
                        <h4 className="font-display font-medium text-sm">{p.name}</h4>
                      </div>
                      <span className="text-[11px] font-mono text-paper-faint">
                        {p.domain}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-mono font-semibold">
                        LIVE
                      </span>
                      <Maximize2 className="w-4 h-4 text-paper-faint" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
