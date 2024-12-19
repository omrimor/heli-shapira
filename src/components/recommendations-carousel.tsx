'use client';

import { Container } from '@/components/layout';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Recommendation } from '@/components/recommendation';
import { useEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { RecommendationsFragment } from './recommendations';

type Props = {
  data: FragmentOf<typeof RecommendationsFragment>;
};

export function RecommendationsCarousel({ data }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { recommendations } = readFragment(RecommendationsFragment, data);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);
  }, [api, current]);

  return (
    <Carousel setApi={setApi} className="w-full h-96">
      <CarouselContent>
        {[...recommendations].map((recommendation, index) => (
          <CarouselItem className="lg:basis-[80%]" key={index}>
            <Recommendation key={index} data={recommendation} />
            {/* <div className="bg-muted rounded-md h-full lg:col-span-2 p-3 aspect-video flex justify-between flex-col">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <blockquote>
                    <StructuredText data={recommendation.text} />
                  </blockquote>
                </div>
                <p className="flex flex-row text-sm items-center">
                  <span className="text-muted-foreground">By</span>{' '}
                  <span>{recommendation.name || 'אנונימי'}</span>
                </p>
              </div>
            </div> */}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
