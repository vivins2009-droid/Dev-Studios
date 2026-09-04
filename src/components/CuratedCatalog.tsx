import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Project } from '../data/projects';
import { LivePreviewCard } from './LivePreviewCard';
import { Search, SlidersHorizontal, Github, ArrowUpRight, Code2 } from 'lucide-react';
import { reveal3D } from '../lib/motion';

interface CuratedCatalogProps {
  projects: Project[];
  onOpenSandbox: (project: Project) => void;
}

type CategoryType =
  | 'All'
  | 'Aerospace & Simulation'
  | 'AI & Systems'
  | 'Design & Editorial'
  | 'WebGL & 3D'
  | 'Dev Tools & SaaS';

type SortType = 'num' | 'rating' | 'featured';

type FounderFilterType = 'All' | 'Nithin Selvaraj' | 'Kranti .P.A' | 'Vivin .S' | 'DEV STUDIOS';

export const CuratedCatalog: React.FC<CuratedCatalogProps> = ({
  projects,
  onOpenSandbox
}) => {
  const [selectedFounder, setSelectedFounder] = useState<FounderFilterType>('All');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('num');
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const foundersList: { id: FounderFilterType; label: string; count: number }[] = [
    { id: 'All', label: 'All Developers', count: projects.length },
    { id: 'Nithin Selvaraj', label: 'Nithin Selvaraj', count: projects.filter((p) => p.builder === 'Nithin Selvaraj').length },
    { id: 'Kranti .P.A', label: 'Kranti .P.A', count: projects.filter((p) => p.builder === 'Kranti .P.A').length },
    { id: 'Vivin .S', label: 'Vivin .S', count: projects.filter((p) => p.builder === 'Vivin .S').length },
    { id: 'DEV STUDIOS', label: 'DEV STUDIOS Flagships', count: projects.filter((p) => p.builder === 'DEV STUDIOS').length }
  ];

  const categories: CategoryType[] = [
    'All',
    'Aerospace & Simulation',
    'AI & Systems',
    'Design & Editorial',
    'WebGL & 3D',
    'Dev Tools & SaaS'
  ];

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesFounder =
          selectedFounder === 'All' || project.builder === selectedFounder;
        const matchesCategory =
          selectedCategory === 'All' || project.category === selectedCategory;
        const matchesSearch =
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.builder.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.highlights.some((h) =>
            h.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFounder && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return parseInt(a.num) - parseInt(b.num);
      });
  }, [projects, selectedFounder, selectedCategory, searchQuery, sortBy]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      reveal3D(headerRef.current?.children ?? [], headerRef.current, { rotateX: 5 });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        reveal3D(gridRef.current.children, gridRef.current, {
          rotateX: 6,
          y: 22,
          stagger: 0.05,
          start: 'top 92%'
        });
      }
    });
    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      id="catalog"
      className="py-24 md:py-32 bg-ink-950 text-paper select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="reveal-3d">
            <span className="text-xs font-mono tracking-widest text-paper-faint uppercase">
              COMPLETE DIRECTORY [01 — {projects.length}]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mt-1">
              Live Software Catalog
            </h2>
          </div>
          <p className="reveal-3d text-xs sm:text-sm font-mono text-paper-dim max-w-md">
            Filter by developer to explore projects under Nithin, Kranti, Vivin, or the joint DEV STUDIOS flagships. Click any window for the live sandbox.
          </p>
        </div>

        {/* 1. Developer / Founder Selection Tabs */}
        <div className="mb-6 p-2 rounded-2xl bg-ink-800/70 border border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            {foundersList.map((f) => {
              const active = selectedFounder === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFounder(f.id)}
                  className={`flex items-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-accent text-ink-950 font-bold shadow-md'
                      : 'hover:bg-white/5 text-paper-dim'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-black/20 text-ink-950 font-bold' : 'bg-white/10 text-paper-dim'}`}>
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-6 border-b border-white/10">

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-paper text-ink-950 font-semibold shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-paper-dim'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-paper-faint" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stack, physics, WebGL..."
                className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-ink-800 border border-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-paper-faint"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-paper-faint" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="text-xs font-mono bg-ink-800 border border-white/10 rounded-full py-2 px-3 focus:outline-none cursor-pointer"
              >
                <option value="num">Index Order (01 — {projects.length})</option>
                <option value="featured">Featured First</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Live Windows Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-paper-faint font-mono text-sm">
            No projects found matching "{searchQuery}". Try selecting another category.
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project) => (
              <div key={project.id} className="reveal-3d">
                <LivePreviewCard
                  project={project}
                  onOpenSandbox={onOpenSandbox}
                />
              </div>
            ))}
          </div>
        )}

        {/* High-Impact GitHub Deep Technical Projects Banner */}
        <div className="relative bg-ink-800 text-paper p-8 sm:p-12 rounded-3xl border-2 border-accent/25 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
              <Code2 className="w-3.5 h-3.5" />
              <span>SOURCE CODE & RESEARCH REPOSITORIES</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              Want to explore more DEV STUDIOS technical projects & repositories?
            </h3>
            <p className="text-xs sm:text-sm font-mono text-paper/70 leading-relaxed">
              Explore our complete GitHub workspace for raw source repositories, full-stack applications, numerical physics algorithms, custom GLSL shaders, orbital trajectory solvers, and experimental prototypes.
            </p>
          </div>

          <a
            href="https://github.com/Nithinfgs"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 px-6 py-3.5 rounded-2xl bg-accent text-ink-950 hover:opacity-95 transition-all font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-2.5 shadow-xl shrink-0 group cursor-pointer"
          >
            <Github className="w-4 h-4 text-ink-950" />
            <span>EXPLORE GITHUB WORKSPACE</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
