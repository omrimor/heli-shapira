import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import Image from 'next/image';
import { Button } from './ui/button';

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
    <section className="pt-24 pb-10 overflow-hidden relative">
      <div className="absolute inset-0 hidden md:block -translate-x-1/4">
        <Image
          priority
          alt={heroImage?.alt ?? ''}
          src={heroImage?.url!}
          fill
          className="object-contain"
        />
      </div>
      <Container className="relative">
        <div className="max-w-xl space-y-4">
          <article className="prose max-w-none">
            <h1 className="text-heli-primary">{heroTitle}</h1>
            <StructuredText data={heroDescription} />
          </article>
          <Button size="lg" asChild>
            <a href="#contact">בואו נדבר</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
