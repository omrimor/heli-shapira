import { Container } from '@/components/layout';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';

import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';

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
    <section className="py-10">
      <Container className="prose space-y-3">
        <h2>{aboutTitle}</h2>
        <div className="prose max-w-none">
          <StructuredText data={aboutDescription} />
        </div>
        <figure>
          {/* Display responsive image */}
          <ResponsiveImage data={aboutProfilePicture?.responsiveImage!} />
          {/* Display image title */}
          <figcaption>{aboutProfilePicture?.alt}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
