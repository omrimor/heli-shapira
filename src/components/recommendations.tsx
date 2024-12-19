import { Container } from '@/components/layout';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Recommendation, RecommendationFragment } from '@/components/recommendation';
import { RecommendationsCarousel } from './recommendations-carousel';

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
    <section className="py-10">
      <Container className="prose prose-blockquote:border-s-0 prose-blockquote:my-0 prose-blockquote:ps-0 space-y-3">
        <h2>{recommendationsTitle}</h2>
        <StructuredText data={recommendationsDescription} />
        <RecommendationsCarousel data={data} />
      </Container>
    </section>
  );
}
