'use client';

import { motion, useSpring, useScroll } from 'motion/react';
import { PropsWithChildren, useRef } from 'react';

interface HeadingWithHighlightProps extends PropsWithChildren {}
export function HeadingWithHighlight({ children }: HeadingWithHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'center start'],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative" ref={containerRef}>
      <motion.div
        style={{
          scaleX,
          position: 'absolute',
          top: '100%',
          right: 0,
          left: '45%',
          height: 3,
          originX: 1,
          backgroundColor: '#FF2D55',
        }}
      />
      {children}
    </div>
  );
}
