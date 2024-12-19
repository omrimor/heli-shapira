import { Container } from '@/components/layout';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { ReactNode } from 'react';
import { StructuredText } from 'react-datocms';

export const ContactFragment = graphql(`
  fragment ContactFragment on HomePageRecord {
    contactTitle
    contactDescription {
      value
    }
  }
`);

type Props = {
  data: FragmentOf<typeof ContactFragment>;
};

export function Contact({ data, children }: Props & { children: ReactNode }) {
  const { contactTitle, contactDescription } = readFragment(ContactFragment, data);

  return (
    <section className="py-10">
      <Container className="prose space-y-3">
        <h2>{contactTitle}</h2>
        <StructuredText data={contactDescription} />
        {children}
      </Container>
    </section>
  );
}
