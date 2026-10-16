import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { slots } from '@/data/photos';

const principles = [
  { title: 'Considered', text: 'Every room is furnished and styled with intention, in a calm and cohesive palette.' },
  { title: 'Authentic', text: 'A real home, so your images feel natural rather than staged on a set.' },
  { title: 'Welcoming', text: 'A comfortable space for clients, models and crew to settle into and do their best work.' },
];

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        title="About Studio 29 — Curated Creative Space in Calgary"
        description="Studio 29 gives photographers and creatives a beautifully styled residential space in Calgary to work in, without needing to stage a home themselves."
      />
      <PageHeader
        eyebrow="About"
        title={<>Curated spaces for <em className="italic">creative expression.</em></>}
      />

      <section className="container-page grid gap-14 pb-24 md:pb-36 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <Photo {...slots.about} aspect="aspect-[4/5]" sizes="(min-width:1024px) 40vw, 100vw" />
        </Reveal>
        <Reveal delay={120} className="prose-s29 text-[1.0625rem] leading-[1.9] lg:col-span-6 lg:col-start-7 lg:pt-16">
          <p className="font-serif text-3xl leading-snug text-charcoal md:text-4xl">
            Studio 29 was created for photographers who want to work in a beautiful, comfortable environment.
          </p>
          <div className="mt-10">
            <p>
              Lifestyle and branding work depends on authentic settings, and styling an entire home for each shoot is rarely practical. Studio 29 removes that
              step: the interiors are already furnished, curated and ready to photograph.
            </p>
            <p>
              Located in Creekstone, Calgary, the space includes a living room, a kitchen with a large island and a dining room, each with its own
              atmosphere. Photographers, content creators and brands can move between them within a single session.
            </p>
            <p>
              Studio 29 rents creative space. We do not offer photography services, which means the space is yours to direct, whatever your style.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="bg-beige/60 py-24 md:py-32">
        <div className="container-page grid gap-12 md:grid-cols-3 md:gap-16">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <p className="font-serif text-5xl text-taupe">0{i + 1}</p>
              <h2 className="mt-4 font-serif text-3xl">{p.title}</h2>
              <p className="mt-3 text-charcoal/75">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 text-center md:py-32">
        <Reveal className="container-page">
          <h2 className="h2 mx-auto max-w-2xl">Let&rsquo;s plan your next project.</h2>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/studio">Explore the Studio</Button>
            <Button to="/bookings#inquiry" variant="outline">Inquire About Booking</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
