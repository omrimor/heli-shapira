import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { Accordion } from '@/components/ui/accordion';

import { Service, ServiceFragment } from './service';

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
        <Accordion type="single" collapsible>
          {services.map((service, index) => (
            <Service key={index} data={service} />
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
