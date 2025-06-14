import { graphql } from '@/lib/datocms/graphql';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { TagFragment } from '@/lib/datocms/commonFragments';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';

import { AboutFragment } from '@/components/about';

import { Hero, HeroFragment } from '@/components/hero';
import { Services, ServicesFragment } from '@/components/services';
import { Lectures, LecturesFragment } from '@/components/lectures';
import { Recommendations, RecommendationsFragment } from '@/components/recommendations';
import { About } from '@/components/about';
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

export default async function HomePage() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { homePage } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  if (!homePage) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-rose-50 text-warmGray-800">
      <main className="flex-1">
        <About data={homePage} />
        <Hero data={homePage} />
        <Services data={homePage} />
        <Lectures data={homePage} />
        <Recommendations data={homePage} />
        <Contact data={homePage}>
          <ContactForm />
        </Contact>
      </main>
    </div>
  );
}
