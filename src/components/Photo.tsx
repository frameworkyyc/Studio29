import { photoUrl } from '@/lib/images';

interface PhotoProps {
  name: string;
  alt: string;
  /** Tailwind aspect class, e.g. 'aspect-[4/5]'. Omit to let the image set its own height. */
  aspect?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  tone?: 'light' | 'dark';
}

/**
 * Renders a photo by base name from src/assets/photos. If the file hasn't been
 * added yet, shows a quiet labelled placeholder (never a broken image).
 */
export default function Photo({ name, alt, aspect = 'aspect-[4/5]', className = '', imgClassName = '', priority, sizes, tone = 'light' }: PhotoProps) {
  const src = photoUrl(name);
  if (!src) {
    return (
      <div
        role="img"
        aria-label={`${alt} (photo to be added)`}
        className={`relative flex h-full w-full items-end overflow-hidden ${aspect} ${className} ${tone === 'dark' ? 'bg-[#3a352f] text-ivory/70' : 'bg-beige text-charcoal/55'}`}
      >
        <span className="m-4 text-[0.65rem] uppercase tracking-eyebrow">Photo to add · {name}</span>
      </div>
    );
  }
  return (
    <div className={`overflow-hidden bg-beige ${aspect} ${className}`}>
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
