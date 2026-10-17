import { Link } from 'react-router-dom';
import Logo from './Logo';
import { site } from '@/config/site';
import { navigation } from '@/data/navigation';

export default function Footer() {
  return (
    <footer className="on-dark bg-charcoal text-ivory">
      <div className="container-page grid gap-14 py-20 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Logo variant="light" form="lockup" />
          <p className="mt-6 max-w-sm font-serif text-2xl italic leading-snug text-ivory/80">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="eyebrow mb-5 !text-taupe">Explore</p>
          <ul className="space-y-3">
            {navigation.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-u text-sm text-ivory/85">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="eyebrow mb-5 !text-taupe">Find us</p>
          <address className="space-y-3 text-sm not-italic text-ivory/85">
            <p>{site.location.neighbourhood}, {site.location.city}<br />{site.location.region}, {site.location.country}</p>
            <p>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-u">{site.instagram.handle}</a>
            </p>
            <p className="text-ivory/60">Studio address shared with confirmed bookings.</p>
          </address>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ivory/60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>
            Photography &amp; content studio rental · Calgary, Alberta
            <span aria-hidden="true" className="hidden sm:inline"> · </span>
            <span className="block sm:inline">
              Created by{' '}
              <a href={site.credit.url} target="_blank" rel="noopener noreferrer" className="link-u text-ivory/85">{site.credit.name}</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
