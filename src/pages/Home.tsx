import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import { slots } from '@/data/photos';
import { availableSpaces } from '@/data/spaces';
import { uses } from '@/data/uses';

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="Photography Studio Rental in Calgary"
        description="Studio 29 is a curated residential photography and content creation space in Creekstone, Calgary, Alberta. Rent a styled living room, kitchen and dining room for lifestyle, branding and commercial shoots."
      />

      {/* Hero */}
      <section className="relative mt-20 h-[calc(100svh-5rem)] min-h-[34rem] overflow-hidden bg-charcoal md:mt-24 md:h-[calc(100svh-6rem)]">
        <div className="kenburns absolute inset-0">
          <Photo {...slots.hero} aspect="h-full" priority tone="dark" sizes="100vw" className="!h-full" imgClassName="object-[50%_62%]" />
        </div>
        <div className="absolute inset-0 bg-charcoal/30" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/70 to-transparent" aria-hidden="true" />
        <div className="on-dark container-page relative flex h-full flex-col justify-end pb-14 text-ivory md:pb-20">
          <p className="eyebrow hero-in mb-5 !text-ivory/80" style={{ animationDelay: '200ms' }}>Creekstone · Calgary, Alberta</p>
          <h1 className="display hero-in max-w-4xl" style={{ animationDelay: '350ms' }}>Your Space to Create.</h1>
          <p className="hero-in mt-6 max-w-xl text-lg text-ivory/90 md:text-xl" style={{ animationDelay: '550ms' }}>
            A thoughtfully curated photography and content creation studio in Calgary, Alberta.
          </p>
          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '750ms' }}>
            <Button to="/studio" variant="light">Explore the Studio</Button>
            <Button to="/bookings#inquiry" variant="outline-light">Inquire About Booking</Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="container-page grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-6 lg:pr-8">
          <SectionHeading
            eyebrow="Welcome to Studio 29"
            title={<>A home designed to be <em className="italic">photographed.</em></>}
          />
          <div className="prose-s29 mt-8 max-w-xl text-[1.0625rem] leading-[1.85]">
            <p>
              Studio 29 is a residential space, styled with care and available to rent. It gives photographers, creatives and brands a real home to work in,
              without the effort of staging one.
            </p>
            <p>
              Where a traditional studio offers a blank cyclorama, Studio 29 offers lived-in warmth: soft neutral tones, curated decor and several distinct
              rooms within a single booking.
            </p>
          </div>
          <ul className="mt-10 grid max-w-xl gap-x-8 gap-y-4 border-t border-charcoal/15 pt-8 text-sm sm:grid-cols-2">
            {['Authentic residential environments', 'Thoughtfully curated interiors', 'Multiple shooting locations', 'Versatile for every photography style', 'A comfortable, welcoming atmosphere'].map((t) => (
              <li key={t} className="flex gap-3"><span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-taupe" />{t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-6">
          <Photo {...slots.intro} aspect="aspect-[4/5]" sizes="(min-width:1024px) 45vw, 100vw" />
        </Reveal>
      </section>

      {/* Explore the Space */}
      <section className="bg-beige/60 py-24 md:py-36" aria-labelledby="explore">
        <div className="container-page">
          <Reveal className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
            <div id="explore">
              <SectionHeading eyebrow="Explore the Space" title="Four settings, one booking." />
            </div>
            <Link to="/studio" className="link-u self-start text-[0.72rem] font-medium uppercase tracking-[0.2em] md:self-auto">View the full studio →</Link>
          </Reveal>

          <div className="space-y-24 md:space-y-36">
            {availableSpaces.map((s, i) => (
              <article key={s.id} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <Reveal className={`md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`}>
                  <Photo {...s.photo} aspect="aspect-[4/3]" sizes="(min-width:768px) 58vw, 100vw" imgClassName="transition-transform duration-[1600ms] ease-soft hover:scale-[1.03]" />
                </Reveal>
                <Reveal delay={120} className={`md:col-span-4 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
                  <p className="eyebrow mb-4">0{i + 1} · {s.kicker}</p>
                  <h3 className="h2">{s.title}</h3>
                  <p className="mt-5 text-charcoal/80">{s.summary}</p>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Designed for Creativity */}
      <section className="container-page py-24 md:py-36" aria-labelledby="creativity">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div id="creativity">
              <SectionHeading
                eyebrow="Designed for Creativity"
                title="Made for the way you work."
                intro="One calm, neutral backdrop that adapts to many kinds of image-making."
              />
            </div>
          </Reveal>
          <ul className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
            {uses.map((u, i) => (
              <Reveal as="li" key={u.title} delay={(i % 2) * 100} className="border-t border-charcoal/15 py-7">
                <h3 className="font-serif text-2xl">{u.title}</h3>
                <p className="mt-2 text-[0.95rem] text-charcoal/70">{u.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="on-dark bg-charcoal text-ivory" aria-labelledby="book">
        <div className="grid md:grid-cols-2">
          <div className="order-2 flex items-center px-6 py-20 md:order-1 md:px-14 md:py-32 lg:px-24">
            <Reveal className="max-w-lg">
              <p className="eyebrow mb-5 !text-taupe">Bookings</p>
              <h2 id="book" className="h2 text-ivory">Bring Your Vision to Life.</h2>
              <p className="lede mt-6 !text-ivory/75">
                From intimate portraits to commercial campaigns, discover a space designed to inspire your next project.
              </p>
              <div className="mt-10"><Button to="/bookings#inquiry" variant="light">Inquire About Availability</Button></div>
            </Reveal>
          </div>
          <div className="order-1 md:order-2">
            <Photo {...slots.bookingCta} aspect="aspect-[4/3] md:aspect-auto" tone="dark" className="md:!h-full md:min-h-[34rem]" sizes="(min-width:768px) 50vw, 100vw" />
          </div>
        </div>
      </section>
    </>
  );
}
