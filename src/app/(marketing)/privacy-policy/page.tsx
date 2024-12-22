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
    query PrivacyPolicyPageQuery {
      privacyPolicyPage {
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
  pickSeoMetaTags: (data) => data.privacyPolicyPage?._seoMetaTags,
});

export default async function PrivacyPolicyPage() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { privacyPolicyPage } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  if (!privacyPolicyPage) {
    notFound();
  }

  return (
    <section className="min-h-screen pt-20">
      <Container className="prose">
        <h1>{privacyPolicyPage.title}</h1>
        <StructuredText data={privacyPolicyPage.content} />
      </Container>
    </section>
  );
}
