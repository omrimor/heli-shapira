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
    <section id="home">
      <div className="h-[550px] relative overflow-hidden">
        <Image alt={heroImage?.alt ?? ''} src={heroImage?.url!} fill className="object-cover" />
        <Container className="relative top-1/2 -translate-y-1/2">
          <div className="max-w-md space-y-4">
            <article className="prose max-w-none">
              <h1 className="text-heli-primary">{heroTitle}</h1>
              <StructuredText data={heroDescription} />
            </article>
            <Button asChild>
              <a href="#contact">בואו נדבר</a>
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
