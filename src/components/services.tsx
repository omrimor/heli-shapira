import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Service, ServiceFragment } from './service';
import { HeadingWithHighlight } from './heading-with-highlight';
import Image from 'next/image';
import { Button } from './ui/button';

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

export function Services({ data }: Props) {
  const { servicesTitle, servicesDescription, services } = readFragment(ServicesFragment, data);

  return (
    <section id="services" className="py-10 overflow-hidden">
      <Container className="space-y-3 prose prose-a:no-underline prose-headings:text-[#6C79D9] prose-h2:text-[#F9494B] prose-p:text-heli-primary relative">
        <div className="absolute left-0 bottom-0 w-[270px] h-[280px] md:w-[370px] md:h-[380px] translate-y-3 md:translate-y-0 -translate-x-1/3 md:-translate-x-1/3">
          <Image fill alt="" src="/images/services/woman.svg" className="object-contain" />
          <Button className="w-fit absolute right-0 translate-x-full bottom-1/4" asChild>
            <a href="#contact">קביעת פגישה</a>
          </Button>
        </div>
        <div>
          <h2>{servicesTitle}</h2>
          <StructuredText data={servicesDescription} />
        </div>
        <div className="flex flex-wrap gap-6">
          {services.map((service, index) => (
            <Service key={index} data={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
