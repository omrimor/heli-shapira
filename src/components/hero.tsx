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
    <section className="relative grid grid-cols-1 md:grid-cols-2">
      <div className="relative inset-0 min-h-[430px] md:min-h-[700px]">
        <Image
          priority
          alt={heroImage?.alt ?? ''}
          src={heroImage?.url!}
          fill
          className="object-cover"
        />
      </div>
      <div className="py-10 px-14 md:px-20 relative bg-gradient-to-tr from-[#FFA5AB]/90 to-[#DA627D]/90 flex items-center">
        <article className="prose relative max-w-none prose-p:text-heli-accent-dark">
          <h1 className="text-heli-accent-dark text-2xl md:text-4xl">{heroTitle}</h1>
          <StructuredText data={heroDescription} />
          <Button size="lg" variant="invert" asChild>
            <a className="text-lg" href="#contact">
              בואו נדבר
            </a>
          </Button>
        </article>
      </div>
    </section>
  );
}
