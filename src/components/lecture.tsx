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
    <article className="border p-3 rounded-lg">
      <h3>{title}</h3>
      <StructuredText data={description} />
    </article>
  );
}
