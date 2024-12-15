// import DraftModeToggler from '@/components/DraftModeToggler';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';

import './global.css';
import Link from 'next/link';

const query = graphql(
  /* GraphQL */ `
    query query {
      _site {
        faviconMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [TagFragment],
);

export async function generateMetadata() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const data = await executeQuery(query, { includeDrafts: isDraftModeEnabled });
  return toNextMetadata(data._site.faviconMetaTags);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he">
      <body>
        <header>
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1"></div>
            <div className="hidden lg:flex lg:gap-x-12">
              <Link href="/contact" className="text-sm/6 font-semibold text-gray-900">
                צור קשר
              </Link>
              <Link href="/about" className="text-sm/6 font-semibold text-gray-900">
                אודות
              </Link>
              <Link href="/services" className="text-sm/6 font-semibold text-gray-900">
                שירותים
              </Link>
              <Link href="/lectures" className="text-sm/6 font-semibold text-gray-900">
                הרצאות
              </Link>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link href="/" className="text-sm/6 font-semibold text-gray-900">
                חלי שפירא
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl">{children}</main>
      </body>
    </html>
  );
}
