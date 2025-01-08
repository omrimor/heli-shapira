import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { Service, ServiceFragment } from './service';
import { HeadingWithHighlight } from './heading-with-highlight';
import { Accordion } from '@/components/ui/accordion';

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
    <section id="services" className="py-10">
      <Container className="space-y-3 prose prose-a:no-underline prose-headings:my-0">
        <div>
          {/* <HeadingWithHighlight>
            <h2>{servicesTitle}</h2>
          </HeadingWithHighlight> */}
          {/* <StructuredText data={servicesDescription} /> */}
        </div>
        <Accordion type="single" collapsible>
          {services.map((service, index) => (
            <Service key={index} data={service} />
          ))}
        </Accordion>
        {/* <div className="grid gap-y-4 grid-cols-1 md:grid-cols-3 grid-rows-[0.4fr_auto] md:gap-y-0 gap-x-4">
          {services.map((service, index) => (
            <Service key={index} data={service} />
          ))}
        </div> */}
      </Container>
    </section>
  );
}
