import { Container } from '@/components/layout';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import Image from 'next/image';

export const HeroFragment = graphql(
  `
    fragment HeroFragment on HomePageRecord {
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
  const { heroDescription, heroImage } = readFragment(HeroFragment, data);

  return (
    <section>
      <div className="h-96 relative overflow-hidden">
        <Image alt={heroImage?.alt ?? ''} src={heroImage?.url!} fill className="object-cover" />
        <Container className="relative top-1/2 -translate-y-1/2">
          <article className="prose max-w-none">
            <StructuredText data={heroDescription} />
          </article>
        </Container>
      </div>
    </section>
  );
}
