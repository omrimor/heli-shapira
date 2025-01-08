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
    <section className="py-10 relative">
      <div className="relative h-[450px]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            priority
            alt={heroImage?.alt ?? ''}
            // src={heroImage?.url!}
            src="/images/hero-family.webp"
            fill
            className="object-cover object-center w-full h-full md:scale-100 scale-150"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white" />
        </div>
        <Container className="relative h-full">
          <div className="max-w-xl flex items-center h-full">
            <div className="space-y-4">
              <article className="prose max-w-none">
                <h1 className="text-heli-primary">{heroTitle}</h1>
                {/* <StructuredText data={heroDescription} /> */}
              </article>
              <Button size="lg" asChild>
                <a className="text-lg" href="#contact">
                  בואו נדבר
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        {/* <div className="max-w-xl space-y-4"> */}
        <article className="prose max-w-none pt-10">
          {/* <h1 className="text-heli-primary">{heroTitle}</h1> */}
          <StructuredText data={heroDescription} />
        </article>
        {/* <Button size="lg" asChild>
            <a href="#contact">בואו נדבר</a>
          </Button> */}
        {/* </div> */}
      </Container>
    </section>
  );
}
