import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Lecture, LectureFragment } from '@/components/lecture';
import { HeadingWithHighlight } from './heading-with-highlight';
import Image from 'next/image';

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
      <Container className="prose space-y-3 relative">
        <div className="absolute right-0 bottom-0 w-[300px] h-[440px] translate-x-1/2 -translate-y-1/2">
          <Image fill alt="" src="/images/lectures/playblocks.svg" className="object-contain" />
        </div>
        <div className="absolute right-0 bottom-0 w-[300px] h-[370px] translate-x-full -translate-y-1/2">
          <Image fill alt="" src="/images/lectures/girl.svg" className="object-contain" />
        </div>
        <HeadingWithHighlight>
          <h2>{lecturesTitle}</h2>
        </HeadingWithHighlight>
        <StructuredText data={lecturesDescription} />
        <div className="flex flex-wrap border-2 border-heli-primary">
          {lectures.map((lecture, index) => (
            <Lecture key={index} data={lecture} />
          ))}
        </div>
      </Container>
    </section>
  );
}
