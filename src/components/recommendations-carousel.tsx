'use client';

import { Container } from '@/components/layout/container';
import Autoplay from 'embla-carousel-autoplay';

import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Recommendation } from '@/components/recommendation';
import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { RecommendationsFragment } from './recommendations';

import { cn } from '@/lib/utils';

type Props = {
  data: FragmentOf<typeof RecommendationsFragment>;
};

export function RecommendationsCarousel({ data }: Props) {
  const { recommendations } = readFragment(RecommendationsFragment, data);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          direction: 'rtl',
          loop: true,
        }}
        className="w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {recommendations.map((recommendation, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Recommendation data={recommendation} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="py-2">
        <div className="flex justify-center gap-2">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'size-2 rounded-full border-heli-accent border',
                current === index + 1 ? 'bg-heli-accent' : 'bg-white',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
