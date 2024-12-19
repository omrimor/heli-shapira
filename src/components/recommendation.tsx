import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
    <Card className="h-full lg:col-span-2 p-6 aspect-video flex justify-between flex-col">
      <blockquote>
        <StructuredText data={text} />
      </blockquote>
      <p>
        <span className="text-muted-foreground">נכתב על ידי</span> {name || 'אנונימי'}
      </p>
    </Card>
  );
}
