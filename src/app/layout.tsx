// import DraftModeToggler from '@/components/DraftModeToggler';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';
import localFont from 'next/font/local';

import { SiInstagram, SiFacebook } from '@icons-pack/react-simple-icons';

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
        <main className="pt-20">{children}</main>
        <footer className="bg-heli-secondary-lightest/60 mt-12">
          <Container className="grid gap-3 md:grid-cols-3 py-8">
            <div className="flex items-center justify-center md:justify-normal">
              <Link href="/">חלי רימון</Link>
            </div>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/heli__rimon/"
                className="rounded-full flex items-center justify-center size-10 bg-white"
                rel="noreferrer"
                target="_blank"
              >
                <SiInstagram className="text-heli-accent" size="20" />
              </a>
              <a
                href="https://www.facebook.com/heli.shapira.5"
                className="rounded-full flex items-center justify-center size-10 bg-white"
                rel="noreferrer"
                target="_blank"
              >
                <SiFacebook className="text-heli-accent" size="20" />
              </a>
            </div>
            <div className="text-sm flex items-center justify-center md:justify-end">
              <p>
                <Link className="underline hover:text-heli-accent-light" href="/privacy-policy">
                  מדיניות פרטיות
                </Link>
                &nbsp;|&nbsp;
                <Link className="underline hover:text-heli-accent-light" href="/accessibility">
                  הצהרת נגישות
                </Link>
              </p>
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
