import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Lecture, LectureFragment } from '@/components/lecture';
import { HeadingWithHighlight } from './heading-with-highlight';
import { Accordion } from '@/components/ui/accordion';

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
      <Container className="prose space-y-3 prose-a:no-underline prose-headings:my-0">
        <HeadingWithHighlight>
          <h2>{lecturesTitle}</h2>
        </HeadingWithHighlight>
        <StructuredText data={lecturesDescription} />
        <Accordion type="single" collapsible>
          {lectures.map((lecture, index) => (
            <Lecture key={index} data={lecture} />
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
