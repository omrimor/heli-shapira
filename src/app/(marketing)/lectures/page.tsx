import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { StructuredText } from 'react-datocms';
import { Lecture, LectureFragment } from '@/components/lecture';

const query = graphql(
  /* GraphQL */ `
    query LecturePageQuery {
      lecturePage {
        _seoMetaTags {
          ...TagFragment
        }
        _firstPublishedAt
        title
        description {
          value
        }
        lectures {
          ...LectureFragment
        }
      }
    }
  `,
  [LectureFragment, TagFragment],
);

export const generateMetadata = generateMetadataFn({
  query,
  // A callback that picks the SEO meta tags from the result of the query
  pickSeoMetaTags: (data) => data.lecturePage?._seoMetaTags,
});

export default async function LecturesPage() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { lecturePage } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  if (!lecturePage) {
    notFound();
  }

  return (
    <>
      <h1>{lecturePage.title}</h1>
      <StructuredText data={lecturePage.description} />
      {lecturePage.lectures.map((lecture, index) => (
        <Lecture key={index} data={lecture} />
      ))}
    </>
  );
}
