import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PROJECTS, Project } from './data/projects';
import { SideNav } from './components/SideNav';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { LiveSandboxModal } from './components/LiveSandboxModal';
import { CustomCursor } from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [activeSandboxProject, setActiveSandboxProject] = useState<Project | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const maskRef = useRef<HTMLDivElement>(null);

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

  // Sidebar navigation: short hops scroll smoothly; long jumps get masked
  // with a brief cover/reveal so the traversal never reads as "lag".
  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    const lenis = lenisRef.current;
    if (!target || !lenis) return;

    const distance = Math.abs(target.getBoundingClientRect().top);
    const isFarJump = distance > window.innerHeight * 1.4;

    if (isFarJump && maskRef.current) {
      const tl = gsap.timeline();
      tl.to(maskRef.current, { autoAlpha: 1, duration: 0.25, ease: 'power2.in' })
        .call(() => lenis.scrollTo(target, { immediate: true, offset: 0 }))
        .to(maskRef.current, { autoAlpha: 0, duration: 0.45, ease: 'power2.out' }, '+=0.05');
    } else {
      lenis.scrollTo(target, { duration: 1.1, offset: 0 });
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 text-paper selection:bg-accent selection:text-ink-950">
      <CustomCursor />

      <SideNav onNavigate={handleNavigate} />

      <main className="pb-16 md:pb-0">
        <Hero />
        <Projects projects={PROJECTS} onOpenSandbox={(p) => setActiveSandboxProject(p)} />
        <About />
        <Contact />
      </main>

      <LiveSandboxModal
        project={activeSandboxProject}
        onClose={() => setActiveSandboxProject(null)}
      />

      {/* Transition mask: covers/reveals the screen during long sidebar jumps */}
      <div
        ref={maskRef}
        className="fixed inset-0 z-[9998] bg-ink-950 pointer-events-none opacity-0"
        aria-hidden="true"
      />
    </div>
  );
};

export default App;
