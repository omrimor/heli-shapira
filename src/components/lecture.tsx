import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { cn } from '@/lib/utils';
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
  number: number;
};

export function Lecture({ data, number }: Props) {
  const { title, description } = readFragment(LectureFragment, data);

  return (
    <div
      className={cn(
        'p-5 md:basis-[45%] border border-white group odd:bg-[#F696BB] even:bg-[#98D8F4]',
      )}
    >
      <h3>{title}</h3>
      <StructuredText data={description} />
    </div>
  );
}
