import { FragmentOf, readFragment, graphql } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';

export const RecommendationFragment = graphql(`
  fragment RecommendationFragment on RecommendationRecord {
    id
    name
    text {
      value
    }
    _status
    _firstPublishedAt
  }
`);

export const RecommendationsFragment = graphql(
  `
    fragment RecommendationsFragment on HomePageRecord {
      recommendationsTitle
      recommendationsDescription {
        value
      }
      recommendations {
        ...RecommendationFragment
      }
    }
  `,
  [RecommendationFragment],
);

type Props = {
  data: FragmentOf<typeof RecommendationsFragment>;
};

export function Recommendations({ data }: Props) {
  const { recommendationsTitle, recommendationsDescription, recommendations } = readFragment(
    RecommendationsFragment,
    data,
  );

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-rose-50">
      <div className="container px-4 md:px-6">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-terracotta-900 sm:text-5xl">
              {recommendationsTitle}
            </h2>
            {recommendationsDescription && (
              <div className="max-w-[900px] text-warmGray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed prose prose-p:text-warmGray-700 max-w-none">
                <StructuredText data={recommendationsDescription} />
              </div>
            )}
          </div>
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          {recommendations.map((recommendation, index) => {
            const { name, text } = readFragment(RecommendationFragment, recommendation);

            return (
              <AnimatedSection key={index} delay={200 + index * 200}>
                <Card className="border-2 border-rose-200 bg-rose-50 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-current text-terracotta-400 animate-pulse-gentle"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                    <div className="italic text-warmGray-700 prose prose-p:text-warmGray-700 max-w-none">
                      <StructuredText data={text} />
                    </div>
                    <div className="pt-4 border-t border-rose-200">
                      <p className="font-medium text-terracotta-800">{name || 'אנונימי'}</p>
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
