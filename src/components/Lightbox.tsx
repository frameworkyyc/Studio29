import { useEffect, useRef } from 'react';
import { photoUrl } from '@/lib/images';
import type { GalleryImage } from '@/data/gallery';
import { categoryLabels } from '@/data/gallery';

interface Props {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}

export default function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const img = images[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const prev = () => onNavigate((index - 1 + images.length) % images.length);
  const next = () => onNavigate((index + 1) % images.length);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Tab') { // keep focus inside the dialog
        const f = document.querySelectorAll<HTMLElement>('[data-lb] button');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const src = photoUrl(img.file);
  if (!src) return null;
  const btn = 'flex h-12 w-12 items-center justify-center text-2xl text-ivory/80 transition-colors hover:text-ivory';
  return (
    <div data-lb role="dialog" aria-modal="true" aria-label={`Image ${index + 1} of ${images.length}`} className="on-dark fixed inset-0 z-[60] flex flex-col bg-charcoal/97 bg-[#1d1b18]/[0.97] text-ivory">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <p className="eyebrow !text-ivory/60">{index + 1} / {images.length}</p>
        <button ref={closeRef} type="button" onClick={onClose} className={btn} aria-label="Close gallery">✕</button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
        <button type="button" onClick={prev} className={`${btn} absolute left-1 md:left-5`} aria-label="Previous image">←</button>
        <img key={img.id} src={src} alt={img.alt} className="hero-in max-h-full max-w-full object-contain" style={{ animationDuration: '0.6s' }} />
        <button type="button" onClick={next} className={`${btn} absolute right-1 md:right-5`} aria-label="Next image">→</button>
      </div>
      <div className="px-6 py-5 text-center text-sm text-ivory/75">
        <p>{img.caption ?? img.alt}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ivory/50">
          {categoryLabels[img.category]}
          {img.credit && <> · Photo: {img.creditUrl ? <a href={img.creditUrl} target="_blank" rel="noopener noreferrer" className="link-u">{img.credit}</a> : img.credit}</>}
        </p>
      </div>
    </div>
  );
}
