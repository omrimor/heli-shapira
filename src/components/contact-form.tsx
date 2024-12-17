'use client';

import { useFormStatus } from 'react-dom';
import { sendEmail } from '@/app/actions/email';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {pending ? 'עוד רגע בבקשה...' : 'שלח הודעה'}
    </button>
  );
}

export default function ContactForm() {
  return (
    <form action={sendEmail} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-2">
          כתובת אימייל
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full p-2 border rounded"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block mb-2">
          נושא הפנייה
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full p-2 border rounded"
          placeholder="Enter subject"
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-2">
          ספרו לי על הבעיה שלכם
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full p-2 border rounded"
          placeholder="Your message"
        ></textarea>
      </div>
      <SubmitButton />
    </form>
  );
}
