'use client';

import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState, useEffect } from 'react';
import { NavigationMenu } from './navigation-menu';
import Link from 'next/link';
import { Container } from './container';

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');

  useMotionValueEvent(scrollY, 'change', (current) => {
    console.log({ current, previous: scrollY?.getPrevious() });
    const diff = current - (scrollY?.getPrevious() ?? 0);
    setScrollDirection(diff > 0 ? 'down' : 'up');
  });

  useEffect(() => {
    const unsubscribeY = scrollY.on('change', () => setIsScrolled(scrollY.get() > 0));
    return () => {
      unsubscribeY();
    };
  }, [scrollY]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-200 ${
        isScrolled ? 'border-b shadow-sm' : ''
      }`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <Container className="h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <span className="text-heli-primary">חלי</span>
          <span className="text-heli-secondary-dark">רימון</span>
        </Link>
        <NavigationMenu />
      </Container>
    </motion.header>
  );
}
