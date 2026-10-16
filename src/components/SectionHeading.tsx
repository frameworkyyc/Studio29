import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}

export default function SectionHeading({ eyebrow, title, intro, tone = 'light', align = 'left', as: H = 'h2' }: Props) {
  const dark = tone === 'dark';
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow mb-5 ${dark ? '!text-taupe' : ''}`}>{eyebrow}</p>}
      <H className={`${H === 'h1' ? 'display' : 'h2'} ${dark ? 'text-ivory' : ''}`}>{title}</H>
      {intro && <p className={`lede mt-6 ${dark ? '!text-ivory/75' : ''}`}>{intro}</p>}
    </div>
  );
}
