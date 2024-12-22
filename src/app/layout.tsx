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

const bellefair = localFont({
  src: [
    {
      path: '../../public/fonts/Bellefair-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-bellefair',
});

const bonanova = localFont({
  src: [
    {
      path: '../../public/fonts/BonaNovaSC-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/BonaNovaSC-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-bonanova',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${notoSans.variable} ${notoSerif.variable} ${bellefair.variable} ${bonanova.variable}`}
    >
      <body className="relative isolate">
        <Header />
        <main>{children}</main>
        <footer className="bg-heli-secondary-lightest/30 mt-12">
          <Container className="grid grid-cols-3 py-8">
            <div className="flex items-center">
              <Link href="/">חלי רימון</Link>
            </div>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/heli__rimon/"
                className="rounded-full flex items-center justify-center size-10 bg-white"
                rel="noreferrer"
                target="_blank"
              >
                <SiInstagram className="text-heli-secondary" size="20" />
              </a>
              <a
                href="https://www.facebook.com/heli.shapira.5"
                className="rounded-full flex items-center justify-center size-10 bg-white"
                rel="noreferrer"
                target="_blank"
              >
                <SiFacebook className="text-heli-secondary" size="20" />
              </a>
            </div>
            <div className="text-sm flex items-center justify-end">
              <p>
                <Link className="underline" href="/privacy-policy">
                  מדיניות פרטיות
                </Link>
                &nbsp;|&nbsp;
                <Link className="underline" href="/accessibility">
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
