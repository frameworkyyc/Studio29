import { useMemo, useState } from 'react';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Lightbox from '@/components/Lightbox';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { categoryLabels, galleryImages, isPublishable, type GalleryCategory } from '@/data/gallery';
import { hasPhoto } from '@/lib/images';

const aspect = { landscape: 'aspect-[4/3]', portrait: 'aspect-[3/4]', square: 'aspect-square' } as const;

export default function Gallery() {
  // Only approved (and, for guest work, credited) images whose file exists are shown.
  const visible = useMemo(() => galleryImages.filter((g) => isPublishable(g) && hasPhoto(g.file)), []);
  const categories = useMemo(
    () => (Object.keys(categoryLabels) as GalleryCategory[]).filter((c) => visible.some((g) => g.category === c)),
    [visible],
  );
  const [filter, setFilter] = useState<'all' | GalleryCategory>('all');
  const [open, setOpen] = useState<number | null>(null);
  const shown = filter === 'all' ? visible : visible.filter((g) => g.category === filter);

  return (
    <>
      <Seo
        path="/gallery"
        title="Gallery — Studio 29 Interiors & Featured Work"
        description="A look inside Studio 29, a photography and content creation space in Calgary, with work from photographers who have shot here, credited where required."
      />
      <PageHeader
        eyebrow="Gallery"
        title={<>The space, <em className="italic">photographed.</em></>}
        intro="A look inside Studio 29. As photographers shoot here, approved work will be featured and always credited."
      />

      <section className="container-page pb-24 md:pb-36">
        {categories.length > 1 && (
          <div role="group" aria-label="Filter gallery" className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-charcoal/15 pb-5">
            {(['all', ...categories] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`link-u text-[0.72rem] font-medium uppercase tracking-[0.2em] ${filter === c ? 'bg-[length:100%_1px]' : 'text-charcoal/60'}`}
              >
                {c === 'all' ? 'All' : categoryLabels[c]}
              </button>
            ))}
          </div>
        )}

        {shown.length === 0 ? (
          <div className="border border-dashed border-taupe p-10 text-center md:p-20">
            <p className="h3">Photographs coming soon.</p>
            <p className="mx-auto mt-4 max-w-md text-charcoal/70">
              Approved studio photographs will appear here. (Site owner: add image files to <code>src/assets/photos</code> and list them in <code>src/data/gallery.ts</code>.)
            </p>
          </div>
        ) : (
          <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6">
            {shown.map((g, i) => (
              <Reveal as="li" key={g.id} delay={(i % 3) * 80} className="break-inside-avoid">
                <button type="button" onClick={() => setOpen(i)} className="group block w-full text-left" aria-label={`View larger: ${g.alt}`}>
                  <Photo name={g.file} alt={g.alt} aspect={aspect[g.orientation]} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" imgClassName="transition-transform duration-[1600ms] ease-soft group-hover:scale-[1.04]" />
                  <span className="mt-3 flex items-baseline justify-between gap-4 text-xs uppercase tracking-[0.16em] text-charcoal/60">
                    <span>{categoryLabels[g.category]}</span>
                    {g.credit && <span className="normal-case tracking-normal">Photo: {g.credit}</span>}
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      <section className="border-t border-charcoal/10 py-24 text-center md:py-32">
        <Reveal className="container-page">
          <h2 className="h2 mx-auto max-w-2xl">Shoot here. Be featured.</h2>
          <p className="lede mx-auto mt-5 max-w-xl">Photographers who book Studio 29 may be invited to share approved work in the gallery, with full credit.</p>
          <div className="mt-9"><Button to="/contact" variant="outline">Collaboration Inquiries</Button></div>
        </Reveal>
      </section>

      {open !== null && shown[open] && <Lightbox images={shown} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />}
    </>
  );
}
