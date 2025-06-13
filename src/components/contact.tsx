import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText } from 'react-datocms';
import { AnimatedSection } from '@/components/animated-section';

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
  children: React.ReactNode;
};

export function Contact({ data, children }: Props) {
  const { contactTitle, contactDescription } = readFragment(ContactFragment, data);

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-rose-100">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection className="text-center space-y-4 mb-8">
            <div className="inline-block rounded-lg bg-rose-200 px-3 py-1 text-sm text-terracotta-800">
              צור קשר
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-terracotta-900 sm:text-4xl">
              {contactTitle}
            </h2>
            <div className="text-warmGray-700 prose prose-p:text-warmGray-700 max-w-none">
              <StructuredText data={contactDescription} />
            </div>
          </AnimatedSection>
          <AnimatedSection
            delay={300}
            className="bg-rose-50 p-8 rounded-lg shadow-lg border border-rose-200"
          >
            {children}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
