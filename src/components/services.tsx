import { Container } from '@/components/layout';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
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
    <section className="py-10">
      <Container className="space-y-3 prose">
        <h2>{servicesTitle}</h2>
        <StructuredText data={servicesDescription} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 grid-rows-[0.3fr_0.6fr_auto]">
          {services.map((service, index) => (
            <Service key={index} data={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
