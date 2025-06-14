'use client';

import { useState } from 'react';
import { StructuredText } from 'react-datocms';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AboutContentProps {
  aboutDescription: any;
  aboutTitle: string | null;
}

export function AboutContent({ aboutDescription, aboutTitle }: AboutContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-4">
      {/* Short preview text */}
      <div className="text-warmGray-700 md:text-xl prose prose-p:text-warmGray-700 max-w-none">
        <p>{aboutTitle}</p>
      </div>

      {/* Read More Button */}
      <Button
        onClick={handleToggle}
        className="flex items-center bg-terracotta-600 hover:bg-terracotta-700 text-rose-50 transition-all duration-300 hover:scale-105"
      >
        {isExpanded ? 'קרא פחות' : 'קרא עוד'}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-300',
            isExpanded ? 'rotate-180' : '',
          )}
        />
      </Button>

      {/* Expandable content */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="pt-4 text-warmGray-700 md:text-xl prose prose-p:text-warmGray-700 max-w-none">
          <StructuredText data={aboutDescription} />
        </div>
      </div>
    </div>
  );
}
