/**
 * Image + logo registry. Drop files into src/assets/photos (or src/assets/logo)
 * and they are picked up by base name — no code changes needed.
 *   src/assets/photos/hero.jpg          -> <Photo name="hero" />
 *   src/assets/logo/logo.svg            -> dark logo (on ivory)
 *   src/assets/logo/logo-light.svg      -> light logo (on charcoal)
 * Missing files render a clearly labelled placeholder instead of breaking.
 */
const photoModules = import.meta.glob('/src/assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const logoModules = import.meta.glob('/src/assets/logo/*.{svg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const index = (mods: Record<string, string>) => {
  const map: Record<string, string> = {};
  for (const [path, url] of Object.entries(mods)) {
    const base = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    map[base] = url;
  }
  return map;
};

const photos = index(photoModules);
const logos = index(logoModules);

export const photoUrl = (name: string): string | undefined => photos[name];
export const hasPhoto = (name: string): boolean => name in photos;
export const logoUrl = (variant: 'logo' | 'logo-light'): string | undefined => logos[variant] ?? (variant === 'logo-light' ? undefined : logos.logo);
