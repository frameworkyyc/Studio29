/**
 * Image + logo registry. Drop files into src/assets/photos (or src/assets/logo)
 * and they are picked up by base name — no code changes needed.
 *   src/assets/photos/hero.jpg          -> <Photo name="hero" />
 *   src/assets/logo/logo.png            -> dark wordmark (on ivory); logo-light.png for dark backgrounds
 *   logo-lockup[-light].png (with tagline), mark[-light].png (S|29 roundel)
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
export type LogoName = 'logo' | 'logo-light' | 'logo-lockup' | 'logo-lockup-light' | 'mark' | 'mark-light';
export const logoUrl = (name: LogoName): string | undefined => logos[name];
