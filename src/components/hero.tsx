import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
    <section className="md:py-20 relative">
      <div className="relative h-[450px]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            priority
            alt={heroImage?.alt ?? ''}
            src={heroImage?.url!}
            fill
            className="object-cover translate-y-20 md:translate-y-0 object-center w-full h-full md:scale-100 scale-150 contrast-125"
          />
          <div className="absolute inset-0 bg-[#C38370]/40" />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent to-heli-accent/80" /> */}
        </div>
        <Container className="relative h-full">
          <div className="max-w-xl flex items-center h-full">
            <div className="space-y-4 -mt-20 md:mt-0">
              <article className="prose max-w-none">
                <h1 className="text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-2xl md:text-4xl">
                  {heroTitle}
                </h1>
              </article>
              <Button size="lg" variant="invert" asChild>
                <a className="text-lg" href="#contact">
                  בואו נדבר
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <article className="prose max-w-none pt-10">
          <StructuredText data={heroDescription} />
        </article>
      </Container>
    </section>
  );
}
