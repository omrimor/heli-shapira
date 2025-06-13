'use client';

import type React from 'react';
import { smoothScrollTo } from '@/lib/smooth-scroll';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';

interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children, className, ...props }: NavLinkProps) {
  const isHashLink = href.startsWith('#');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHashLink) {
      e.preventDefault();
      const targetId = href.substring(1);
      smoothScrollTo(targetId);

      // Update URL without reload
      window.history.pushState(null, '', href);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        'text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 after:bg-terracotta-500 after:transition-all hover:after:w-full',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
