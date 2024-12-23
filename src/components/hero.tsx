import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { ResponsiveImageFragment } from '@/components/ResponsiveImage';
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
  const { heroTitle, heroDescription } = readFragment(HeroFragment, data);

  return (
    <section id="home" className="pt-20">
      <Container className="relative min-h-[500px]">
        <div className="absolute left-0 bottom-0 w-[470px] h-[500px] -translate-x-1/2">
          <Image alt="" src="/images/hero/left-side.svg" fill className="object-contain" />
        </div>
        <div className="absolute right-0 bottom-0 w-[318px] h-[470px] translate-y-6 translate-x-1/3">
          <Image alt="" src="/images/hero/right-side.svg" fill className="object-contain" />
        </div>
        <div className="max-w-md text-center mx-auto space-y-4">
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
