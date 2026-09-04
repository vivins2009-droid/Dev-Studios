import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Reveal3DOptions {
  y?: number;
  rotateX?: number;
  z?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  ease?: string;
}

const DEFAULTS: Required<Reveal3DOptions> = {
  y: 26,
  rotateX: 7,
  z: -50,
  duration: 0.9,
  stagger: 0.07,
  start: 'top 85%',
  ease: 'power3.out'
};

/**
 * Subtle 3D depth reveal: elements tilt back in space (rotateX + z) and
 * settle to identity as they scroll into view. Kept understated per
 * request — small angles, no scrub, one-shot on entry.
 */
export const reveal3D = (
  targets: gsap.TweenTarget,
  trigger: Element | null,
  overrides: Reveal3DOptions = {}
) => {
  if (!trigger) return;
  const cfg = { ...DEFAULTS, ...overrides };

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, clearProps: 'transform' });
    return;
  }

  gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: cfg.y,
      rotateX: cfg.rotateX,
      z: cfg.z,
      transformPerspective: 1200,
      transformOrigin: 'center bottom'
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      z: 0,
      duration: cfg.duration,
      ease: cfg.ease,
      stagger: cfg.stagger,
      scrollTrigger: {
        trigger,
        start: cfg.start,
        toggleActions: 'play none none reverse'
      }
    }
  );
};
