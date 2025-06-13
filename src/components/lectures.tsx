import { FragmentOf, readFragment, graphql } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/animated-section';

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

// const iconMap: Record<string, typeof BedDouble> = {
//   PYklYv8ZQXyuEs7kMzKI6Q: Scan,
//   DdEl7CZsRn2wnPlvPJyinw: BedDouble,
//   'EEexbnmxRC-3K8KLugiIcA': Droplets,
//   'N2R2Nf-QSXCvhbOJqehjpw': ShieldCheck,
// };

export function Lectures({ data }: Props) {
  const { lecturesTitle, lecturesDescription, lectures } = readFragment(LecturesFragment, data);

  return (
    <section id="lectures" className="w-full py-12 md:py-24 lg:py-32 bg-rose-50">
      <div className="container px-4 md:px-6">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
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
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          {lectures.map((lecture, index) => {
            const { title, description } = readFragment(LectureFragment, lecture);

            return (
              <AnimatedSection key={index} delay={200 + index * 200}>
                <Card className="border-2 border-rose-200 bg-rose-50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-terracotta-800">{title}</h3>
                    <div className="text-warmGray-600 prose prose-p:text-warmGray-600 max-w-none">
                      <StructuredText data={description} />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
