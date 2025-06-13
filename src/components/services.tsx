import { FragmentOf, readFragment, graphql } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Calendar, Heart } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';

export const ServiceFragment = graphql(`
  fragment ServiceFragment on ServiceRecord {
    id
    title
    description {
      value
    }
    _firstPublishedAt
  }
`);

export const ServicesFragment = graphql(
  `
    fragment ServicesFragment on HomePageRecord {
      servicesTitle
      servicesDescription {
        value
      }
      services {
        ...ServiceFragment
      }
    }
  `,
  [ServiceFragment],
);

type Props = {
  data: FragmentOf<typeof ServicesFragment>;
};

const iconMap = {
  0: MessageCircle,
  1: Calendar,
  2: Heart,
};

export function Services({ data }: Props) {
  const { servicesTitle, servicesDescription, services } = readFragment(ServicesFragment, data);

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-rose-100">
      <div className="container px-4 md:px-6">
        <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-rose-200 px-3 py-1 text-sm text-terracotta-800">
              אני כאן כדי לעזור{' '}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-terracotta-900 sm:text-5xl">
              {servicesTitle}
            </h2>
            {servicesDescription && (
              <div className="max-w-[900px] text-warmGray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed prose prose-p:text-warmGray-700 max-w-none">
                <StructuredText data={servicesDescription} />
              </div>
            )}
          </div>
        </AnimatedSection>
        <div className="mx-auto grid items-stretch gap-6 py-12 lg:grid-cols-3">
          {services.map((service, index) => {
            const { title, description } = readFragment(ServiceFragment, service);
            const Icon = iconMap[index as keyof typeof iconMap] || MessageCircle;

            return (
              <AnimatedSection key={index} delay={200 + index * 200} className="h-full">
                <Card className="border-2 border-rose-200 bg-rose-50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4 h-full">
                    <div className="rounded-full bg-rose-200 p-3 transition-all duration-500 hover:bg-rose-300 group">
                      <Icon className="h-6 w-6 text-terracotta-600 transition-all duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-bold text-terracotta-800">{title}</h3>
                    <div className="text-warmGray-600 prose prose-p:text-warmGray-600 max-w-none flex-grow">
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
