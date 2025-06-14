'use client';

import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/nav-link';
import Link from 'next/link';
import { Container } from './container';

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    setIsScrolled(current > 0);
  });

  return (
    <motion.header
      className={`sticky top-0 z-40 border-b border-rose-200 bg-rose-50/95 backdrop-blur supports-[backdrop-filter]:bg-rose-50/60 transition-all duration-200 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <Container className="flex h-16 items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          <Heart
            className="h-6 w-6 text-terracotta-500 animate-pulse-gentle"
            style={{ animationDuration: '3s' }}
          />
          <span className="text-xl font-semibold tracking-tight text-terracotta-800">
            <span className="text-terracotta-900">חלי</span>{' '}
            <span className="text-terracotta-600">רימון</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <NavLink href="#about" className="text-warmGray-700 hover:text-terracotta-600">
            אודות
          </NavLink>
          <NavLink href="#services" className="text-warmGray-700 hover:text-terracotta-600">
            שירותים
          </NavLink>
          <NavLink href="#lectures" className="text-warmGray-700 hover:text-terracotta-600">
            הרצאות
          </NavLink>
          <NavLink href="#testimonials" className="text-warmGray-700 hover:text-terracotta-600">
            המלצות
          </NavLink>
        </nav>

        <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-rose-50 transition-all duration-300 hover:scale-105">
          <a href="#contact" className="text-inherit no-underline">
            צור קשר
          </a>
        </Button>
      </Container>
    </motion.header>
  );
}
