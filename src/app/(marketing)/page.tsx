import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { Recommendation, RecommendationFragment } from '@/components/recommendation';

export const metadata = {
  title: 'Home | Tech Starter Kit',
};

const query = graphql(
  /* GraphQL */ `
    query query {
      allRecommendations {
        ...RecommendationFragment
      }
    }
  `,
  [RecommendationFragment],
);

export default async function Page() {
  const { allRecommendations } = await executeQuery(query, {
    includeDrafts: false,
  });

  return (
    <>
      {allRecommendations.map((recommendation, index) => (
        <Recommendation key={index} data={recommendation} />
      ))}
    </>
  );
}
