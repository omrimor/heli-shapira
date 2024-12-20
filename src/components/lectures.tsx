import { Container } from '@/components/layout/container';
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
    <section id="lectures" className="py-10">
      <Container className="prose space-y-3">
        <h2>{lecturesTitle}</h2>
        <StructuredText data={lecturesDescription} />
        <div className="grid grid-cols-1 grid-rows-4 gap-4 md:grid-cols-2 md:grid-rows-2">
          {lectures.map((lecture, index) => (
            <Lecture key={index} data={lecture} />
          ))}
        </div>
      </Container>
    </section>
  );
}
