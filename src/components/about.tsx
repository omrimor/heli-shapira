import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';

import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import { HeadingWithHighlight } from './heading-with-highlight';
import Image from 'next/image';

export const AboutFragment = graphql(
  `
    fragment AboutFragment on HomePageRecord {
      aboutTitle
      aboutDescription {
        value
      }
      aboutProfilePicture {
        alt
        responsiveImage(sizes: "(max-width: 700px) 100vw, 700px", imgixParams: { fm: webp }) {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment],
);

type Props = {
  data: FragmentOf<typeof AboutFragment>;
};

export function About({ data }: Props) {
  const { aboutTitle, aboutProfilePicture, aboutDescription } = readFragment(AboutFragment, data);

  return (
    <section id="about" className="py-10 overflow-hidden">
      <Container className="prose prose-h2:text-[#F9494B] prose-a:text-[#6C79D9] prose-headings:mt-0 prose-figure:w-full prose-figure:my-0 space-y-10">
        <div className="relative md:size-40">
          <div className="absolute right-0 bottom-0 w-[200px] h-[160px] md:w-[240px] md:h-[200px] -translate-y-4 translate-x-[-90%] md:-translate-x-1/2">
            <Image fill alt="" src="/images/about/girl-with-frame.svg" className="object-contain" />
          </div>
          <div className="absolute left-0 bottom-0 w-[400px] h-[100px] md:w-[440px] md:h-[140px] -translate-y-4 translate-x-1/4 md:translate-x-8">
            <Image fill alt="" src="/images/about/guy.svg" className="object-contain" />
          </div>
          <figure>
            <ResponsiveImage data={aboutProfilePicture?.responsiveImage!} />
            <figcaption>{aboutProfilePicture?.alt}</figcaption>
          </figure>
        </div>
        <div className="max-w-none">
          <h2 className="text-heli-primary">{aboutTitle}</h2>
          <StructuredText data={aboutDescription} />
        </div>
      </Container>
    </section>
  );
}
