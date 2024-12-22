import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';

import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import { HeadingWithHighlight } from './heading-with-highlight';

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
    <section id="about" className="py-10">
      <Container className="prose prose-h2:mt-0 prose-figure:w-full prose-figure:rounded-xl prose-figure:my-0 prose-img:rounded-xl group">
        <div className="grid gap-6 md:grid-cols-[0.3fr_1fr]">
          <div className="filter-none md:saturate-0 group-hover:saturate-100 transition-all">
            <figure>
              <ResponsiveImage data={aboutProfilePicture?.responsiveImage!} />
              <figcaption>{aboutProfilePicture?.alt}</figcaption>
            </figure>
          </div>
          <div className="max-w-none">
            <HeadingWithHighlight>
              <h2 className="text-heli-primary relative">{aboutTitle}</h2>
            </HeadingWithHighlight>
            <StructuredText data={aboutDescription} />
          </div>
        </div>
      </Container>
    </section>
  );
}
