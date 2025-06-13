'use client';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef, useEffect, useState } from 'react';

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, className, delay = 0, direction = 'up', ...props }, forwardedRef) => {
    const { ref, isIntersecting } = useIntersectionObserver();
    const [isRTL, setIsRTL] = useState(false);

    useEffect(() => {
      // Check if the document direction is RTL
      setIsRTL(document.documentElement.dir === 'rtl');
    }, []);

    // Adjust directions for RTL layout
    const adjustedDirection = isRTL
      ? direction === 'left'
        ? 'right'
        : direction === 'right'
          ? 'left'
          : direction
      : direction;

    const directionClasses = {
      up: 'translate-y-10',
      down: '-translate-y-10',
      left: 'translate-x-10',
      right: '-translate-x-10',
      none: 'opacity-0',
    };

    return (
      <div
        ref={(node) => {
          // Handle both forwardedRef and intersection observer ref
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
          // @ts-ignore - we know ref.current is an HTMLElement
          ref.current = node;
        }}
        className={cn(
          'transition-all duration-700 ease-out',
          isIntersecting
            ? 'opacity-100 translate-x-0 translate-y-0'
            : `opacity-0 ${directionClasses[adjustedDirection]}`,
          className,
        )}
        style={{ transitionDelay: `${delay}ms` }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

AnimatedSection.displayName = 'AnimatedSection';
