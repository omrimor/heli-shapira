'use client';

import { useFormStatus } from 'react-dom';
import { sendEmail } from '@/app/actions/email';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useEffect, useRef } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'עוד רגע בבקשה...' : 'שלח הודעה'}
    </Button>
  );
}

export default function ContactForm({
  searchParams,
}: {
  searchParams: { success?: boolean; error?: boolean };
}) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (searchParams.success) {
      formRef.current?.reset();
    }
    if (searchParams.error) {
      formRef.current?.reset();
    }
  }, [searchParams.success, searchParams.error]);

  return (
    <form ref={formRef} action={sendEmail} className="space-y-4 flex flex-col">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="w-full">
          <Label htmlFor="email">כתובת מייל</Label>
          <Input type="email" name="email" required id="email" placeholder="your@email.com" />
        </div>
        <div className="w-full">
          <Label htmlFor="subject">נושא הפנייה</Label>
          <Input type="text" required id="subject" name="subject" placeholder="נושא הפנייה" />
        </div>
      </div>
      <div>
        <Label htmlFor="message">איך אוכל לעזור?</Label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="flex h-20 w-full rounded-md border border-heli-primary bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder="היי חלי, נשמח לעזרה עם..."
        ></textarea>
      </div>
      <SubmitButton />
    </form>
  );
}
