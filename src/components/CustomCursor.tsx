import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate custom cursor on devices with fine pointer (desktop mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Use GSAP quickSetter for 120fps GPU accelerated positioning
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const setRingX = gsap.quickSetter(ring, 'x', 'px');
    const setRingY = gsap.quickSetter(ring, 'y', 'px');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotX(mouseX);
      setDotY(mouseY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Dynamic element hover tracking
    const onElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer, iframe, .group'
      );

      if (clickable) {
        setIsHovered(true);
        if (clickable.getAttribute('data-cursor')) {
          setCursorText(clickable.getAttribute('data-cursor'));
        } else if (clickable.closest('#showcase') || clickable.closest('#horizontal-gallery')) {
          setCursorText('VIEW');
        } else {
          setCursorText(null);
        }
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    // Smooth spring physics loop for the trailing outer ring
    let animationFrameId: number;
    const render = () => {
      // Lerp smoothing formula
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      setRingX(ringX);
      setRingY(ringY);

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onElementHover, { passive: true });

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onElementHover);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden md:block select-none`}
    >
      {/* Center Precise Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100 ease-out will-change-transform transform-gpu ${
          isClicked
            ? 'w-1.5 h-1.5 bg-accent'
            : isHovered
            ? 'w-2 h-2 bg-accent'
            : 'w-2 h-2 bg-paper'
        }`}
      />

      {/* Outer Spring Trailing Ring / Aura */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 ease-out will-change-transform transform-gpu ${
          isHovered
            ? cursorText
              ? 'w-20 h-20 bg-accent/90 backdrop-blur-xs border-0 shadow-[0_0_25px_rgba(147,175,168,0.45)] scale-100'
              : 'w-12 h-12 bg-accent/15 border-2 border-accent shadow-[0_0_20px_rgba(147,175,168,0.3)] scale-110'
            : isClicked
            ? 'w-8 h-8 border-2 border-accent-bright scale-90'
            : 'w-9 h-9 border border-white/25 scale-100'
        }`}
      >
        {cursorText && isHovered && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-ink-950 uppercase animate-in zoom-in-75 duration-150">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
