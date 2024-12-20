import { Container } from '@/components/layout/container';
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
    <section id="about" className="py-10">
      <div className="grid md:grid-cols-[1fr_1.5fr]">
        <figure className="relative">
          <h2 className="text-heli-primary text-3xl hidden md:block font-bold -translate-x-36 absolute top-0 left-0">
            {aboutTitle}
          </h2>
          <ResponsiveImage data={aboutProfilePicture?.responsiveImage!} />
          <figcaption>{aboutProfilePicture?.alt}</figcaption>
        </figure>
        <div>
          <div className="prose max-w-none p-6 md:p-12">
            <StructuredText data={aboutDescription} />
          </div>
        </div>
      </div>
    </section>
  );
}
