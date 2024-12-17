import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { StructuredText } from 'react-datocms';

const query = graphql(
  /* GraphQL */ `
    query AboutPageQuery {
      aboutPage {
        _seoMetaTags {
          ...TagFragment
        }
        title
        text {
          value
        }
        _firstPublishedAt
        image {
          alt
          responsiveImage(sizes: "(max-width: 700px) 100vw, 700px", imgixParams: { fm: webp }) {
            ...ResponsiveImageFragment
          }
        }
      }
    }
  `,
  [TagFragment, ResponsiveImageFragment],
);

export const generateMetadata = generateMetadataFn({
  query,
  // A callback that picks the SEO meta tags from the result of the query
  pickSeoMetaTags: (data) => data.aboutPage?._seoMetaTags,
});

export default async function AboutPage() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { aboutPage } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  if (!aboutPage) {
    notFound();
  }

  return (
    <>
      <h1>{aboutPage.title}</h1>
      <figure>
        {/* Display responsive image */}
        <ResponsiveImage data={aboutPage.image?.responsiveImage!} />
        {/* Display image title */}
        <figcaption>{aboutPage.image?.alt}</figcaption>
      </figure>
      <StructuredText data={aboutPage.text} />
    </>
  );
}
