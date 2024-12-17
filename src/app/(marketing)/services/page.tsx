import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { StructuredText } from 'react-datocms';
import { Service, ServiceFragment } from '@/components/service';

const query = graphql(
  /* GraphQL */ `
    query ServicePageQuery {
      servicePage {
        _seoMetaTags {
          ...TagFragment
        }
        _firstPublishedAt
        title
        description {
          value
        }
        services {
          ...ServiceFragment
        }
      }
    }
  `,
  [ServiceFragment, TagFragment],
);

export const generateMetadata = generateMetadataFn({
  query,
  // A callback that picks the SEO meta tags from the result of the query
  pickSeoMetaTags: (data) => data.servicePage?._seoMetaTags,
});

export default async function ServicesPage() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { servicePage } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  if (!servicePage) {
    notFound();
  }

  return (
    <>
      <h1>{servicePage.title}</h1>
      <StructuredText data={servicePage.description} />
      {servicePage.services.map((service, index) => (
        <Service key={index} data={service} />
      ))}
    </>
  );
}
