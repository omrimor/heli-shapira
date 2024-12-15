import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';

export const RecommendationFragment = graphql(`
  fragment RecommendationFragment on RecommendationRecord {
    id
    name
    text {
      value
    }
    _status
    _firstPublishedAt
  }
`);

type Props = {
  data: FragmentOf<typeof RecommendationFragment>;
};

export function Recommendation({ data }: Props) {
  const { name, text } = readFragment(RecommendationFragment, data);

  return (
    <article className="border p-3 rounded-lg">
      <h3>{name || 'אנונימי'}</h3>
      <StructuredText data={text} />
    </article>
  );
}
