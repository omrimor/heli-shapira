import ContactForm from '@/components/contact-form';

export const metadata = {
  title: 'צור קשר | חלי רימון',
};
export default function ContactPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  return (
    <>
      <h1>צור קשר</h1>
      {searchParams.success && (
        <div className="bg-green-100 p-4 mb-4 rounded">Email sent successfully!</div>
      )}
      {searchParams.error && <div className="bg-red-100 p-4 mb-4 rounded">Error here!</div>}
      <ContactForm />
    </>
  );
}
