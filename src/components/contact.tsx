import { Container } from '@/components/layout/container';
import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { ReactNode } from 'react';
import { StructuredText } from 'react-datocms';
import { HeadingWithHighlight } from './heading-with-highlight';

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
    <section id="contact" className="py-10">
      <Container className="prose prose-h2:mt-0 prose-h2:text-[#F9494B] space-y-3">
        <h2>{contactTitle}</h2>
        <StructuredText data={contactDescription} />
        <div>{children}</div>
      </Container>
    </section>
  );
}
