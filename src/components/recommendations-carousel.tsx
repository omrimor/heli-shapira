'use client';

import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Recommendation } from '@/components/recommendation';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { RecommendationsFragment } from './recommendations';
import { Card } from './ui/card';

type Props = {
  data: FragmentOf<typeof RecommendationsFragment>;
};

export function RecommendationsCarousel({ data }: Props) {
  const { recommendations } = readFragment(RecommendationsFragment, data);

  return (
    <Carousel
      opts={{
        align: 'start',
        direction: 'rtl',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {recommendations.map((recommendation, index) => (
          <CarouselItem key={index}>
            <div className="bg-white border border-[#98D8F4]">
              <Recommendation data={recommendation} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
