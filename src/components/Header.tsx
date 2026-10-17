import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { bookCta, navigation } from '@/data/navigation';
import { useScrolled } from '@/lib/hooks';

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const link = ({ isActive }: { isActive: boolean }) =>
    `link-u text-[0.72rem] font-medium uppercase tracking-[0.2em] ${isActive ? 'bg-[length:100%_1px]' : ''}`;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-soft ${
        scrolled || open ? 'bg-ivory/95 shadow-[0_1px_0_rgba(41,39,35,0.1)] backdrop-blur' : 'bg-ivory'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <div className={`container-page flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16 md:h-[4.5rem]' : 'h-20 md:h-24'}`}>
        <Link to="/" aria-label="Studio 29 — home" className="relative z-10">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {navigation.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={link}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to={bookCta.to} className="btn btn-solid hidden !px-6 !py-3 lg:inline-flex">
            {bookCta.label}
          </Link>
          <button
            type="button"
            className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 h-px w-full bg-charcoal transition-all duration-500 ease-soft ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-full bg-charcoal transition-all duration-500 ease-soft ${open ? 'top-1/2 -rotate-45' : 'top-full'}`} />
            </span>
          </button>
        </div>
      </div>

    </header>
    <div
      id="mobile-menu"
      hidden={!open}
      className="fixed inset-0 z-40 overflow-y-auto bg-ivory pt-24 lg:hidden"
    >
      <nav aria-label="Mobile" className="container-page flex min-h-[calc(100svh-6rem)] flex-col justify-between pb-10">
        <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
          {navigation.map((n, i) => (
            <li key={n.to} className="hero-in" style={{ animationDelay: `${i * 60}ms` }}>
              <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `block py-4 font-serif text-3xl ${isActive ? 'text-taupe-deep' : ''}`}>
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to={bookCta.to} className="btn btn-solid mt-10 w-full">
          {bookCta.label}
        </Link>
      </nav>
    </div>
    </>
  );
}
