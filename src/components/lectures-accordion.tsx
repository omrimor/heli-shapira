'use client';

import { useState } from 'react';
import { StructuredText } from 'react-datocms';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LectureItemProps {
  title: string;
  description: any;
  isOpen?: boolean;
  onToggle: () => void;
  index: number;
}

function LectureItem({ title, description, isOpen, onToggle, index }: LectureItemProps) {
  return (
    <div
      className={cn(
        'border-b border-rose-200 last:border-0 overflow-hidden transition-all duration-300',
        isOpen ? 'pb-4' : '',
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-right text-lg font-medium text-terracotta-800 hover:text-terracotta-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500"
        aria-expanded={isOpen}
        aria-controls={`lecture-content-${index}`}
      >
        <span className="text-right flex-1">{title}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-terracotta-500 transition-transform duration-300 flex-shrink-0 ml-4',
            isOpen ? 'rotate-180' : '',
          )}
        />
      </button>
      <div
        id={`lecture-content-${index}`}
        className={cn(
          'pr-0 text-warmGray-700 transition-all duration-300 overflow-hidden',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="pt-2 pb-1 prose prose-p:text-warmGray-700 prose-p:leading-relaxed max-w-none">
          <StructuredText data={description} />
        </div>
      </div>
    </div>
  );
}

interface LecturesAccordionProps {
  lectures: Array<{
    title: string;
    description: any;
  }>;
}

export function LecturesAccordion({ lectures }: LecturesAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md border border-rose-200">
      {lectures.map((lecture, index) => (
        <LectureItem
          key={index}
          title={lecture.title || ''}
          description={lecture.description}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          index={index}
        />
      ))}
    </div>
  );
}
