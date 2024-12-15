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
      about {
        _seoMetaTags {
          ...TagFragment
        }
        _firstPublishedAt
        text {
          value
        }
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
  pickSeoMetaTags: (data) => data.about?._seoMetaTags,
});

export default async function AboutPage() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { about } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  if (!about) {
    notFound();
  }

  return (
    <>
      <h1>about page</h1>
      <figure>
        {/* Display responsive image */}
        <ResponsiveImage data={about.image?.responsiveImage!} />
        {/* Display image title */}
        <figcaption>{about.image?.alt}</figcaption>
      </figure>
      <StructuredText data={about.text} />
    </>
  );
}
