import React from 'react';
import { Globe } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface LazyLiveFrameProps {
  src: string;
  title: string;
  scale?: number;
  rootMargin?: string;
}

/**
 * Only mounts the real cross-origin iframe when it's near the viewport,
 * and unmounts it again once scrolled away. Several embedded sites run
 * their own WebGL/physics/GSAP loops, so keeping ~19 of them alive at
 * once (the old behavior) is what caused the scroll lag.
 */
export const LazyLiveFrame: React.FC<LazyLiveFrameProps> = ({
  src,
  title,
  scale = 0.5,
  rootMargin = '300px'
}) => {
  const { ref, inView } = useInView<HTMLDivElement>(rootMargin);
  const percent = Math.round(100 / scale);
  const cleanDomain = src.replace('https://', '').replace(/\/$/, '');

  return (
    <div ref={ref} className="w-full h-full relative overflow-hidden">
      {inView ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="border-0 pointer-events-none"
          style={{
            width: `${percent}%`,
            height: `${percent}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-700 text-paper-faint/60">
          <Globe className="w-4 h-4" />
          <span className="text-[10px] font-mono tracking-wider truncate max-w-[85%]">
            {cleanDomain}
          </span>
        </div>
      )}
    </div>
  );
};
