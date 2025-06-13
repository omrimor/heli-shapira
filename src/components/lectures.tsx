import { FragmentOf, readFragment, graphql } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { AnimatedSection } from '@/components/animated-section';
import { LecturesAccordion } from '@/components/lectures-accordion';

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
    <section id="lectures" className="w-full py-12 md:py-24 lg:py-32 bg-rose-50">
      <div className="container px-4 md:px-6">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-rose-200 px-3 py-1 text-sm text-terracotta-800">
              שינוי מתחיל בהבנה{' '}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-terracotta-900 sm:text-5xl">
              {lecturesTitle}
            </h2>
            {lecturesDescription && (
              <div className="max-w-[900px] text-warmGray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed prose prose-p:text-warmGray-700 max-w-none">
                <StructuredText data={lecturesDescription} />
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Accordion Layout */}
        <div className="max-w-4xl mx-auto">
          <AnimatedSection delay={200}>
            <LecturesAccordion
              lectures={lectures.map((lecture) => {
                const { title, description } = readFragment(LectureFragment, lecture);
                return { title: title || '', description };
              })}
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
