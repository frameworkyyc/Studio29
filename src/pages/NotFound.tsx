import Seo from '@/components/Seo';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page not found" description="This page could not be found." noindex />
      <section className="container-page flex min-h-[80svh] flex-col items-start justify-center pt-24">
        <p className="eyebrow mb-5">404</p>
        <h1 className="display">Page not found.</h1>
        <p className="lede mt-6 max-w-md">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
        <div className="mt-9"><Button to="/">Return Home</Button></div>
      </section>
    </>
  );
}
