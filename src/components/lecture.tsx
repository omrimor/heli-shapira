import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';

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
    <div className="basis-1/2 aspect-square p-5 first:border-l-2 first:border-b-2 first:border-b-heli-primary first:border-l-heli-primary last:border-r-2 last:border-t-2 last:border-r-heli-primary last:border-t-heli-primary group">
      <h3>{title}</h3>
      <StructuredText data={description} />
    </div>
  );
}
