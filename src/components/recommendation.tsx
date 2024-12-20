import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Quote } from 'lucide-react';

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
    <div className="relative text-heli-primary p-6 overflow-hidden">
      <Quote
        fill="#FFDFC7"
        stroke="none"
        className="absolute -translate-y-4 opacity-60 top-0 right-0"
        size="88"
      />
      <Quote
        fill="#FFDFC7"
        stroke="none"
        className="absolute -rotate-12 -translate-x-1/4 -translate-y-4 opacity-15 bottom-0 left-0"
        size="300"
      />
      <blockquote className="relative">
        <StructuredText data={text} />
      </blockquote>
      <p className="text-heli-secondary-dark relative">{name || 'אנונימי'}</p>
    </div>
  );
}
