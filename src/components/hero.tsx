import { FragmentOf, readFragment, graphql } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/animated-section';
import { ResponsiveImageFragment } from '@/components/ResponsiveImage';

export const HeroFragment = graphql(
  `
    fragment HeroFragment on HomePageRecord {
      heroTitle
      heroDescription {
        value
      }
      heroImage {
        alt
        url
        responsiveImage(sizes: "(max-width: 1200px) 100vw, 1200px", imgixParams: { fm: webp }) {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment],
);

type Props = {
  data: FragmentOf<typeof HeroFragment>;
};

export function Hero({ data }: Props) {
  const { heroTitle, heroDescription, heroImage } = readFragment(HeroFragment, data);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-warm-gradient bg-cozy-pattern overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <AnimatedSection className="space-y-4" delay={200}>
            <h1 className="text-3xl font-bold tracking-tight text-terracotta-900 sm:text-4xl md:text-5xl">
              {heroTitle}
            </h1>
            <div className="text-warmGray-700 md:text-xl prose prose-p:text-warmGray-700 max-w-none">
              <StructuredText data={heroDescription} />
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-terracotta-600 hover:bg-terracotta-700 text-rose-50 transition-all duration-300 hover:scale-105">
                <a href="#contact" className="text-inherit no-underline">
                  בואו נדבר על זה
                </a>
              </Button>
            </div>
          </AnimatedSection>
          <AnimatedSection
            direction="right"
            delay={400}
            className="relative h-[350px] w-full rounded-lg overflow-hidden shadow-lg"
          >
            {heroImage?.url && (
              <Image
                src={heroImage.url}
                alt={heroImage.alt ?? 'תמונת גיבור'}
                fill
                className="object-cover"
                priority
              />
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
