import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Recommendation, RecommendationFragment } from '@/components/recommendation';
import { RecommendationsCarousel } from './recommendations-carousel';
import { HeadingWithHighlight } from './heading-with-highlight';
import Image from 'next/image';

export const RecommendationsFragment = graphql(
  `
    fragment RecommendationsFragment on HomePageRecord {
      recommendationsTitle
      recommendationsDescription {
        value
      }
      recommendations {
        ...RecommendationFragment
      }
    }
  `,
  [RecommendationFragment],
);

type Props = {
  data: FragmentOf<typeof RecommendationsFragment>;
};

export function Recommendations({ data }: Props) {
  const { recommendationsTitle, recommendationsDescription, recommendations } = readFragment(
    RecommendationsFragment,
    data,
  );

  return (
    <section className="py-10 overflow-hidden">
      <Container className="prose prose-h2:text-[#F9494B] prose-blockquote:border-s-0 prose-blockquote:my-0 prose-blockquote:ps-0 space-y-3 relative">
        <div className="absolute right-0 bottom-0 w-[300px] h-[320px] md:w-[400px] md:h-[420px] -translate-y-1/2 md:translate-y-0 translate-x-1/3 md:translate-x-2/3">
          <Image fill alt="" src="/images/recommendations/bride.svg" className="object-contain" />
        </div>
        <div className="absolute left-0 bottom-0 w-[400px] h-[260px] md:w-[300px] md:h-[360px] translate-y-[-62%] md:translate-y-0 -translate-x-1/3 md:-translate-x-2/3">
          <Image fill alt="" src="/images/recommendations/fiance.svg" className="object-contain" />
        </div>
        <h2>{recommendationsTitle}</h2>
        <StructuredText data={recommendationsDescription} />
        <RecommendationsCarousel data={data} />
      </Container>
    </section>
  );
}
