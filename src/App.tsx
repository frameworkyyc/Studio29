import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Home ships in the main bundle (fastest first paint); other routes are split.
const Studio = lazy(() => import('./pages/Studio'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Bookings = lazy(() => import('./pages/Bookings'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
