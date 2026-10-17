import { logoUrl } from '@/lib/images';
import { site } from '@/config/site';

/** Uses the uploaded logo when present (src/assets/logo); otherwise a typographic wordmark. */
interface LogoProps {
  variant?: 'dark' | 'light';
  /** 'lockup' includes the "Creative Spaces · Calgary" line (footer). */
  form?: 'wordmark' | 'lockup';
  className?: string;
}

export default function Logo({ variant = 'dark', form = 'wordmark', className = '' }: LogoProps) {
  const light = variant === 'light';
  const src = logoUrl(form === 'lockup' ? (light ? 'logo-lockup-light' : 'logo-lockup') : light ? 'logo-light' : 'logo');
  if (src) {
    const size = form === 'lockup' ? 'h-16 md:h-20' : 'h-7 md:h-9';
    return <img src={src} alt={site.name} width={1062} height={form === 'lockup' ? 294 : 238} className={`${size} w-auto ${className}`} />;
  }
  return (
    <span className={`inline-flex items-baseline gap-2 font-serif ${variant === 'light' ? 'text-ivory' : 'text-charcoal'} ${className}`}>
      <span className="text-[1.65rem] leading-none tracking-[0.12em] md:text-[1.9rem]">STUDIO</span>
      <span className="text-[1.65rem] leading-none md:text-[1.9rem]">29</span>
    </span>
  );
}
