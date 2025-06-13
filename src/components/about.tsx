import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { CheckCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';

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
  const { aboutTitle, aboutDescription, aboutProfilePicture } = readFragment(AboutFragment, data);

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-rose-100/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <AnimatedSection
            direction="left"
            className="relative h-[400px] md:h-[600px] w-full rounded-lg overflow-hidden shadow-lg"
          >
            {aboutProfilePicture?.responsiveImage && (
              <ResponsiveImage data={aboutProfilePicture.responsiveImage} />
            )}
          </AnimatedSection>
          <AnimatedSection direction="right" delay={300} className="space-y-4">
            <div className="inline-block rounded-lg bg-rose-200 px-3 py-1 text-sm text-terracotta-800">
              עליי{' '}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-terracotta-900 sm:text-4xl">
              {aboutTitle}
            </h2>
            <div className="text-warmGray-700 prose prose-p:text-warmGray-700 max-w-none">
              <StructuredText data={aboutDescription} />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
