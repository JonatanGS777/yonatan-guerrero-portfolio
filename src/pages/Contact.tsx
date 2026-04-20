import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import CollaborationAreas from '@/components/contact/CollaborationAreas';
import QuoteBanner from '@/components/contact/QuoteBanner';

export default function Contact() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <CollaborationAreas />
      <QuoteBanner />
    </main>
  );
}
