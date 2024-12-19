import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const LectureFragment = graphql(`
  fragment LectureFragment on LectureRecord {
    id
    title
    description {
      value
    }
    _firstPublishedAt
  }
`);

type Props = {
  data: FragmentOf<typeof LectureFragment>;
};

export function Lecture({ data }: Props) {
  const { title, description } = readFragment(LectureFragment, data);

  return (
    <Card className="row-span-3 grid grid-rows-subgrid">
      <div className="border rounded-full size-16" />
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        <StructuredText data={description} />
      </CardDescription>
    </Card>
  );
}
