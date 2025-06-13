// import DraftModeToggler from '@/components/DraftModeToggler';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';
import localFont from 'next/font/local';

import { SiInstagram } from '@icons-pack/react-simple-icons';

import './global.css';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Container } from '@/components/layout/container';

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

const notoSans = localFont({
  src: [
    {
      path: '../../public/fonts/NotoSansHebrew-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NotoSansHebrew-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NotoSansHebrew-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-noto-sans',
});

const notoSerif = localFont({
  src: [
    {
      path: '../../public/fonts/NotoSerifHebrew-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NotoSerifHebrew-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NotoSerifHebrew-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-noto-serif',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="relative isolate">
        <Header />
        {children}
        <footer className="border-t border-rose-200 bg-rose-50">
          <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
                <span className="text-lg font-semibold text-terracotta-800">חלי רימון</span>
              </div>
              <p className="text-sm text-warmGray-600">
                © {new Date().getFullYear()} חלי רימון - יעוץ הורי. כל הזכויות שמורות.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/heli__rimon/"
                className="rounded-full flex items-center justify-center size-10 bg-white border border-rose-200 hover:bg-rose-50 transition-colors"
                rel="noreferrer"
                target="_blank"
              >
                <SiInstagram className="text-terracotta-600" size="20" />
              </a>
              <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-warmGray-700 hover:underline underline-offset-4 transition-colors hover:text-terracotta-600"
                >
                  מדיניות פרטיות
                </Link>
                <Link
                  href="/accessibility"
                  className="text-sm text-warmGray-700 hover:underline underline-offset-4 transition-colors hover:text-terracotta-600"
                >
                  הצהרת נגישות
                </Link>
              </div>
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
