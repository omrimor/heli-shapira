import { Container } from '@/components/layout/container';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { StructuredText } from 'react-datocms';

const query = graphql(
  /* GraphQL */ `
    query AccessibilityPageQuery {
      accessibilityPage {
        _seoMetaTags {
          ...TagFragment
        }
        _firstPublishedAt
        title
        content {
          value
        }
      }
    }
  `,
  [TagFragment],
);

export const generateMetadata = generateMetadataFn({
  query,
  // A callback that picks the SEO meta tags from the result of the query
  pickSeoMetaTags: (data) => data.accessibilityPage?._seoMetaTags,
});

export default async function AccessibilityPage() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { accessibilityPage } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  if (!accessibilityPage) {
    notFound();
  }

  return (
    <section className="min-h-screen pt-20">
      <Container className="prose">
        <h1>{accessibilityPage.title}</h1>
        <StructuredText data={accessibilityPage.content} />
      </Container>
    </section>
  );
}
