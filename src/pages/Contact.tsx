import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { site } from '@/config/site';

export default function Contact() {
  return (
    <>
      <Seo
        path="/contact"
        title="Contact — Studio 29, Calgary"
        description="Contact Studio 29 in Calgary, Alberta for booking questions and collaboration inquiries, or follow @studio29.yyc on Instagram."
      />
      <PageHeader
        eyebrow="Contact"
        title={<>Say <em className="italic">hello.</em></>}
        intro="For booking questions and collaboration inquiries, send a message or find us on Instagram."
      />
      <section className="container-page grid gap-16 pb-28 md:pb-40 lg:grid-cols-12 lg:gap-24">
        <Reveal className="lg:col-span-4">
          <dl className="divide-y divide-charcoal/15 border-y border-charcoal/15">
            <div className="py-6">
              <dt className="eyebrow mb-2">Instagram</dt>
              <dd><a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-u font-serif text-2xl">{site.instagram.handle}</a></dd>
            </div>
            <div className="py-6">
              <dt className="eyebrow mb-2">Location</dt>
              <dd className="font-serif text-2xl">Calgary, Alberta</dd>
              <dd className="mt-1 text-sm text-charcoal/60">The studio address is shared with confirmed bookings.</dd>
            </div>
            <div className="py-6">
              <dt className="eyebrow mb-2">Inquiries</dt>
              <dd className="text-charcoal/80">Bookings and collaborations. For a session, please use the <Link to="/bookings#inquiry" className="link-u">booking inquiry form</Link>.</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={100}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
