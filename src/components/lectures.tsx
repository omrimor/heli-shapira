import { Container } from '@/components/layout';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Lecture, LectureFragment } from '@/components/lecture';

export const LecturesFragment = graphql(
  `
    fragment LecturesFragment on HomePageRecord {
      lecturesTitle
      lecturesDescription {
        value
      }
      lectures {
        ...LectureFragment
      }
    }
  `,
  [LectureFragment],
);

type Props = {
  data: FragmentOf<typeof LecturesFragment>;
};

export function Lectures({ data }: Props) {
  const { lecturesTitle, lecturesDescription, lectures } = readFragment(LecturesFragment, data);

  return (
    <section className="py-10">
      <Container className="prose max-w-5xl space-y-3">
        <h2>{lecturesTitle}</h2>
        <StructuredText data={lecturesDescription} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 grid-rows-[0.3fr_0.6fr_auto]">
          {lectures.map((lecture, index) => (
            <Lecture key={index} data={lecture} />
          ))}
        </div>
      </Container>
    </section>
  );
}
