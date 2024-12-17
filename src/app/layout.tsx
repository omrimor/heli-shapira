// import DraftModeToggler from '@/components/DraftModeToggler';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';
import localFont from 'next/font/local';

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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#059669] to-[#0f766e] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <header className="bg-white">
          <nav className="mx-auto max-w-3xl flex items-center justify-between py-8">
            <div className="hidden lg:flex lg:flex-1 lg:justify-start">
              <Link href="/" className="text-sm/6 font-semibold text-gray-900 font-serif">
                חלי רימון
              </Link>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <Link href="/services" className="text-sm/6 font-semibold text-gray-900">
                שירותים
              </Link>
              <Link href="/lectures" className="text-sm/6 font-semibold text-gray-900">
                הרצאות
              </Link>
              <Link href="/about" className="text-sm/6 font-semibold text-gray-900">
                מי אני
              </Link>
              <Link href="/contact" className="text-sm/6 font-semibold text-gray-900">
                צור קשר
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl min-h-screen">{children}</main>
        <footer className="bg-white">
          <div className="mx-auto max-w-3xl grid grid-cols-3 py-8">
            <div>
              <Link href="/">חלי רימון</Link>
            </div>
            <div className="flex items-center justify-center">איקונים של סושיאל</div>
            <div className="text-sm flex justify-end">
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
          </div>
        </footer>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#059669] to-[#0f766e] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </body>
    </html>
  );
}
