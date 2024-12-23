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
    <section id="lectures" className="py-10 pt-32 overflow-hidden">
      <Container className="prose prose-headings:my-0 prose-h2:text-[#F9494B] space-y-3 relative">
        <div className="absolute right-0 top-0 w-[100px] h-[240px] md:w-[200px] md:h-[340px] -translate-x-10 md:translate-x-1/2 translate-y-[-90%] md:-translate-y-2/3">
          <Image fill alt="" src="/images/lectures/playblocks.svg" className="object-contain" />
        </div>
        <div className="absolute right-0 top-0 w-[100px] h-[170px] md:w-[200px] md:h-[270px] -translate-x-1/5 md:translate-x-full translate-y-[-90%] md:-translate-y-2/3">
          <Image fill alt="" src="/images/lectures/girl.svg" className="object-contain" />
        </div>
        <div className="mx-auto text-center">
          <h2>{lecturesTitle}</h2>
          <StructuredText data={lecturesDescription} />
        </div>
        <div className="flex flex-wrap flex-col md:flex-row gap-3">
          {lectures.map((lecture, index) => (
            <Lecture key={index} number={index + 1} data={lecture} />
          ))}
        </div>
      </Container>
    </section>
  );
}
