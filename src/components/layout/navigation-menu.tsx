'use client';

import { cn } from '@/lib/utils';
import { motion, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'שירותים', href: '#services', sectionId: 'services' },
  { name: 'הרצאות', href: '#lectures', sectionId: 'lectures' },
  { name: 'מי אני', href: '#about', sectionId: 'about' },
  { name: 'דברו איתי', href: '#contact', sectionId: 'contact' },
];

export function NavigationMenu() {
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(({ sectionId }) => document.getElementById(sectionId));

      const viewportHeight = window.innerHeight;
      const headerHeight = 64; // 4rem or h-16

      sections.forEach((section) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top - headerHeight;
        const sectionBottom = rect.bottom - headerHeight;

        if (sectionTop <= viewportHeight * 0.3 && sectionBottom >= viewportHeight * 0.3) {
          setActiveSection(section.id);
        }
      });
    };
    const unsubscribeY = scrollY.on('change', handleScroll);

    return () => {
      unsubscribeY();
    };
  }, [scrollY]);

  return (
    <nav className="flex items-center gap-6 justify-between">
      {navItems.map((item) => (
        <motion.a
          key={item.name}
          href={item.href}
          className={cn(
            'relative inline-block py-2 text-sm font-medium transition-colors',
            activeSection === item.sectionId
              ? 'text-heli-secondary-dark'
              : 'text-heli-secondary hover:text-heli-secondary-dark',
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.name}
          {activeSection === item.sectionId && (
            <motion.div
              className="absolute bottom-0 inset-x-0 h-0.5 bg-heli-secondary-dark"
              layoutId="activeSection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.a>
      ))}
    </nav>
  );
}
