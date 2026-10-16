import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import { slots } from '@/data/photos';
import { availableSpaces } from '@/data/spaces';
import { amenities, studioInfo } from '@/data/studio-info';
import { hasPhoto } from '@/lib/images';

export default function Studio() {
  return (
    <>
      <Seo
        path="/studio"
        title="The Studio — Rentable Photography Space in Creekstone, Calgary"
        description="Explore Studio 29: a furnished living room, modern kitchen with a large island, dining room and two bathrooms in Creekstone, Calgary. A residential photography and content creation space."
      />
      <PageHeader
        eyebrow="The Studio"
        title={<>A home, <em className="italic">ready</em> for your camera.</>}
        intro="Studio 29 is a furnished residential space in Creekstone, Calgary. Each room has its own character, so one booking can deliver several distinct looks."
      />

      <div className="container-page">
        <Reveal><Photo {...slots.hero} aspect="aspect-[16/8]" sizes="100vw" tone="dark" /></Reveal>
      </div>

      {/* Rooms */}
      <section className="py-24 md:py-36" aria-label="Rooms">
        <div className="container-page space-y-28 md:space-y-44">
          {availableSpaces.map((s, i) => {
            const extras = s.gallery.filter((g) => hasPhoto(g.name));
            return (
              <article key={s.id} id={s.id} className="scroll-mt-32">
                <div className="grid gap-10 md:grid-cols-12 md:gap-14">
                  <Reveal className={`md:col-span-5 md:pt-6 ${i % 2 ? 'md:order-2 md:col-start-8' : ''}`}>
                    <p className="eyebrow mb-4">{s.kicker}</p>
                    <h2 className="h2">{s.title}</h2>
                    <p className="mt-6 text-charcoal/80">{s.description}</p>
                    <ul className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10 text-sm">
                      {s.highlights.map((h) => <li key={h} className="py-3">{h}</li>)}
                    </ul>
                  </Reveal>
                  <Reveal delay={120} className={`md:col-span-7 ${i % 2 ? 'md:order-1' : ''}`}>
                    <Photo {...s.photo} aspect="aspect-[5/4]" sizes="(min-width:768px) 58vw, 100vw" />
                  </Reveal>
                </div>
                {extras.length > 0 && (
                  <div className={`mt-6 grid gap-6 md:mt-10 ${extras.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                    {extras.map((g) => (
                      <Reveal key={g.name}><Photo {...g} aspect="aspect-[4/3]" sizes="(min-width:640px) 45vw, 100vw" /></Reveal>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Environments + amenities */}
      <section className="bg-beige/60 py-24 md:py-32">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionHeading eyebrow="Shooting environments" title="Available today." />
            <ul className="mt-10 divide-y divide-charcoal/15 border-y border-charcoal/15">
              {availableSpaces.filter((s) => s.id !== 'amenities').map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-6 py-5">
                  <a href={`#${s.id}`} className="link-u font-serif text-2xl">{s.title}</a>
                  <span className="hidden text-sm text-charcoal/60 sm:block">{s.highlights[0]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="Studio amenities" title="Comfortable by design." />
            <ul className="mt-10 space-y-4">
              {amenities.map((a) => (
                <li key={a} className="flex gap-4"><span aria-hidden="true" className="mt-[0.8em] h-px w-5 shrink-0 bg-taupe-deep" />{a}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* General info */}
      <section className="container-page py-24 md:py-36" aria-labelledby="info">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><div id="info"><SectionHeading eyebrow="Studio information" title="At a glance." /></div></Reveal>
          <Reveal className="lg:col-span-8" delay={100}>
            <dl className="divide-y divide-charcoal/15 border-y border-charcoal/15">
              {studioInfo.map((row) => (
                <div key={row.label} className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
                  <dt className="eyebrow !text-charcoal/60">{row.label}</dt>
                  <dd className="sm:col-span-2">
                    {row.value ?? <span className="inline-block border border-dashed border-taupe px-2 py-0.5 text-sm text-taupe-deep">{row.placeholder}</span>}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-xl text-sm text-charcoal/60">
              To protect the privacy of the home, the exact address is only provided to confirmed bookings.
            </p>
          </Reveal>
        </div>
      </section>

        <section className="border-t border-charcoal/10 py-24 text-center md:py-32">
          <Reveal className="container-page">
            <h2 className="h2 mx-auto max-w-2xl">Plan your session.</h2>
            <p className="lede mx-auto mt-5 max-w-xl">Tell us about your project and preferred date, and we&rsquo;ll be in touch.</p>
            <div className="mt-9"><Button to="/bookings#inquiry">Inquire About Booking</Button></div>
          </Reveal>
        </section>
    </>
  );
}
