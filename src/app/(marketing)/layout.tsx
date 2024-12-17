import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      {children}
      <div className="border p-6 rounded-lg shadow-md bg-white my-10 grid grid-cols-[1fr_auto] gap-4">
        <p className="prose">אני רוצה לעזור לכם</p>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">דברו איתי</Link>
        </Button>
      </div>
    </section>
  );
}
