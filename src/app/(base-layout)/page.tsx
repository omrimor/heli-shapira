import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import Link from 'next/link';
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
      <h3 className="text-2xl text-green-500">Choose your preferred template:</h3>
      <ul>
        <li>
          <Link href="/basic">Basic:</Link> <span>Simpler code, great to start exploring</span>
        </li>
        <li>
          <Link href="/real-time-updates">Real-time Updates:</Link>{' '}
          <span>
            Slightly more complex code, but content updates in real-time when Draft Mode is on
          </span>
        </li>
      </ul>
      {allRecommendations.map((recommendation, index) => (
        <Recommendation key={index} data={recommendation} />
      ))}
    </>
  );
}
