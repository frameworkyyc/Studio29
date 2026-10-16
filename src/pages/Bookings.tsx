import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import InquiryForm from '@/components/InquiryForm';
import { bookingSteps, policies } from '@/data/faq';
import { pricingNote, pricingTiers } from '@/data/pricing';

const Placeholder = ({ children }: { children: string }) => (
  <span className="inline-block border border-dashed border-taupe px-2 py-0.5 text-sm text-taupe-deep">{children}</span>
);

export default function Bookings() {
  return (
    <>
      <Seo
        path="/bookings"
        title="Bookings — Rent Studio 29 in Calgary"
        description="Request a booking at Studio 29, a photography and content creation space in Creekstone, Calgary. Send an inquiry with your date, session type and details."
      />
      <PageHeader
        eyebrow="Bookings"
        title={<>Reserve the <em className="italic">space.</em></>}
        intro="Studio 29 currently works by inquiry. Share the details of your session and we will confirm availability with you directly."
      />

      {/* Process */}
      <section className="container-page pb-24 md:pb-32" aria-label="How booking works">
        <ol className="grid gap-px border-y border-charcoal/15 md:grid-cols-3 md:gap-0 md:divide-x md:divide-charcoal/15">
          {bookingSteps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="font-serif text-5xl text-taupe">0{i + 1}</p>
              <h2 className="mt-4 font-serif text-2xl">{s.title}</h2>
              <p className="mt-2 text-[0.95rem] text-charcoal/70">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Inquiry form */}
      <section id="inquiry" className="scroll-mt-24 bg-beige/60 py-24 md:py-32" aria-labelledby="inquiry-title">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <div id="inquiry-title">
              <SectionHeading eyebrow="Booking inquiry" title="Tell us about your session." intro="An inquiry does not hold a date. We will confirm availability and next steps with you." />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={100}>
            <div className="bg-ivory p-6 sm:p-10 md:p-14">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="container-page py-24 md:py-36" aria-labelledby="pricing">
        <Reveal>
          <div id="pricing">
            <SectionHeading eyebrow="Rates" title="Pricing" intro={pricingNote} />
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pricingTiers.map((t, i) => (
            <Reveal key={t.id} delay={i * 100} className="flex flex-col border border-charcoal/20 p-8">
              <h3 className="font-serif text-3xl">{t.name}</h3>
              <p className="mt-3 text-sm text-charcoal/70">{t.description}</p>
              <p className="my-8 font-serif text-4xl">
                {t.price ?? <Placeholder>Rate to be confirmed</Placeholder>}
                {t.price && t.unit && <span className="ml-2 font-sans text-sm text-charcoal/60">{t.unit}</span>}
              </p>
              <ul className="mt-auto space-y-2 border-t border-charcoal/15 pt-6 text-sm">
                {t.includes.map((inc) => <li key={inc}>{inc}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Policies */}
      <section className="border-t border-charcoal/10 py-24 md:py-32" aria-labelledby="policies">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><div id="policies"><SectionHeading eyebrow="Good to know" title="Studio policies." /></div></Reveal>
          <Reveal className="lg:col-span-8" delay={100}>
            <dl className="divide-y divide-charcoal/15 border-y border-charcoal/15">
              {policies.map((p) => (
                <div key={p.title} className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6">
                  <dt className="font-serif text-2xl">{p.title}</dt>
                  <dd className="sm:col-span-2"><Placeholder>{p.text}</Placeholder></dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
