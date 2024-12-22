import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { StructuredText } from 'react-datocms';

import { TagFragment } from '@/lib/datocms/commonFragments';

import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';

import { Hero, HeroFragment } from '@/components/hero';
import { Services, ServicesFragment } from '@/components/services';
import { Lectures, LecturesFragment } from '@/components/lectures';
import { Recommendations, RecommendationsFragment } from '@/components/recommendations';
import { About, AboutFragment } from '@/components/about';
import { Contact, ContactFragment } from '@/components/contact';
import ContactForm from '@/components/contact-form';

const query = graphql(
  /* GraphQL */ `
    query query {
      homePage(locale: he) {
        _seoMetaTags {
          ...TagFragment
        }
        id
        ...HeroFragment
        ...ServicesFragment
        ...LecturesFragment
        ...AboutFragment
        ...RecommendationsFragment
        ...ContactFragment
      }
    }
  `,
  [
    ServicesFragment,
    TagFragment,
    LecturesFragment,
    AboutFragment,
    RecommendationsFragment,
    HeroFragment,
    ContactFragment,
  ],
);

export const generateMetadata = generateMetadataFn({
  query,
  // A callback that picks the SEO meta tags from the result of the query
  pickSeoMetaTags: (data) => data.homePage?._seoMetaTags,
});

export default async function HomePage({
  searchParams,
}: {
  searchParams: { success?: boolean; error?: boolean };
}) {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { homePage } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  if (!homePage) {
    notFound();
  }

  return (
    <>
      <Hero data={homePage} />
      <Services data={homePage} />
      <Lectures data={homePage} />
      <About data={homePage} />
      <Recommendations data={homePage} />
      <Contact data={homePage}>
        {searchParams.success && (
          <div className="bg-green-100 p-4 mb-4 rounded">Email sent successfully!</div>
        )}
        {searchParams.error && (
          <div className="bg-red-100 p-4 mb-4 rounded">מצטערת, קרתה תקלה. אני על זה</div>
        )}
        <ContactForm />
      </Contact>
    </>
  );
}
