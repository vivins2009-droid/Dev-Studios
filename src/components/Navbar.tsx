import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowUpRight, Globe, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-ink-950/85 backdrop-blur-md border-b border-white/8 shadow-sm'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs uppercase tracking-[0.2em] font-medium text-paper">
            <button
              onClick={(e) => handleLinkClick(e, 'manifesto')}
              className="relative group transition-opacity hover:opacity-100 opacity-70 cursor-pointer"
            >
              <span>Founders & Ethos</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={(e) => handleLinkClick(e, 'showcase')}
              className="relative group transition-opacity hover:opacity-100 opacity-70 cursor-pointer"
            >
              <span>Parallax Showcase</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={(e) => handleLinkClick(e, 'horizontal-gallery')}
              className="relative group transition-opacity hover:opacity-100 opacity-70 cursor-pointer"
            >
              <span>Spotlight</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={(e) => handleLinkClick(e, 'catalog')}
              className="relative group transition-opacity hover:opacity-100 opacity-70 cursor-pointer"
            >
              <span>Samples & Directory</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="relative group transition-opacity hover:opacity-100 opacity-90 cursor-pointer font-bold text-accent-bright"
            >
              <span>Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent-bright transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Center: Target slot for docked DEV STUDIO logo */}
          <div
            id="nav-logo-slot"
            className="flex items-center justify-center cursor-pointer select-none"
            onClick={() => onNavigate('hero')}
          >
            <span
              id="nav-docked-logo"
              className={`font-display font-extrabold tracking-[0.06em] text-base sm:text-lg text-paper transition-opacity duration-300 ${
                isScrolled ? 'opacity-100' : 'opacity-0'
              }`}
            >
              DEV <span className="text-accent">STUDIO</span>
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-paper">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => handleLinkClick(e, 'catalog')}
              className="hidden sm:flex items-center space-x-2 py-1.5 px-3 rounded-full border border-white/15 hover:border-white/40 transition-all text-xs font-mono tracking-wider cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>19 LIVE APPS</span>
            </button>

            {/* Direct Contact Button */}
            <button
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="flex items-center space-x-1.5 py-1.5 px-3.5 rounded-full bg-paper text-ink-950 hover:opacity-90 transition-opacity text-xs font-mono tracking-wider font-semibold shadow-md cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-accent-dim" />
              <span>CONTACT</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-ink-950 pt-24 px-6 flex flex-col justify-between pb-10 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-paper-faint uppercase">
              Navigation
            </span>
            <button
              onClick={(e) => handleLinkClick(e, 'catalog')}
              className="text-2xl font-display font-medium flex items-center justify-between border-b border-white/10 pb-3 text-left w-full cursor-pointer"
            >
              <span>19 Live Projects</span>
              <ArrowUpRight className="w-5 h-5 opacity-50" />
            </button>
            <button
              onClick={(e) => handleLinkClick(e, 'showcase')}
              className="text-2xl font-display font-medium flex items-center justify-between border-b border-white/10 pb-3 text-left w-full cursor-pointer"
            >
              <span>Parallax Showcase</span>
              <ArrowUpRight className="w-5 h-5 opacity-50" />
            </button>
            <button
              onClick={(e) => handleLinkClick(e, 'horizontal-gallery')}
              className="text-2xl font-display font-medium flex items-center justify-between border-b border-white/10 pb-3 text-left w-full cursor-pointer"
            >
              <span>Spotlight Track</span>
              <ArrowUpRight className="w-5 h-5 opacity-50" />
            </button>
            <button
              onClick={(e) => handleLinkClick(e, 'manifesto')}
              className="text-2xl font-display font-medium flex items-center justify-between border-b border-white/10 pb-3 text-left w-full cursor-pointer"
            >
              <span>Engineering Manifesto & Founders</span>
              <ArrowUpRight className="w-5 h-5 opacity-50" />
            </button>
            <button
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="text-2xl font-display font-bold text-accent-bright flex items-center justify-between border-b border-white/10 pb-3 text-left w-full cursor-pointer"
            >
              <span>Contact & Founders</span>
              <ArrowUpRight className="w-5 h-5 opacity-80" />
            </button>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-paper-dim">
            <span>© 2026 DEV STUDIOS</span>
            <span>NITHIN • KRANTI • VIVIN</span>
          </div>
        </div>
      )}
    </>
  );
};
