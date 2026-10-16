import type { ReactNode } from 'react';

/** Editorial page opener used on interior pages. */
export default function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <header className="container-page pb-16 pt-36 md:pb-24 md:pt-48">
      <p className="eyebrow hero-in mb-6">{eyebrow}</p>
      <h1 className="display hero-in max-w-5xl" style={{ animationDelay: '120ms' }}>{title}</h1>
      {intro && <p className="lede hero-in mt-8 max-w-2xl" style={{ animationDelay: '260ms' }}>{intro}</p>}
    </header>
  );
}
