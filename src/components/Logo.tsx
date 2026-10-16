import { logoUrl } from '@/lib/images';
import { site } from '@/config/site';

/** Uses the uploaded logo when present (src/assets/logo/logo[-light].svg|png); otherwise a typographic wordmark. */
export default function Logo({ variant = 'dark', className = '' }: { variant?: 'dark' | 'light'; className?: string }) {
  const src = logoUrl(variant === 'light' ? 'logo-light' : 'logo');
  if (src) return <img src={src} alt={site.name} className={`h-9 w-auto md:h-11 ${className}`} />;
  return (
    <span className={`inline-flex items-baseline gap-2 font-serif ${variant === 'light' ? 'text-ivory' : 'text-charcoal'} ${className}`}>
      <span className="text-[1.65rem] leading-none tracking-[0.12em] md:text-[1.9rem]">STUDIO</span>
      <span className="text-[1.65rem] leading-none md:text-[1.9rem]">29</span>
    </span>
  );
}
